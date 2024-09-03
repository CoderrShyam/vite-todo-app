import React from "react";
import PropTypes from "prop-types";
import deleteLogo from "../assets/delete.png";
import tick from "../assets/tick.png";
import nonTick from "../assets/not_tick.png";

const TodoItems = ({
  id,
  text,
  editTodo,
  deleteTodo,
  isCompleted,
  toggleIsCompleted,
}) => {
  const truncateText = (text, maxLength) => {
    if (typeof text !== "string") {
      return "";
    }
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  const [showFullText, setShowFullText] = React.useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <div className="flex items-center justify-between my-3 gap-2">
      <div className="flex items-center gap-2 w-fit">
        <img
          src={isCompleted ? tick : nonTick}
          alt="completed"
          height={24}
          width={24}
          className="cursor-pointer"
          onClick={() => toggleIsCompleted(id)}
        />
        <p
          className={`text-slate-700 ml-1 text-[17px] decoration-slate-500 ${
            isCompleted && "line-through"
          }`}
          title={text}
          onClick={toggleText}
        >
          {showFullText ? text : truncateText(text, 28)}
        </p>
      </div>

      <div className="flex items-center justify-center gap-2">
        <div
          onClick={() => editTodo(id)}
          className="cursor-pointer"
          title="Edit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={18}
            height={18}
            color={"#909090"}
            fill={"none"}
          >
            <path
              d="M14.0737 3.88545C14.8189 3.07808 15.1915 2.6744 15.5874 2.43893C16.5427 1.87076 17.7191 1.85309 18.6904 2.39232C19.0929 2.6158 19.4769 3.00812 20.245 3.79276C21.0131 4.5774 21.3972 4.96972 21.6159 5.38093C22.1438 6.37312 22.1265 7.57479 21.5703 8.5507C21.3398 8.95516 20.9446 9.33578 20.1543 10.097L10.7506 19.1543C9.25288 20.5969 8.504 21.3182 7.56806 21.6837C6.63212 22.0493 5.6032 22.0224 3.54536 21.9686L3.26538 21.9613C2.63891 21.9449 2.32567 21.9367 2.14359 21.73C1.9615 21.5234 1.98636 21.2043 2.03608 20.5662L2.06308 20.2197C2.20301 18.4235 2.27297 17.5255 2.62371 16.7182C2.97444 15.9109 3.57944 15.2555 4.78943 13.9445L14.0737 3.88545Z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M13 4L20 11"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M14 22L22 22"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div
          onClick={() => {
            const response = confirm(
              `Are you sure you want to delete this Todo?`
            );
            if (response) {
              deleteTodo(id);
            }
          }}
          className="cursor-pointer"
          title="Delete"
        >
          <img src={deleteLogo} alt="Delete" height={15} width={15} />
        </div>
      </div>
    </div>
  );
};

TodoItems.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
  editTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  toggleIsCompleted: PropTypes.func.isRequired,
};

export default TodoItems;
