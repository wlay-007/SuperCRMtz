import React from "react";
import Style from "./Header.module.scss";
import todoStore from "../../store/todo-store";
import Loader from "../Loader/Loader";

interface HeaderProps {
  taskCount: number;
}

const Header: React.FC<HeaderProps> = ({ taskCount }) => {
  const { isLoading } = todoStore;
  return (
    <div className={Style.wrapper}>
      <div className={Style.day}>Today</div>
      {isLoading && <Loader />}
      <div className={Style.infoBlock}>
        <button className={Style.Plusbtn}>+</button>
        <div className={Style.Pagesblock}>{taskCount}</div>
      </div>
    </div>
  );
};

export default Header;
