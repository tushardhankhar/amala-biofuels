import { company, whatsappMessage } from "@/content/site";

const c = company.contact;

export const telHref = c.phone ? `tel:${c.phone.replace(/[^\d+]/g, "")}` : "";
export const mailHref = c.email ? `mailto:${c.email}` : "";
export const whatsappHref = (message = whatsappMessage) =>
  c.whatsapp ? `https://wa.me/${c.whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(message)}` : "";

export function WhatsAppIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.4ZM12 21.8c-1.8 0-3.5-.5-5-1.4l-.4-.2-3.7 1 1-3.6-.2-.4A9.8 9.8 0 1 1 12 21.8Zm8.4-18.2A11.8 11.8 0 0 0 1.8 17.9L.1 24l6.3-1.6A11.8 11.8 0 0 0 24 12c0-3.2-1.2-6.1-3.5-8.4Z" />
    </svg>
  );
}

/** Floating WhatsApp enquiry button. Renders only once a verified WhatsApp number is set. */
export function WhatsAppButton() {
  const href = whatsappHref();
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition-transform duration-300 hover:scale-105"
    >
      <WhatsAppIcon className="size-7" />
      <span className="sr-only">Enquire on WhatsApp (opens in a new tab)</span>
    </a>
  );
}
