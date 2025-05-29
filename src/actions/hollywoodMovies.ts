import { API_OPTIONS } from "../utils/constants";
import type { MoviesResponse } from "../utils/types";

const getHollywoodMovies = async ({
  pageParam = 100,
}: {
  pageParam?: number;
}): Promise<MoviesResponse> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?with_original_language=en&sort_by=popularity.desc&region=IN&page=${pageParam}`,
    API_OPTIONS
  );

  const data = await res.json();

  return {
    results: data.results,
    nextPage: pageParam + 1,
    totalPages: data.total_pages,
  };
};

export default getHollywoodMovies;
