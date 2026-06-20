/* eslint-disable @typescript-eslint/no-explicit-any */
import { REST_DELETE, REST_GET, REST_PATCH, REST_POST } from '@payloadcms/next/routes'
import config from '@payload-config'
import type { SanitizedConfig } from 'payload'

// Extend Vercel function timeout for uploads and complex admin operations
export const maxDuration = 30

const c = config as unknown as Promise<SanitizedConfig>

export const GET = REST_GET(c)
export const POST = REST_POST(c)
export const DELETE = REST_DELETE(c)
export const PATCH = REST_PATCH(c)
