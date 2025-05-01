
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '06:00', volume: 250 },
  { time: '07:00', volume: 470 },
  { time: '08:00', volume: 750 },
  { time: '09:00', volume: 620 },
  { time: '10:00', volume: 500 },
  { time: '11:00', volume: 470 },
  { time: '12:00', volume: 550 },
  { time: '13:00', volume: 580 },
  { time: '14:00', volume: 520 },
  { time: '15:00', volume: 510 },
  { time: '16:00', volume: 600 },
  { time: '17:00', volume: 780 },
  { time: '18:00', volume: 650 },
  { time: '19:00', volume: 420 },
  { time: '20:00', volume: 300 },
];

const TrafficFlowChart = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle>Traffic Flow</CardTitle>
        <CardDescription>Hourly vehicle counts from all cameras</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 5,
              right: 10,
              left: 0,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#9b87f5" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#9b87f5" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))' }}
            />
            <CartesianGrid 
              strokeDasharray="3 3" 
              vertical={false}
              stroke="hsl(var(--border))"
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(17, 25, 40, 0.8)',
                borderColor: 'rgba(255, 255, 255, 0.125)',
                borderRadius: '8px',
                backdropFilter: 'blur(12px)'
              }}
              formatter={(value) => [`${value} vehicles`, 'Volume']}
              labelFormatter={(label) => `Time: ${label}`}
            />
            <Area 
              type="monotone" 
              dataKey="volume" 
              stroke="#9b87f5" 
              fillOpacity={1} 
              fill="url(#colorVolume)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TrafficFlowChart;
