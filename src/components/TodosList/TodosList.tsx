import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import todoStore from "../../store/todo-store";
import { observer } from "mobx-react-lite";
import Style from "./TodosList.module.scss";
import Card from "../Card/Card";
import Header from "../Header/Header";
import { debounce } from "lodash";

const TodosList: React.FunctionComponent = observer(() => {
  const { todos, isLoading } = todoStore;
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const listRef = useRef<HTMLUListElement>(null);
  const controls = useAnimation();

  const handleScroll = debounce(() => {
    console.log("scroll");
    const list = listRef.current;
    if (list) {
      const { scrollTop, clientHeight, scrollHeight } = list;
      if (scrollTop + clientHeight >= scrollHeight && !isLoading) {
        setPage((prevPage) => prevPage + 1);
      }
    }
  }, 160);

  useEffect(() => {
    todoStore.getTodosAction(page, limit);
  }, [page, limit]);
  useEffect(() => {
    const list = listRef.current;
    if (list) {
      list.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (list) {
        list.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const variants = {
    hidden: { opacity: 0, y: 0 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      <div className={Style.wrapper}>
        <Header taskCount={todos.length} />
        <ul className={Style.list} ref={listRef}>
          {todos.map((todo, index) => (
            <motion.li
              key={todo.id}
              viewport={{ once: true }}
              custom={index}
              initial="hidden"
              whileInView="visible"
              animate={controls}
              variants={variants}
              transition={{ delay: (index / page) * 0.05 }}
            >
              <motion.div>
                <Card todo={todo} />
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </div>
    </>
  );
});

export default TodosList;
