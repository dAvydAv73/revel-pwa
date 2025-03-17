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
  const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour gérer l'ouverture du menu

  useEffect(() => {
    //console.log("Menu Items received:", items);
  }, [items]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 640) {
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
      } else {
        setIsScrolled(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

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
        h-[110px] sm:h-[140px]`}
      >
        <div className="container mx-auto px-5 flex items-center justify-between h-[110px] ">
         
          <div
            className={`logoLink flex-3 transition-opacity duration-300 ${
              isScrolled ? "opacity-100" : "opacity-100"
            }`}
          >
            <a href="/" title="Révèl - Accueil" className="logo-nav-link">
            {/* ratio de 200 par 90 */}
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
          <div className="flex-1 flex justify-center items-center main-menu hidden xl:flex">
            {(items || []).map((item) => (
              <div key={item.id} className="relative group animate-slideLeft">
                <a
                  href={item.destination}
                  className={`p-5 block transition-colors duration-300 font-lemonmilk font-medium text-sm px-2 py-1 text-[#091369] drop-shadow-md ${
                    isScrolled ? "" : ""
                  }`}
                >
                  {item.label}
                </a>
                {!!item.subMenuItems?.length && (
                  <div className="group-hover:block bg-slate-800 text-right absolute right-0 top-full -mt-3">
                    {item.subMenuItems.map((subMenuItem) => (
                      <a
                        key={subMenuItem.id}
                        href={subMenuItem.destination}
                        className="block whitespace-nowrap p-5 hover:bg-slate-700 text-white"
                        title="Suivez-moi sur LinkedIn"

                      >
                        {subMenuItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            </div>
            <div className="flex items-center ml-4 justify-end max-[1280px]:absolute max-[1280px]:right-5">
              {/* lien non affiché sur mobile*/}
              <a
                href="https://www.linkedin.com/in/elsa-rousson/"
                target="_blank"
                rel="noopener noreferrer"
                className="md:inline-block sr-only md:not-sr-only"
              >
                <FontAwesomeIcon icon={faLinkedin} className="w-5 h-5 txt-[#D88A8A]" />
              </a>
               {/* Bouton rendez-vous */}
               <a
                href="#"
                className="cta-nav text-[#091369] bg-[#E89B9B] hover:text-[#FFF7F7] px-3 py-3 flex items-center space-x-2 hover:bg-[#EF6363] transition-colors font-lemonmilk text-xs sm:ml-4 min-w-[160px]"
               >
                Rendez-vous
                <FontAwesomeIcon icon={faCalendarDay} className="ml-2" />
              </a>
              
              {/* Menu hamburger */}
              <button
                onClick={toggleMenu}
                className=" xl:hidden text-xl ml-4"
              >
                <FontAwesomeIcon icon={faBars} className="w-5 h-5  text-[#091369]"/>
              </button>
              
             
              
            </div>
          </div>
      </div>

      {/* Full-screen menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-[#FFF7F7] backdrop-blur bg-opacity-80   z-40 flex flex-col items-center justify-center text-white">
          <button
            onClick={toggleMenu}
            className="absolute top-5 right-5 text-3xl text-[#091369]"
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <a href="/" title="Révèl - Accueil" className="mb-16 ">
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
            {(items || []).map((item) => (
              <div key={item.id} className="relative group ">
                <a
                  href={item.destination?.url || '#'} // Ajout de la vérification
                  className={`p-5 block transition-colors duration-300 px-1 py-1 text-[#091369] font-lemonmilk font-medium"
                  }`}
                >
                  {item.label}
                </a>
                {item.subMenuItems?.length > 0 && (
                  <div className="group-hover:block hidden bg-slate-800 text-right absolute right-0 top-full -mt-3">
                    {item.subMenuItems.map((subMenuItem) => (
                      <a
                        key={subMenuItem.id}
                        href={subMenuItem.destination?.url || '#'}
                        className="block whitespace-nowrap p-5 hover:bg-slate-700 text-white"
                      >
                        {subMenuItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};
