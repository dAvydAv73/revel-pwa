// root/app/api/googlereviews/route.js
import { NextResponse } from "next/server";

export const revalidate = 86400; // Mise en cache pendant 24 heures

export async function GET() {
  try {
    // Vérifier si les variables d'environnement sont définies
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
    const PLACE_ID = process.env.GOOGLE_PLACE_ID;
    
    if (!GOOGLE_API_KEY) {
      console.error("La clé API Google n'est pas définie");
      return NextResponse.json(
        { error: "Configuration de l'API manquante (GOOGLE_API_KEY)" },
        { status: 500 }
      );
    }
    
    if (!PLACE_ID) {
      console.error("L'ID du lieu Google n'est pas défini");
      return NextResponse.json(
        { error: "Configuration de l'API manquante (GOOGLE_PLACE_ID)" },
        { status: 500 }
      );
    }
    
    // Construction de l'URL
    const apiUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&language=fr&key=${GOOGLE_API_KEY}`;
    
    console.log("Appel à l'API Google avec l'URL (clé masquée):", 
      apiUrl.replace(GOOGLE_API_KEY, "API_KEY_HIDDEN"));
    
    // Récupérer les avis depuis l'API Google Places
    const response = await fetch(apiUrl);
    
    console.log("Statut de la réponse:", response.status);
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    console.log("Statut de l'API Google:", data.status);
    
    if (data.status !== "OK") {
      throw new Error(`Erreur API Google: ${data.status} - ${data.error_message || "Pas de message d'erreur"}`);
    }
    
    // Extraire les données avec le nombre total d'avis
    return NextResponse.json({
      name: data.result.name,
      rating: data.result.rating,
      total_reviews: data.result.user_ratings_total || 0,
      reviews: data.result.reviews || []
    });
  } catch (error) {
    console.error("Erreur détaillée lors de la récupération des avis:", error);
    return NextResponse.json(
      { error: `Impossible de récupérer les avis Google: ${error.message}` },
      { status: 500 }
    );
  }
}