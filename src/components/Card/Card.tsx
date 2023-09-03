import Style from "./Card.module.scss";
import Checkbox from "../Checkbox/Checkbox";
import { Todo } from "../../ api/getTodos";

const Card = ({ todo }: { todo: Todo }) => {
  return (
    <div className={Style.card}>
      <Checkbox title={todo.title} completed={todo.completed} />
      <div className={Style.dateBox}>
        <p className={Style.date}>{todo.startDate.toString()}</p>
        <p className={Style.date}>{todo.endDate.toString()}</p>
      </div>
      <p className={Style.description}>{todo.description}</p>
      <div className={Style.tagsAvatar}>
        <div className={Style.tags}>
          <div className={Style.tags}>
            {todo.tags.map((tag: string) => (
              <div key={tag} className={Style.tag}>
                {tag}
              </div>
            ))}
          </div>
        </div>
        <img src={todo.avatar} alt="Avatar" className={Style.avatar} />
      </div>
    </div>
  );
};

export default Card;
