export interface Todo {
  id?: number;
  title: string;
  description: string;
  completed?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
  searchResults: Todo[];
}

export interface TodoFormData {
  title: string;
  description: string;
}

export interface TodoFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
}

export interface TodoListProps {
  todos: Todo[];
  onUpdate: (id: number, title: string, description: string, completed?: boolean) => void;
  onDelete: (id: number) => void;
}