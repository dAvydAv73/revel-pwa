import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <div
      className="flex items-left flex-col h-[70vh] md:h-[90vh] lg:h-screen homeCover cover-container min-h-[400px] max-h-[900px] pb-20 relative"
      style={{
        backgroundImage:
          "url('https://headless-revel.davydav.com/app/uploads/2025/03/DSCF8069-e1744663861134.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "linear-gradient(45deg, rgba(21,21,21,0.8), rgba(200,200,200,0.2))"
      }}></div>

      <div className="relative z-10 child-container">
        <div className="py-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-center items-center">
            <div
              className="px-2 py-5 column self-center"
              style={{ opacity: 1, transition: "0.5s ease-in", minWidth: "66.66%", flexGrow: 1 }}
            >
              <div className="hero-anim-container">
                <h2 className="hero-anim-title font-lemonmilk font-medium text-3xl text-white">
                  {t("title")}
                </h2>
              </div>

              <p className="text-white mt-6 text-lg">
                {t("description")}
              </p>

              <div className="mt-6">
                <Link
                  href="/"
                  className="btninvert neutra-light"
                >
                  {t("cta")}
                </Link>
              </div>
            </div>

            <div
              className="px-2 py-5 column"
              style={{ opacity: 1, transition: "0.5s ease-in 0.3s", minWidth: "33.33%", flexGrow: 1 }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
/*
  🔧 NOTE POUR PLUS TARD :
  Cette page 404 est statique pour l’instant.
  Tu peux la rendre dynamique en créant une page "404" dans WordPress
  (slug : '404' ou 'not-found'), puis en utilisant `getPage('404')`
  pour récupérer son contenu via l’API headless WP.

  Exemple :
    const data = await getPage('404');
    return <BlockRenderer blocks={data} />;
*/