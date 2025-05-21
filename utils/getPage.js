// /pwa-revel/utils/getPage.js
import { cleanAndTransformBlocks } from "./cleanAndTransformBlocks";

export async function getPage(uri) {
  if (typeof uri !== 'string') {
    throw new Error('Invalid uri');
  }

  // 🔁 Corrige les URIs problématiques pour les adapter à WordPress
  let realUri = uri;
  if (uri === '/' || uri === '' || uri === '/accueil') {
    realUri = '/accueil'; // ← adapte ici si WordPress utilise /home à la place
  }
  const cleanedUri = uri.replace(/^\/fr(\/|$)/, '/');
  const language = 'FR'; // Langue figée car FR unique sur ce site

  const params = {
    query: `
      query PageQuery($uri: String!,$language: LanguageCodeEnum!) {
        nodeByUri(uri: $uri) {
          ... on Page {
            blocks(postTemplate: false)
            translation(language: $language) {
              id
              title
              slug
              language {
                code
                slug
              }
            }
          }
        }
      }
    `,
    variables: {
      uri: cleanedUri,
      language
    },
  };
      console.log('🔍 [getPage] URI demandé :', uri);


  try {
    const wpGraphqlUrl = process.env.WP_GRAPHQL_URL;

    if (!wpGraphqlUrl) {
      throw new Error('WP_GRAPHQL_URL is not defined');
    }

    const response = await fetch(wpGraphqlUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const responseData = await response.json();
    const { data, errors } = responseData;

    if (errors) {
      console.error('GraphQL errors:', JSON.stringify(errors, null, 2));
      throw new Error('GraphQL query returned errors');
    }

    if (!data || !data.nodeByUri || !data.nodeByUri.blocks) {
      console.warn('No valid data or blocks found for URI:', realUri);
      return null;
    }

    return cleanAndTransformBlocks(data.nodeByUri.blocks);
  } catch (error) {
    console.error('Error in getPage:', error);
    throw error;
  }
}
