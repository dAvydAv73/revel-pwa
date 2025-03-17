"use client";

import React, { useState, useEffect } from "react";
import { ButtonLink } from "../ButtonLink";
import Image from "next/image";
import LogoIconBlue from "../../public/img/revel-blue-logo.svg";

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
          ? 'bg-[#FFF7F7] border-t sm:border-b border-gray-300 shadow-md scrolled' 
          : 'bg-transparent border-t sm:border-b border-transparent'
        }
        h-[110px] sm:h-[120px]`}
      >
        <div className="container mx-auto px-5 flex items-center justify-between h-[110px]">
          {/* Logo - animation immédiate */}
          <div
            className={`logoLink flex-3 transition-opacity duration-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
            style={{ transitionDuration: '0.5s' }}
          >
            <a href="/" title="Révèl - Accueil" className="logo-nav-link">
              <Image
                priority
                src={LogoIconBlue}
                height={90}
                width={200}
                className="h-auto"
                alt="Révèl | Coaching professionnelle & Bilan de compétences"
              />
              <p className="text-[#E89B9B] font-lemonmilk font-medium text-xs -mt-2 mobile-text-xs">Coaching professionnelle &<br /> Bilan de compétences</p>
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
                  href={item.destination}
                  className={`p-5 block transition-colors duration-300 font-lemonmilk font-medium text-sm px-2 py-1 text-[#091369] drop-shadow-md ${
                    isScrolled ? "" : ""
                  }`}
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
              className="md:inline-block sr-only md:not-sr-only text-[#091369]"
            >
              <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 text-[#091369]" />
            </a>
            
            {/* Bouton rendez-vous */}
            <a
              href="#"
              className="cta-nav text-[#091369] bg-[#E89B9B] hover:text-[#FFF7F7] px-3 py-3 flex items-center space-x-2 hover:bg-[#EF6363] transition-colors font-lemonmilk text-xs sm:ml-2 min-w-[140px] lg:min-widt-[160px]"
            >
              Rendez-vous
              <FontAwesomeIcon icon={faCalendarDay} className="ml-2" />
            </a>
            
            {/* Menu hamburger */}
            <button
              onClick={toggleMenu}
              className="xl:hidden text-xl ml-2"
            >
              <FontAwesomeIcon icon={faBars} className="w-5 h-5 text-[#091369]"/>
            </button>
          </div>
        </div>
      </div>

      {/* Full-screen menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#FFF7F7] backdrop-blur bg-opacity-80 z-40 flex flex-col items-center justify-center text-white">
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-5 text-3xl text-[#091369]"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <a href="/" title="Révèl - Accueil" className="mb-16">
            <Image
              src={LogoIconBlue}
              height={135}
              width={300}
              className=""
              alt="Révèl | Coaching professionnelle & Bilan de compétences"
            />
            <p className="text-[#E89B9B] font-lemonmilk font-medium text-xs -mt-2 mobile-text-xs text-center">Coaching professionnelle &<br /> Bilan de compétences</p>
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
                    className={`p-5 block transition-colors duration-300 px-1 py-1 text-[#091369] font-lemonmilk font-medium"}`}
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