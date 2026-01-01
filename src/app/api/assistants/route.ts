import { NextRequest, NextResponse } from 'next/server';

let assistants = [];

export async function GET() {
  return NextResponse.json(assistants);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  data.id = String(Date.now());
  assistants.push(data);
  return NextResponse.json(data, { status: 201 });
}
