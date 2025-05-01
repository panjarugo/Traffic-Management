
import { AlertTriangle, Clock } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type IncidentType = 'accident' | 'congestion' | 'debris' | 'violation';
export type SeverityLevel = 'low' | 'medium' | 'high' | 'severe';

export interface Incident {
  id: string;
  type: IncidentType;
  location: string;
  timestamp: string;
  status: 'active' | 'resolved';
  severity: SeverityLevel;
  description: string;
  cameraId: string;
}

interface IncidentCardProps {
  incident: Incident;
}

const getSeverityColor = (severity: SeverityLevel): string => {
  switch (severity) {
    case 'low': return 'bg-traffic-low text-black';
    case 'medium': return 'bg-traffic-medium text-black';
    case 'high': return 'bg-traffic-high text-white';
    case 'severe': return 'bg-traffic-severe text-white';
    default: return 'bg-traffic-medium';
  }
};

const getIncidentIcon = (type: IncidentType) => {
  return <AlertTriangle className="h-4 w-4" />;
};

const getIncidentTitle = (type: IncidentType): string => {
  switch (type) {
    case 'accident': return 'Traffic Accident';
    case 'congestion': return 'Traffic Congestion';
    case 'debris': return 'Road Debris';
    case 'violation': return 'Traffic Violation';
    default: return 'Incident';
  }
};

const IncidentCard = ({ incident }: IncidentCardProps) => {
  const isActive = incident.status === 'active';
  
  return (
    <Card className={cn(
      "bg-card border transition-all duration-200",
      isActive && "border-traffic-alert/30 shadow-sm shadow-traffic-alert/20"
    )}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <div className={cn(
              "w-8 h-8 rounded-md flex items-center justify-center mr-2",
              `bg-${incident.type} bg-opacity-20`
            )}>
              {getIncidentIcon(incident.type)}
            </div>
            <div>
              <h3 className="font-medium text-sm">{getIncidentTitle(incident.type)}</h3>
              <p className="text-xs text-muted-foreground">{incident.location}</p>
            </div>
          </div>
          
          <Badge className={cn(
            "text-xs font-normal",
            getSeverityColor(incident.severity)
          )}>
            {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
          </Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {incident.description}
        </p>
      </CardContent>
      
      <CardFooter className="px-4 py-2 border-t border-border/50 flex justify-between">
        <div className="flex items-center text-xs text-muted-foreground">
          <Clock className="h-3 w-3 mr-1" />
          {incident.timestamp}
        </div>
        
        <Badge variant={isActive ? "destructive" : "outline"} className="text-xs">
          {isActive ? 'Active' : 'Resolved'}
        </Badge>
      </CardFooter>
    </Card>
  );
};

export default IncidentCard;
