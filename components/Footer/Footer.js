"use client";
import Image from "next/image";
import LogoIconWhite from "../../public/img/revel5_switch.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Première colonne - Logo et Description */}
              <div className="flex flex-col">
                <a href="/" title="Révèl - Accueil" className="mb-4">
                  <Image
                    priority
                    src={LogoIconWhite}
                    width={120}
                    className="h-auto"
                    alt="Révèl | Coaching professionnel Bilan de compétences"
                  />
                  <p className="text-[#FA1565] font-lemonmilk font-medium text-xs mt-2">
                    Coaching professionnel <br />Bilan de compétences
                  </p>
                </a>
                <a
                      href="https://www.linkedin.com/in/elsa-rousson/"
                      target="_blank"
                      rel="noopener noreferrer"
                      title="Suivez-moi sur LinkedIn"
                      className="text-neutral-50 hover:text-[#0077B5] transition-all duration-300 mt-4 inline-block"
                    >
                      <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" /> Elsa Rousson
                  </a>
                
                {footerData && footerData.description && (
                  <div 
                    className="text-sm mt-4"
                    dangerouslySetInnerHTML={{ __html: footerData.description }}
                  />
                )}
              </div>
              
              {/* Deuxième colonne - Informations de contact */}
              <div className="flex flex-col">
                {footerData && (
                  <div className="text-sm font-nunito font-medium lg:pt-[120px]">
                    {footerData.adresse && <p className="mb-2">{footerData.adresse}</p>}
                    
                    {footerData.mail && (
                      <p className="mb-2">
                        Mail: <a href={`mailto:${footerData.mail}`} className="text-[#FA1565]">{footerData.mail}</a>
                      </p>
                    )}
                    
                    {footerData.telephone && (
                      <p className="mb-2">
                        Tél: <a href={`tel:${footerData.telephone}`} className="text-[#FA1565]">{footerData.telephone}</a>
                      </p>
                    )}
                    
                    
                  </div>
                )}
              </div>
              
              {/* Troisième colonne - Label Qualiopi */}
              <div className="flex flex-col items-center lg:pt-[120px]">
                {footerData && footerData.labels && footerData.labels.length > 0 && (
                  <div>
                    {footerData.labels.map((label, index) => (
                      <div key={index}>
                        {label.image && label.image.sourceUrl && (
                          <a 
                            href={label.lienDuLabel || '#'} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            title={label.nom || 'Label'}
                          >
                            <img 
                              src={label.image.sourceUrl}
                              alt={label.image.title || label.nom || 'Label'}
                              className="h-16 w-auto"
                            />
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Quatrième colonne - Menu */}
              <div className="flex flex-col lg:pt-16">
                <nav>
                  <ul className="flex flex-col space-y-3">
                    {items.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.destination?.url}
                          className="font-lemonmilk font-medium hover:underline transition-all duration-300 text-xs"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a
                        href={`/${locale}/mentions-legales`}
                        className="font-lemonmilk font-medium hover:underline transition-all duration-300 text-xs"
                      >
                        Mentions légales
                      </a>
                    </li>
                  </ul>
                </nav>
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
}