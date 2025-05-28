"use client";
import Image from "next/image";
import LogoIconWhite from "../../public/img/logo-revel-white.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import Reviews from "../Reviews";
import { useLocale } from "next-intl";

export const Footer = ({ items = [], footerData = null }) => {
  const locale = useLocale();

  return (
    <>
      <Reviews />

      <footer>
        <div className="bg-[#020852] text-[#FFF7F7]">
          <div className="container mx-auto px-5 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

              {/* Colonnes 1–2 fusionnées */}
              <div className="lg:col-span-2 flex flex-col space-y-4">
                <a href="/" title="Révèl - Accueil" className="mb-4">
                  <Image
                    priority
                    src={LogoIconWhite}
                    width={180}
                    className="h-auto"
                    alt="Révèl | Coaching professionnel Bilan de compétences"
                  />
                </a>

                {footerData?.description && (
                  <div
                    className="text-md text-white"
                    dangerouslySetInnerHTML={{ __html: footerData.description }}
                  />
                )}

                {footerData?.labels?.length > 0 && (
                  <div className="flex space-x-6 items-center">
                    {footerData.labels.map((label, index) => (
                      label.image?.sourceUrl && (
                        <a
                          key={index}
                          href={label.lienDuLabel || "#"}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={label.nom || "Label"}
                          
                        >
                          <img
                            src={label.image.sourceUrl}
                            alt={label.image.title || label.nom || "Label"}
                            className="h-[110px] w-auto"
                          />
                        </a>
                      )
                    ))}
                  </div>
                )}

                {/* Infos contact juste sous les logos */}
                {footerData && (
                  <div className="text-sm text-white space-y-2">
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faLinkedin} className="w-4 h-4" />
                      <a
                        href="https://www.linkedin.com/in/elsa-rousson/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-2 hover:text-[#FA1565] transition"
                      >
                        Elsa Rousson
                      </a>
                    </div>
                    {footerData.mail && (
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faEnvelope} className="w-4 h-4" />
                        <a
                          href={`mailto:${footerData.mail}`}
                          className="ml-2 hover:text-[#FA1565] underline"
                        >
                          {footerData.mail}
                        </a>
                      </div>
                    )}
                    {footerData.telephone && (
                      <div className="flex items-center">
                        <FontAwesomeIcon icon={faPhone} className="w-4 h-4" />
                        <a
                          href={`tel:${footerData.telephone}`}
                          className="ml-2 hover:text-[#FA1565] underline"
                        >
                          {footerData.telephone}
                        </a>
                      </div>
                    )}
                  </div>
                )}

                {/* Adresse tout en bas */}
                {footerData?.adresse && (
                  <div
                    className="text-xs text-white opacity-60 pt-2"
                    dangerouslySetInnerHTML={{ __html: footerData.adresse }}
                  />
                )}
              </div>


              {/* Colonne 3 - Menu */}
              <div className="flex flex-col pt-2 md:pt-[120px]">
                <nav>
                  <ul className="space-y-3">
                    {items.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.destination?.url}
                          className="font-lemonmilk font-medium hover:underline transition text-xs text-white"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href={`/${locale}/mentions-legales`}
                        className="font-lemonmilk font-medium hover:underline transition text-xs text-white"
                      >
                        Mentions légales
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>

              {/* Colonne 4 - CTA ou citation */}
              <div className="flex flex-col pt-2 md:pt-[120px]">
                <h4 className="font-lemonmilk text-[22px] mb-4 text-[#FA1565]">Échangeons sur vos besoins</h4>
                <p className="text-base text-white mb-4">
                  Commencez votre démarche, en toute confiance,<br />
                  en profitant d&rsquo;un premier RENDEZ-VOUS gratuit
                </p>
                {/* Bouton rendez-vous */}
                  <a
                    href="https://www.revel-tes-talents.com/rendez-vous#booking"
                    className="cta-nav mt-2 px-3 py-3 flex items-center space-x-2 transition-colors font-lemonmilk text-xs min-w-[140px] lg:min-w-[160px]  lg:max-w-[190px] cursor-pointer  bg-[#FA1565]  text-white"              
                  >
                    Rendez-vous
                    <FontAwesomeIcon icon={faCalendarDay} className="ml-2" />
                  </a>
              </div>
            </div>
          </div>
        </div>

        {/* Signature */}
        <div className="bg-[#212121] text-neutral-50">
          <div className="container mx-auto">
            <p className="text-sm opacity-20 py-4 text-center">
              Made with ❤️ by{" "}
              <a
                href="https://davydav.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Davy Dauteuil
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
