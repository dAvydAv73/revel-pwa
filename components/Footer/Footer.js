import Image from "next/image";
import LogoIconWhite from "../../public/img/revel-white-logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

export const Footer = ({ items = [] }) => {
  return (
    <footer>
      <div className="bg-[#091369] text-[#FFF7F7]">
        <div className="container mx-auto px-5 py-10">
          {/* Section supérieure avec logo et description */}
          <div className="flex flex-col items-center mb-8">
            <a href="/" title="Révèl - Accueil" className="logo-footer-link mb-4">
              <Image
                priority
                src={LogoIconWhite}
                height={90}
                width={200}
                className="h-auto"
                alt="Révèl | Coaching professionnel Bilan de compétences"
              />
              <p className="text-[#E89B9B] font-lemonmilk font-medium text-xs -mt-2 text-center">
                Coaching professionnelle &<br /> Bilan de compétences
              </p>
            </a>
            <p className="text-sm text-center text-[#FFF7F7] font-nunito font-medium max-w-xl mt-4">
              Révélez vous en découvrant votre type de personnalité MBTI : Je vous accompagne 
              pour une meilleure connaissance de vous même et vous guide pour trouver 
              votre voix professionnelle
            </p>
          </div>

          {/* Navigation */}
          <nav className="mt-6">
            <ul className="flex flex-col lg:flex-row justify-center items-center space-y-4 lg:space-y-0 lg:space-x-8">
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
                  href="https://www.linkedin.com/in/elsa-rousson/"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Suivez-moi sur LinkedIn"
                  className="text-neutral-50 hover:text-[#0077B5] transition-all duration-300"
                >
                  <FontAwesomeIcon icon={faLinkedin} className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </nav>
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
  );
}