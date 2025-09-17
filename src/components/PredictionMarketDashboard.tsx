'use client'

import { useReadContract } from 'thirdweb/react'
import { predictionMarketContract } from '@/constants/contracts'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import  MarketCard  from './marketCard'
import Image from 'next/image'
import bannerImage from '@/app/Gamble.png'

import { MarketCardSkeleton } from './skeletonCard';
//import { Footer } from "./footer"
import { NavBar } from './NavBar'
import Footer from './Footer'

export function PredictionMarketDashboard() {
    const { data: marketCount, isLoading: isLoadingMarketCount } = useReadContract({
        contract:predictionMarketContract,
        method: "function marketCount() view returns (uint256)",
        params: []
    }); 

    // Show 6 skeleton cards while loading
    const skeletonCards = Array.from({ length: 6 }, (_, i) => (
        <MarketCardSkeleton key={`skeleton-${i}`} />
    ));


    return (
        <div className="min-h-screen flex flex-col">
            <div className="flex-grow container mx-auto px-2 sm:px-4 py-2 sm:py-4 max-w-7xl">
                <NavBar />
               
               
                <Tabs defaultValue="active" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 gap-1">
                        <TabsTrigger value="active">Active</TabsTrigger>
                        <TabsTrigger value="pending">Pending Resolution</TabsTrigger>
                        <TabsTrigger value="resolved">Resolved</TabsTrigger>
                    </TabsList>
                    
                    {isLoadingMarketCount ? (
                        <TabsContent value="active" className="mt-4 sm:mt-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                                {skeletonCards}
                            </div>
                        </TabsContent>
                    ) : (
                        <>
                            <TabsContent value="active" className="mt-4 sm:mt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard 
                                            key={index} 
                                            index={index} 
                                            filter="active"
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="pending" className="mt-4 sm:mt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                                    {Array.from({ length: Number(marketCount) }, (_, index) => (
                                        <MarketCard 
                                            key={index} 
                                            index={index}
                                            filter="pending"
                                        />
                                    ))}
                                </div>
                            </TabsContent>
                            
                            <TabsContent value="resolved" className="mt-4 sm:mt-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
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
                </Tabs>
            </div>
           <Footer />
        </div>
    );
}