// MarketCard
// Renders a single prediction market card. Fetches market data and user share balances,
// filters visibility based on tab (active/pending/resolved), and conditionally renders
// the buy interface, pending banner, or resolved claim UI.
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { predictionMarketContract } from "@/constants/contracts";
import { MarketProgress } from "./marketProgress";
import { MarketTime } from "./marketTime";
import { MarketCardSkeleton } from "./skeletonCard";
import { MarketResolved } from "./marketResolved";
import { MarketPending } from "./marketPending";
import { MarketBuyInterface } from "./marketBuyInterface";
import { MarketSharesDisplay } from "./marketShares";


// Props for MarketCard
interface MarketCardProps{
    index: number;
    filter: 'active' | 'pending' | 'resolved';
}

// Shape of a market as returned by the contract
interface Market {
    question: string;
    optionA: string;
    optionB: string;
    endTime: bigint;
    outcome: number;
    totalOptionAShares: bigint;
    totalOptionBShares: bigint;
    resolved: boolean;
}

// User's share balances for a market
interface SharesBalance {
    optionAShares: bigint;
    optionBShares: bigint;

}
export default function MarketCard({ index, filter }: MarketCardProps) {
    // Active account to read user-specific balances
    const account = useActiveAccount();
    // Fetch market data from the contract
    const { data: marketData, isLoading: isLoadingMarketData } = useReadContract({
        contract: predictionMarketContract,
        method: "function getMarket(uint256 _marketId) view returns (string question, uint256 endTime, uint8 outcome, string optionA, string optionB, uint256 totalOptionAShares, uint256 totalOptionBShares, bool resolved)",
        params: [BigInt(index)]
    });

    const market: Market | undefined = marketData ? {
        question: marketData[0] as string,
        endTime: marketData[1] as bigint,
        outcome: marketData[2] as number,
        optionA: marketData[3] as string,
        optionB: marketData[4] as string,
        totalOptionAShares: marketData[5] as bigint,
        totalOptionBShares: marketData[6] as bigint,
        resolved: marketData[7] as boolean
    } : undefined; 
      
    // Fetch the user's shares balance for this market
    const { data: sharesBalanceData } = useReadContract({
        contract:predictionMarketContract,
        method: "function getSharesBalance(uint256 _marketId, address _user) view returns (uint256 optionAShares, uint256 optionBShares)",
        params: [
            BigInt(index),
            (account?.address ?? "0x0000000000000000000000000000000000000000") as string,
        ]
    });

    // Normalize the shares balance response into a typed object
    const sharesBalance: SharesBalance | undefined = sharesBalanceData ? {
        optionAShares: sharesBalanceData[0],
        optionBShares: sharesBalanceData[1]
    } : undefined;

    // Check if the market is expired
    const isExpired = market ? new Date(Number(market.endTime) * 1000) < new Date() : false;
    // Check if the market is resolved
    const isResolved = market?.resolved;

    // Tab filter logic
    const shouldShow = () => {
        if (!market) return false;
        
        switch (filter) {
            case 'active':
                return !isExpired;
            case 'pending':
                return isExpired && !isResolved;
            case 'resolved':
                return isExpired && isResolved;
            default:
                return true;
        }
    };

    // Hide cards that don't match the current tab
    if (!shouldShow()) {
        return null;
    }

    return (
        <Card 
            key={index} 
            className="flex flex-col group hover:shadow-xl hover:-translate-y-2 transition-all duration-300 ease-in-out border-0 bg-white/80 backdrop-blur-sm hover:bg-white/90"
        >
            {isLoadingMarketData ? (
                <MarketCardSkeleton />
            ) : (
                <>
                    <CardHeader className="space-y-3 pb-4">
                        {market && <MarketTime endTime={market.endTime} />}
                        <CardTitle className="text-lg font-semibold leading-tight group-hover:text-blue-600 transition-colors duration-200">
                            {market?.question}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {market && (
                            <div className="transform group-hover:scale-[1.02] transition-transform duration-200">
                                <MarketProgress 
                                    optionA={market.optionA}
                                    optionB={market.optionB}
                                    totalOptionAShares={market.totalOptionAShares}
                                    totalOptionBShares={market.totalOptionBShares}
                                />
                            </div>
                        )}
                        <div className="transform group-hover:scale-[1.01] transition-transform duration-200">
                            {new Date(Number(market?.endTime) * 1000) < new Date() ? (
                                market?.resolved ? (
                                    <MarketResolved 
                                        marketId={index}
                                        outcome={market.outcome}
                                        optionA={market.optionA}
                                        optionB={market.optionB}
                                    />
                                ) : (
                                    <MarketPending />
                                )
                            ) : (
                                <MarketBuyInterface 
                                    marketId={index}
                                    market={market!}
                                />
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors duration-200">
                        {market && sharesBalance && (
                            <MarketSharesDisplay 
                                market={market}
                                sharesBalance={sharesBalance}
                            />
                        )}
                    </CardFooter>
                </>
            )}
        </Card>
    )
} 
