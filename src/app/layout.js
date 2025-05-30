//pwa-revel/src/app/layout.js
import {NextIntlClientProvider} from 'next-intl';
import { getMessages} from 'next-intl/server';
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import "../../styles/globals.css";
import { getMenu } from "../../utils/getMenu";
import { getSettings } from "../../utils/getSettings";
import { MainMenu } from "../../components/MainMenu";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Footer } from '../../components/Footer';
import { ScrollToAnchor } from '../../components/ScrollToAnchor';
import { ClientWrapper } from '../../components/ClientWrapper';
import Script from 'next/script';



config.autoAddCss = false;

// Configuration pour les polices Google Fonts
const nunito = Nunito({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  variable: "--font-nunito",
});

// Configuration pour LemonMilk
const lemonMilk = localFont({
  src: [
    {
      path: '../../public/fonts/LEMONMILK-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../public/fonts/LEMONMILK-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  display: "swap",
  variable: "--font-lemon-milk",
});

export default async function RootLayout({ children }) {
   const locale = 'fr'; // Valeur figée car plus de paramètre dynamique
  const menuData = await getMenu(locale);
  const settingsData = await getSettings(locale);

  // Plus besoin de setRequestLocale en absence de param dynamique
  const messages = await getMessages(locale);
  
  // Récupération des données du footer pour les passer au menu
  const footerSettings = settingsData?.footerSettings || null;
  
  
  return (
    <html lang="fr" className={`${nunito.variable} ${lemonMilk.variable}`}>
    
      <body>

       {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-TM4BCQG433"
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-TM4BCQG433');
          `}
        </Script>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <MainMenu
            callToActionDestination={menuData.callToActionDestination}
            callToActionLabel={menuData.callToActionLabel}
            callToActionEmail={menuData.callToActionEmail}
            callToAction2Label={menuData.callToAction2Label}
            callToAction2Destination={menuData.callToAction2Destination}
            items={menuData.mainMenuItems}
            footerData={footerSettings} // Passage des données du footer au MainMenu avec valeur sécurisée
          />
          <ScrollToAnchor />

          <ClientWrapper>
            <div className="content" id="content">
              {children}
            </div>
          </ClientWrapper>
          <Footer items={menuData.mainMenuItems} footerData={footerSettings} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

