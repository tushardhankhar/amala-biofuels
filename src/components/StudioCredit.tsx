import { ArrowUpRight } from "lucide-react";

const studioUrl = "https://studio.tushardhankhar.com";

function StudioMark() {
  return (
    <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-[#1d3b33] ring-1 ring-ivory/10 sm:size-10">
      <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
        <path d="M5.5 5h13v2.8h-5.1V15h-2.8V7.8H5.5Z" fill="#F5F4EF" />
        <path d="M12 16.9l1.5 1.5-1.5 1.5-1.5-1.5Z" fill="#C8A66A" />
      </svg>
    </span>
  );
}

export function StudioCredit() {
  return (
    <a
      href={studioUrl}
      target="_blank"
      rel="noopener"
      className="group flex w-full items-center gap-2.5 sm:inline-flex sm:w-auto rounded-full border border-ivory/12 bg-ivory/[0.025] py-1.5 pl-1.5 pr-4 transition-colors duration-300 hover:border-ivory/25 hover:bg-ivory/[0.05] sm:gap-4 sm:pr-5"
    >
      <StudioMark />
      <span className="whitespace-nowrap text-[clamp(11px,3.3vw,12.5px)] text-ivory/65 sm:text-sm">
        Built and managed by <span className="font-display font-bold text-ivory">Studio</span>{" "}
        <span className="font-serif text-[1.18em] italic text-[#E3D3AE]">by Tushar</span>
        <span className="sr-only"> (opens in a new tab)</span>
      </span>
      <ArrowUpRight
        className="ml-auto size-4 shrink-0 text-ivory/50 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#C8A66A]"
        aria-hidden
      />
    </a>
  );
}
