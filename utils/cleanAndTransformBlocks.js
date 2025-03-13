import { v4 as uuid } from "uuid";

export const cleanAndTransformBlocks = (blocks) => {
  // Validation des données d'entrée
  if (!Array.isArray(blocks)) {
    console.error('Input is not an array:', blocks);
    return [];
  }
  
  const assignId = (b) => {
    return b.map((block) => {
      if (typeof block !== 'object') {
        console.error('Invalid block:', block);
        return null;
      }
      
      const newBlock = {
        ...block,
        id: uuid(),
      };
      
      // Nous retirons la modification des URLs qui causait le problème
      // if (newBlock.attributes?.url) {
      //   newBlock.attributes.url = newBlock.attributes.url.replace("https", "http");
      // }
      
      if (newBlock.attributes) {
        // Traitement existant pour classesTailwind
        if ('classesTailwind' in newBlock.attributes) {
          // console.log('classesTailwind:', newBlock.attributes.classesTailwind);
        }
      }
      
      if (Array.isArray(newBlock.innerBlocks)) {
        newBlock.innerBlocks = assignId(newBlock.innerBlocks);
      }
      
      return newBlock;
    }).filter(Boolean); // Remove any null blocks
  };
  
  const transformedBlocks = assignId(blocks);
  return transformedBlocks;
};