import { useEffect, useState } from "react";
import Sudoku from "../Components/Sudoku";

const Home = () => {
  const [data, setData] = useState({
    unSolved: [],
    solution: [],
  });

  useEffect(() => {
    async function getData() {
      if (
        localStorage.getItem("unSolved") &&
        localStorage.getItem("solution")
      ) {
        const unSolved = JSON.parse(localStorage.getItem("unSolved") || "");
        const solution = JSON.parse(localStorage.getItem("solution") || "");
        setData({ solution, unSolved });
      } else {
        const data = await fetch("api/sudoku");
        const {
          response: { solution, "unsolved-sudoku": unSolved },
        } = await data.json();
        setData({ solution, unSolved });
        localStorage.setItem("unSolved", JSON.stringify(unSolved));
        localStorage.setItem("solution", JSON.stringify(solution));
      }
    }
    getData();
  }, []);

  return (
    <>
      <Sudoku response={data} />
    </>
  );
};

export default Home;
