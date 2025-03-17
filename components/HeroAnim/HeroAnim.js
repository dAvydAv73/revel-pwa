"use client";
import { useState, useEffect } from 'react';

export const HeroAnim = ({ staticText, staticTextColor, dynamicTexts, dynamicTextColor }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Animation pour changer le texte dynamique
  useEffect(() => {
    if (!dynamicTexts || dynamicTexts.length === 0) return;
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      
      // Attendre que l'animation de sortie soit terminée avant de changer l'index
      setTimeout(() => {
        setCurrentIndex((prevIndex) =>
          prevIndex === dynamicTexts.length - 1 ? 0 : prevIndex + 1
        );
        
        // Réinitialiser l'état d'animation pour lancer l'entrée du nouveau texte
        setTimeout(() => {
          setIsAnimating(false);
        }, 50);
      }, 500); // Durée de l'animation de sortie
      
    }, 3000); // Temps total pour chaque texte
    
    return () => clearInterval(interval);
  }, [dynamicTexts]);
  
  if (!staticText && (!dynamicTexts || dynamicTexts.length === 0)) {
    return null;
  }
  
  // Fonction pour rendre le HTML dans le texte statique (pour gérer les <br />)
  const renderStaticHTML = () => {
    return { __html: staticText };
  };
  
  return (
    <div className="hero-anim-container">
      <h2 className="hero-anim-title font-lemonmilk font-medium text-3xl">
        {staticText && (
          <span 
            className="hero-anim-static-text"
            style={{ color: staticTextColor }}
            dangerouslySetInnerHTML={renderStaticHTML()}
          />
        )}
        {dynamicTexts && dynamicTexts.length > 0 && (
          <span
            className={`hero-anim-dynamic-text ${isAnimating ? 'text-exit' : 'text-enter'}`}
            style={{ color: dynamicTextColor }}
          >
            {dynamicTexts[currentIndex]}
          </span>
        )}
      </h2>

    </div>
  );
};