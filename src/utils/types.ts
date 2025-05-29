export type Movie = {
  name: string;
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  original_language: string;
  backdrop_path: string | null;
  poster_path: string | null;
  genre_ids: number[]
};

export type MovieCardProps = {
  movie: Movie;
};

export type MoviesResponse = {
  results: Movie[];
  nextPage: number;
  totalPages: number;
};

export type ShowResponse = {
  results: Movie[];
  hasMore: boolean;
  totalPages: number;
};