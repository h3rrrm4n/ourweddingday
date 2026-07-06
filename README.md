# ourweddingday

Wedding invitation site for **Վահե & Մարիամ**, live at [ourweddingday.am](https://ourweddingday.am).

## What's included

- `index.html` — single-page invitation with video envelope intro, photo hero, and event details
- `assets/` — couple photos, envelope-opening video clips, and `wedding-music.mp3` (background music)

## Background music

The site plays `assets/wedding-music.mp3` when a guest taps the envelope seal (required for iOS autoplay). A ♫ button in the bottom-right lets guests pause or resume.

**You cannot use a YouTube link directly** — mobile browsers block autoplay from YouTube and it won't loop cleanly.

To add *Alex Warren – Ordinary* (or any song):

1. Obtain an **MP3 legally** (iTunes, Amazon Music, or a file you own the rights to use on your wedding site).
2. Save it as `assets/wedding-music.mp3`.
3. Deploy with `./deploy.sh` or upload to the server at `/var/www/ourweddingday/assets/wedding-music.mp3`.

## Deploy to server

The site is served by **nginx** on `173.249.16.78` at `/var/www/ourweddingday`.

```bash
export SSH_PRIVATE_KEY='...'   # or set SSH_KEY_FILE
./deploy.sh
```

Requirements: `rsync`, `ssh`, and passwordless SSH access to `herman@173.249.16.78`.
