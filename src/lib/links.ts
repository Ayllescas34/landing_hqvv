// Sections that used to live inline on Home (as `#anchor` targets) and are now
// dedicated pages. CMS-configured URLs (promo banner, teasers) may still hold
// the old anchor form, so it gets redirected to the real page instead of
// pointing at an element that no longer exists on Home.
const LEGACY_ANCHOR_REDIRECTS: Record<string, string> = {
  '#habitaciones': '/habitaciones',
  '#desayunos': '/desayunos',
}

export function resolveInternalLink(url: string): string {
  return LEGACY_ANCHOR_REDIRECTS[url] ?? url
}

export function isExternalUrl(url: string): boolean {
  return /^https?:\/\//i.test(url)
}
