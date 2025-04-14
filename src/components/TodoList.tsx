
import React, { useState } from "react";
import TodoItem from "@/components/TodoItem";
import { useTodo } from "@/contexts/TodoContext";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

type SortOption = "newest" | "oldest" | "dueDate" | "alphabetical";

const TodoList: React.FC = () => {
  const { todos, loading } = useTodo();
  const [sortBy, setSortBy] = useState<SortOption>("newest");

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <div className="animate-pulse h-5 w-5 bg-todo-primary rounded-full"></div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground dark:text-gray-400">
        <p>No tasks yet. Add a new task to get started!</p>
      </div>
    );
  }

  const sortedTodos = [...todos].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return b.createdAt - a.createdAt;
      case "oldest":
        return a.createdAt - b.createdAt;
      case "dueDate":
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "alphabetical":
        return a.text.localeCompare(b.text);
      default:
        return 0;
    }
  });

  return (
    <div>
      <div className="mb-4 flex justify-end">
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
            <SelectItem value="alphabetical">Alphabetical</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ScrollArea className="h-[350px] w-full pr-4">
        <div>
          {sortedTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
