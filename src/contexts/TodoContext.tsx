
import React, { createContext, useContext, useState, useEffect } from "react";
import { Todo } from "@/types/todo";
import { TodoService } from "@/services/todoService";
import { useToast } from "@/components/ui/use-toast";

interface TodoContextType {
  todos: Todo[];
  addTodo: (text: string) => void;
  updateTodo: (id: string, updates: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
  toggleTodoCompleted: (id: string) => void;
  reorderTodos: (sourceIndex: number, destinationIndex: number) => void;
  loading: boolean;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  // Load todos from localStorage on component mount
  useEffect(() => {
    try {
      const loadedTodos = TodoService.getTodos();
      setTodos(loadedTodos);
    } catch (error) {
      console.error("Failed to load todos:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load your tasks."
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    
    try {
      const newTodo = TodoService.addTodo(text);
      setTodos(prevTodos => [newTodo, ...prevTodos]);
      toast({
        title: "Task added",
        description: "Your new task has been added."
      });
    } catch (error) {
      console.error("Failed to add todo:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to add your task."
      });
    }
  };

  const updateTodo = (id: string, updates: Partial<Todo>) => {
    try {
      const updatedTodo = TodoService.updateTodo(id, updates);
      if (updatedTodo) {
        setTodos(prevTodos => 
          prevTodos.map(todo => todo.id === id ? updatedTodo : todo)
        );
        
        // Only show toast for text updates, not for due date changes to avoid too many notifications
        if (updates.text) {
          toast({
            title: "Task updated",
            description: "Your task has been updated."
          });
        }
      }
    } catch (error) {
      console.error("Failed to update todo:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update your task."
      });
    }
  };

  const deleteTodo = (id: string) => {
    try {
      const success = TodoService.deleteTodo(id);
      if (success) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
        toast({
          title: "Task deleted",
          description: "Your task has been removed."
        });
      }
    } catch (error) {
      console.error("Failed to delete todo:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete your task."
      });
    }
  };

  const toggleTodoCompleted = (id: string) => {
    try {
      const updatedTodo = TodoService.toggleTodoCompleted(id);
      if (updatedTodo) {
        setTodos(prevTodos => 
          prevTodos.map(todo => todo.id === id ? updatedTodo : todo)
        );
        toast({
          title: updatedTodo.completed ? "Task completed" : "Task uncompleted",
          description: updatedTodo.completed 
            ? "Great job! Task marked as completed." 
            : "Task marked as not completed."
        });
      }
    } catch (error) {
      console.error("Failed to toggle todo completion:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update your task."
      });
    }
  };

  // New function to reorder todos
  const reorderTodos = (sourceIndex: number, destinationIndex: number) => {
    try {
      const reorderedTodos = TodoService.reorderTodos(sourceIndex, destinationIndex);
      if (reorderedTodos) {
        setTodos(reorderedTodos);
      }
    } catch (error) {
      console.error("Failed to reorder todos:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to reorder your tasks."
      });
    }
  };

  return (
    <TodoContext.Provider value={{
      todos,
      addTodo,
      updateTodo,
      deleteTodo,
      toggleTodoCompleted,
      reorderTodos,
      loading
    }}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
