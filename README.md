# Amala Biofuels Private Limited — Corporate Website

Next.js 16 (App Router, static generation) · React 19 · TypeScript · Tailwind CSS 4 · Motion for React · Lucide.

```bash
npm install
cp .env.example .env.local   # fill in values
npm run dev                  # http://localhost:3000
npm run build && npm start   # production
```

Built from the company's *Website Design & Content Brief*. It has six pages in the brief's order: Home, About Us, Products, Industries We Serve, Why Choose Us and Contact Us. There are also Privacy, Terms and Image Credits pages.

## Where things live

| What | Where |
|---|---|
| All copy and company facts (products, industries, addresses, capacity) | `src/content/site.ts` |
| Logo (cut from the supplied artwork: colour, reverse, mark, wordmark) | `src/assets/brand/`, `public/brand/`, `src/components/Logo.tsx` |
| Photography and licence credits | `src/content/photos.ts`, files in `src/assets/photos/` |
| Brand tokens (sampled from the logo: forest #02462D, flame #F78330, leaf #758D2D, ivory, charcoal) | `src/app/globals.css` (`@theme`) |
| Pages | `src/app/{about,products,industries,why-choose-us,contact}/page.tsx` |
| Shared sections (page hero, cards, CTA band) | `src/components/blocks.tsx` |
| Quote API | `src/app/api/enquiry/route.ts` |

## Phone, email and WhatsApp

Set `company.contact.phone`, `email` and `whatsapp` in `site.ts`. Until then they are hidden: there are no placeholder numbers. Once set, these appear automatically:
- click-to-call (header, contact page, footer)
- a mailto link
- WhatsApp links with a prefilled enquiry message, a floating WhatsApp button and a WhatsApp button in the CTA bands

## Photography

The current images are openly licensed photographs (public domain or CC0, plus one CC BY image), sourced from Wikimedia Commons, cropped and colour-graded. **They do not show the Amala Biofuels plant, products or people.** They're never captioned as Amala's, and `/credits` lists their sources. The brief asks for real plant, equipment, product, laboratory, feedstock, dispatch and team photos. To swap one in, drop the file into `src/assets/photos/` and update its entry in `photos.ts`.

## Must be confirmed by Amala Biofuels before going live (from the brief)

- [ ] The basis of the **10 tonnes per day** figure (installed, rated, combined processing or actual operating). It's shown as a "stated combined production and processing capacity".
- [ ] Which products are currently manufactured, processed, marketed or supplied (the `products` list in `site.ts`).
- [ ] Product grades and specifications before any data sheets are published. No product is labelled automotive-grade.
- [ ] Registered office and plant addresses, plus map pins. The site currently uses the addresses from the brief, with Google Maps search links.
- [ ] Business phone, email and WhatsApp number.
- [ ] Permission for any director or team names, photographs, customer logos, testimonials or case studies (none are used).
- [ ] Regulatory, environmental, safety and marketing review of product descriptions.
- [ ] Privacy Policy and Terms reviewed by legal counsel; set `updated="…"` on each page.
- [ ] `NEXT_PUBLIC_SITE_URL` set to the real domain.
- [ ] Email delivery configured and a test quote request received.
- [ ] Analytics or Search Console, if the owner approves and provides access.

## Enquiry form

- Uses the same validation in the browser and on the server (`src/lib/enquiry-schema.ts`).
- Delivery goes through [Resend](https://resend.com) (`RESEND_API_KEY`, `ENQUIRY_FROM_EMAIL` on a verified domain, `ENQUIRY_TO_EMAIL`). `ENQUIRY_WEBHOOK_URL` can also forward each enquiry as JSON to a CRM (HubSpot, Zoho, Zapier and similar).
- **The form never reports success unless the email provider accepts the message.** While the email settings are missing, the API returns 503 and the form shows an error.
- Spam protection: a honeypot field, a minimum fill time and a per-IP rate limit. On multi-instance hosting, add a shared rate-limit store or a WAF rule, or add Cloudflare Turnstile if spam continues.
- Fields: name, company, phone, email, product, industry or application, quantity, delivery location and additional requirements. A privacy consent checkbox is required.
- Product and industry links open `/contact?product=…` or `?industry=…` with that option already selected.
- The success message (exact wording from the brief) is shown only after the email provider accepts the enquiry.

## Motion & accessibility

- The hero reveal is pure CSS, so the headline and CTAs don't wait for JavaScript. Scroll reveals use Motion (`LazyMotion` + `domAnimation`).
- `prefers-reduced-motion` turns off reveals, the flow-line pulses and smooth scrolling. With JavaScript disabled, all content is visible through a `<noscript>` override.
- Includes a skip link, an accessible mobile menu (Escape closes it, focus returns, scroll locks), labelled form controls, error messages linked with `aria-describedby`, and focus moved to the first invalid field.

## Brand note

The palette and typography follow the Amala Biofuels brief and logo: green dominant, orange as a restrained accent, Manrope headings and Inter body text. The logo artwork is used as supplied. The header and footer place the original mark beside the original wordmark, and the footer uses a reversed (ivory) wordmark on dark green.
