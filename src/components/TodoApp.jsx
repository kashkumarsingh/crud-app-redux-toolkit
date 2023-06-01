import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, editTodo, toggleTodo } from "../slices/todoSlice";

const TodoApp = () => {
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (text.trim() !== "") {
      const id = Date.now();
      const completed = false;
      dispatch(addTodo({ id, text, completed }));
      setText("");
    } else {
      alert("Cannot add an empty todo");
      return;
    }
  };

  const handleEditTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      setText(todo.text);
      setEditId(id);
    }
  };

  const handleUpdateTodo = (e) => {
    e.preventDefault();

    if (text.trim() !== "" && editId !== null) {
      dispatch(editTodo({ id: editId, text }));
      setText("");
      setEditId(null);
    } else {
      alert("Cannot update an empty todo");
      return;
    }
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo({ id }));
  };

  const handleToggleTodo = (id) => {
    dispatch(toggleTodo({ id }));
  };

  return (
    <div className="todo-app__inner text-center flex flex-col justify-center items-center h-screen">
      <h2 className="text-2xl font-sans font-bold mb-4">Todo List using React Redux and Redux Toolkit</h2>
      <div className="todo-form mb-4">
        <form onSubmit={editId !== null ? handleUpdateTodo : handleAddTodo}>
          <input
            type="text"
            value={text}
            onChange={handleInputChange}
            placeholder="Enter todo text"
            className="px-4 py-2 border-gray-100 border-2"
          />
          <button type="submit" className="bg-green-700 text-white px-4 py-2">
            {editId !== null ? "Update Todo" : "Add Todo"}
          </button>
        </form>
      </div>
      <div className="overflow-y-auto max-h-full">
        <ul className="flex flex-col justify-center">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-700 text-white px-2 py-2 mb-4"
            >
              <span
                className={
                  todo.completed
                    ? "line-through cursor-pointer mr-4 p-2"
                    : "none cursor-pointer mr-4 p-2"
                }
                onClick={() => handleToggleTodo(todo.id)}
              >
                {todo.text}
              </span>
              <div className="todo-actions flex justify-between gap-4 items-center">
                <button
                  type="button"
                  className="bg-yellow-700 text-white px-4 py-2"
                  onClick={() => handleEditTodo(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                    <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="bg-red-700 text-white px-4 py-2"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
export default TodoApp;
