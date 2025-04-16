'use client';
// pwa-revel/components/Reviews/Reviews.js
import { useState, useEffect } from 'react';
import Image from 'next/image';

// Composant pour les étoiles
const RatingStars = ({ rating }) => {
  return (
    <div className="stars">
      {[...Array(5)].map((_, i) => (
        <span key={i} className={i < rating ? "star-filled" : "star-empty"}>
          ★
        </span>
      ))}
    </div>
  );
};

// Fonction pour formater la date
const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  }).format(date);
};

export default function Reviews() {
  const [reviewsData, setReviewsData] = useState({
    name: '',
    rating: 0,
    reviews: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // URL Google Maps pour les avis
  const googleReviewsUrl = "https://search.google.com/local/reviews?placeid=ChIJm7mNWFKDi0cRVWzOlGW1Z1Y";

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        // Appel à l'API avec le préfixe de locale
        const response = await fetch('/fr/api/googlereviews');
        if (!response.ok) {
          throw new Error(`Erreur HTTP: ${response.status}`);
        }
        const data = await response.json();
        setReviewsData(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des avis:", error);
        setError("Impossible de charger les avis");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Fonction pour avancer dans le carrousel
  const nextReview = () => {
    if (reviewsData.reviews && reviewsData.reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviewsData.reviews.length);
    }
  };

  // Fonction pour reculer dans le carrousel
  const prevReview = () => {
    if (reviewsData.reviews && reviewsData.reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviewsData.reviews.length) % reviewsData.reviews.length);
    }
  };

  // Fonction pour tronquer le texte de l'avis
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text;
    return text.substr(0, maxLength) + '...';
  };

  if (loading) return <div className="reviews-loading">Chargement des avis...</div>;
  if (error) return <div className="reviews-error">{error}</div>;
  if (!reviewsData.reviews || reviewsData.reviews.length === 0) {
    return <div className="reviews-no-reviews">Aucun avis disponible pour le moment.</div>;
  }

  // Afficher seulement 3 avis à la fois (ou moins s'il y en a moins)
  const displayCount = Math.min(3, reviewsData.reviews.length);
  const displayedReviews = [];
  
  for (let i = 0; i < displayCount; i++) {
    const index = (currentIndex + i) % reviewsData.reviews.length;
    displayedReviews.push(reviewsData.reviews[index]);
  }

  return (
    <div className="reviews-section">
      <div className="reviews-container">
        <div className="reviews-info">
          <div className="rating-value">{reviewsData.rating.toFixed(1)}</div>
          <RatingStars rating={reviewsData.rating} />
          <div className="reviews-count">Basée sur {reviewsData.reviews.length} avis</div>
          <div className="google-logo">
            <Image 
              src="/img/google-logo.svg" 
              alt="Google" 
              width={100} 
              height={33} 
              unoptimized 
            />
          </div>
          <h2 className="reviews-title">Excellent</h2>
        </div>

        <div className="reviews-carousel">
          <button 
            className="carousel-button prev-button" 
            onClick={prevReview}
            aria-label="Avis précédent"
          >
            ‹
          </button>
          
          <div className="reviews-cards">
            {displayedReviews.map((review, index) => (
              <div key={index} className="review-card">
                <div className="review-header">
                  <div className="reviewer-avatar">
                    {review.profile_photo_url ? (
                      <Image 
                        src={review.profile_photo_url} 
                        alt={`Photo de ${review.author_name}`} 
                        width={40} 
                        height={40} 
                        className="reviewer-image"
                      />
                    ) : (
                      <div className="reviewer-initial">
                        {review.author_name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="reviewer-info">
                    <h3 className="reviewer-name">{review.author_name}</h3>
                    <p className="review-date">{formatDate(review.time)}</p>
                  </div>
                </div>
                
                <div className="review-rating">
                  <RatingStars rating={review.rating} />
                </div>
                
                <p className="review-text">{truncateText(review.text)}</p>
                
                {review.text.length > 150 && (
                  <a 
                    href={googleReviewsUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="read-more-button"
                  >
                    Lire la suite
                  </a>
                )}
              </div>
            ))}
          </div>
          
          <button 
            className="carousel-button next-button" 
            onClick={nextReview}
            aria-label="Avis suivant"
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}