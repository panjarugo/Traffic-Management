
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface VehicleData {
  name: string;
  value: number;
  color: string;
}

const data: VehicleData[] = [
  { name: 'Cars', value: 67, color: '#9b87f5' },
  { name: 'Trucks', value: 15, color: '#6E59A5' },
  { name: 'Motorcycles', value: 10, color: '#1EAEDB' },
  { name: 'Bicycles', value: 5, color: '#33C3F0' },
  { name: 'Pedestrians', value: 3, color: '#F97316' },
];

const VehicleTypeChart = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Vehicle Classification</CardTitle>
        <CardDescription>Current vehicle type distribution</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend 
                verticalAlign="bottom"
                iconType="circle" 
              />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Percentage']}
                contentStyle={{ 
                  backgroundColor: 'rgba(17, 25, 40, 0.8)',
                  borderColor: 'rgba(255, 255, 255, 0.125)',
                  borderRadius: '8px',
                  backdropFilter: 'blur(12px)'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleTypeChart;
