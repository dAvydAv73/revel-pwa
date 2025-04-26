// components/PartnerBlock/PartnerBlock.js
import Image from 'next/image';

const PartnerBlock = ({ block }) => {
  // Extraire les données du bloc
  const data = block?.attributes?.data || {};
  const titre = data.titre || 'Nos Partenaires';
  const sous_titre = data.sous_titre || '';
  
  // Extraire les partenaires de la structure de données
  const extractPartners = (data) => {
    const partners = [];
    let index = 1;
  
    while (data[`partners_${index}_image`] || data[`partners_${index}_nom`]) {
      const rawLink = data[`partners_${index}_lien`];
      const linkUrl = typeof rawLink === 'object' && rawLink !== null ? rawLink.url : rawLink || '';
  
      partners.push({
        image: data[`partners_${index}_image`] || null,
        nom: data[`partners_${index}_nom`] || '',
        lien: linkUrl
      });
      index++;
    }
  
    return partners;
  };
  
  const partners = extractPartners(data);

  return (
    <div className="partners-container py-4 max-w-screen-xl mx-auto px-4">
      <h2 className="text-xl text-center mb-4 mt-2 text-[#FA1565]">{titre}</h2>
      
      {sous_titre && (
        <p className="text-center mb-6 text-[#020852]">{sous_titre}</p>
      )}
      
      {partners && partners.length > 0 ? (
        <div className="flex flex-wrap justify-center">
          {partners.map((partner, index) => (
            <div key={`partner-${index}`} className="w-1/2 sm:w-1/3 lg:w-1/6 p-2 flex items-center justify-center">
              <div className="w-full h-20 flex items-center justify-center">
                {partner.lien ? (
                  <a 
                    href={partner.lien} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block hover:opacity-80 transition-opacity flex items-center justify-center"
                    title={partner.nom || ''}
                  >
                    {partner.image && (
                      <Image
                        src={partner.image.url}
                        alt={partner.nom || ''}
                        width={100}
                        height={60}
                        className="object-contain max-h-16 max-w-full"
                      />
                    )}
                  </a>
                ) : (
                  <>
                    {partner.image && (
                      <Image
                        src={partner.image.url}
                        alt={partner.nom || ''}
                        width={100}
                        height={60}
                        className="object-contain max-h-16 max-w-full"
                      />
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Aucun partenaire à afficher</p>
      )}
    </div>
  );
};

export default PartnerBlock;