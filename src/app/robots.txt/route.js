export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.revel-tes-talents.com';

  const content = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml

Disallow: /_next/static/

`;

  return new Response(content.trim(), {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}

/*
  🔧 NOTE :
  - Ce fichier robots.txt autorise tout le site à l'exploration.
  - Le sitemap global contient déjà les pages localisées (ex: /fr/...).
  - Si d'autres langues sont ajoutées (ex: /en), le même sitemap pourra les inclure.
  - Google interprète correctement les structures i18n dans les sous-répertoires.
*/
