"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import LogoIconWhite from "../../public/img/revel5_switch.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCalendarDay, faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { useLocale } from "next-intl";

export const MegaMenu = ({
  isMenuOpen,
  toggleMenu,
  items,
  logoWidth = 140,
  footerData = null
}) => {
  const locale = useLocale();

  // Animation effect for menu items and prevent scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto'; // Reset on unmount
    };
  }, [isMenuOpen]);

  if (!isMenuOpen) return null;

  // Filter out the "Mentions légales" item if needed
  const menuItems = items || [];

  return (
    <div className="fixed inset-0 bg-[#091369] backdrop-blur bg-opacity-90 z-40 flex flex-col overflow-y-auto">
      {/* Bouton de fermeture */}
      <button
        onClick={toggleMenu}
        className="absolute top-5 right-5 text-3xl text-[#f7f7f7]"
        aria-label="Fermer le menu"
      >
        <FontAwesomeIcon icon={faTimes} className="opacity-60"/>
      </button>
      
      {/* Logo */}
      <div className="mt-16 mb-6 flex flex-col items-center">
        <a href="/" title="Révèl - Accueil" onClick={() => toggleMenu()}>
          <Image
            src={LogoIconWhite}
            width={logoWidth}
            className="mb-2 ml-6"
            alt="Révèl | Coaching professionnelle & Bilan de compétences"
          />
          <p className="text-[#FA1565] font-lemonmilk font-medium text-xs text-center">
            Coaching professionnelle &<br /> Bilan de compétences
          </p>
        </a>
      </div>
      <div className="flex flex-col items-center mb-4">
      {footerData && footerData.description && (
        <div 
          className="text-sm text-white text-center px-6 opacity-60"
          dangerouslySetInnerHTML={{ __html: footerData.description }}
        />
      )}
      </div>
      {/* Menu Principal */}
      <div className="px-6 py-4">
        <nav className="mb-4">
          <ul className="space-y-2 text-center">
            {menuItems.map((item, index) => (
              <li 
                key={item.id} 
                className="relative"
                style={{ 
                  animation: 'slideDown 0.4s ease-out forwards',
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0 
                }}
              >
                <a
                  href={item.destination?.url || '#'}
                  className="block py-2 text-[#f7f7f7] font-lemonmilk font-medium text-sm hover:text-[#FA1565] transition-colors"
                  onClick={() => toggleMenu()}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      
      {/* Contact LinkedIn et Button */}
      <div className="flex flex-col items-center ">
        <a
            href="https://revel-pwa.vercel.app/fr/rendez-vous#booking"
            className="px-4 py-3 flex items-center transition-colors font-lemonmilk text-xs cursor-pointer bg-[#FA1565] text-white mb-4"
            onClick={() => toggleMenu()}
            >
            Rendez-vous
            <FontAwesomeIcon icon={faCalendarDay} className="ml-2" />
        </a>
        <a
          href="https://www.linkedin.com/in/elsa-rousson/"
          target="_blank"
          rel="noopener noreferrer"
          title="Suivez-moi sur LinkedIn"
          className="text-white hover:text-[#FA1565] transition-all duration-300 mb-4 inline-flex items-center"
        >
          <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6 mr-2" /> Elsa Rousson
        </a>
        
        
      </div>
      
      {/* Informations du Footer - Contact et Labels - Si footerData existe */}
      {footerData && (
        <div className="px-6 py-2 ">
          
          {/* Informations de contact */}
          <div className="flex flex-col items-center">
            {footerData.mail && (
              <a href={`mailto:${footerData.mail}`} className="flex items-center text-white hover:text-[#FA1565] transition-colors mb-3 opacity-60 text-xs">
                <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5 mr-2" />
                {footerData.mail}
              </a>
            )}
            
            {footerData.telephone && (
              <a href={`tel:${footerData.telephone}`} className="flex items-center text-white hover:text-[#FA1565] transition-colors mb-3 opacity-60 text-xs">
                <FontAwesomeIcon icon={faPhone} className="w-5 h-5 mr-2" />
                {footerData.telephone}
              </a>
            )}
            
            {footerData.adresse && (
              <p className="text-white text-center mb-3 opacity-60 text-xs">{footerData.adresse}</p>
            )}
          </div>
          
          {/* Labels Qualiopi et autres */}
          {footerData.labels && footerData.labels.length > 0 && (
            <div className="flex justify-center mt-4 mb-6">
              {footerData.labels.map((label, index) => (
                <div key={index} className="mx-2">
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
      )}
    </div>
  );
};