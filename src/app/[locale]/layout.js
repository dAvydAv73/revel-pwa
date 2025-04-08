import {NextIntlClientProvider} from 'next-intl';
import {unstable_setRequestLocale, getMessages} from 'next-intl/server';
import { Nunito } from "next/font/google";
import localFont from "next/font/local";
import "../../../styles/globals.css";
import { getMenu } from "../../../utils/getMenu";
import { getSettings } from "../../../utils/getSettings";
import { MainMenu } from "../../../components/MainMenu";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { Footer } from '../../../components/Footer';
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
      path: '../../../public/fonts/LEMONMILK-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LEMONMILK-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LEMONMILK-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LEMONMILK-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LEMONMILK-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LEMONMILK-Light.woff',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LEMONMILK-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/LEMONMILK-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  display: "swap",
  variable: "--font-lemon-milk",
});

export default async function RootLayout({ children, params }) {
  const locale = params.locale;
  const menuData = await getMenu(locale);
  const settingsData = await getSettings(locale);
  
  // Récupération des données du footer pour les passer au menu
  const footerSettings = settingsData?.footerSettings || null;
  
  // Set the locale for the request
  unstable_setRequestLocale(locale);
  
  // Providing all messages to the client side
  const messages = await getMessages(locale);
  
  return (
    <html lang={locale} className={`${nunito.variable} ${lemonMilk.variable}`}>
      <body>
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
          <div className="content" id="content">
            {children}
          </div>
          <Footer items={menuData.mainMenuItems} footerData={footerSettings} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Add this export to enable static rendering
export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}