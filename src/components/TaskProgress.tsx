
import React from "react";
import { useTodo } from "@/contexts/TodoContext";
import { Progress } from "@/components/ui/progress";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const TaskProgress: React.FC = () => {
  const { todos } = useTodo();
  
  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;
  const completionPercentage = totalCount > 0 
    ? Math.round((completedCount / totalCount) * 100) 
    : 0;
  
  // Data for pie chart
  const data = [
    { name: "Completed", value: completedCount, color: "#4ade80" },
    { name: "Pending", value: totalCount - completedCount, color: "#fb923c" },
  ];

  // Only show the chart if there are tasks
  if (totalCount === 0) {
    return (
      <div className="text-center text-sm text-muted-foreground my-4">
        No tasks yet. Add some tasks to see your progress.
      </div>
    );
  }

  return (
    <div className="mt-4 mb-6 space-y-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium">Task Completion</span>
        <span className="text-sm font-medium">{completionPercentage}%</span>
      </div>
      
      <Progress value={completionPercentage} className="h-2" />
      
      <div className="flex justify-center gap-4 text-sm">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-[#4ade80] rounded-full mr-1"></div>
          <span>Completed ({completedCount})</span>
        </div>
        <div className="flex items-center">
          <div className="h-3 w-3 bg-[#fb923c] rounded-full mr-1"></div>
          <span>Pending ({totalCount - completedCount})</span>
        </div>
      </div>

      <div className="h-40 flex justify-center items-center">
        <ChartContainer
          config={{
            completed: { color: "#4ade80" },
            pending: { color: "#fb923c" },
          }}
          className="w-full max-w-xs"
        >
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={60}
              paddingAngle={2}
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </div>
    </div>
  );
};

export default TaskProgress;
