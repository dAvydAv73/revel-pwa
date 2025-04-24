"use client";

import React, { useState, useEffect } from "react";
import { ButtonLink } from "../ButtonLink";
import Image from "next/image";
import LogoIconBlue from "../../public/img/revel5.svg";
import LogoIconWhite from "../../public/img/revel5_switch.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faBars, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { useLocale } from "next-intl";
import { MegaMenu } from "../MegaMenu"; // Import du composant MegaMenu

export const MainMenu = ({
  items,
  // Ajout de footerData avec une valeur par défaut null pour éviter les erreurs
  footerData = null
}) => {
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Marquer comme chargé après un court délai pour activer les animations
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (window.innerWidth >= 640) {
        // Comportement sur desktop
        setIsScrolled(currentScrollY > 50);
      } else {
        // Comportement sur mobile - tenir compte du défilement également
        setIsScrolled(currentScrollY > 10); // Seuil plus bas pour mobile
      }
    };
  
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
  
    // Appliquer immédiatement pour définir l'état initial
    handleScroll();
  
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <div
        className={`navbar fixed left-0 right-0 top-0 sm:top-0 sm:bottom-auto z-30 transition-all duration-300 
        ${isScrolled 
          ? 'bg-[#f3f3f8]/80 shadow-md scrolled backdrop-blur' 
          : 'bg-transparent'
        }
        h-[120px] sm:h-[120px]`}
      >
        <div className="container mx-auto px-5 flex items-center justify-between h-[120px]">
          {/* Logo - animation immédiate */}
          <div
            className={`logoLink flex-3 transition-opacity duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
            style={{ transitionDuration: '0.5s' }}
          >
            <a href="/" title="Révèl - Accueil" className="logo-nav-link items-center">
              <Image
                priority
                src={isScrolled ? LogoIconBlue: LogoIconWhite}
                width={140}
                className="h-auto -mt-5"
                alt="Révèl | Coaching professionnel Bilan de compétences"
              />
              <p className={`font-lemonmilk font-medium text-xs mobile-text-xs mt-1 ${
                  isScrolled ? 'text-[#091369]' : 'text-white'
                }`}>
              Bilan de compétences<br />Coaching professionnel</p>
            </a>
          </div>
          
          {/* Menu principal - animation avec délai */}
          <div className="flex-1 flex justify-center items-center main-menu hidden xl:flex">
            {(items || []).map((item, index) => (
              <div 
                key={item.id} 
                className="relative group"
                style={{ 
                  transition: 'all 0.5s ease',
                  transitionDelay: `${0.5 + (index * 0.1)}s`,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)'
                }}
              >
                <a
                  href={item.destination?.url || '#'}
                  className={`p-5 block transition-colors duration-300 font-lemonmilk font-medium text-sm px-2 py-1 drop-shadow-md 
                   ${isScrolled
                    ? 'text-[#091369]' 
                    : 'text-[#f7f7f7] revel-text-shadow'
                    }
                `}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </div>
          
          {/* Éléments à droite - animation avec délai intermédiaire */}
          <div 
            className="flex items-center ml-4 justify-end max-[1280px]:absolute max-[1280px]:right-5"
            style={{ 
              transition: 'all 0.5s ease',
              transitionDelay: '0.3s',
              opacity: isLoaded ? 1 : 0,
              transform: isLoaded ? 'translateY(0)' : 'translateY(-20px)'
            }}
          >
            {/* lien non affiché sur mobile*/}
            <a
              href="https://www.linkedin.com/in/elsa-rousson/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-block" // Masqué sur mobile, visible sur md et plus
            >
              <FontAwesomeIcon icon={faLinkedin} size="xl" className={`w-14 h-14
                ${isScrolled
                    ? 'text-[#091369]' 
                    : 'text-[#f7f7f7] header-linkedin-link'
                    }
              `} />
            </a>
            
            {/* Bouton rendez-vous */}
            <a
              href="https://revel-pwa.vercel.app/fr/rendez-vous#booking"
              className="cta-nav px-3 py-3 flex items-center space-x-2 transition-colors font-lemonmilk text-xs sm:ml-2 min-w-[140px] lg:min-widt-[160px] cursor-pointer  bg-[#FA1565]  text-white"              
            >
              Rendez-vous
              <FontAwesomeIcon icon={faCalendarDay} className="ml-2" />
            </a>
            
            {/* Menu hamburger */}
            <button
              onClick={toggleMenu}
              className="xl:hidden text-xl ml-2"
              aria-label="Ouvrir le menu"
            >
              <FontAwesomeIcon icon={faBars} className={`w-5 h-5 ${
                isScrolled ? "text-[#091369]" : "text-[#f7f7f7] header-linkedin-link"
              }`}/>
            </button>
          </div>
        </div>
      </div>

      {/* Intégration du composant MegaMenu - version mobile uniquement */}
      <MegaMenu 
        isMenuOpen={isMenuOpen} 
        toggleMenu={toggleMenu} 
        items={items}
        footerData={footerData}
      />
    </>
  );
};