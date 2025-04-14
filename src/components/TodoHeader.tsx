
import React from "react";
import { useTodo } from "@/contexts/TodoContext";
import ThemeToggle from "@/components/ThemeToggle";
import TaskProgress from "@/components/TaskProgress";

const TodoHeader: React.FC = () => {
  const { todos } = useTodo();
  const completedCount = todos.filter(todo => todo.completed).length;
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-2 text-todo-secondary dark:text-violet-300">Task Flow</h1>
        <ThemeToggle />
      </div>
      <div className="flex justify-between text-sm text-muted-foreground dark:text-gray-400">
        <span>Total tasks: {todos.length}</span>
        <span>Completed: {completedCount}</span>
      </div>
      
      <TaskProgress />
    </div>
  );
};

export default TodoHeader;
