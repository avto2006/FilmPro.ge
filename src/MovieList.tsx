import React, { useState, useEffect } from 'react';
import "./MovieList.css"
import durationIcon from './assets/Duration.png'

// 1. ვსაზღვრავთ TypeScript-ის ინტერფეისს ფილმისთვის
interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
}

function MovieList() {
  // 2. ტიპიზაციას ვაკეთებთ state-ისთვის Movie[]
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    if (!API_KEY) {
      setError('API Key არ არის მითითებული .env ფაილში!');
      setLoading(false);
      return;
    }

    fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`)
      .then((res) => {
        if (!res.ok) {
          throw new Error('სერვერიდან მონაცემების წამოღება ვერ მოხერხდა.');
        }
        return res.json();
      })
      .then((data) => {
        if (data && Array.isArray(data.results)) {
          setMovies(data.results);
        } else {
          setMovies([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [API_KEY]);

  if (loading) return <h2>იტვირთება...</h2>;
  if (error) return <h2 style={{ color: 'red' }}>შეცდომა: {error}</h2>;

  return (
    <div style={{ padding: '18vh' }}>
      <h2>პოპულარული ფილმები</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
        {movies.map((movie) => (
          <div key={movie.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '10px' }}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                  : 'https://via.placeholder.com/500x750?text=No+Image'
              }
              alt={movie.title || 'Movie'}
              style={{ width: '100%', borderRadius: '6px' }}
            />
            <h3>{movie.title || 'უცნობი სათაური'}</h3>
            <p>IMDB: {movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieList;