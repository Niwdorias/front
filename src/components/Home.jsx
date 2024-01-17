import React from "react";
import Container from "./Container";
import NotVerified from "./user/NotVerified";
import TopRatedMovies from "./user/TopRatedMovies";
import TopRatedTVSeries from "./user/TopRatedTVSeries";
import TopRatedWebSeries from "./user/TopRatedWebSeries";
import Slide from "./user/Slide";

export default function Home() {
  return (
    <div className="dark:bg-main min-h-screen">
      <Container className="px-2 xl:p-1">
        <NotVerified />
        <Slide />
        <div className="space-y-3 py-8">
          <TopRatedMovies />
          <TopRatedWebSeries />
          <TopRatedTVSeries />
        </div>
      </Container>
    </div>
  );
}
