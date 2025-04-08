import Image from "next/image";
import { useTranslations } from 'next-intl';

export const Cover = ({ children, background, customClasses = "" }) => {
  const t = useTranslations('Home.Cover');
  return (
  
      <div 
          className={`flex items-left flex-col h-[70vh] md:h-[90vh] lg:h-screen homeCover cover-container min-h-[400px] max-h-[900px] pb-20 ${customClasses}`}
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
              background: 'linear-gradient(180deg, rgba(247,247,247,0.25) 0%, rgba(247,247,247,0.25) 50%, rgba(247,255,247,0.35) 100%)',
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