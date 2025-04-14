
import { Todo } from "@/types/todo";

const TODO_STORAGE_KEY = "todos";

export const TodoService = {
  getTodos: (): Todo[] => {
    const todosString = localStorage.getItem(TODO_STORAGE_KEY);
    if (!todosString) return [];
    
    try {
      return JSON.parse(todosString);
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
      return [];
    }
  },

  saveTodos: (todos: Todo[]): void => {
    try {
      localStorage.setItem(TODO_STORAGE_KEY, JSON.stringify(todos));
    } catch (error) {
      console.error("Error saving todos to localStorage:", error);
    }
  },

  addTodo: (text: string): Todo => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now()
    };

    const todos = TodoService.getTodos();
    const updatedTodos = [newTodo, ...todos];
    TodoService.saveTodos(updatedTodos);
    
    return newTodo;
  },

  updateTodo: (id: string, updates: Partial<Todo>): Todo | null => {
    const todos = TodoService.getTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) return null;
    
    const updatedTodo = { ...todos[todoIndex], ...updates };
    todos[todoIndex] = updatedTodo;
    TodoService.saveTodos(todos);
    
    return updatedTodo;
  },

  deleteTodo: (id: string): boolean => {
    const todos = TodoService.getTodos();
    const updatedTodos = todos.filter(todo => todo.id !== id);
    
    if (updatedTodos.length === todos.length) return false;
    
    TodoService.saveTodos(updatedTodos);
    return true;
  },

  toggleTodoCompleted: (id: string): Todo | null => {
    const todos = TodoService.getTodos();
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex === -1) return null;
    
    const updatedTodo = { ...todos[todoIndex], completed: !todos[todoIndex].completed };
    todos[todoIndex] = updatedTodo;
    TodoService.saveTodos(todos);
    
    return updatedTodo;
  }
};
