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
//   return (
//     <div className="bg-white rounded-lg shadow-md p-6">
//       <h3 className="text-lg font-medium text-gray mb-4">{title}</h3>
//       <div className="h-64">
//         <ResponsiveContainer width="100%" height="100%">
//           <PieChart>
//             <Pie
//               data={data}
//               cx="50%"
//               cy="50%"
//               labelLine={false}
//               outerRadius={80}
//               fill="#8884d8"
//               dataKey="value"
//               label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//             >
//               {data.map((entry, index) => (
//                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//             <Legend />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>
//     </div>
//   );
const renderChart = () => {
    if (type === "pie") {
      return (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
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
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value: number) => [`${value}`, 'Count']}
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Bar dataKey="value" fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
      <CardHeader title={title} />
      <CardContent>
        {renderChart()}
      </CardContent>
    </Card>
  );
};

export default ChartWidget;

