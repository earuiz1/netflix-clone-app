import Main from "../components/Main";
import RowList from "../components/RowList";
// import Modal from "../components/UI/Modal";
// import { useSelector } from "react-redux";

const Home = () => {
  const rows = [
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
      {rows.map((row) => {
        return (
          <RowList
            key={row.id}
            id={row.id}
            title={row.title}
            fetchUrl={row.url}
          />
        );
      })}
    </>
  );
};

export default Home;
