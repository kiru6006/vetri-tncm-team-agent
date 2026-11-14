import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, contact_id, field, timestamp } = body;

    console.info(
      `[AUDIT REVEAL] ${timestamp || new Date().toISOString()} | User: ${user_id || 'anonymous'} revealed ${field} of contact: ${contact_id}`
    );

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Audit reveal log error:', error);
    return new NextResponse(null, { status: 204 }); // Non-blocking audit
  }
}
