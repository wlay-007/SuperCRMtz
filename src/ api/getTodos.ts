import axios from "axios";

export type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  description: string;
  startDate: string;
  endDate: string;
  tags: string[];
  avatar: string;
};

export const getTodos = async (page: number, limit: number) => {
  return (
    await axios.get<Todo[]>(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}&_page=${page}`
    )
  ).data;
};
