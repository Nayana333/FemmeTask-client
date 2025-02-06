import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  name: string;
  email: string;
}

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  user: string;
}

interface AuthTodoState {
  user: UserData | null;
  token: string | null;
  todos: Todo[]; // All todos from the backend
  userTodos: Todo[]; // Todos specific to the logged-in user
}

const initialState: AuthTodoState = {
  user: null,
  token: null,
  todos: [],
  userTodos: [],
};

const authTodoSlice = createSlice({
  name: "authTodo",
  initialState,
  reducers: {
    logged: (state, action: PayloadAction<{ user: UserData; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },

    logout: (state) => {
      state.user = null;
      state.token = null;
      state.todos = [];
      state.userTodos = [];
    },

    updateUser: (state, action: PayloadAction<{ user: UserData }>) => {
      state.user = action.payload.user;
    },

    setTodos: (state, action: PayloadAction<{ todos: Todo[] }>) => {
      state.todos = action.payload.todos;
    },

    setUserTodos: (state, action: PayloadAction<{ userTodos: Todo[] }>) => {
      state.userTodos = action.payload.userTodos;
    },

    addTodo: (state, action: PayloadAction<{ todo: Todo }>) => {
      state.todos.push(action.payload.todo);
      state.userTodos.push(action.payload.todo);
    },

    updateTodo: (state, action: PayloadAction<{ updatedTodo: Todo }>) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.updatedTodo.id ? action.payload.updatedTodo : todo
      );
      state.userTodos = state.userTodos.map((todo) =>
        todo.id === action.payload.updatedTodo.id ? action.payload.updatedTodo : todo
      );
    },

    deleteTodo: (state, action: PayloadAction<{ todoId: string }>) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.todoId);
      state.userTodos = state.userTodos.filter((todo) => todo.id !== action.payload.todoId);
    },
  },
});

export const { logged, logout, updateUser, setTodos, setUserTodos, addTodo, updateTodo, deleteTodo } =
  authTodoSlice.actions;
export default authTodoSlice.reducer;
