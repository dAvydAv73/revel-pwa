import Image from "next/image";
import { useTranslations } from 'next-intl';
import LogoIconBlue from "../../public/img/revel-blue-logo.svg";

export const Cover = ({ children, background }) => {
  const t = useTranslations('Home.Cover');
  return (
  
      <div 
          className="flex items-left flex-col h-[70vh] md:h-[90vh] lg:h-screen homeCover cover-container min-h-[400px] max-h-[900px] pb-20"
          // Conservez votre classe container existante
          style={{
            position: 'relative',
            backgroundImage: `url('${background}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            // Conservez toutes vos propriétés existantes pour la hauteur, padding, etc.
          }}
        >
          {/* Superposition du dégradé */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(180deg, rgba(247,247,247,0.35) 0%, rgba(9,19,105,0.4) 50%, rgba(247,255,247,0.15) 100%)',
              pointerEvents: 'none', // Permet les clics à travers cette div
            }}
          ></div>
          
          {/* Contenu children intact */}
          <div className="relative z-10 child-container">
            {children}
          </div>
        </div>
      
  );
};

/*   <div className="max-w-5xl z-10">{t('Title')}</div>    */