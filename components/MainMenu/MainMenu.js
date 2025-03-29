"use client";

import React, { useState, useEffect } from "react";
import { ButtonLink } from "../ButtonLink";
import Image from "next/image";
import LogoIconBlue from "../../public/img/revel3.svg";
import LogoIconWhite from "../../public/img/revel3_switch.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faBars, faTimes, faCalendarDay } from "@fortawesome/free-solid-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

import { useLocale } from "next-intl";

export const MainMenu = ({
  items,
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
        h-[130px] sm:h-[120px]`}
      >
        <div className="container mx-auto px-5 flex items-center justify-between h-[130px]">
          {/* Logo - animation immédiate */}
          <div
            className={`logoLink flex-3 transition-opacity duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
            style={{ transitionDuration: '0.5s' }}
          >
            <a href="/" title="Révèl - Accueil" className="logo-nav-link">
              <Image
                priority
                src={LogoIconBlue}
                width={170}
                className="h-auto -mt-5"
                alt="Révèl | Coaching professionnel Bilan de compétences"
              />
              <p className="font-lemonmilk font-medium text-xs mobile-text-xs ml-2 text-[#091369]">Coaching professionnel<br />Bilan de compétences</p>
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
                  className="p-5 block transition-colors duration-300 font-lemonmilk font-medium text-sm px-2 py-1 drop-shadow-md text-[#091369]"
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
              className="md:inline-block sr-only md:not-sr-only"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 text-[#091369]" />
            </a>
            
            {/* Bouton rendez-vous */}
            <a
              href="https://revel-pwa.vercel.app/fr/rendez-vous#booking"
              className="cta-nav px-3 py-3 flex items-center space-x-2 transition-colors font-lemonmilk text-xs sm:ml-2 min-w-[140px] lg:min-widt-[160px] text-[#091369] bg-transparent border border-[#091369] hover:bg-[#FA1565] hover:border-[#FA1565] hover:text-white"              
            >
              Rendez-vous
              <FontAwesomeIcon icon={faCalendarDay} className="ml-2" />
            </a>
            
            {/* Menu hamburger */}
            <button
              onClick={toggleMenu}
              className="xl:hidden text-xl ml-2"
            >
              <FontAwesomeIcon icon={faBars} className={`w-5 h-5 ${
                isScrolled ? "text-white" : "text-[#091369]"
              }`}/>
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#091369] backdrop-blur bg-opacity-80 z-40 flex flex-col items-center justify-center text-white">
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-5 text-3xl text-[#FFF7F7]"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <a href="/" title="Révèl - Accueil" className="mb-16">
            <Image
              src={LogoIconWhite}
              height={135}
              width={300}
              className=""
              alt="Révèl | Coaching professionnelle & Bilan de compétences"
            />
            <p className="text-[#FA1565] font-lemonmilk font-medium text-xs -mt-2 mobile-text-xs text-center">Coaching professionnelle &<br /> Bilan de compétences</p>
          </a>
          <nav>
            <ul className="space-y-4 text-center text-base">
              {(items || []).map((item, index) => (
                <div 
                  key={item.id} 
                  className="relative group"
                  style={{ 
                    animation: 'slideDown 0.4s ease-out forwards',
                    animationDelay: `${index * 0.1}s`,
                    opacity: 0 
                  }}
                >
                  <a
                    href={item.destination?.url || '#'}
                    className={`p-5 block transition-colors duration-300 px-1 py-1 text-[#f7f7f7] font-lemonmilk font-medium"}`}
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};