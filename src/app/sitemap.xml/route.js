//pwa-revel/src/app/sitemap.xml/route.js
/*
TODO: remplacer le call à l'url en dur par la varaible en provenancen du .env
WP_HOME='https://headless-revel.davydav.com'
*/
export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

  const response = await fetch('https://headless-revel.davydav.com/wp-json/wp/v2/pages?per_page=100');
  const pages = await response.json();

  const urls = [];

  const home = pages.find(p => p.slug === 'accueil');
  if (home) {
    urls.push(`
      <url>
        <loc>${baseUrl}/</loc>
        <lastmod>${new Date(home.modified_gmt).toISOString()}</lastmod>
      </url>
    `);
  }

  pages
    .filter(page => page.slug !== 'accueil' && !page.slug.startsWith('fr/'))
    .forEach(page => {
      urls.push(`
        <url>
          <loc>${baseUrl}/${page.slug}</loc>
          <lastmod>${new Date(page.modified_gmt).toISOString()}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>1</priority>
        </url>
      `);
    });

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  ${urls.join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=86400, stale-while-revalidate=3600',
    },
  });
}
