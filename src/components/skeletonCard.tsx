import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";

export function MarketCardSkeleton() {
    return (
        <Card className="flex flex-col hover:shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-1">
            <div className="animate-pulse">
                <CardHeader className="space-y-3">
                    <Badge 
                        variant="secondary" 
                        className="mb-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-4 w-full animate-pulse"
                    />
                    <CardTitle className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-6 w-1/3 rounded animate-pulse" />
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="mb-4">
                        <div className="flex justify-between mb-3">
                            <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-4 w-1/4 rounded animate-pulse" />
                            <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-4 w-1/4 rounded animate-pulse" />
                        </div>
                        <Progress 
                            value={0} 
                            className="h-2 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" 
                        />
                    </div>
                    <div className="flex gap-2">
                        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-8 w-20 rounded animate-pulse" />
                        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-8 w-20 rounded animate-pulse" />
                    </div>
                </CardContent>
            </div>
        </Card>
    );
}