import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { sendWaitlistEmail } from '@/lib/resend'

const schema = z.object({
  email: z.string().email(),
  businessName: z.string().optional(),
  businessType: z.string().min(1),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = schema.parse(body)
    await sendWaitlistEmail(data)
    return NextResponse.json({ success: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid data', details: err.issues },
        { status: 400 },
      )
    }
    console.error('Waitlist email error:', err)
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
