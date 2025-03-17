//NextJs/Components/Columns/Columns.js
import React from "react";

export const Columns = ({
  children,
  textColor,
  backgroundColor,
  customClasses,
  customId,
  verticalAlignment,
}) => {
  
  
  // Mappage de l'attribut WP vers la classe Tailwind
  let verticalAlignClass = 'items-center'; // Valeur par défaut
  
  if (verticalAlignment === 'top') {
    verticalAlignClass = 'items-start';
  } else if (verticalAlignment === 'center') {
    verticalAlignClass = 'items-center';
  } else if (verticalAlignment === 'bottom') {
    verticalAlignClass = 'items-end';
  }
  

  return (
    <div
      className={`py-4 ${customClasses}`}
      style={{ color: textColor, backgroundColor }}
      id={customId}
    >
      <div className={`max-w-5xl mx-auto flex flex-col md:flex-row justify-center ${verticalAlignClass}`}>
        {React.Children.map(children, (child, index) => (
          <React.Fragment key={child.key || `column-${index}`}>
            {React.cloneElement(child, {
              className: `${child.props.className || ""} ${
                child.props.order || ""
              }`.trim(),
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};