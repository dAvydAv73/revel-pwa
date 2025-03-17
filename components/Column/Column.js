//nextJs/components/Column/Column.js
"use client"
import React, { useMemo } from "react";
import { useInView } from "react-intersection-observer";

export const Column = React.memo(({
  children,
  width,
  textColor,
  backgroundColor,
  customClasses = "",
  index = 0,
  verticalAlignment = "" // Nouvel attribut pour l'alignement vertical
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  // Déterminer la classe d'alignement vertical
  const alignmentClass = useMemo(() => {
    if (verticalAlignment === 'top') return 'self-start';
    if (verticalAlignment === 'center') return 'self-center';
    if (verticalAlignment === 'bottom') return 'self-end';
    return ''; // Pas d'alignement spécifique
  }, [verticalAlignment]);

  const styles = useMemo(() => {
    const baseStyles = {
      opacity: inView ? 1 : 0,
      transition: `all 0.5s ease-in ${index * 0.3}s`,
    };
    
    if (width) {
      baseStyles.minWidth = width;
      baseStyles.flexGrow = 1;
    } else {
      baseStyles.flexGrow = 1;
      baseStyles.flexBasis = 0;
    }
    
    if (textColor) baseStyles.color = textColor;
    if (backgroundColor) baseStyles.backgroundColor = backgroundColor;
    
    return baseStyles;
  }, [inView, index, width, textColor, backgroundColor]);

  return (
    <div
      ref={ref}
      style={styles}
      className={`px-2 py-5 ${customClasses} ${alignmentClass}`}
    >
      {children}
    </div>
  );
});

Column.displayName = 'Column';