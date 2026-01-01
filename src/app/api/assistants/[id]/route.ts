import { NextResponse } from 'next/server';
import { getAssistantById, updateAssistant, deleteAssistant } from '@/lib/storage';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const assistant = getAssistantById(params.id);

  if (!assistant) {
    return NextResponse.json(
      { error: 'Assistant not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(assistant, { status: 200 });
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const updated = updateAssistant(params.id, body);

  if (!updated) {
    return NextResponse.json(
      { error: 'Assistant not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(updated, { status: 200 });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  deleteAssistant(params.id);
  return NextResponse.json({ ok: true }, { status: 200 });
}
