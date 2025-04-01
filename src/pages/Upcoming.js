import { useEffect, useState } from "react";
import { fetchMovies } from "../api";
import { Link } from "react-router-dom";

function Upcoming() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies("upcoming").then((res) => setMovies(res.data.results));
  }, []);

  return (
    <div className="container mt-4">
      <h1 className="text-center text-light">Upcoming Movies</h1>
      <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {movies.map((movie, index) => (
            <div key={movie.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
                  className="d-block w-100"
                  alt={movie.title}
                />
                <div className="carousel-caption bg-dark p-2">
                  <h5>{movie.title}</h5>
                  <p>📅 Release: {movie.release_date}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#movieCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#movieCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
        </button>
      </div>
    </div>
  );
}

export default Upcoming;
