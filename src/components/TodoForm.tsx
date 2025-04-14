
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useTodo } from "@/contexts/TodoContext";

const TodoForm: React.FC = () => {
  const [text, setText] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    addTodo(text);
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full space-x-2 mb-6">
      <Input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new task..."
        className="flex-1"
        autoFocus
      />
      <Button type="submit" className="bg-todo-primary hover:bg-todo-secondary">
        <Plus className="h-5 w-5 mr-1" />
        Add
      </Button>
    </form>
  );
};

export default TodoForm;
