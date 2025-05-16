export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.revel-tes-talents.com';

  // API call to WordPress REST to fetch pages
  const response = await fetch('https://headless-revel.davydav.com/wp-json/wp/v2/pages?per_page=100');
  const pages = await response.json();

  const urls = pages.map(page => `
    <url>
      <loc>${baseUrl}/fr${page.slug === 'home' ? '' : '/' + page.slug}</loc>
      <lastmod>${new Date(page.modified_gmt).toISOString()}</lastmod>
      <!-- 
        Multilingual management:
        If more languages are added in the future, include <xhtml:link hreflang="..." /> tags here.
        Example:
        <xhtml:link rel="alternate" hreflang="fr" href="${baseUrl}/fr/${page.slug}" />
        <xhtml:link rel="alternate" hreflang="en" href="${baseUrl}/en/${page.slug}" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${baseUrl}/fr/${page.slug}" />
      -->
    </url>
  `);

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${urls.join('')}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      // Cache for 24 hours, both browser and CDN/proxies
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
