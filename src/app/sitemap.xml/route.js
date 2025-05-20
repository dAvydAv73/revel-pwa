export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';

  // 1. Récupère les pages WordPress via REST API
  const response = await fetch('https://headless-revel.davydav.com/wp-json/wp/v2/pages?per_page=100');
  const pages = await response.json();

  const urls = [];

  // 2. Force l’ajout de la page d’accueil manuellement dans le sitemap
  const home = pages.find(p => p.slug === 'home');

  if (home) {
    urls.push(`
      <url>
        <loc>${baseUrl}/fr</loc>
        <lastmod>${new Date(home.modified_gmt).toISOString()}</lastmod>
      </url>
    `);
  } else {
    // fallback si la page home n'est pas trouvée (utile en dev/local)
    urls.push(`
      <url>
        <loc>${baseUrl}/fr</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
    `);
  } 

  // 3. Ajouter toutes les autres pages sauf "home" et "accueil"
  pages
    .filter(page => !['home', 'accueil'].includes(page.slug))
    .forEach(page => {
      urls.push(`
        <url>
          <loc>${baseUrl}/fr/${page.slug}</loc>
          <lastmod>${new Date(page.modified_gmt).toISOString()}</lastmod>
        </url>
      `);
    });

  // 4. Structure finale
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

/*
  🔧 NOTE :
  - La page d’accueil /fr est ajoutée manuellement si le slug 'home' n'est pas présent.
  - Les pages 'home' et 'accueil' sont filtrées pour éviter tout duplicate.
  - À tester sur l’environnement local ET en prod.
*/
