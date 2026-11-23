import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { screen } from "@testing-library/react";
import userEvent, { type UserEvent } from "@testing-library/user-event";
import i18n from "../../lib/i18n";
import { MIN_FILL_TIME_MS } from "../../lib/contactSpam";
import { renderWithRouter } from "../../test/render";
import ContactForm from "./ContactForm";

const send = vi.hoisted(() => vi.fn());

vi.mock("@emailjs/browser", () => ({ default: { send } }));
vi.mock("canvas-confetti", () => ({ default: vi.fn() }));
vi.mock("../../lib/env", () => ({
  emailJsConfig: { serviceId: "service", templateId: "template", publicKey: "public-key" },
  missingEmailJsMessage: "",
}));

const t = i18n.getFixedT("pl");

/** Kontrolowany zegar: formularz mierzy czas od załadowania przez Date.now(). */
let now = 1_700_000_000_000;
const waitPastMinFillTime = () => {
  now += MIN_FILL_TIME_MS + 1000;
};

const field = (key: string) => screen.getByLabelText(t(key));
const optionalField = (key: string) => screen.getByLabelText(new RegExp(t(key)));
const topic = (id: string) => screen.getByRole("radio", { name: new RegExp(t(`contact:topics.${id}`)) });
const submit = () => screen.getByRole("button", { name: t("contact:btn_send") });
const honeypot = () => screen.getByLabelText(t("contact:form.honeypot"));

const fillBasics = async (user: UserEvent) => {
  await user.type(field("contact:full_name"), "Anna Nowak");
  await user.type(field("contact:email"), "anna@firma.pl");
  await user.type(field("contact:form.message"), "Dzień dobry, chciałabym zapytać o współpracę.");
  await user.click(screen.getByRole("checkbox"));
};

const fillProject = async (user: UserEvent) => {
  await user.selectOptions(field("contact:form.budget"), "5k-10k");
  await user.selectOptions(field("contact:form.deadline"), "1m");
};

const setup = (route = "/kontakt") => {
  const user = userEvent.setup();
  renderWithRouter(<ContactForm />, { route });
  return user;
};

