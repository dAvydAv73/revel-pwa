//pwa-revel/src/app/components/Cover/Cover.js
"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export const Cover = ({ children, background, backgroundMobile = null, customClasses = "" }) => {
  const t = useTranslations("Home.Cover");
  const [desktopBg, setDesktopBg] = useState(background);
  const [mobileBg, setMobileBg] = useState(backgroundMobile || background);

  useEffect(() => {
    console.log("🎯 Cover component rendered with:", {
      desktopBg,
      mobileBg
    });
  }, [desktopBg, mobileBg]);

  return (
    <div
      className={`homeCover cover-container ${customClasses}`}
      style={{
        '--bg-desktop': `url('${desktopBg}')`,
        '--bg-mobile': `url('${mobileBg}')`,
      }}
    >
      <div className="relative z-10 child-container">
        {children}
      </div>
    </div>
  );
};
