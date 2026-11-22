import type { ComponentPropsWithoutRef } from "react";
import { Link, type LinkProps } from "react-router-dom";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const variants: Record<ButtonVariant, string> = {
  // Klasa .btn jest zdefiniowana w index.css.
  primary: "btn",
  secondary:
    "inline-block my-7 py-2 px-12 rounded-full border-2 border-main_accent text-main_accent font-extrabold hover:bg-main_accent hover:text-bg_color_1 transition-all duration-500 ease-in-out cursor-pointer",
  ghost: "cursor-pointer text-main_accent hover:drop-shadow-custom-glow transition-all",
};

type VariantProps = { variant?: ButtonVariant };

type AnchorButtonProps = VariantProps & ComponentPropsWithoutRef<"a"> & { href: string; to?: never };
type LinkButtonProps = VariantProps & LinkProps & { href?: never };
type NativeButtonProps = VariantProps &
  ComponentPropsWithoutRef<"button"> & { href?: never; to?: never };

export type ButtonProps = AnchorButtonProps | LinkButtonProps | NativeButtonProps;

const classesFor = (variant: ButtonVariant = "primary", className = "") =>
  `${className} ${variants[variant]}`.trim();

/**
 * Przycisk renderowany jako:
 * - `<a>` — gdy podano `href` (link zewnętrzny / plik),
 * - `<Link>` — gdy podano `to` (nawigacja w aplikacji),
 * - `<button>` — w pozostałych przypadkach.
 */
const Button = (props: ButtonProps) => {
  if (typeof props.href === "string") {
    const { variant, className, ...rest } = props as AnchorButtonProps;
    return <a className={classesFor(variant, className)} {...rest} />;
  }

  if ("to" in props && props.to !== undefined) {
    const { variant, className, ...rest } = props as LinkButtonProps;
    return <Link className={classesFor(variant, className as string | undefined)} {...rest} />;
  }

  const { variant, className, type = "button", ...rest } = props as NativeButtonProps;
  return <button type={type} className={classesFor(variant, className)} {...rest} />;
};

export default Button;
