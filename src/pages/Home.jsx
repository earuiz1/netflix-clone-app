import Main from "../components/Main";
import RowList from "../components/RowList";

const Home = () => {
  const rows = [
    {
      title: "Popular in Netflix",
      url: `https://api.themoviedb.org/3/movie/popular?api_key=${
        import.meta.env.VITE_MOVIES_API_KEY
      }&language=en-US&page=1`,
    },
    {
      title: "Trending Now",
      url: `https://api.themoviedb.org/3/trending/movie/week?api_key=${
        import.meta.env.VITE_MOVIES_API_KEY
      }`,
    },
    {
      title: "Upcoming Movies",
      url: `https://api.themoviedb.org/3/movie/upcoming?api_key=${
        import.meta.env.VITE_MOVIES_API_KEY
      }&language=en-US&page=1`,
    },
  ];
  return (
    <>
      <Main />
      {rows.map((row, index) => {
        return (
          <RowList
            key={index}
            id={index}
            title={row.title}
            fetchUrl={row.url}
          />
        );
      })}
    </>
  );
};

export default Home;
