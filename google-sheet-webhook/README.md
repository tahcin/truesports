# Connect the enquiry form to a Google Sheet

The website can't write to a Google Sheet directly (writes need OAuth even on
a publicly editable sheet), so the sheet carries a tiny Apps Script web app
that accepts the form's data and appends a row. One-time setup, about ten
minutes. The full walkthrough with screenshots-level detail is in
`HANDOVER.pdf` at the repository root (Section 03); this is the short version.

## 1. Add the script to your spreadsheet

1. Create (or open) the enquiries spreadsheet with the account that should
   own the leads
2. **Extensions → Apps Script**
3. Delete whatever is in the editor and paste the contents of `Code.gs`
   (this folder)
4. Save (Ctrl+S)

## 2. Deploy it as a web app

1. Top right: **Deploy → New deployment**
2. Click the gear next to "Select type" → **Web app**
3. Settings:
   - Description: `enquiry webhook` (anything)
   - Execute as: **Me**
   - Who has access: **Anyone**  ← required, this is what lets the site POST
4. **Deploy**, approve the permissions prompt (it warns because the script
   is unverified; it's your own script)
5. Copy the **Web app URL** (ends in `/exec`)

## 3. Give the site the URL

Locally: create `.env.local` at the repository root containing

```
SHEET_WEBHOOK_URL=https://script.google.com/macros/s/…/exec
```

In production (Vercel): add the same `SHEET_WEBHOOK_URL` environment variable
in Project → Settings → Environment Variables, then redeploy.

Restart the dev server after adding the env var.

## Notes

- Submissions land in a tab named **Enquiries** (created automatically, with
  a frozen header row): Timestamp · Name · Phone · Email · Program · Message.
- If you ever edit `Code.gs`, you must create a **new deployment version**
  (Deploy → Manage deployments → edit → new version), saving alone doesn't
  update the live URL.
- The sheet does NOT need to be link-shared for this to work; the script
  runs as the sheet owner. Keep the sheet private.
- If the webhook is down or the env var is missing, the site's form falls
  back to handing the enquiry off to WhatsApp, so nothing is lost.
