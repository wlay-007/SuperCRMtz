import Style from "./Checkbox.module.scss";
import { useState } from "react";

interface Props {
  title: string;
  completed: boolean;
}

const Checkbox: React.FC<Props> = ({ title, completed }) => {
  const [isChecked, setIsChecked] = useState(completed);

  const handleCheckboxChange = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <label
      className={`${Style.customCheckbox} ${isChecked ? Style.checked : ""}`}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleCheckboxChange}
      />
      <span className={Style.checkmark}></span>
      <p className={Style.task}>{title}</p>
    </label>
  );
};

export default Checkbox;
