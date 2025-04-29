// src/components/dashboard/ChartWidget.tsx
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip,BarChart,Bar, XAxis,YAxis} from 'recharts';
import { Card, CardContent, CardHeader } from "@mui/material";

interface ChartData {
    name: string;
    value: number;
  }
interface ChartWidgetProps {
  data:ChartData[];
  title: string;
  type: "pie" | "bar";
  className?: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



const ChartWidget: React.FC<ChartWidgetProps> = ({ data, title ,type, className }) => {
const renderChart = () => {
    if (type === "pie") {
      return (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={60}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value}`, 'Count']}
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      );
    }
    
    if (type === "bar") {
      return (
        <ResponsiveContainer width="100%" height={280}>
                  <BarChart 
          data={data}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false}
            tick={{ fill: '#9CA3AF' }}
          />
          
          <Bar 
            dataKey="value" 
            barSize={30} 
            radius={[4, 4, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell 
                key={`cell-${index}`} 
                fill={COLORS[index % COLORS.length]} 
              />
            ))}
          </Bar>
        </BarChart>
        </ResponsiveContainer>
      );
    }
    
    return null;
  };
  return (
    <Card className={className}>
      <CardHeader className='bg-[#0b102c] text-white' title={title} />
      <CardContent className='bg-[#0b102c] text-white'>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ChartWidget;

