import type { ComponentPropsWithoutRef } from "react";

type ContainerProps = ComponentPropsWithoutRef<"div">;

/** Wyśrodkowany kontener o maksymalnej szerokości treści i bocznych marginesach. */
const Container = ({ className = "", children, ...props }: ContainerProps) => (
  <div className={`mx-auto w-full max-w-6xl px-5 sm:px-6 lg:px-8 ${className}`} {...props}>
    {children}
  </div>
);

export default Container;
