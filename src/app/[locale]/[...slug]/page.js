//pwa-revel/src/app/[locale]/page.js
export async function generateMetadata({ params }) {
  const slugPath = params.slug ? params.slug.join("/") : "";
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3001';
  const locale = params.locale || 'fr'; // Sécurisation

  const pageSlug = slugPath ? `/${slugPath}` : '/';

  try {
    const seo = await getSeo(slugPath);

    const alternateLanguages = ['fr', 'en'].map(lang => ({
      hrefLang: lang,
      href: `${baseUrl}/${lang}${pageSlug}`
    }));

    return {
      title: seo?.title || "Revel Tes Talents | Coaching Professionnel",
      description: seo?.metaDesc || "",
      alternates: {
        canonical: `${baseUrl}/${locale}${pageSlug}`,
        languages: {
          'x-default': baseUrl,
          ...Object.fromEntries(alternateLanguages.map(({ hrefLang, href }) => [hrefLang, href]))
        }
      },
      openGraph: {
        title: seo?.opengraphTitle || seo?.title || "Revel Tes Talents | Coaching Professionnel",
        description: seo?.opengraphDescription || seo?.metaDesc || "",
        url: `${baseUrl}/${locale}${pageSlug}`,
        siteName: 'Revel Tes Talents',
        images: seo?.opengraphImage?.sourceUrl ? [{ url: seo.opengraphImage.sourceUrl }] : [],
        locale: locale,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: seo?.opengraphTitle || seo?.title || "Revel Tes Talents | Coaching Professionnel",
        description: seo?.opengraphDescription || seo?.metaDesc || "",
        images: seo?.opengraphImage?.sourceUrl ? [seo.opengraphImage.sourceUrl] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
      additionalMetaTags: [
        { name: 'googlebot', content: 'index, follow' },
        { name: 'robots', content: 'noarchive' },
      ],
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: "Revel Tes Talents | Coaching Professionnel",
      description: "",
    };
  }
}
