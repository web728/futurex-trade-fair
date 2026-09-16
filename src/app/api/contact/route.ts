import type { NextRequest } from 'next/server';
import { handleFormRequest } from '@/lib/submission';

export const runtime = 'nodejs';

export async function POST(request: NextRequest) {
  return handleFormRequest(request, 'contact');
}