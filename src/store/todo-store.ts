import { Todo, getTodos } from "../ api/getTodos";
import { makeAutoObservable, runInAction } from "mobx";
import moment from "moment";
import faker from "faker";

class TodosStore {
  todos: Todo[] = [];
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  appendGeneratedTodos = (data: Todo[]) => {
    const generatedTodos = data.map((todo: Todo) => ({
      ...todo,
      description: faker.lorem.sentence(),
      startDate: this.getRandomDateTime(),
      endDate: this.getRandomDateTime(),
      tags: this.generateTwoRandomTags(),
      avatar:
        "https://www.meme-arsenal.com/memes/5c74aca011644e7ec850f8b4fa2d93c9.jpg",
    }));

    runInAction(() => {
      this.todos = [...this.todos, ...generatedTodos];
      this.isLoading = false;
    });
  };

  getTodosAction = async (page: number, limit: number) => {
    try {
      this.isLoading = true;
      const data = await getTodos(page, limit); // Передаем параметры page и limit
      this.appendGeneratedTodos(data);
    } catch {
      this.isLoading = false;
    }
  };

  getRandomDateTime = (): string => {
    const randomDate = moment().add(Math.floor(Math.random() * 7), "days");
    const randomTime = moment()
      .startOf("day")
      .add(Math.floor(Math.random() * 1440), "minutes");
    const formattedDateTime =
      randomDate.format("MM/DD") + " " + randomTime.format("hh:mm A");
    return formattedDateTime;
  };

  generateRandomTag = (): string => {
    const randomTag = faker.lorem.word();
    return randomTag;
  };

  generateTwoRandomTags = (): string[] => {
    const tags: string[] = [];
    while (tags.length < 2) {
      const tag = this.generateRandomTag();
      if (!tags.includes(tag)) {
        tags.push(tag);
      }
    }
    return tags;
  };
}

export default new TodosStore();
