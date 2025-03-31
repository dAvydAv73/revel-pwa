// utils/getSettings.js
export const getSettings = async (locale = 'fr') => {
    const params = {
      query: `
      query settingsQuery {
        acfOptionsWebsiteSettings {
          webSiteSettings {
            frLang {
              footerGroup {
                adresse
                description
                fieldGroupName
                labels {
                  fieldGroupName
                  image {
                    sourceUrl
                    title
                  }
                  lienDuLabel
                  nom
                }
                mail
                telephone
              }
            }
          }
        }
      }
      `
    };
  
    try {
      const response = await fetch(process.env.WP_GRAPHQL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      });
  
      const { data } = await response.json();
  
      if (!data || !data.acfOptionsWebsiteSettings || !data.acfOptionsWebsiteSettings.webSiteSettings || !data.acfOptionsWebsiteSettings.webSiteSettings.frLang) {
        console.error("Data structure is not as expected:", data);
        return { footerSettings: {} };
      }
  
      return {
        footerSettings: data.acfOptionsWebsiteSettings.webSiteSettings.frLang.footerGroup,
      };
    } catch (error) {
      console.error('Error fetching settings data:', error);
      return {
        footerSettings: {},
      };
    }
  };