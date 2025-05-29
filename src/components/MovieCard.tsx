import { useEffect, useState } from "react";
import { DEFAULT_POSTER, IMG_CDN_URL } from "../utils/constants";
import type { MovieCardProps } from "../utils/types";
import genres from "../utils/genres";

const MovieCard = ({ movie }: MovieCardProps) => {
  const [movieGenres, setMovieGenres] = useState<string[]>([]);

  useEffect(() => {
    if (!movie) return;

    const matchedGenres = genres
      .filter((genre) => movie.genre_ids.includes(genre.id))
      .map((genre) => genre.name);

    setMovieGenres(matchedGenres);
  }, [movie, genres]);

  return (
    <div className="card bg-base-100 image-full w-72 h-84 shadow-sm relative cursor-pointer">
      <figure>
        <img
          src={
            movie.poster_path || movie.backdrop_path
              ? IMG_CDN_URL + (movie.poster_path ?? movie.backdrop_path)
              : DEFAULT_POSTER
          }
          alt={movie.title}
        />
      </figure>

      {/* Vote average badge */}
      <div className="absolute top-2 right-2">
        <span className="btn btn-primary w-12 h-12 rounded-full flex items-center justify-center">
          {movie.vote_average.toFixed(1)}
        </span>
      </div>

      <div className="card-body pt-4 px-12">
        <h2 className="card-title text-xl w-11/12">{movie.title ?? movie?.name}</h2>
        <p className="text-gray-400 font-semibold mt-2">
          {movieGenres?.join(", ")}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
