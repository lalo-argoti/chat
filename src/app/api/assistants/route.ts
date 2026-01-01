import { NextResponse } from 'next/server';
import {
  getAllAssistants,
  createAssistant
} from '@/lib/storage';

export const runtime = 'nodejs';

/* ===== GET /api/assistants ===== */
export async function GET() {
  const assistants = getAllAssistants();
  return NextResponse.json(assistants);
}

/* ===== POST /api/assistants ===== */
export async function POST(req: Request) {
  const body = await req.json();
  const assistant = createAssistant(body);
  return NextResponse.json(assistant, { status: 201 });
}
