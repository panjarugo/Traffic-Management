
import { useState, useEffect, useRef } from 'react';
import { AlertTriangle, Clock, Car, Activity, Video, FileVideo } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface CameraProps {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline';
  trafficLevel: 'low' | 'medium' | 'high' | 'severe';
  lastUpdated?: string;
  isUpload?: boolean;
  file?: File;
  isStream?: boolean;
  streamUrl?: string;
}

interface CameraFeedProps {
  camera: CameraProps;
}

const CameraFeed = ({ camera }: CameraFeedProps) => {
  const [isLive, setIsLive] = useState(true);
  const [currentTime, setCurrentTime] = useState('');
  const [detections, setDetections] = useState<{
    vehicles: number;
    congestion: boolean;
    incidents: boolean;
  }>({
    vehicles: 0,
    congestion: false,
    incidents: false,
  });
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  // Create object URL for uploaded video files
  useEffect(() => {
    if (camera.file && camera.isUpload) {
      const url = URL.createObjectURL(camera.file);
      setVideoUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [camera.file, camera.isUpload]);

  // Simulate camera feed time updates
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      
      // Simulate changing detections
      if (Math.random() > 0.7) {
        setDetections(prev => ({
          vehicles: Math.floor(Math.random() * 25) + 5,
          congestion: Math.random() > 0.7,
          incidents: Math.random() > 0.9,
        }));
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const trafficLevelColor = {
    low: 'bg-traffic-low',
    medium: 'bg-traffic-medium',
    high: 'bg-traffic-high',
    severe: 'bg-traffic-severe',
  }[camera.trafficLevel];

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base">{camera.name}</CardTitle>
          <p className="text-xs text-muted-foreground">{camera.location}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge 
            variant="outline" 
            className={cn(
              "text-xs font-normal",
              camera.status === 'online' ? "border-green-500 text-green-500" : "border-red-500 text-red-500"
            )}
          >
            {camera.isUpload ? 'UPLOAD' : camera.isStream ? 'STREAM' : camera.status === 'online' ? 'LIVE' : 'OFFLINE'}
          </Badge>
          
          <Badge className={cn("text-xs font-normal", trafficLevelColor, 
            camera.trafficLevel === 'low' || camera.trafficLevel === 'medium' ? "text-black" : "text-white"
          )}>
            {camera.trafficLevel.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="flex-1 pb-2 pt-2 px-3">
        <div className="relative h-full rounded-md overflow-hidden">
          {/* Camera feed or video upload display */}
          <div className="w-full h-full bg-black/60 rounded-md overflow-hidden flex items-center justify-center relative">
            {/* This would be replaced by actual video feed */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
            
            {camera.isUpload && videoUrl ? (
              <video
                ref={videoRef}
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
                onPlay={() => setIsLive(true)}
                onPause={() => setIsLive(false)}
              />
            ) : camera.isStream && camera.streamUrl ? (
              <iframe
                src={camera.streamUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full min-h-[200px]"
                title={camera.name}
              />
            ) : (
              <>
                {/* AI detection overlays for live feeds */}
                {isLive && (
                  <>
                    {/* Car detection boxes */}
                    <div className="absolute top-[20%] left-[30%] w-16 h-10 border-2 border-green-500/70 rounded-sm flex items-center justify-center">
                      <span className="text-[8px] bg-green-500/70 px-1 text-white">CAR</span>
                    </div>
                    
                    <div className="absolute top-[40%] left-[60%] w-14 h-8 border-2 border-green-500/70 rounded-sm flex items-center justify-center">
                      <span className="text-[8px] bg-green-500/70 px-1 text-white">CAR</span>
                    </div>
                    
                    {/* Truck detection */}
                    <div className="absolute top-[50%] left-[15%] w-24 h-14 border-2 border-blue-500/70 rounded-sm flex items-center justify-center">
                      <span className="text-[8px] bg-blue-500/70 px-1 text-white">TRUCK</span>
                    </div>
                    
                    {/* Motorcycle detection */}
                    <div className="absolute top-[65%] left-[45%] w-10 h-6 border-2 border-purple-500/70 rounded-sm flex items-center justify-center">
                      <span className="text-[8px] bg-purple-500/70 px-1 text-white">BIKE</span>
                    </div>
                    
                    {detections.congestion && (
                      <div className="absolute top-[10%] left-[10%] px-2 py-1 bg-yellow-500/80 rounded text-[10px] text-white flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> CONGESTION
                      </div>
                    )}
                    
                    {detections.incidents && (
                      <div className="absolute top-[10%] right-[10%] px-2 py-1 bg-red-500/80 rounded text-[10px] text-white flex items-center">
                        <AlertTriangle className="h-3 w-3 mr-1" /> INCIDENT
                      </div>
                    )}
                  </>
                )}
                
                {/* Feed label/watermark */}
                <div className="absolute top-2 left-2 flex items-center space-x-2">
                  <div className={cn(
                    "h-2 w-2 rounded-full",
                    isLive ? "bg-red-500 animate-pulse" : "bg-gray-500"
                  )}></div>
                  <span className="text-xs text-white/90">{camera.id}</span>
                </div>
                
                <div className="absolute bottom-2 left-2 text-xs text-white/90 flex items-center">
                  <Clock className="h-3 w-3 mr-1" /> {currentTime}
                </div>
                
                {detections.vehicles > 0 && (
                  <div className="absolute bottom-2 right-2 text-xs text-white/90 flex items-center">
                    <Car className="h-3 w-3 mr-1" /> {detections.vehicles} vehicles
                  </div>
                )}
                
                <div className="text-center">
                  {camera.isUpload ? (
                    <FileVideo className="h-10 w-10 text-muted-foreground/50 mx-auto" />
                  ) : camera.isStream ? (
                    <Video className="h-10 w-10 text-muted-foreground/50 mx-auto" />
                  ) : (
                    <Activity className="h-10 w-10 text-muted-foreground/50 mx-auto" />
                  )}
                  <p className="text-xs text-muted-foreground mt-2">
                    {camera.isUpload ? 'Uploaded Video' : camera.isStream ? 'Live Stream' : 'Live Camera Feed'}
                  </p>
                  {!isLive && <p className="text-xs text-red-400">Feed paused</p>}
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-2 pb-3">
        <div className="w-full">
          <Tabs defaultValue="live" className="w-full">
            <TabsList className="w-full">
              <TabsTrigger value="live" className="w-1/3" onClick={() => setIsLive(true)}>Live</TabsTrigger>
              <TabsTrigger value="analysis" className="w-1/3" onClick={() => setIsLive(false)}>Analysis</TabsTrigger>
              <TabsTrigger value="history" className="w-1/3" onClick={() => setIsLive(false)}>History</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="flex items-center justify-between mt-3">
            <Button variant="outline" size="sm">
              <AlertTriangle className="h-4 w-4 mr-1" />
              Report
            </Button>
            
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Clock className="h-4 w-4" />
              </Button>
              <Button variant="default" size="sm">
                Full View
              </Button>
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CameraFeed;
