//Nextjs/components/ScrollToAnchor/ScrollToAnchor.js
'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollToAnchor() {
    const pathname = usePathname();
  
    useEffect(() => {
      const hash = window.location.hash;
      console.log('🔍 Hash détecté :', hash);
  
      if (hash) {
        const scrollToElement = () => {
          const target = document.querySelector(hash);
          console.log('🎯 Element ciblé :', target);
  
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.warn('⚠️ Élément non trouvé pour :', hash);
          }
        };
  
        setTimeout(scrollToElement, 200); // augmente un peu le délai
      }
    }, [pathname]);
  
    return null;
  }
  
