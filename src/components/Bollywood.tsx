import { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import getBollywoodMovies from "../actions/bollywoodMovies";
import MovieCard from "./MovieCard";
import type { Movie } from "../utils/types";

const Bollywood = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery({
    queryKey: ["bollywood"],
    queryFn: getBollywoodMovies,
    staleTime: 10000,
    initialPageParam: 1,
    getNextPageParam: (lastPage) =>
      lastPage.nextPage <= lastPage.totalPages ? lastPage.nextPage : undefined,
  });

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 300 &&
      hasNextPage &&
      !isFetchingNextPage
    ) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasNextPage, isFetchingNextPage]);

  if (status === "error") return <p>Error: {(error as Error).message}</p>;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-12 p-8 justify-center">
        {data?.pages.map((page) =>
          page.results.map((movie: Movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))
        )}
      </div>
      {isFetchingNextPage && (
        <div className="w-full flex flex-col items-center mb-4">
          <span className="loading loading-infinity loading-xl"></span>
          <p>Loading More Movies...</p>
        </div>
      )}
    </div>
  );
};

export default Bollywood;
