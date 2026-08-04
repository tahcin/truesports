/**
 * Enquiry form endpoint. Validates the submission and forwards it to the
 * Google Apps Script web app bound to the client's enquiries spreadsheet,
 * which appends it as a row. See 06-build/google-sheet-webhook/README.md
 * for the one-time deploy steps that produce SHEET_WEBHOOK_URL.
 *
 * The webhook URL stays server-side in an env var: calling Apps Script from
 * the browser would expose it to spam bots and fight CORS for no benefit.
 */

type Enquiry = {
  name: string
  phone: string
  email: string
  program: string
  message: string
}

function parseEnquiry(body: unknown): Enquiry | null {
  if (typeof body !== 'object' || body === null) return null
  const b = body as Record<string, unknown>
  const str = (v: unknown, max: number) => (typeof v === 'string' ? v.trim().slice(0, max) : '')

  const enquiry: Enquiry = {
    name: str(b.name, 200),
    phone: str(b.phone, 40),
    email: str(b.email, 200),
    program: str(b.program, 120),
    message: str(b.message, 2000),
  }
  // Name and phone are the form's two required fields.
  if (!enquiry.name || !enquiry.phone) return null
  return enquiry
}

export async function POST(request: Request) {
  const webhookUrl = process.env.SHEET_WEBHOOK_URL
  if (!webhookUrl) {
    return Response.json({ ok: false, error: 'not-configured' }, { status: 503 })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ ok: false, error: 'invalid-json' }, { status: 400 })
  }

  const enquiry = parseEnquiry(body)
  if (!enquiry) {
    return Response.json({ ok: false, error: 'missing-fields' }, { status: 400 })
  }

  try {
    // text/plain keeps Apps Script happy: it hands the raw body to doPost
    // without a preflight-triggering content type.
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(enquiry),
    })
    if (!res.ok) throw new Error(`webhook responded ${res.status}`)
  } catch {
    return Response.json({ ok: false, error: 'sheet-unreachable' }, { status: 502 })
  }

  return Response.json({ ok: true })
}
