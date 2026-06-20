import React from 'react'

/**
 * Minimal root layout — each route group ((frontend) and (payload))
 * provides its own complete html/body layout. Next.js requires this file
 * to exist at the root, but with route groups it acts as a pass-through.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children as React.ReactElement
}
