import {
  createSlice,
  type PayloadAction,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { todoService } from "../services/todos";
import type { RootState } from "./store";
import type { Todo, TodoState } from "../types/todo";

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
  searchResults: [],
};

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await todoService.getAllTodos(token);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const searchTodos = createAsyncThunk(
  "todos/searchTodos",
  async (params: unknown, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await todoService.searchTodos(token, params);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const addTodo = createAsyncThunk(
  "todos/addTodo",
  async (
    { title, description }: { title: string; description: string },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await todoService.createTodo(token, title, description);
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async (
    {
      id,
      title,
      description,
      completed,
    }: { id: number; title: string; description: string; completed?: boolean },
    { getState, rejectWithValue }
  ) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        throw new Error("No authentication token found");
      }
      const response = await todoService.updateTodo(
        token,
        id,
        title,
        description,
        completed
      );
      return response;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",
  async (id: number, { getState, rejectWithValue }) => {
    try {
      const state = getState() as RootState;
      const token = state.auth.token;
      if (!token) {
        throw new Error("No authentication token found");
      }
      await todoService.deleteTodo(token, id);
      return id;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue("An unknown error occurred");
    }
  }
);

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action: PayloadAction<Todo[]>) => {
        state.loading = false;
        state.todos = action.payload.sort(
          (a, b) =>
            new Date(b.created_at as string).getTime() -
            new Date(a.created_at as string).getTime()
        );
      })
      .addCase(fetchTodos.rejected, (state, action: PayloadAction<unknown>) => {
        state.loading = false;
        state.error = action.payload as string | null;
      })
      .addCase(searchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        searchTodos.fulfilled,
        (state, action: PayloadAction<Todo[]>) => {
          state.loading = false;
          state.searchResults = action.payload;
        }
      )
      .addCase(
        searchTodos.rejected,
        (state, action: PayloadAction<unknown>) => {
          state.loading = false;
          state.error = action.payload as string | null;
        }
      )
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        state.todos.unshift(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<Todo>) => {
        const index = state.todos.findIndex(
          (todo) => todo.id === action.payload.id
        );
        if (index !== -1) {
          state.todos[index] = action.payload;
          const searchIndex = state.searchResults.findIndex(
            (todo) => todo.id === action.payload.id
          );
          if (searchIndex !== -1) {
            state.searchResults[searchIndex] = action.payload;
          }
        }
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
