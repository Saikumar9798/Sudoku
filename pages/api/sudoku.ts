// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type propType = {
  "unsolved-sudoku": number[][];
  difficulty: string;
  solution: number[][];
};

const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": process.env?.X_RapidAPI_key || "",
    "X-RapidAPI-Host": "sudoku-board.p.rapidapi.com",
  },
};
const URL =
  "https://sudoku-board.p.rapidapi.com/new-board?diff=2&stype=list&solu=true";

export default async function getSudokuData(
  req: NextApiRequest,
  res: NextApiResponse<propType>
) {
  try {
    const data = await fetch(URL, options);
    const response: { response: propType } = await data.json();
    res.status(200).end(JSON.stringify(response));
  } catch (err) {
    res.status(500).end("Error in fetching!\n" + err);
  }
}
