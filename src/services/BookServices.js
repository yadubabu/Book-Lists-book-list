import axios from "axios";

export const getBooks = async () => {
  const books = await axios
    .get("http://localhost:3006/books")
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  return books;
};
