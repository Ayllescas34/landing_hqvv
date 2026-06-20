import { withPayload } from '@payloadcms/next/withPayload'
import type { NextConfig } from 'next'
import path from 'path'

const securityHeaders = [
  // Prevents clickjacking — blocks embedding this site in iframes elsewhere
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Stops MIME type sniffing
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Controls referrer information sent with requests
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Restricts access to browser features not needed by a hotel site
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), payment=(), geolocation=(self)' },
  // Enables DNS prefetch for performance
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  // Forces HTTPS for 1 year once first visited (only active on HTTPS)
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
]

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local development
      { protocol: 'http', hostname: 'localhost' },
      // Vercel Blob storage (production media)
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
      // Catch-all for any other external HTTPS images (Google Maps, etc.)
      { protocol: 'https', hostname: '**' },
    ],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },

  webpack(config) {
    // Replace Monaco Editor with a textarea stub to fix the React 19 +
    // React Compiler crash in @payloadcms/ui@3.85.1 (useMonaco returns
    // null before init, destructuring crashes without a null check).
    config.resolve.alias['@monaco-editor/react'] = path.resolve(
      process.cwd(),
      'src/stubs/monaco-editor.tsx',
    )
    return config
  },
}

export default withPayload(nextConfig)
