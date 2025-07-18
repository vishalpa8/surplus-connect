import { NextResponse } from 'next/server';
import { createServer } from '@/lib/supabase/server';

export async function POST(request: Request) {
  const { name, email, message } = await request.json();

  if (!name || !email || !message) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const supabase = await createServer();
  const { error } = await supabase
    .from('contact_messages')
    .insert({ name, email, message });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
