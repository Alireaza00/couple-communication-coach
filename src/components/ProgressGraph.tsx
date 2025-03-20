
import { useState } from "react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend
} from "recharts";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface ProgressData {
  date: string;
  communication: number;
  emotional: number;
  conflict: number;
  overall: number;
}

interface ProgressGraphProps {
  data: ProgressData[];
  className?: string;
}

const ProgressGraph = ({ data, className }: ProgressGraphProps) => {
  const [activeMetrics, setActiveMetrics] = useState<string[]>(["overall"]);
  
  const metrics = [
    { id: "overall", name: "Overall Score", color: "#3B82F6" },
    { id: "communication", name: "Communication", color: "#10B981" },
    { id: "emotional", name: "Emotional Connection", color: "#F59E0B" },
    { id: "conflict", name: "Conflict Resolution", color: "#8B5CF6" },
  ];
  
  const toggleMetric = (metric: string) => {
    if (activeMetrics.includes(metric)) {
      if (activeMetrics.length > 1) {
        setActiveMetrics(activeMetrics.filter(m => m !== metric));
      }
    } else {
      setActiveMetrics([...activeMetrics, metric]);
    }
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex flex-wrap gap-2 mb-4">
        {metrics.map(metric => (
          <Button
            key={metric.id}
            variant={activeMetrics.includes(metric.id) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleMetric(metric.id)}
            className="rounded-full"
            style={{ 
              backgroundColor: activeMetrics.includes(metric.id) ? metric.color : "transparent",
              borderColor: metric.color,
              color: activeMetrics.includes(metric.id) ? "white" : metric.color,
            }}
          >
            {metric.name}
          </Button>
        ))}
      </div>
      
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="date" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#666', fontSize: 12 }}
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              formatter={(value) => [`${value}%`, ""]}
              contentStyle={{
                backgroundColor: 'white',
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                border: 'none',
                padding: '12px',
              }}
            />
            <Legend />
            {metrics.map(metric => (
              activeMetrics.includes(metric.id) && (
                <Line
                  key={metric.id}
                  type="monotone"
                  dataKey={metric.id}
                  name={metric.name}
                  stroke={metric.color}
                  strokeWidth={2}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: metric.color }}
                />
              )
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressGraph;
