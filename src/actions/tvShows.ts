import { API_OPTIONS } from "../utils/constants";
import type { ShowResponse } from "../utils/types";

const getTvShows = async (page: number): Promise<ShowResponse> => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/tv?sort_by=popularity.desc&region=IN&language=en-US&page=${page}`,
    API_OPTIONS
  );
  const data = await res.json();
  return {
    results: data.results,
    hasMore: page < 500,
    // hasMore: page < data.total_pages,
    // totalPages: data.total_pages,
    totalPages: 500,
  };
};

export default getTvShows;
