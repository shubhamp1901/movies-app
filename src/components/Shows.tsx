import getTvShows from "../actions/tvShows";
import { useEffect, useState } from "react";
import type { Movie } from "../utils/types";
import MovieCard from "./MovieCard";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

const Shows = () => {
  const [page, setPage] = useState<number>(1);

  const { isError, error, data, isFetching, isPlaceholderData } = useQuery({
    queryKey: ["shows", page],
    queryFn: () => getTvShows(page),
    placeholderData: keepPreviousData,
  });

  if (isError) return <div>Error: {error.message}</div>;

  useEffect(() => {
     window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [page]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-12 p-8 justify-center">
        {data?.results.map((show: Movie) => (
          <MovieCard key={show.id} movie={show} />
        ))}
      </div>

      {isFetching ? (
        <div className="w-full flex flex-col items-center mb-4">
          <span className="loading loading-infinity loading-xl"></span>
          <p>Loading More Shows...</p>
        </div>
      ) : (
        <>
          <span className="text-center text-yellow-300 font-bold">
            Current Page: {page}
          </span>
          <div className="flex justify-center gap-4 mb-10">
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 1}
              className={`bg-yellow-300 text-white p-2 w-fit rounded-xl ${
                page === 1 ? "cursor-not-allowed opacity-50" : "cursor-pointer"
              }`}
            >
              Previous Page
            </button>
            <button
              onClick={() => {
                if (!isPlaceholderData && data?.hasMore) {
                  setPage((old) => old + 1);
                }
              }}
              disabled={isPlaceholderData || !data?.hasMore}
              className={`bg-yellow-300 text-white p-2 w-fit rounded-xl ${
                !data?.hasMore
                  ? "cursor-not-allowed opacity-50"
                  : "cursor-pointer"
              }`}
            >
              Next Page
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Shows;
