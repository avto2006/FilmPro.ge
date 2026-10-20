import React, { useState, useEffect } from 'react';

interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
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

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => {
        if (!res.ok) throw new Error('სერვერიდან მონაცემების წამოღება ვერ მოხერხდა.');
        return res.json();
      })
      .then((data) => {
        setMovies(data.results || []);
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
      <h2>პოპულარული ფილმები</h2>

      {/* ფილმების ბადე */}
      <div style={{ fontSize: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', justifyContent: 'center' }} >
        {movies.slice(0,5).map((movie) => (
          <div key={movie.id} style={{  border: '1px solid #939292', borderRadius: '8px', padding: '10px', background: '#1e1e20', color: '#fff' }}>
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
            
            {/* ღილაკი ფილმის საყურებლად */}
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

      {/* 🎬 VIDEO PLAYER MODAL (გამოჩნდება ღილაკზე დაჭერისას) */}
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
            {/* დახურვის ღილაკი */}
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

            {/* Iframe Embed Player */}
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
  // 🛡️ ეს აკრძალავს რეკლამების ახალ ტაბში გადაყვანას/გახსნას:

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