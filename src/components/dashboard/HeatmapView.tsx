
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Map, Layers, Navigation } from 'lucide-react';

const HeatmapView = () => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle>Traffic Density</CardTitle>
          <CardDescription>Live traffic heatmap across the city</CardDescription>
        </div>
        <div className="flex space-x-1">
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Layers className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Navigation className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Map className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="w-full h-[300px] rounded-md bg-card overflow-hidden relative">
          {/* This would be a real map with heatmap overlay in production */}
          <div className="absolute inset-0 bg-black/80 z-10"></div>
          
          {/* Simulated roads */}
          <div className="absolute inset-0 z-20">
            <div className="w-full h-full relative">
              {/* Main horizontal road */}
              <div className="absolute top-1/2 left-0 w-full h-8 bg-gray-700 transform -translate-y-1/2"></div>
              
              {/* Main vertical road */}
              <div className="absolute top-0 left-1/2 w-8 h-full bg-gray-700 transform -translate-x-1/2"></div>
              
              {/* Secondary horizontal roads */}
              <div className="absolute top-[30%] left-0 w-full h-4 bg-gray-800 transform -translate-y-1/2"></div>
              <div className="absolute top-[70%] left-0 w-full h-4 bg-gray-800 transform -translate-y-1/2"></div>
              
              {/* Secondary vertical roads */}
              <div className="absolute top-0 left-[30%] w-4 h-full bg-gray-800 transform -translate-x-1/2"></div>
              <div className="absolute top-0 left-[70%] w-4 h-full bg-gray-800 transform -translate-x-1/2"></div>
            </div>
          </div>
          
          {/* Heatmap overlay */}
          <div className="absolute inset-0 z-30">
            {/* High traffic area */}
            <div className="absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-red-500/50 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Medium traffic areas */}
            <div className="absolute top-[30%] left-[30%] w-24 h-24 rounded-full bg-orange-500/50 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[70%] left-[70%] w-28 h-28 rounded-full bg-orange-500/50 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Low traffic areas */}
            <div className="absolute top-[20%] left-[80%] w-20 h-20 rounded-full bg-yellow-500/40 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[80%] left-[20%] w-16 h-16 rounded-full bg-yellow-500/40 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            
            {/* Minimal traffic */}
            <div className="absolute top-[10%] left-[10%] w-12 h-12 rounded-full bg-green-500/30 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute top-[90%] left-[90%] w-14 h-14 rounded-full bg-green-500/30 blur-xl transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          
          {/* Legend */}
          <div className="absolute bottom-2 left-2 bg-black/70 rounded p-1 z-40 flex flex-col space-y-1 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-red-500 mr-1"></div>
              <span>High</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-orange-500 mr-1"></div>
              <span>Medium</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-yellow-500 mr-1"></div>
              <span>Low</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-sm bg-green-500 mr-1"></div>
              <span>Minimal</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapView;
