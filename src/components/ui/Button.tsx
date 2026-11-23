import type { ComponentPropsWithoutRef } from "react";
import { Link, type LinkProps } from "react-router-dom";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "./buttonStyles";

type StyleProps = { variant?: ButtonVariant; size?: ButtonSize };

type AnchorButtonProps = StyleProps & ComponentPropsWithoutRef<"a"> & { href: string; to?: never };
type LinkButtonProps = StyleProps & LinkProps & { href?: never };
type NativeButtonProps = StyleProps & ComponentPropsWithoutRef<"button"> & { href?: never; to?: never };

export type ButtonProps = AnchorButtonProps | LinkButtonProps | NativeButtonProps;

/**
 * Przycisk renderowany jako:
 * - `<a>` — gdy podano `href` (link zewnętrzny / plik),
 * - `<Link>` — gdy podano `to` (nawigacja w aplikacji),
 * - `<button>` — w pozostałych przypadkach.
 */
const Button = (props: ButtonProps) => {
  if (typeof props.href === "string") {
    const { variant, size, className, children, ...rest } = props;
    return (
      <a className={buttonClasses({ variant, size, className })} {...rest}>
        {children}
      </a>
    );
  }

  if ("to" in props && props.to !== undefined) {
    const { variant, size, className, ...rest } = props;
    return <Link className={buttonClasses({ variant, size, className })} {...rest} />;
  }

  const { variant, size, className, type = "button", ...rest } = props;
  return <button type={type} className={buttonClasses({ variant, size, className })} {...rest} />;
};

export default Button;
