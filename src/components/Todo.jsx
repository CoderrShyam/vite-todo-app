import React from "react";
import TodoItems from "./TodoItems";
import todoIcon from "../assets/todo_icon.png"

const Todo = () => {
  const [todoList, setTodoList] = React.useState(
    localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : []
  );
  const InputRef = React.useRef(null);

  const addTodo = () => {
    const inputText = InputRef.current.value.trim();
    InputRef.current.value = "";

    if (inputText === "") {
      alert("Invalid Todo.");
      return;
    }

    const isTodoExists = todoList.some(
      (todo) => todo.text.toLowerCase() === inputText.toLowerCase()
    );

    if (isTodoExists) {
      alert("Todo already exists.");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
    };

    setTodoList((prevTodo) => [...prevTodo, newTodo]);
  };

  const deleteTodo = (id) => {
    setTodoList((todos) => todos.filter((todo) => todo.id !== id));
  };

  const toggleIsCompleted = (id) => {
    setTodoList((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const editTodo = (id) => {
    setTodoList((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          InputRef.current.value = todo.text;
          deleteTodo(id);
        }
        return todo;
      })
    );
  };

  React.useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo();
    }
  };

  return (
      <div className="bg-white text-black place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-[550px] rounded-xl shadow-xl">
        <div className="flex items-center mt-5 gap-2">
          <img src={todoIcon} alt="logo" height={30} width={30} />
          <h1 className="text-3xl font-bold">To-Do List</h1>
        </div>

        <div className="flex items-center my-7 bg-gray-200 rounded-full">
          <input
            type="text"
            ref={InputRef}
            placeholder="Add your Task"
            className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
            onKeyDown={handleKeyDown}
          />
          <button
            className="border-none rounded-full bg-orange-600 hover:bg-orange-700 transition-all w-32 h-14 text-white font-semibold text-lg cursor-pointer"
            onClick={addTodo}
          >
            Add +
          </button>
        </div>

        <div>
          {todoList.map((todo, idx) => (
            <TodoItems
              key={idx}
              id={todo.id}
              text={todo.text}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              isCompleted={todo.isCompleted}
              toggleIsCompleted={toggleIsCompleted}
            />
          ))}
        </div>
      </div>

  );
};

export default Todo;
