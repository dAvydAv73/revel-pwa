export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.revel-tes-talents.com';

  // Récupère toutes les pages WordPress
  const response = await fetch('https://headless-revel.davydav.com/wp-json/wp/v2/pages?per_page=100');
  const pages = await response.json();

  // Sépare la home (slug 'home') des autres
  const homePage = pages.find(page => page.slug === 'home');
  const otherPages = pages.filter(page => !['home', 'accueil'].includes(page.slug)); // on ignore aussi /accueil

  const urls = [];

  // 🔹 1. Ajoute la home explicitement
  if (homePage) {
    urls.push(`
      <url>
        <loc>${baseUrl}/fr</loc>
        <lastmod>${new Date(homePage.modified_gmt).toISOString()}</lastmod>
      </url>
    `);
  }

  // 🔹 2. Ajoute les autres pages normalement
  otherPages.forEach(page => {
    urls.push(`
      <url>
        <loc>${baseUrl}/fr/${page.slug}</loc>
        <lastmod>${new Date(page.modified_gmt).toISOString()}</lastmod>
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
