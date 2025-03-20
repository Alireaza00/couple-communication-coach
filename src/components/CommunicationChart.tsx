
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { cn } from '@/lib/utils';

interface CommunicationChartProps {
  data: {
    name: string;
    value: number;
    color: string;
  }[];
  className?: string;
}

const CommunicationChart = ({ data, className }: CommunicationChartProps) => {
  return (
    <div className={cn("w-full h-[300px]", className)}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barSize={38}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
          />
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#666', fontSize: 12 }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
              border: 'none',
              padding: '12px',
            }}
            cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
            formatter={(value) => [`${value}%`, 'Score']}
          />
          <Bar dataKey="value" radius={[4, 4, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommunicationChart;
