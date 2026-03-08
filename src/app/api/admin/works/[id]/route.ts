import { NextRequest, NextResponse } from 'next/server';
import { updateWork, deleteWork } from '@/lib/content';

// PATCH /api/admin/works/[id] - Update work
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const work = await updateWork(id, body);

    if (!work) {
      return NextResponse.json(
        { error: 'Failed to update work' },
        { status: 500 }
      );
    }

    return NextResponse.json(work);
  } catch (error) {
    console.error('Error in PATCH /api/admin/works/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to update work' },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/works/[id] - Delete work
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const success = await deleteWork(id);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete work' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in DELETE /api/admin/works/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to delete work' },
      { status: 500 }
    );
  }
}