beforeEach(() => {
  vi.spyOn(Date, "now").mockImplementation(() => now);
  send.mockReset().mockResolvedValue({ status: 200, text: "OK" });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("ContactForm — walidacja", () => {
  it("pusty formularz: pokazuje błędy wymaganych pól, fokus na pierwszym i nic nie wysyła", async () => {
    const user = setup();

    await user.click(submit());

    expect(field("contact:full_name")).toHaveAttribute("aria-invalid", "true");
    expect(field("contact:full_name")).toHaveFocus();
    expect(field("contact:email")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByText(t("contact:validation.topic"))).toBeInTheDocument();
    expect(screen.getByText(t("contact:validation.consent"))).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveTextContent(t("contact:validation.summary"));
    expect(send).not.toHaveBeenCalled();
  });

  it("błąd pola pojawia się dopiero po jego opuszczeniu", async () => {
    const user = setup();

    await user.type(field("contact:email"), "to-nie-email");
    expect(screen.queryByText(t("contact:validation.email"))).not.toBeInTheDocument();

    await user.tab();
    expect(field("contact:email")).toHaveAccessibleDescription(t("contact:validation.email"));
  });

  it("za krótka wiadomość → komunikat z minimalną długością", async () => {
    const user = setup();

    await user.type(field("contact:form.message"), "Za krótko");
    await user.tab();

    expect(screen.getByText(t("contact:validation.too_short", { min: 20 }))).toBeInTheDocument();
  });
});

describe("ContactForm — pola zależne od tematu", () => {
  it("bez tematu nie pokazuje pól projektu ani oferty pracy", () => {
    setup();

    expect(screen.queryByLabelText(t("contact:form.budget"))).not.toBeInTheDocument();
    expect(screen.queryByLabelText(t("contact:form.company"))).not.toBeInTheDocument();
  });

  it.each(["wideo", "web"])("temat „%s” pokazuje budżet, termin i link do materiałów", async (id) => {
    const user = setup();

    await user.click(topic(id));

    expect(field("contact:form.budget")).toBeInTheDocument();
    expect(field("contact:form.deadline")).toBeInTheDocument();
    expect(optionalField("contact:form.materials")).toBeInTheDocument();
    expect(screen.queryByLabelText(t("contact:form.company"))).not.toBeInTheDocument();
    expect(screen.getByTestId("location")).toHaveTextContent(`/kontakt?temat=${id}`);
  });

  it("temat „praca” pokazuje firmę, stanowisko i formę współpracy (wymagane)", async () => {
    const user = setup();

    await user.click(topic("praca"));
    await user.click(submit());

    expect(field("contact:form.company")).toHaveAttribute("aria-invalid", "true");
    expect(field("contact:form.position")).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("group", { name: t("contact:form.employment") })).toHaveAccessibleDescription(
      t("contact:validation.choose"),
    );
    expect(screen.queryByLabelText(t("contact:form.budget"))).not.toBeInTheDocument();
  });

  it("temat „inne” nie ma dodatkowych pól", async () => {
    const user = setup();

    await user.click(topic("praca"));
    await user.click(topic("inne"));

    expect(screen.queryByLabelText(t("contact:form.company"))).not.toBeInTheDocument();
    expect(screen.queryByLabelText(t("contact:form.budget"))).not.toBeInTheDocument();
  });

  it("temat z adresu ?temat=web jest zaznaczony od razu", () => {
    setup("/kontakt?temat=web");

    expect(topic("web")).toBeChecked();
    expect(field("contact:form.budget")).toBeInTheDocument();
  });

  it("niepoprawny link do materiałów blokuje wysyłkę", async () => {
    const user = setup("/kontakt?temat=wideo");

    await fillBasics(user);
    await fillProject(user);
    await user.type(optionalField("contact:form.materials"), "dysk-google");
    waitPastMinFillTime();
    await user.click(submit());

    expect(screen.getByText(t("contact:validation.url"))).toBeInTheDocument();
    expect(send).not.toHaveBeenCalled();
  });
});

describe("ContactForm — wysyłka i antyspam", () => {
  it("poprawny formularz wysyła zmienne szablonu EmailJS i pokazuje sukces", async () => {
    const user = setup("/kontakt?temat=web");

    await fillBasics(user);
    await fillProject(user);
    waitPastMinFillTime();
    await user.click(submit());

    expect(await screen.findByText(t("contact:state.success_title"))).toBeInTheDocument();
    expect(send).toHaveBeenCalledTimes(1);
    const [serviceId, templateId, params, options] = send.mock.calls[0] as [
      string,
      string,
      Record<string, string>,
      { publicKey: string },
    ];
    expect([serviceId, templateId, options.publicKey]).toEqual(["service", "template", "public-key"]);
    expect(params).toMatchObject({
      user_name: "Anna Nowak",
      user_email: "anna@firma.pl",
      topic: "web",
      user_subject: t("contact:topics.web"),
      budget: t("contact:form.budget_options.5k-10k"),
      deadline: t("contact:form.deadline_options.1m"),
      materials_link: "—",
      company: "—",
      consent: "Tak",
    });
  });

  it("wypełniony honeypot: udaje sukces, ale nic nie wysyła", async () => {
    const user = setup("/kontakt?temat=inne");

    await fillBasics(user);
    // Bot wypełnia każde pole z atrybutem name — także ukrytą pułapkę.
    await user.type(honeypot(), "https://spam.example");
    waitPastMinFillTime();
    await user.click(submit());

    expect(await screen.findByText(t("contact:state.success_title"))).toBeInTheDocument();
    expect(send).not.toHaveBeenCalled();
  });

  it("honeypot jest poza kolejnością Tab i ukryty przed czytnikami ekranu", () => {
    setup();

    expect(honeypot()).toHaveAttribute("tabindex", "-1");
    expect(honeypot().closest('[aria-hidden="true"]')).not.toBeNull();
  });

  it("wysyłka szybsza niż minimalny czas wypełnienia jest zatrzymana", async () => {
    const user = setup("/kontakt?temat=inne");

    await fillBasics(user);
    await user.click(submit());

    expect(screen.getByRole("alert")).toHaveTextContent(t("contact:state.too_fast"));
    expect(send).not.toHaveBeenCalled();
  });

  it("błąd EmailJS → komunikat z linkiem mailto jako fallback", async () => {
    send.mockRejectedValueOnce(new Error("network"));
    const user = setup("/kontakt?temat=inne");

    await fillBasics(user);
    waitPastMinFillTime();
    await user.click(submit());

    expect(await screen.findByText(t("contact:state.error_text"))).toBeInTheDocument();
    expect(screen.getByRole("link", { name: t("contact:state.mailto") }).getAttribute("href")).toMatch(/^mailto:/);
  });
});
