
import React, { useState } from 'react';
import { Camera, Upload, AlertTriangle, Video } from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import CameraFeed from '@/components/dashboard/CameraFeed';
import { mockCameras } from '@/services/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

const Cameras = () => {
  const [activeTab, setActiveTab] = useState('live');
  const [uploadedVideos, setUploadedVideos] = useState<File[]>([]);
  const [customCameras, setCustomCameras] = useState(mockCameras);
  const [newStreamName, setNewStreamName] = useState('');
  const [newStreamLocation, setNewStreamLocation] = useState('');
  const [newStreamUrl, setNewStreamUrl] = useState('');
  
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedVideos(prev => [...prev, ...newFiles]);
      
      // Create a custom camera for each uploaded video
      const newCustomCameras = newFiles.map((file, index) => ({
        id: `UPLOAD-${Date.now()}-${index}`,
        name: file.name.replace(/\.[^/.]+$/, ""),
        location: 'Custom Upload',
        status: 'online' as const,
        trafficLevel: 'medium' as const,
        lastUpdated: new Date().toISOString(),
        isUpload: true,
        file
      }));
      
      setCustomCameras(prev => [...prev, ...newCustomCameras]);
      toast.success(`${newFiles.length} video${newFiles.length !== 1 ? 's' : ''} uploaded successfully`);
    }
  };

  const handleAddStream = () => {
    if (!newStreamName || !newStreamUrl) {
      toast.error("Please provide both a name and URL for the stream");
      return;
    }

    // Process the YouTube URL if needed
    let processedUrl = newStreamUrl;
    // If it's a standard YouTube URL, convert to embed format
    if (processedUrl.includes('youtube.com/watch?v=')) {
      const videoId = processedUrl.split('v=')[1]?.split('&')[0];
      if (videoId) {
        processedUrl = `https://www.youtube.com/embed/${videoId}`;
      }
    }

    const newStreamCamera = {
      id: `STREAM-${Date.now()}`,
      name: newStreamName,
      location: newStreamLocation || 'Unknown Location',
      status: 'online' as const,
      trafficLevel: 'medium' as const,
      lastUpdated: new Date().toISOString(),
      isStream: true,
      streamUrl: processedUrl
    };

    setCustomCameras(prev => [...prev, newStreamCamera]);
    setNewStreamName('');
    setNewStreamLocation('');
    setNewStreamUrl('');
    toast.success('New camera stream added successfully');
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Traffic Cameras</h1>
        <p className="text-muted-foreground">
          View live camera feeds and manage video uploads
        </p>
      </div>

      <Tabs defaultValue="live" className="mb-6" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="live">Live Cameras ({customCameras.filter(c => c.status === 'online' && !c.isUpload).length})</TabsTrigger>
          <TabsTrigger value="uploads">Uploaded Videos ({uploadedVideos.length})</TabsTrigger>
          <TabsTrigger value="streams">Camera Streams ({customCameras.filter(c => c.isStream).length})</TabsTrigger>
          <TabsTrigger value="all">All Sources ({customCameras.length})</TabsTrigger>
        </TabsList>
        
        <TabsContent value="live" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Live Traffic Camera Feeds</h2>
          </div>
        </TabsContent>
        
        <TabsContent value="uploads" className="mt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-lg font-medium">Uploaded Traffic Videos</h2>
            <div className="flex gap-4 items-center">
              <label htmlFor="video-upload" className="cursor-pointer">
                <div className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md">
                  <Upload size={18} />
                  <span className="text-sm font-medium">Upload Videos</span>
                </div>
                <Input 
                  id="video-upload" 
                  type="file" 
                  accept="video/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleFileUpload}
                />
              </label>
            </div>
          </div>
          
          {uploadedVideos.length === 0 && (
            <Card className="border-dashed border-2 bg-accent/30">
              <CardContent className="py-8">
                <div className="text-center">
                  <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">No videos uploaded</h3>
                  <p className="text-muted-foreground mb-4">Upload traffic videos to analyze them with AI</p>
                  <label htmlFor="video-upload-empty" className="cursor-pointer">
                    <Button>
                      <Upload className="mr-2 h-4 w-4" /> Upload Videos
                    </Button>
                    <Input 
                      id="video-upload-empty" 
                      type="file" 
                      accept="video/*" 
                      multiple 
                      className="hidden" 
                      onChange={handleFileUpload} 
                    />
                  </label>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="streams" className="mt-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 className="text-lg font-medium">Public Camera Streams</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Video className="mr-2 h-4 w-4" /> Add Camera Stream
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Camera Stream</DialogTitle>
                  <DialogDescription>
                    Add a public traffic camera stream using a URL. You can use YouTube live streams, public DOT cameras, or other public video streams.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input 
                      id="name" 
                      placeholder="e.g. NYC Times Square" 
                      className="col-span-3"
                      value={newStreamName}
                      onChange={(e) => setNewStreamName(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="location" className="text-right">Location</Label>
                    <Input 
                      id="location" 
                      placeholder="e.g. New York City"  
                      className="col-span-3"
                      value={newStreamLocation}
                      onChange={(e) => setNewStreamLocation(e.target.value)}
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="url" className="text-right">Stream URL</Label>
                    <Input 
                      id="url" 
                      placeholder="e.g. https://www.youtube.com/watch?v=..."  
                      className="col-span-3"
                      value={newStreamUrl}
                      onChange={(e) => setNewStreamUrl(e.target.value)}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={handleAddStream}>Add Stream</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
          
          {customCameras.filter(c => c.isStream).length === 0 && (
            <Card className="border-dashed border-2 bg-accent/30">
              <CardContent className="py-8">
                <div className="text-center">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                  <h3 className="text-lg font-medium mb-1">No camera streams added</h3>
                  <p className="text-muted-foreground mb-4">Add public camera streams to monitor real-time traffic conditions</p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>
                        <Video className="mr-2 h-4 w-4" /> Add Camera Stream
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      {/* Same dialog content as above */}
                      <DialogHeader>
                        <DialogTitle>Add Camera Stream</DialogTitle>
                        <DialogDescription>
                          Add a public traffic camera stream using a URL. You can use YouTube live streams, public DOT cameras, or other public video streams.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="name-empty" className="text-right">Name</Label>
                          <Input 
                            id="name-empty" 
                            placeholder="e.g. NYC Times Square" 
                            className="col-span-3"
                            value={newStreamName}
                            onChange={(e) => setNewStreamName(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="location-empty" className="text-right">Location</Label>
                          <Input 
                            id="location-empty" 
                            placeholder="e.g. New York City"  
                            className="col-span-3"
                            value={newStreamLocation}
                            onChange={(e) => setNewStreamLocation(e.target.value)}
                          />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="url-empty" className="text-right">Stream URL</Label>
                          <Input 
                            id="url-empty" 
                            placeholder="e.g. https://www.youtube.com/watch?v=..."  
                            className="col-span-3"
                            value={newStreamUrl}
                            onChange={(e) => setNewStreamUrl(e.target.value)}
                          />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button onClick={handleAddStream}>Add Stream</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="all" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">All Camera Sources</h2>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {customCameras
          .filter(camera => {
            if (activeTab === 'live') return camera.status === 'online' && !camera.isUpload && !camera.isStream;
            if (activeTab === 'uploads') return camera.isUpload;
            if (activeTab === 'streams') return camera.isStream;
            return true; // 'all' tab shows everything
          })
          .map(camera => (
            <div key={camera.id} className="h-full">
              <CameraFeed camera={camera} />
            </div>
          ))
        }

        {/* Empty state message when no cameras match filter */}
        {customCameras.filter(camera => {
          if (activeTab === 'live') return camera.status === 'online' && !camera.isUpload && !camera.isStream;
          if (activeTab === 'uploads') return camera.isUpload;
          if (activeTab === 'streams') return camera.isStream;
          return true;
        }).length === 0 && (
          <Card className="col-span-full border-dashed bg-accent/30">
            <CardContent className="py-8">
              <div className="text-center">
                <AlertTriangle className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-1">No camera feeds available</h3>
                <p className="text-muted-foreground">
                  {activeTab === 'live' 
                    ? 'There are no online camera feeds at the moment. Please check back later.'
                    : activeTab === 'uploads' 
                      ? 'No videos have been uploaded yet. Upload a video to get started.'
                      : activeTab === 'streams'
                        ? 'No camera streams added yet. Add a stream to get started.'
                        : 'No camera sources available.'
                  }
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </MainLayout>
  );
};

export default Cameras;
