import { useEffect, useState } from "react";
import { fetchMovies, fetchGenres } from "../api";
import { Link } from "react-router-dom";

function Home() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [sortBy, setSortBy] = useState(""); // Sorting state

  useEffect(() => {
    fetchMovies("popular").then((res) => setMovies(res.data.results));
    fetchGenres().then((res) => setGenres(res.data.genres));
  }, []);

  // Filter by Genre
  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value);
    fetchMovies("popular", null, e.target.value).then((res) => setMovies(res.data.results));
  };

  // Sort Movies
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    let sortedMovies = [...movies];

    if (e.target.value === "rating") {
      sortedMovies.sort((a, b) => b.vote_average - a.vote_average);
    } else if (e.target.value === "release_date") {
      sortedMovies.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    }

    setMovies(sortedMovies);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-light">Popular Movies</h1>
        
        {/* <div className="d-flex gap-3">
          Genre Filter
          <select className="form-select w-auto" value={selectedGenre} onChange={handleGenreChange}>
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>{genre.name}</option>
            ))}
          </select>

          Sorting Dropdown
          <select className="form-select w-auto" value={sortBy} onChange={handleSortChange}>
            <option value="">Sort By</option>
            <option value="rating">Rating (High → Low)</option>
            <option value="release_date">Release Date (New → Old)</option>
          </select>
        </div> */}
      </div>

      <div className="row">
        {movies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <Link to={`/movie/${movie.id}`} className="card bg-dark text-light h-100">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
                <p className="text-warning">⭐ {movie.vote_average.toFixed(1)}</p>
                <p className="text-light">📅 {movie.release_date}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
