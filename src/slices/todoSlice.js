import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem("todos")) || [
  { id: 1, text: "Learn React", completed: false },
  { id: 2, text: "Learn Redux Toolkit", completed: false },
  { id: 3, text: "CRUD with localstorage implementation", completed: true },
];

const saveTodoOnLocalStorage = (state) => {
  localStorage.setItem("todos", JSON.stringify(state));
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const { id, text, completed } = action.payload;
      state.push({ id, text, completed });
      saveTodoOnLocalStorage(state);
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.text = text;
      }
      saveTodoOnLocalStorage(state);
    },
    deleteTodo: (state, action) => {
      const { id } = action.payload;
      const newState = state.filter((todo) => todo.id !== id);
      saveTodoOnLocalStorage(newState);
      return newState;
    },
    toggleTodo: (state, action) => {
      const { id } = action.payload;
      const todo = state.find((todo) => todo.id === id);
      if (todo) {
        todo.completed = !todo.completed;
      }
      saveTodoOnLocalStorage(state);
    },
  },
});

export const {addTodo, editTodo, deleteTodo, toggleTodo} = todoSlice.actions;
export default todoSlice.reducer;
