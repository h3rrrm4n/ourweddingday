# ourweddingday

Wedding invitation site for **Վահե & Մարիամ**, live at [ourweddingday.am](https://ourweddingday.am).

## What's included

- `index.html` — single-page invitation with video envelope intro, photo hero, and event details
- `assets/` — couple photos and envelope-opening video clips

## Deploy to server

The site is served by **nginx** on `173.249.16.78` at `/var/www/ourweddingday`.

```bash
export SSH_PRIVATE_KEY='...'   # or set SSH_KEY_FILE
./deploy.sh
```

Requirements: `rsync`, `ssh`, and passwordless SSH access to `herman@173.249.16.78`.
