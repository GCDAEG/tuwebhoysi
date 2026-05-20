import * as React from "react";

import { cn } from "@/lib/utils";

export type SectionProps = {
  children: React.ReactNode;
  fullHeight?: boolean;
  /** Ancla para navegación (#id) y scroll con offset del navbar. */
  id?: string;
  className?: string;
};

export function Section({
  children,
  fullHeight = false,
  id,
  className,
}: SectionProps) {
  return (
    <div
      id={id}
      className={cn(
        "w-full",
        fullHeight && "min-h-screen",
        "px-5 py-12 sm:px-6 sm:py-14 md:px-8 md:py-16 lg:px-10 lg:py-20 xl:px-12 xl:py-24",
        className,
      )}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </div>
  );
}
