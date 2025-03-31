//pwa-revel/components/Reviews/Reviews.js
"use client";
export default function Reviews() {
  const MAPS_URL = "https://www.google.com/maps/place/?q=place_id:ChIJm7mNWFKDi0cRVWzOlGW1Z1Y";
  
  return (
    <div className="reviews-container bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Nos avis clients</h2>
        <div className="flex justify-center items-center mb-8">
          {/* Étoiles */}
          <div className="flex text-yellow-400 text-3xl">
            {"★".repeat(5)}
          </div>
          <span className="ml-2 text-xl font-bold">4.9</span>
        </div>
        <p className="mb-8 text-lg">
          Nos clients nous recommandent ! Découvrez leurs témoignages sur Google.
        </p>
        <a 
          href={MAPS_URL}
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300"
        >
          Voir tous nos avis sur Google
        </a>
      </div>
    </div>
  );
}