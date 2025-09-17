//prediction-dashboard

"use client"
import { useReadContract } from "thirdweb/react";
import { NavBar } from "./NavBar";
import { predictionMarketContract } from "@/constants/contracts";
import { TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Tabs } from "./ui/tabs";
import { MarketCardSkeleton } from "./skeletonCard";
import MarketCard from "./marketCard";

export default function PredictionMarketDashboard() {
    const { data: marketCount, isLoading: isLoadingMarketCount } = useReadContract({
        contract: predictionMarketContract,
        method: "function marketCount() view returns (uint256)",
        params: [],
    });

     const skeletonCards = Array.from({ length: 6 }, (_, i) => (
        <MarketCardSkeleton key={`skeleton-${i}`} />
    ));
    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto p-4">
                <NavBar />
                <Tabs defaultValue="acive" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="pending">Pending resolution</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved</TabsTrigger>
                        {isLoadingMarketCount ? (
                            <TabsContent value="active" className="mt-6">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {skeletonCards}
                                </div>
                            </TabsContent> 
                        ) : (
                                <>
                                   <TabsContent value="active">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard
                                            key={index} 
                                            index={index} 
                                            filter="active"
                                        />
                                    ))}
                                </div>
                                    </TabsContent> 
                                    
                                      <TabsContent value="pending">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard 
                                            key={index} 
                                            index={index}
                                            filter="pending"
                                        />
                                    ))}
                                </div>
                                    </TabsContent>
                                    
                                     <TabsContent value="resolved">
                                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard 
                                            key={index} 
                                            index={index}
                                            filter="resolved"
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                                </>    
                        )}
                    </TabsList>
                </Tabs>

            </div>
        </div>
    );
}