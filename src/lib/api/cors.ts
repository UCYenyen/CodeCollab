import { NextResponse } from 'next/server'

/**
 * Default CORS headers for game API routes.
 * Unity WebGL runs in a browser context and is subject to CORS policy.
 *
 * TODO: In production, replace '*' with your deployed game's origin.
 */
export const corsHeaders: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
}

/**
 * Returns a JSON response with CORS headers attached.
 */
export function jsonResponse<T>(data: T, status = 200): NextResponse {
  return NextResponse.json(data, {
    status,
    headers: corsHeaders,
  })
}

/**
 * Returns a 204 No Content preflight response with CORS headers.
 */
export function optionsResponse(): NextResponse {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders,
  })
}
