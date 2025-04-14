
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
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";

type SortOption = "newest" | "oldest" | "dueDate" | "alphabetical";

const TodoList: React.FC = () => {
  const { todos, loading, reorderTodos } = useTodo();
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [isDragging, setIsDragging] = useState(false);

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

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    
    // Dropped outside the list
    if (!result.destination) {
      return;
    }

    // If using a sort option other than manual, don't allow reordering
    if (sortBy !== "newest") {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Only reorder if the position actually changed
    if (sourceIndex !== destinationIndex) {
      reorderTodos(sourceIndex, destinationIndex);
    }
  };

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          {sortBy !== "newest" ? (
            <span>Sorting by <span className="font-semibold">{sortBy}</span></span>
          ) : (
            <span>Drag tasks to reorder</span>
          )}
        </div>
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
        <DragDropContext 
          onDragEnd={handleDragEnd}
          onDragStart={() => setIsDragging(true)}
        >
          <Droppable droppableId="todo-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={isDragging ? "bg-gray-50 dark:bg-gray-800/50 rounded-lg p-1" : ""}
              >
                {sortedTodos.map((todo, index) => (
                  <Draggable 
                    key={todo.id} 
                    draggableId={todo.id} 
                    index={index}
                    isDragDisabled={sortBy !== "newest"}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={`mb-2 ${snapshot.isDragging ? "opacity-70" : ""}`}
                      >
                        <div className="flex items-center">
                          <div
                            {...provided.dragHandleProps}
                            className={`mr-1 p-1 rounded cursor-grab ${sortBy === "newest" ? "visible" : "invisible"} text-gray-400 hover:text-gray-600 dark:hover:text-gray-300`}
                          >
                            <GripVertical size={16} />
                          </div>
                          <div className="flex-grow">
                            <TodoItem todo={todo} />
                          </div>
                        </div>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </ScrollArea>
    </div>
  );
};

export default TodoList;
