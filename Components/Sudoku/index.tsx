import { FC, useCallback, useEffect, useRef, useState } from "react";
import Failure from "../Failure";
import Success from "../Success";

const sudoku = new Array(9).fill(0).map((_) => new Array(9).fill(0));

const Sudoku: FC<any> = ({ response: { solution, unSolved } }) => {
  console.log(unSolved, solution);

  const sudokuWrapperRef = useRef<HTMLDivElement | null>(null);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  const getUserData = useCallback(() => {
    const userData: string[][] | null = new Array(9)
      .fill(0)
      .map((_) => new Array(9).fill(" "));
    const nodes = sudokuWrapperRef.current?.childNodes || [];
    nodes.forEach((node) => {
      //   @ts-ignore
      const [i, j] = node.id.split("-");
      //   @ts-ignore
      userData[i][j] = node.value;
    });
    return userData;
  }, []);

  const handleSubmit = useCallback(() => {
    const userData = getUserData();
    for (let i = 0; i < 9; ++i) {
      for (let j = 0; j < 9; ++j) {
        if (+userData[i][j] !== +solution[i][j]) {
          setFailure(true);
          setTimeout(() => {
            setFailure(false);
          }, 3000);
          return;
        }
      }
    }
    setSuccess(true);
  }, [getUserData, solution]);

  const handleSolve = useCallback(() => {
    const nodes = document.querySelectorAll(".cell");
    nodes.forEach((node) => {
      const [i, j] = node.id.split("-");
      // @ts-ignore
      node.value = solution[i][j];
    });
  }, [solution]);

  if (!unSolved.length || !solution.length) return <></>;

  return (
    <>
      <div className="wrapper">
        <div className="sudoku">
          <div id="sudoku-wrapper" ref={sudokuWrapperRef}>
            {sudoku.map((row, index1: number) =>
              row.map((_, index2: number) => (
                <input
                  maxLength={1}
                  defaultValue={
                    unSolved[index1][index2] > 0 ? unSolved[index1][index2] : ""
                  }
                  disabled={unSolved[index1][index2] > 0}
                  id={`${index1}-${index2}`}
                  className={`cell ${
                    unSolved[index1][index2] > 0 && "disabled"
                  } `}
                  type={"text"}
                  key={`${index1}-${index2}`}
                  style={{
                    borderRight: `${
                      (index2 + 1) % 3 === 0
                        ? "0.1vw solid var(--border)"
                        : "0.1vw solid var(--border_light)"
                    }`,
                    borderBottom: `${
                      (index1 + 1) % 3 === 0
                        ? "0.1vw solid var(--border)"
                        : "0.1vw solid var(--border_light)"
                    }`,
                  }}
                />
              ))
            )}
          </div>
          <div className="buttons-submit-solve">
            <button className="button" onClick={handleSubmit}>
              Submit
            </button>
            <button className="button solve" onClick={handleSolve}>
              AI Solve
            </button>
          </div>
        </div>
      </div>
      {success && <Success setSuccess={setSuccess} />}
      {failure && <Failure key={Math.random()} />}
    </>
  );
};

export default Sudoku;
