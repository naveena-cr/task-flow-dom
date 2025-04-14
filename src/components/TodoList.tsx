
import React from "react";
import TodoItem from "@/components/TodoItem";
import { useTodo } from "@/contexts/TodoContext";
import { ScrollArea } from "@/components/ui/scroll-area";

const TodoList: React.FC = () => {
  const { todos, loading } = useTodo();

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse h-5 w-5 bg-todo-primary rounded-full"></div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <p>No tasks yet. Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[400px] w-full pr-4">
      <div>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </div>
    </ScrollArea>
  );
};

export default TodoList;
