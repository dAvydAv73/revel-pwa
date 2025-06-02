//pwa-revel/src/app/[...slug]/page.js
import { BlockRenderer } from "../../../components/BlockRenderer";
import { getPage } from "../../../utils/getPage";
import { getSeo } from "../../../utils/getSeo";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }) {
  const rawSlug = params?.slug?.join("/") || "";

  if (rawSlug === "accueil") {
    redirect("/");
  }

  const slugPath = `/${rawSlug}`;
  const data = await getPage(slugPath);

  if (!data) {
    notFound();
  }

  return <BlockRenderer blocks={data} />;
}

export async function generateMetadata({ params }) {
  const rawSlug = params?.slug?.join("/") || "";
  const cleanedSlug = rawSlug.replace(/^fr\/?/, ""); // supprime "fr/" ou "fr"
  const slugPath = cleanedSlug === "" ? "/" : `/${cleanedSlug}`;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3001";

  try {
    const seo = await getSeo(slugPath);

    return {
      title: seo?.title || "Revel Tes Talents | Coaching Professionnel",
      description: seo?.metaDesc || "",
      alternates: {
        canonical: `${baseUrl}${slugPath}`,
        languages: {
          fr: `${baseUrl}${slugPath}`,
          "x-default": `${baseUrl}${slugPath}`,
        },
      },
      openGraph: {
        title: seo?.opengraphTitle || seo?.title,
        description: seo?.opengraphDescription || seo?.metaDesc,
        url: `${baseUrl}${slugPath}`,
        siteName: "Revel Tes Talents",
        images: seo?.opengraphImage?.sourceUrl
          ? [{ url: seo.opengraphImage.sourceUrl }]
          : [],
        locale: "fr",
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: seo?.opengraphTitle || seo?.title,
        description: seo?.opengraphDescription || seo?.metaDesc,
        images: seo?.opengraphImage?.sourceUrl
          ? [seo.opengraphImage.sourceUrl]
          : [],
      },
      robots: {
        index: true,
        follow: true,
      },
      additionalMetaTags: [
        { name: "googlebot", content: "index, follow" },
        { name: "robots", content: "noarchive" },
      ],
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Revel Tes Talents | Coaching Professionnel",
      description: "",
    };
  }
}
