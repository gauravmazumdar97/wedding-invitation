# Bengali Wedding Invitation

This build ships as a **finished sample preview** (Ananya Sengupta and Rohan Bose, Kolkata, January 2027) so you can judge the design. A small "Sample preview" badge sits on the page. Set `isSamplePreview` to `false` in `src/config/wedding.ts` when you replace the sample with your names, dates, and photographs.

A cinematic, personalized Bengali wedding invitation. One site. Many guest links. All wedding details live in a single config.

## Run locally

```bash
npm install
npm run dev
```

Open:

- Generic invite: `http://localhost:3000`
- Personalized: `http://localhost:3000/invite/guest001`
- Also works: `http://localhost:3000?guest=guest001`
- Admin: `http://localhost:3000/admin`

Default admin password: `shubho-bibaho`

Copy `.env.example` to `.env.local` and change `ADMIN_PASSWORD` before sharing the site.

## How to edit everything

### Names, date, city, monogram

Edit `src/config/wedding.ts`.

- Couple names: `couple.bride` and `couple.groom`
- Name order on the hero: `couple.nameOrder` (`groom-first` or `bride-first`)
- Monogram: `couple.monogram`
- Date/time: `date.iso`, `date.display`, `date.time`
- City: `location`

`date.iso` drives the countdown, calendar files, and the post-wedding message.

### Photographs

1. Drop files into `public/photos/`
2. Point the paths in `wedding.photos` and each event/venue `photograph` / `illustration`

Supported replacements: AVIF, WebP, JPG, PNG. Keep the same filenames or update the config paths.

Placeholder SVGs are labeled `[PHOTO_01]`, `[PHOTO_HERO]`, and so on until you replace them.

### Events

`wedding.events` is an ordered list.

- Set `enabled: false` to hide an event from everyone
- Reorder the array to change the journey
- Each event has English + Bengali names, date, time, venue id, dress code, copy, atmosphere, and map link

Guest-level visibility is separate: a guest only sees events listed in their `events` array.

### Venues and travel

- Venues: `wedding.venues`
- Hide travel for local-only guests by setting `travel.enabled` to `false`

### Bengali and English copy

Most phrases live on the same objects (`title` / `titleBn`, `text` / `textBn`). The site has an EN | বাংলা toggle. Guests can switch language without changing the link.

### Music

Put an MP3 at `public/music/ambiance.mp3` or change `wedding.music.src`.

Sound never starts until the guest taps **Open Invitation**. If the file is missing, the control simply will not play.

### Colors

Tokens are in `src/app/globals.css` under `@theme` (`--color-sindoor`, `--color-ivory`, `--color-gold`, and the rest). Atmosphere classes (`atmosphere-marigold`, `atmosphere-festive`, ...) tint each event chapter.

### Guests and personalized links

Edit `data/guests.json` or use `/admin`.

```json
{
  "guest001": {
    "guestId": "guest001",
    "guestName": "Mr. & Mrs. Sen",
    "familyName": "Sen Family",
    "greetingBn": "প্রিয় সেন পরিবার",
    "inviteText": "We would be delighted to celebrate with you",
    "inviteTextBn": "আপনাদের সঙ্গে এই আনন্দ ভাগ করে নিতে পারলে আমরা ধন্য",
    "allowedGuests": 4,
    "events": ["haldi", "wedding", "reception"],
    "relationship": "family"
  }
}
```

Share `/invite/guest001`. That guest sees only those events, and RSVP cannot exceed `allowedGuests`.

Sample guests already included:

- `guest001` - all events, party of 4
- `guest002` - sangeet, wedding, reception
- `guest003` - reception only

### RSVP storage

RSVPs are saved to `data/rsvps.json` through `/api/rsvp`. Guests can reopen the same link and edit their response.

This file store is simple to run locally. On serverless hosts the filesystem will not persist. Move the two store files in `src/lib/guest-store.ts` and `src/lib/rsvp-store.ts` to Supabase when you deploy.

### Admin

`/admin` is password-gated and disallowed in `robots.ts`.

You can view counts, filter by event, search, add/edit guests, copy invite links, copy WhatsApp text, read messages, and export CSV.

### WhatsApp preview

`src/app/opengraph-image.tsx` and `src/app/layout.tsx` metadata. Set `wedding.social.siteUrl` to your real domain before sending links.

### Calendar

Google Calendar and ICS both read from `wedding.date.iso` and the mandap venue address.
