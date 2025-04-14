
import React, { useState } from "react";
import { Todo } from "@/types/todo";
import { Check, Trash2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTodo } from "@/contexts/TodoContext";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleTodoCompleted, deleteTodo, updateTodo } = useTodo();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleEditSave = () => {
    if (editedText.trim() !== "") {
      updateTodo(todo.id, { text: editedText });
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleEditSave();
    } else if (e.key === "Escape") {
      setIsEditing(false);
      setEditedText(todo.text);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    updateTodo(todo.id, { dueDate: date || null });
  };

  return (
    <div 
      className={cn(
        "flex items-center justify-between p-4 rounded-md transition-all duration-300",
        todo.completed 
          ? "bg-todo-completed" 
          : "bg-white hover:bg-todo-accent dark:bg-gray-800 dark:hover:bg-gray-700"
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
              : "hover:border-todo-primary dark:border-gray-600"
          )}
        >
          {todo.completed && <Check className="h-3 w-3 text-white" />}
        </Button>
        
        {isEditing ? (
          <Input
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            onBlur={handleEditSave}
            onKeyDown={handleKeyDown}
            className="flex-1"
            autoFocus
          />
        ) : (
          <span 
            onClick={() => setIsEditing(true)}
            className={cn(
              "text-lg flex-1 text-left transition-all duration-300 cursor-pointer hover:text-todo-primary", 
              todo.completed && "completed-task"
            )}
          >
            {todo.text}
          </span>
        )}
      </div>
      
      <div className="flex items-center">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "text-gray-500 hover:text-todo-primary hover:bg-todo-accent/50 mr-1",
                todo.dueDate && "text-todo-primary"
              )}
            >
              <Calendar className="h-5 w-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <CalendarComponent
              mode="single"
              selected={todo.dueDate || undefined}
              onSelect={handleDateSelect}
              initialFocus
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={() => deleteTodo(todo.id)}
          variant="ghost"
          size="icon"
          className="text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default TodoItem;
