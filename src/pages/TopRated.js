import { useEffect, useState } from "react";
import { fetchMovies } from "../api";
import { Link } from "react-router-dom";

function TopRated() {
  const [movies, setMovies] = useState([]);
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    fetchMovies("top_rated").then((res) => setMovies(res.data.results));
  }, []);

  // Sorting
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
      <div className="d-flex justify-content-between">
        <h1 className="text-light">Top Rated Movies</h1>
        <select className="form-select w-auto" value={sortBy} onChange={handleSortChange}>
          <option value="">Sort By</option>
          <option value="rating">Rating (High → Low)</option>
          <option value="release_date">Release Date (New → Old)</option>
        </select>
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

export default TopRated;
