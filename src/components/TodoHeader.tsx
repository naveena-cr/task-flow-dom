
import React from "react";
import { useTodo } from "@/contexts/TodoContext";

const TodoHeader: React.FC = () => {
  const { todos } = useTodo();
  const completedCount = todos.filter(todo => todo.completed).length;
  
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold mb-2 text-todo-secondary">Task Flow</h1>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Total tasks: {todos.length}</span>
        <span>Completed: {completedCount}</span>
      </div>
    </div>
  );
};

export default TodoHeader;
