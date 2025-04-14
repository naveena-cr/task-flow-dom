
import React from "react";
import { Todo } from "@/types/todo";
import { Check, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTodo } from "@/contexts/TodoContext";
import { cn } from "@/lib/utils";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodoCompleted, deleteTodo } = useTodo();

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 rounded-md mb-2 transition-all duration-300",
        todo.completed 
          ? "bg-todo-completed" 
          : "bg-white hover:bg-todo-accent"
      )}
    >
      <div className="flex items-center flex-1">
        <Button
          onClick={() => toggleTodoCompleted(todo.id)}
          variant="outline"
          size="icon"
          className={cn(
            "h-6 w-6 rounded-full mr-3 border-2 transition-colors",
            todo.completed 
              ? "bg-green-500 border-green-600 hover:bg-green-600" 
              : "hover:border-todo-primary"
          )}
        >
          {todo.completed && <Check className="h-3 w-3 text-white" />}
        </Button>
        
        <span 
          className={cn("text-lg flex-1 text-left transition-all duration-300", 
            todo.completed && "completed-task"
          )}
        >
          {todo.text}
        </span>
      </div>
      
      <Button
        onClick={() => deleteTodo(todo.id)}
        variant="ghost"
        size="icon"
        className="text-gray-500 hover:text-red-500 hover:bg-red-50"
      >
        <Trash2 className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default TodoItem;
