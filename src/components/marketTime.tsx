import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Clock, Timer, AlertCircle } from "lucide-react";
import { useState, useEffect } from "react";

interface MarketTimeProps {
    endTime: bigint;
    className?: string;
}

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

const formatTimeRemaining = (endTime: bigint) => {
    const now = new Date();
    const end = new Date(Number(endTime) * 1000);
    const diff = end.getTime() - now.getTime();
    
    if (diff <= 0) return "Ended";
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
};

export function MarketTime({ endTime, className }: MarketTimeProps) {
    const [timeRemaining, setTimeRemaining] = useState(formatTimeRemaining(endTime));
    const isEnded = new Date(Number(endTime) * 1000) < new Date();
    const formattedDate = formatDate(new Date(Number(endTime) * 1000).toISOString());
    const isUrgent = !isEnded && new Date(Number(endTime) * 1000).getTime() - new Date().getTime() < 24 * 60 * 60 * 1000; // Less than 24 hours

    useEffect(() => {
        if (isEnded) return;
        
        const interval = setInterval(() => {
            setTimeRemaining(formatTimeRemaining(endTime));
        }, 60000); // Update every minute

        return () => clearInterval(interval);
    }, [endTime, isEnded]);

    return (
        <div className={cn("relative group", className)}>
            <Badge
                variant={isEnded ? "destructive" : isUrgent ? "secondary" : "outline"}
                className={cn(
                    "relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg",
                    isEnded && "animate-pulse bg-gradient-to-r from-red-500 to-red-600 text-white border-red-400",
                    isUrgent && !isEnded && "animate-pulse bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-400",
                    !isEnded && !isUrgent && "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border-blue-300 text-blue-700 hover:from-blue-500/20 hover:to-purple-500/20"
                )}
            >
                {/* Animated background shimmer */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <div className="relative flex items-center gap-2">
                    {isEnded ? (
                        <AlertCircle className="w-3 h-3 animate-pulse" />
                    ) : isUrgent ? (
                        <Timer className="w-3 h-3 animate-spin" />
                    ) : (
                        <Clock className="w-3 h-3" />
                    )}
                    
                    <span className="font-medium">
                        {isEnded ? "Ended" : isUrgent ? "Ends Soon" : "Ends"}: {formattedDate}
                    </span>
                    
                    {!isEnded && (
                        <span className="text-xs opacity-75">
                            ({timeRemaining})
                        </span>
                    )}
                </div>
            </Badge>
        </div>
    );
}