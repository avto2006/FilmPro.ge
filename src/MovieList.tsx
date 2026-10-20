import React, { useState, useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

function MovieList() {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [latestMovies, setLatestMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // State არჩეული ფილმის ID-ის შესანახად
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      setError('API Key არ არის მითითებული .env ფაილში!');
      setLoading(false);
      return;
    }

    // ორივე სექციისთვის მონაცემების პარალელურად წამოღება
    Promise.all([
      fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`),
      fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`)
    ])
      .then(async ([popularRes, latestRes]) => {
        if (!popularRes.ok || !latestRes.ok) {
          throw new Error('სერვერიდან მონაცემების წამოღება ვერ მოხერხდა.');
        }

        const popularData = await popularRes.json();
        const latestData = await latestRes.json();

        setPopularMovies(popularData.results || []);
        setLatestMovies(latestData.results || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [API_KEY]);

  if (loading) return <h2>იტვირთება...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>შეცდომა: {error}</h2>;

  return (
    <div style={{ padding: '20px' }}>
      
      {/* 1. პოპულარული ფილმების სექცია */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', marginBottom: '15px' }}> პოპულარული ფილმები</h2>
        <div style={{ fontSize: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', justifyContent: 'center' }}>
          {popularMovies.slice(0, 5).map((movie) => (
            <div key={movie.id} style={{ border: '1px solid #939292', borderRadius: '8px', padding: '10px', background: '#1e1e20', color: '#fff' }}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image'
                }
                alt={movie.title || 'Movie'}
                style={{ width: '100%', borderRadius: '6px' }}
              />
              <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{movie.title || 'უცნობი სათაური'}</h3>
              <p>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
              
              <button
                onClick={() => setSelectedMovieId(movie.id)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '8px',
                  backgroundColor: '#e50914',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ▶ ყურება
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 2. ბოლოს დამატებული ფილმების სექცია */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ color: '#fff', marginBottom: '15px' }}> ბოლოს დამატებული ფილმები</h2>
        <div style={{ fontSize: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', justifyContent: 'center' }}>
          {latestMovies.slice(0, 5).map((movie) => (
            <div key={movie.id} style={{ border: '1px solid #939292', borderRadius: '8px', padding: '10px', background: '#1e1e20', color: '#fff' }}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                    : 'https://via.placeholder.com/500x750?text=No+Image'
                }
                alt={movie.title || 'Movie'}
                style={{ width: '100%', borderRadius: '6px' }}
              />
              <h3 style={{ fontSize: '16px', margin: '10px 0' }}>{movie.title || 'უცნობი სათაური'}</h3>
              <p>⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
              
              <button
                onClick={() => setSelectedMovieId(movie.id)}
                style={{
                  width: '100%',
                  padding: '8px',
                  marginTop: '8px',
                  backgroundColor: '#e50914',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                ▶ ყურება
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 🎬 VIDEO PLAYER MODAL */}
      {selectedMovieId && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
        >
          <div style={{ position: 'relative', width: '80%', maxWidth: '900px', backgroundColor: '#000', borderRadius: '8px', padding: '10px' }}>
            <button
              onClick={() => setSelectedMovieId(null)}
              style={{
                position: 'absolute',
                top: '-35px',
                right: '0',
                background: 'transparent',
                color: '#fff',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer'
              }}
            >
              ✖ დახურვა
            </button>

            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                src={`https://www.2embed.cc/embed/${selectedMovieId}`}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '6px'
                }}
                allowFullScreen
                title="Movie Player"
              ></iframe>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MovieList;