//pwa-revel/src/app/page.js
import { BlockRenderer } from "../../components/BlockRenderer";
import { notFound } from "next/navigation";
import { getPage } from "../../utils/getPage";
import { getSeo } from "../../utils/getSeo";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function Home() {
  const slug = '/'; // Home = racine
  const data = await getPage(slug);

  console.log('getPage / →', data);

  if (!data || !Array.isArray(data)) {
    console.warn('[HOME] Page not found for slug "/"');
    notFound();
  }

  return <BlockRenderer blocks={data} />;
}

export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
  const slug = '/';


  try {
    const seo = await getSeo(slug);

    return {
      title: seo?.title || "Revel Tes Talents | Coaching Professionnel",
      description: seo?.metaDesc || "",
      alternates: {
        canonical: `${baseUrl}/`,
        languages: {
          'fr': `${baseUrl}/`,
          'x-default': `${baseUrl}/`,
        }
      },
      openGraph: {
        title: seo?.opengraphTitle || seo?.title,
        description: seo?.opengraphDescription || seo?.metaDesc,
        url: `${baseUrl}/`,
        siteName: 'Revel Tes Talents',
        images: seo?.opengraphImage?.sourceUrl ? [{ url: seo.opengraphImage.sourceUrl }] : [],
        locale: 'fr',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.opengraphTitle || seo?.title,
        description: seo?.opengraphDescription || seo?.metaDesc,
        images: seo?.opengraphImage?.sourceUrl ? [seo.opengraphImage.sourceUrl] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
      additionalMetaTags: [
        { name: 'googlebot', content: 'index, follow' },
        { name: 'robots', content: 'noarchive' },
      ]
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Revel Tes Talents | Coaching Professionnel",
      description: "",
    };
  }
}
