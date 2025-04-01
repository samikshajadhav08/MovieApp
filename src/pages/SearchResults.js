import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchMovies } from "../api";

function SearchResults() {
  const { query } = useParams();
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies("search", query).then((res) => setMovies(res.data.results));
  }, [query]);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-light">Search Results for "{query}"</h1>
      <div className="row">
        {movies.length > 0 ? movies.map((movie) => (
          <div key={movie.id} className="col-md-3 mb-4">
            <Link to={`/movie/${movie.id}`} className="card bg-dark text-light h-100">
              <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} className="card-img-top" alt={movie.title} />
              <div className="card-body">
                <h5 className="card-title">{movie.title}</h5>
              </div>
            </Link>
          </div>
        )) : <p className="text-center text-warning">No results found.</p>}
      </div>
    </div>
  );
}

export default SearchResults;
