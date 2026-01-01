import { NextResponse } from 'next/server';
import {
  getAssistantById,
  updateAssistant,
  deleteAssistant
} from '@/lib/storage';

/* ===== GET ===== */
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const assistant = getAssistantById(id);

  if (!assistant) {
    return NextResponse.json(
      { error: 'Assistant not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(assistant);
}

/* ===== PUT ===== */
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();

  const updated = updateAssistant(id, body);

  if (!updated) {
    return NextResponse.json(
      { error: 'Assistant not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(updated);
}

/* ===== DELETE ===== */
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const ok = deleteAssistant(id);

  if (!ok) {
    return NextResponse.json(
      { error: 'Assistant not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({ ok: true });
}
