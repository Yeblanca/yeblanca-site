import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const TO = 'yp@yeblanca.com'
const FROM = 'yeblanca <noreply@yeblanca.com>'

export interface QuoteFormData {
  serviceType: string
  budget: string
  timeline: string
  projectName: string
  description: string
  currentStack?: string
  referenceUrls?: string
  name: string
  email: string
  company?: string
  preferredLanguage: string
  source: string
}

export interface ContactFormData {
  name: string
  email: string
  message: string
  preferredLanguage?: string
}

export async function sendQuoteEmail(data: QuoteFormData) {
  const subject = `New quote request: ${data.projectName || data.serviceType}`

  const html = `
    <h2>New Quote Request — yeblanca.com</h2>
    <table style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%">
      <tr><td style="padding:8px;font-weight:bold;width:200px">Service type</td><td style="padding:8px">${data.serviceType}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Budget</td><td style="padding:8px">${data.budget}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Timeline</td><td style="padding:8px">${data.timeline}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Project name</td><td style="padding:8px">${data.projectName}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Description</td><td style="padding:8px">${data.description}</td></tr>
      ${data.currentStack ? `<tr><td style="padding:8px;font-weight:bold">Current stack</td><td style="padding:8px">${data.currentStack}</td></tr>` : ''}
      ${data.referenceUrls ? `<tr><td style="padding:8px;font-weight:bold">References</td><td style="padding:8px">${data.referenceUrls}</td></tr>` : ''}
      <tr><td style="padding:8px;font-weight:bold">Contact name</td><td style="padding:8px">${data.name}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px">${data.email}</td></tr>
      ${data.company ? `<tr><td style="padding:8px;font-weight:bold">Company</td><td style="padding:8px">${data.company}</td></tr>` : ''}
      <tr><td style="padding:8px;font-weight:bold">Preferred language</td><td style="padding:8px">${data.preferredLanguage}</td></tr>
      <tr><td style="padding:8px;font-weight:bold">Found via</td><td style="padding:8px">${data.source}</td></tr>
    </table>
  `

  return resend.emails.send({ from: FROM, to: TO, subject, html })
}

export async function sendContactEmail(data: ContactFormData) {
  const subject = `Contact form: ${data.name}`

  const html = `
    <h2>Contact Form — yeblanca.com</h2>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Preferred language:</strong> ${data.preferredLanguage || 'Not specified'}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${data.message}</p>
  `

  return resend.emails.send({ from: FROM, to: TO, subject, html })
}
