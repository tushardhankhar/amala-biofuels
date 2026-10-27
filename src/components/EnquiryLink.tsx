"use client";

import type { EnquiryType } from "@/content/site";
import { ButtonLink } from "./Button";

export const ENQUIRY_EVENT = "amala:enquiry-type";

/** CTA that scrolls to the form and pre-selects the matching enquiry type. */
export function EnquiryLink({
  type,
  children,
  variant,
  className,
}: {
  type?: EnquiryType;
  children: React.ReactNode;
  variant?: Parameters<typeof ButtonLink>[0]["variant"];
  className?: string;
}) {
  return (
    <ButtonLink
      href="#contact"
      variant={variant}
      className={className}
      onClick={() => type && window.dispatchEvent(new CustomEvent(ENQUIRY_EVENT, { detail: type }))}
    >
      {children}
    </ButtonLink>
  );
}
