import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendQuoteEmail } from '@/lib/resend'

const schema = z.object({
  serviceType: z.string().min(1),
  budget: z.string().min(1),
  timeline: z.string().min(1),
  projectName: z.string().min(1),
  description: z.string().min(1).max(500),
  currentStack: z.string().optional(),
  referenceUrls: z.string().optional(),
  name: z.string().min(1),
  email: z.email(),
  company: z.string().optional(),
  preferredLanguage: z.string().optional(),
  source: z.string().optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    await sendQuoteEmail(data)
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid data', details: err.errors }, { status: 400 })
    }
    console.error('Quote email error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
