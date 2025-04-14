
import React from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";
import TodoHeader from "@/components/TodoHeader";
import { TodoProvider } from "@/contexts/TodoContext";
import { Card, CardContent } from "@/components/ui/card";

const TodoApp: React.FC = () => {
  return (
    <TodoProvider>
      <div className="container max-w-lg mx-auto px-4 py-8">
        <Card className="bg-white/50 backdrop-blur-sm shadow-lg">
          <CardContent className="p-6">
            <TodoHeader />
            <TodoForm />
            <TodoList />
          </CardContent>
        </Card>
      </div>
    </TodoProvider>
  );
};

export default TodoApp;
