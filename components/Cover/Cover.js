import Image from "next/image";
import { useTranslations } from 'next-intl';
import LogoIconBlue from "../../public/img/revel-blue-logo.svg";

export const Cover = ({ children, background }) => {
  const t = useTranslations('Home.Cover');
  return (
    <div className="h-screen text-white relative min-h-[400px] max-h-[900px] flex items-left  flex-col	homeCover pb-20">
      <div className="container mx-auto px-2 flex items-left flex-col justify-between h-[110px] sm:h-[140px]">
        <a href='/' title="Philippe Chevrier - Home" className="text-white logoLink ">
          <Image 
              priority
              src={LogoIconBlue}
              height={180}
              width={520}
              alt="Révèl | Coaching professionnelle & Bilan de compétences"
              className="logoLinkImg w-[80vw] max-w-[520px]"
            />
        </a>
        <p className="text-[#E89B9B]">Coaching professionnelle &<br /> Bilan de compétences</p>
        <div className="max-w-5xl z-10 drop-shadow-md mt-10 sm:mt-0">{children}</div>

      </div>
      
      {!!background && (
        <Image
          alt="Cover"
          src={background}
          fill
          priority="low"
          className="mix-blend-soft-light object-cover"
        />
      )}
      
    </div>
  );
};

/*   <div className="max-w-5xl z-10">{t('Title')}</div>    */