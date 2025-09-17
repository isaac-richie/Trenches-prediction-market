import { toEther } from "thirdweb";

// MarketSharesDisplay
// Shows the user's current shares for both options in a market.
interface MarketSharesDisplayProps {
    market: {
        optionA: string;
        optionB: string;
    };
    sharesBalance: {
        optionAShares: bigint;
        optionBShares: bigint;
    };
}

export function MarketSharesDisplay({ market, sharesBalance }: MarketSharesDisplayProps) {
    return (
        <div className="text-xs text-gray-600 w-full flex justify-between">
            <span>
                Your {market.optionA}: {Math.floor(parseInt(toEther(sharesBalance.optionAShares)))}
            </span>
            <span>
                Your {market.optionB}: {Math.floor(parseInt(toEther(sharesBalance.optionBShares)))}
            </span>
        </div>
    );
}


