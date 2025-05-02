//pwa-revel/components/BlockRenderer/BlockRenderer.js
"use client";
import { CallToActionButton } from "../CallToActionButton";
import { Column } from "../Column";
import { Columns } from "../Columns";
import { Cover } from "../Cover";
import { FormspreeForm } from "../FormspreeForm";
import { Gallery } from "../Gallery";
import { Heading } from "../Heading";
import { Paragraph } from "../Paragraph";
import { TickItem } from "../TickItem";
import Image from "next/image";
import { theme } from "../../theme";
import { ListItem } from "../ListItem/ListItem";
import { ListItemContent } from "../ListItemContent/ListItemContent";
import { Images2Block } from "../Images2Block/Images2Block";
import { SliderBlock } from "../SliderBlock";
import { HeroAnim } from "../HeroAnim";
import PartnerBlock from "../PartnerBlock";

import { useEffect } from 'react';

export const BlockRenderer = ({ blocks }) => {
  try {
    // Log pour le débogage des appels problématiques
    if (blocks === undefined || blocks === null) {
      console.log("BlockRenderer appelé avec blocks undefined/null");
      console.trace(); // Affiche la pile d'appels pour identifier l'origine
    }
    
    // Vérification améliorée pour éviter l'erreur
    if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
      // Utiliser un niveau d'avertissement pour les cas vides mais valides
      if (!blocks || !Array.isArray(blocks)) {
        console.error('BlockRenderer: blocks is undefined or not an array', blocks);
      } else if (blocks.length === 0) {
        console.warn('BlockRenderer: blocks est un tableau vide');
      }
      return null;
    }

    return blocks.map((block, index) => {
      // Vérification de sécurité supplémentaire pour chaque bloc
      if (!block || typeof block !== 'object') {
        console.error(`BlockRenderer: bloc invalide à l'index ${index}`, block);
        return null;
      }

      // Vérification de sécurité pour block.attributes
      const attributes = block.attributes || {};
      const customClasses = typeof attributes.classesTailwind === 'string' 
        ? attributes.classesTailwind 
        : '';

      switch (block.name) {
        case "acf/tickitem": {
          return (
            <TickItem key={block.id || `tickitem-${index}`}>
              {block.innerBlocks && Array.isArray(block.innerBlocks) && block.innerBlocks.length > 0 ? (
                <BlockRenderer blocks={block.innerBlocks} />
              ) : null}
            </TickItem>
          );
        }
        case "core/gallery": {
          return (
            <Gallery
              key={block.id || `gallery-${index}`}
              columns={block.attributes?.columns || 3}
              cropImages={block.attributes?.imageCrop}
              items={block.innerBlocks || []}
            />
          );
        }
        case "acf/formspreeform": {
          return (
            <FormspreeForm
              key={block.id || `formspree-${index}`}
              formId={block.attributes?.data?.form_id || ""}
            />
          );
        }
        case "acf/cta-button": {
          return (
            <CallToActionButton
              key={block.id || `cta-${index}`}
              buttonLabel={block.attributes?.data?.label || ""}
              destination={block.attributes?.data?.destination || "/"}
              align={block.attributes?.data?.align || ""}
              btnclass={block.attributes?.data?.invert || ""}
            />
          );
        }
        case "core/paragraph": {
          const paragraphClasses = block.attributes?.className || '';

          return (
            <Paragraph
              key={block.id || `paragraph-${index}`}
              textAlign={block.attributes?.textAlign || ""}
              content={block.attributes?.content || ""}
              textColor={
                theme[block.attributes?.textColor || ""] ||
                block.attributes?.style?.color?.text || ""
              }
              customClasses={`${customClasses} ${paragraphClasses}`.trim()}
            />
          );
        }
        case "core/post-title":
        case "core/heading": {
          return (
            <Heading
              key={block.id || `heading-${index}`}
              level={block.attributes?.level || 2}
              content={block.attributes?.content || ""}
              textAlign={block.attributes?.textAlign || ""}
              textColor={
                theme[block.attributes?.textColor || ""] ||
                block.attributes?.style?.color?.text || ""
              }
            />
          );
        }
        case "core/cover": {
          return (
            <Cover 
              key={block.id || `cover-${index}`} 
              background={block.attributes?.url || ""}
              customClasses={customClasses}
            >
              {block.innerBlocks && Array.isArray(block.innerBlocks) && block.innerBlocks.length > 0 ? (
                <BlockRenderer blocks={block.innerBlocks} />
              ) : null}
            </Cover>
          );
        }
        case "core/columns": {
          
          // Utiliser explicitement block.attributes pour récupérer verticalAlignment
          const verticalAlignment = block.attributes?.verticalAlignment || "";
          
          return (
            <Columns
              key={block.id || `column-${index}`}
              isStackedOnMobile={block.attributes?.isStackedOnMobile}
              customClasses={customClasses}
              textColor={
                theme[block.attributes?.textColor || ""] ||
                block.attributes?.style?.color?.text || ""
              }
              backgroundColor={
                theme[block.attributes?.backgroundColor || ""] ||
                block.attributes?.style?.color?.background || ""
              }
              customId={block.attributes?.metadata?.name || ""}
              verticalAlignment={verticalAlignment} // Passer l'attribut explicitement
            >
              {block.innerBlocks && Array.isArray(block.innerBlocks) && block.innerBlocks.length > 0 ? (
                block.innerBlocks.map((innerBlock, innerIndex) => (
                  <BlockRenderer
                    key={innerBlock.id || `inner-block-${innerIndex}`}
                    blocks={[{...innerBlock, index: innerIndex}]}
                  />
                ))
              ) : null}
            </Columns>
          );
        }
        case "core/column": {
          // Extraction de l'alignement vertical de la colonne individuelle
          const columnVerticalAlignment = block.attributes?.verticalAlignment || "";
          
          // Déterminer la classe d'alignement vertical pour cette colonne
          let columnAlignClass = '';
          if (columnVerticalAlignment === 'top') {
            columnAlignClass = 'self-start';
          } else if (columnVerticalAlignment === 'center') {
            columnAlignClass = 'self-center';
          } else if (columnVerticalAlignment === 'bottom') {
            columnAlignClass = 'self-end';
          }
          
          // Classes CSS combinées pour la colonne
          const columnClasses = `${block.attributes?.className || ""} ${columnAlignClass}`.trim();
          
          return (
            <Column
              key={block.id || `column-item-${index}`}
              width={block.attributes?.width || ''}
              customClasses={`${customClasses} ${columnAlignClass}`.trim()}
              textColor={
                theme[block.attributes?.textColor || ''] ||
                block.attributes?.style?.color?.text || ''
              }
              backgroundColor={
                theme[block.attributes?.backgroundColor || ''] ||
                block.attributes?.style?.color?.background || ''
              }
              index={block.index || index}
              verticalAlignment={columnVerticalAlignment} // Transmettre l'attribut d'alignement
            >
              {block.innerBlocks && Array.isArray(block.innerBlocks) && block.innerBlocks.length > 0 ? (
                <BlockRenderer blocks={block.innerBlocks} />
              ) : null}
            </Column>
          );
        }
        case "core/group":
        case "core/block": {
          return block.innerBlocks && Array.isArray(block.innerBlocks) && block.innerBlocks.length > 0 ? (
            <BlockRenderer key={block.id || `group-${index}`} blocks={block.innerBlocks} />
          ) : null;
        }
        case "core/image": {
          const imageClasses = block.attributes?.className || '';
          const imageUrl = block.attributes?.url || "";
          const isSvg = imageUrl.toLowerCase().endsWith('.svg');
          const imageLink = block.attributes?.href || null;
        
          // Détermine les dimensions à utiliser
          let imgWidth = block.attributes?.width;
          let imgHeight = block.attributes?.height;
        
          if (isSvg) {
            if (!imgWidth && !imgHeight) {
              imgWidth = 200;
              imgHeight = 200;
            } else if (!imgHeight) {
              imgHeight = imgWidth;
            } else if (!imgWidth) {
              imgWidth = imgHeight;
            }
          } else {
            imgWidth = imgWidth || 300;
            imgHeight = imgHeight || 300;
          }
        
          const imageElement = (
            <Image
              key={block.id || `image-${index}`}
              src={imageUrl}
              width={imgWidth}
              height={imgHeight}
              alt={block.attributes?.alt || ""}
              className={`${imageClasses} ${isSvg ? 'w-auto h-auto' : ''}`}
              style={isSvg ? { maxWidth: '100%', objectFit: 'contain' } : {}}
            />
          );
        
          return imageLink ? (
            <a
              key={`image-link-${index}`}
              href={imageLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {imageElement}
            </a>
          ) : imageElement;
        }
        
        case "core/list": {
          return (
            <div key={block.id || `list-${index}`} className="space-y-2">
              <ul className="mb-2 mt-2">
                {block.innerBlocks && Array.isArray(block.innerBlocks) && block.innerBlocks.length > 0 ? (
                  block.innerBlocks.map((innerBlock, innerIndex) => (
                    <BlockRenderer
                      key={innerBlock.id || `list-item-${innerIndex}`}
                      blocks={[{...innerBlock, index: innerIndex}]}
                    />
                  ))
                ) : null}
              </ul>
            </div>
          );
        }
        case "core/list-item": {
          return (
            <ListItem key={block.id || `list-item-${index}`} index={block.index || index}>
              <ListItemContent content={block.attributes?.content || ""} />
            </ListItem>
          );
        }
        case "acf/contact-div": {
          const blockId = block.attributes?.data?.blockcustomid || "";
        
          return (
            <div
              key={block.id || `contact-div-${index}`}
              id={blockId}
              className={block.attributes?.data?.custom_class || ""}
            >
              {/* Contenu du bloc contact-div */}
            </div>
          );
        }
        case "acf/images2block": {
          const data = block.attributes?.data || {};
          
          const image1 = data.image1 ? {
            url: data.image1.url || '',
            alt: data.image1.alt || '',
            width: data.image1.width || 800,
            height: data.image1.height || 600
          } : null;
        
          const image2 = data.image2 ? {
            url: data.image2.url || '',
            alt: data.image2.alt || '',
            width: data.image2.width || 800,
            height: data.image2.height || 600
          } : null;
        
          return (
            <Images2Block
              key={block.id || `images2-${index}`}
              image1={image1}
              image2={image2}
            />
          );
        }
        case "acf/mysliderblock": {
          const data = block.attributes?.data || {};
          
          const images = ["image1", "image2", "image3"].map((key) => {
            const img = data?.[key];
            return img
              ? {
                  url: img.url || "",
                  alt: img.alt || "",
                  width: img.width || 800,
                  height: img.height || 600,
                }
              : null;
          }).filter(Boolean);
        
          return <SliderBlock key={block.id || `slider-${index}`} images={images} />;
        }
        case "acf/hero-anim": {
          const data = block.attributes?.data || {};
          
          // Extraction du texte statique et sa couleur
          const staticText = data.static_text || "";
          const staticTextColor = data.static_text_color || "#000000";
          
          // Extraction des textes dynamiques en parcourant les propriétés
          const dynamicTexts = [];
          const numDynamicTexts = parseInt(data.dynamic_texts) || 0;
          
          // Parcourir les indices de 0 à numDynamicTexts-1
          for (let i = 0; i < numDynamicTexts; i++) {
            const textKey = `dynamic_texts_${i}_texte_dynamique`;
            if (data[textKey]) {
              dynamicTexts.push(data[textKey]);
            }
          }
          
          const dynamicTextColor = data.dynamic_text_color || "#000000";
          
          return (
            <HeroAnim
              key={block.id || `hero-anim-${index}`}
              staticText={staticText}
              staticTextColor={staticTextColor}
              dynamicTexts={dynamicTexts}
              dynamicTextColor={dynamicTextColor}
            />
          );
        }
        case "acf/booking-iframe": {
          
          const data = block.attributes?.data || {};
          
          // Utiliser les noms de champs corrects tels qu'ils apparaissent dans le console.log
          const iframeUrl = data.booking_url || '';
          const heightValue = data.hauteur || 100;
          const allowScrolling = data.allow_scrolling && data.allow_scrolling.includes('true');
          const customId = data.blockcustomid || '';
          const customClass = data.custom_class || '';
          
          
          
          // Ne pas afficher l'iframe si aucune URL n'est définie
          if (!iframeUrl) {
            console.warn("URL de l'iframe non définie, le bloc ne sera pas rendu");
            return null;
          }
          
          return (
            <div 
              key={block.id || `booking-iframe-${index}`} 
              className={`w-full mb-8 relative ${customClass}`}
              style={{ height: `${heightValue}vh` }}
              id={customId}
            >
              <iframe 
                src={iframeUrl}
                width="100%" 
                height="100%" 
                scrolling={allowScrolling ? 'yes' : 'no'} 
                style={{ border: 0 }}
                title="Système de réservation"
                className="absolute inset-0"
              />
            </div>
          );
        }
        case "acf/partners-block": {
          //console.log(block.attributes)

          return (
            
            <PartnerBlock 
              key={block.id || `partner-block-${index}`}
              block={block}
            />
          );
        }
        
        default: {
          console.log(`UNKNOWN BLOCK TYPE at index ${index}:`, block.name);
          return (
            <div key={block.id || `unknown-block-${index}`}>
              Unknown block type: {block.name || "unnamed"}
            </div>
          );
        }
      }
    });
  } catch (error) {
    // Capture toute erreur qui pourrait se produire pendant le rendu
    console.error("Erreur dans BlockRenderer:", error);
    return <div className="block-renderer-error">Erreur de rendu: {error.message}</div>;
  }
};