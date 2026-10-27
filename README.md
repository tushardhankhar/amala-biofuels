# Amala Biofuels Private Limited — Corporate Website

Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS 4 · Motion for React · Lucide.

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000 — review markers visible
npm run build && npm start   # production — review markers hidden
```

## Where things live

| What | Where |
|---|---|
| All copy, company facts, capabilities, projects | `src/content/site.ts` |
| Photography (+ licence credits) | `src/content/photos.ts`, files in `src/assets/photos/` |
| Design tokens (colours, fonts, motion) | `src/app/globals.css` (`@theme`) |
| Sections | `src/components/*.tsx` (one per section) |
| Enquiry API | `src/app/api/enquiry/route.ts` |
| SEO | `src/app/layout.tsx`, `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, JSON-LD in `page.tsx` |

## Content verification

Every content block in `site.ts` has a `status` of `verified`, `draft` or `missing`.

- Review markers ("Draft copy · awaiting company approval") appear **only** when `NEXT_PUBLIC_SHOW_CONTENT_FLAGS=true`. Use this on a staging deploy for client sign-off. They are off in production and in normal local dev.
- The verified-projects gallery renders automatically once `projects[]` has entries. Until then the section shows the capabilities matrix and an enquiry panel, with no placeholder cards.
- Contact rows (email, phone, street address) appear only once filled in. The legal pages' "Last updated" line appears only once a date is set.

## Photography

The current images are openly licensed photographs of real industrial and biofuel facilities, mostly public domain (Library of Congress / Carol M. Highsmith) plus one CC BY 2.0 image. They were sourced from Wikimedia Commons, then cropped and colour-graded, and one third-party railcar marking was blurred out. **They do not depict Amala sites.** They're never captioned as Amala's, and `/credits` lists their sources and licences. Replace each one with approved company photography by dropping a file into `src/assets/photos/` and updating its entry in `photos.ts` (keep the key and update or remove its `credit`). Hero video support is in `Hero.tsx` (`heroVideo`).

Nothing on the site states production capacity, certifications, clients, operational sites, financial returns or emissions figures. Add these only with written company approval.

### Pre-launch checklist

- [ ] Company approves all draft copy (hero, about, capabilities, process, why, sustainability) → set `status: "verified"`
- [ ] Confirm which capability scope items are actually offered; remove the rest
- [ ] Registered address, business email, phone → `company.contact`, set `status: "verified"` (these then appear in the contact section, footer and JSON-LD)
- [ ] Approved logo → `/public/media`, set `company.logo`
- [ ] Replace representative photography with approved Amala photography (see above); optional hero loop via `heroVideo`
- [ ] Year of incorporation → `company.established` (optional)
- [ ] Confirmed projects → `projects[]` (name, location, type, status, scope, specs)
- [ ] Privacy Policy and Terms reviewed by legal counsel; set `updated="…"` on each page
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain (used for canonicals, sitemap, OG, JSON-LD)
- [ ] Enquiry email configured and a test submission received

## Enquiry form

- Uses the same validation in the browser and on the server (`src/lib/enquiry-schema.ts`).
- Delivery goes through [Resend](https://resend.com) (`RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` on a verified domain, `ENQUIRY_TO_EMAIL`). `ENQUIRY_WEBHOOK_URL` can also forward each enquiry as JSON to a CRM (HubSpot, Zoho, Zapier and similar).
- **The form never reports success unless the email provider accepts the message.** While the email settings are missing, the API returns 503 and the form shows an error.
- Spam protection: a honeypot field, a minimum fill time and a per-IP rate limit. On multi-instance hosting, add a shared rate-limit store or a WAF rule, or add Cloudflare Turnstile if spam continues.
- A privacy consent checkbox is required.
- Each capability CTA scrolls to the form and pre-selects the matching enquiry type.

## Motion & accessibility

- The hero reveal is pure CSS, so the headline and CTAs don't wait for JavaScript. Scroll reveals use Motion (`LazyMotion` + `domAnimation`).
- `prefers-reduced-motion` turns off reveals, the flow-line pulses and smooth scrolling. With JavaScript disabled, all content is visible through a `<noscript>` override.
- Includes a skip link, an accessible mobile menu (Escape closes it, focus returns, scroll locks), labelled form controls, error messages linked with `aria-describedby`, and focus moved to the first invalid field.

Lighthouse (mobile, local production build, full-photo hero): Performance 94 · Accessibility 100 · Best Practices 100 · SEO 100, CLS 0.

## Brand note

The palette and typefaces follow the project brief (forest/charcoal/ivory/gold, Space Grotesk + Inter). They differ from the Viamedia.ai house style (Poppins/Raleway, purple/yellow/navy). To switch, change the tokens in `globals.css` and the fonts in `layout.tsx`. No component needs to change.
