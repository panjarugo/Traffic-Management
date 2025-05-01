
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const StatCard = ({ title, value, icon, trend, className }: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  "text-xs",
                  trend.isPositive ? "text-traffic-low" : "text-traffic-alert"
                )}>
                  {trend.isPositive ? '↑' : '↓'} {trend.value}%
                </span>
                <span className="text-xs text-muted-foreground ml-1">vs last hour</span>
              </div>
            )}
          </div>
          
          <div className="p-3 rounded-lg bg-accent/30 text-primary">
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;
