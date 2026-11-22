import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

/** Wyśrodkowany kontener o szerokości zależnej od breakpointu. */
const Container = ({ className = "", children, ...props }: ContainerProps) => (
  <div className={`container mx-auto ${className}`} {...props}>
    {children}
  </div>
);

export default Container;
