// root/app/[locale]/api/googlereviews/route.js
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const GOOGLE_API_KEY = "AIzaSyATpPNzFkf375Ihqm77CjRckIm-_HU5ui0";
    const PLACE_ID = "ChIJm7mNWFKDi0cRVWzOlGW1Z1Y";
    
    // Ajout du paramètre language=fr pour obtenir les avis en français
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,reviews&language=fr&key=${GOOGLE_API_KEY}`
    );
    
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.status !== "OK") {
      throw new Error(`Erreur API Google: ${data.status}`);
    }
    
    return NextResponse.json({
      name: data.result.name,
      rating: data.result.rating,
      reviews: data.result.reviews || []
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des avis:", error);
    return NextResponse.json(
      { error: "Impossible de récupérer les avis Google" },
      { status: 500 }
    );
  }
}