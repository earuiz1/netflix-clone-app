import Main from "../components/Main";
import RowList from "../components/RowList";
import React from "react";

interface Row {
  id: string;
  title: string;
  url: string;
}

const Home: React.FC = () => {
  const rows: Row[] = [
    {
      id: "row_1",
      title: "Popular in Netflix",
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_MOVIES_API_KEY
      }&language=en-US&page=1`,
    },
    {
      id: "row_2",
      title: "Trending Now",
      url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${
        import.meta.env.VITE_MOVIES_API_KEY
      }`,
    },
    {
      id: "row_3",
      title: "Upcoming Movies",
      url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${
        import.meta.env.VITE_MOVIES_API_KEY
      }&language=en-US&page=1`,
    },
  ];

  return (
    <>
      <Main />
      {rows.map((row: Row) => {
        return <RowList key={row.id} title={row.title} fetchUrl={row.url} />;
      })}
    </>
  );
};

export default Home;
