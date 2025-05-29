export const API_OPTIONS = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + import.meta.env.VITE_TMDB_ACCESS_TOKEN,
  },
};

export const IMG_CDN_URL = "https://image.tmdb.org/t/p/w500";

export const DEFAULT_POSTER =
  "https://motivatevalmorgan.com/wp-content/uploads/2016/06/default-movie-768x1129.jpg";
