
import React from "react";
import TodoApp from "@/components/TodoApp";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 to-indigo-100 dark:from-slate-900 dark:to-indigo-950 flex flex-col items-center pt-10">
      <TodoApp />
      <footer className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>Task Flow - A simple ToDo App for your productivity</p>
      </footer>
    </div>
  );
};

export default Index;
