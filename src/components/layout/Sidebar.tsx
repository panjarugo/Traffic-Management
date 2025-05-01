
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  Camera, 
  Car, 
  Clock, 
  AlertTriangle, 
  LineChart, 
  Map, 
  Settings, 
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';

type SidebarItemProps = {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  alert?: boolean;
};

const SidebarItem = ({ icon: Icon, label, href, active, alert }: SidebarItemProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to={href}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-200",
              active 
                ? "bg-primary text-primary-foreground" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <div className="relative">
              <Icon size={22} />
              {alert && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-traffic-alert animate-pulse" />
              )}
            </div>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const Sidebar = () => {
  return (
    <div className="fixed left-0 h-screen w-16 flex flex-col bg-sidebar py-6 px-2 z-50">
      <div className="mb-8 flex items-center justify-center">
        <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
          <span className="text-xl font-bold text-primary-foreground">UE</span>
        </div>
      </div>
      
      <nav className="flex flex-col items-center space-y-2">
        <SidebarItem icon={BarChart3} label="Dashboard" href="/" active={true} />
        <SidebarItem icon={Camera} label="Live Cameras" href="/cameras" />
        <SidebarItem icon={Car} label="Traffic Flow" href="/traffic-flow" />
        <SidebarItem icon={Clock} label="Trends" href="/trends" />
        <SidebarItem icon={AlertTriangle} label="Incidents" href="/incidents" alert={true} />
        
        <Separator className="my-4 bg-border/50" />
        
        <SidebarItem icon={LineChart} label="Analytics" href="/analytics" />
        <SidebarItem icon={Map} label="Map View" href="/map" />
      </nav>
      
      <div className="mt-auto flex flex-col items-center space-y-2">
        <SidebarItem icon={Settings} label="Settings" href="/settings" />
        <SidebarItem icon={HelpCircle} label="Help" href="/help" />
      </div>
    </div>
  );
};

export default Sidebar;
