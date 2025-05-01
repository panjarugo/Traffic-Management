
import React from 'react';
import { Bell, Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Header = () => {
  return (
    <header className="h-16 px-6 flex items-center justify-between border-b border-border/50">
      <div className="flex-1">
        <h1 className="text-xl font-semibold">Urban Eye Traffic Sense</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            type="search"
            placeholder="Search cameras, incidents..." 
            className="w-[250px] pl-9 bg-accent text-accent-foreground" 
          />
        </div>
        
        <div className="relative">
          <Button variant="ghost" size="icon" className="relative">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-traffic-alert rounded-full"></span>
          </Button>
        </div>
        
        <div className="flex items-center space-x-2">
          <Avatar>
            <AvatarFallback className="bg-primary text-primary-foreground">AD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">Adarsh</p>
            <p className="text-xs text-muted-foreground">Researcher</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
