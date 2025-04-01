import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetail } from "../api";

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetail(id).then((res) => setMovie(res.data));
  }, [id]);

  if (!movie) return <div className="text-center text-light mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <div className="card bg-dark text-light">
        <div className="row g-0">
          <div className="col-md-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              className="img-fluid rounded-start"
              alt={movie.title}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h2 className="card-title">{movie.title}</h2>
              <p className="card-text">{movie.overview}</p>
              <p className="card-text">
                <small className="text-muted">Release Date: {movie.release_date}</small>
              </p>
              <h5 className="text-warning">⭐ {movie.vote_average}/10</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetail;
