// MarketBuyInterface
// Handles the flow for buying shares: select option -> enter amount -> approve (if needed) -> confirm.
// Integrates with ERC20 approvals and the prediction market contract via thirdweb.
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState, useRef, useEffect } from "react";
import { useActiveAccount, useSendAndConfirmTransaction } from "thirdweb/react";
import { prepareContractCall, readContract, toWei } from "thirdweb";
import { predictionMarketContract, predictionMarketContractAddress, tokenContract } from "@/constants/contracts";
import { approve } from "thirdweb/extensions/erc20";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "./ui/use-toast"

// Types for the component props
interface MarketBuyInterfaceProps {
    marketId: number;
    market: {
        optionA: string;
        optionB: string;
        question: string;
    };
}

// Type aliases for better readability
type BuyingStep = 'initial' | 'allowance' | 'confirm';
type Option = 'A' | 'B' | null;

export function MarketBuyInterface({ marketId, market }: MarketBuyInterfaceProps) {
    // Blockchain interactions
    const account = useActiveAccount();
    const { mutateAsync: mutateTransaction } = useSendAndConfirmTransaction();
    const { toast } = useToast()

    // UI state management
    const [isBuying, setIsBuying] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [containerHeight, setContainerHeight] = useState('auto');
    const contentRef = useRef<HTMLDivElement>(null);

    // Transaction state
    const [selectedOption, setSelectedOption] = useState<Option>(null);
    const [amount, setAmount] = useState(0);
    const [buyingStep, setBuyingStep] = useState<BuyingStep>('initial');
    const [isApproving, setIsApproving] = useState(false);
    const [isConfirming, setIsConfirming] = useState(false);

    // Validation/error state
    const [error, setError] = useState<string | null>(null);

    // Layout effect: keep container height stable during transitions
    useEffect(() => {
        if (contentRef.current) {
            setTimeout(() => {
                setContainerHeight(`${contentRef.current?.offsetHeight || 0}px`);
            }, 0);
        }
    }, [isBuying, buyingStep, isVisible, error]);

    // Handlers for user interactions
    const handleBuy = (option: 'A' | 'B') => {
        setIsVisible(false);
        setTimeout(() => {
            setIsBuying(true);
            setSelectedOption(option);
            setIsVisible(true);
        }, 200); // Match transition duration
    };

    const handleCancel = () => {
        setIsVisible(false);
        setTimeout(() => {
            setIsBuying(false);
            setBuyingStep('initial');
            setSelectedOption(null);
            setAmount(0);
            setError(null);
            setIsVisible(true);
        }, 200);
    };

    // Step 1: Check if user needs to approve token spending
    const checkApproval = async () => {
        if (amount <= 0) {
            setError("Amount must be greater than 0");
            return;
        }
        setError(null);

        try {
            const userAllowance = await readContract({
                contract: tokenContract,
                method: "function allowance(address owner, address spender) view returns (uint256)",
                params: [account?.address as string, predictionMarketContractAddress]
            });

            setBuyingStep(userAllowance < BigInt(toWei(amount.toString())) ? 'allowance' : 'confirm');
        } catch (error) {
            console.error(error);
        }
    };

    // Step 2: Handle token approval transaction
    const handleSetApproval = async () => {
        setIsApproving(true);
        try {
            const tx = await approve({
                contract: tokenContract,
                spender: predictionMarketContractAddress,
                amount: amount
            });
            await mutateTransaction(tx);
            setBuyingStep('confirm');
        } catch (error) {
            console.error(error);
        } finally {
            setIsApproving(false);
        }
    };

    // Step 3: Handle share purchase transaction
    const handleConfirm = async () => {
        if (!selectedOption || amount <= 0) {
            setError("Must select an option and enter an amount greater than 0");
            return;
        }

        setIsConfirming(true);
        try {
            const tx = await prepareContractCall({
                contract: predictionMarketContract,
                method: "function buyShares(uint256 _marketId, bool _isOptionA, uint256 _amount)",
                params: [BigInt(marketId), selectedOption === 'A', BigInt(toWei(amount.toString()))]
            });
            await mutateTransaction(tx);
            
            // Show success toast
            toast({
                title: "Purchase Successful!",
                description: `You bought ${amount} ${selectedOption === 'A' ? market.optionA : market.optionB} shares`,
                duration: 5000, // 5 seconds
            })
            
            handleCancel();
        } catch (error) {
            console.error(error);
            // Optionally show error toast
            toast({
                title: "Purchase Failed",
                description: "There was an error processing your purchase",
                variant: "destructive",
            })
        } finally {
            setIsConfirming(false);
        }
    };

    // Render the component
    return (
        <div 
            className="relative transition-[height] duration-200 ease-in-out overflow-hidden" 
            style={{ height: containerHeight }}
        >
            <div 
                ref={contentRef}
                className={cn(
                    "w-full transition-all duration-200 ease-in-out",
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                )}
            >
                {!isBuying ? (
                    // Initial option selection buttons
                    <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 mb-4">
                        <Button 
                            className="flex-1 h-12 sm:h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base" 
                            onClick={() => handleBuy('A')}
                            aria-label={`Vote ${market.optionA} for "${market.question}"`}
                            disabled={!account}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                <span className="truncate">{market.optionA}</span>
                            </span>
                        </Button>
                        <Button 
                            className="flex-1 h-12 sm:h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                            onClick={() => handleBuy('B')}
                            aria-label={`Vote ${market.optionB} for "${market.question}"`}
                            disabled={!account}
                        >
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                <span className="truncate">{market.optionB}</span>
                            </span>
                        </Button>
                    </div>
                ) : (
                    // Buy interface with different steps
                    <div className="flex flex-col mb-4">
                        {buyingStep === 'allowance' ? (
                            // Approval step
                            <div className="flex flex-col border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 bg-amber-500 rounded-full animate-pulse"></div>
                                    </div>
                                    <h2 className="text-lg font-bold text-amber-800">Approval Needed</h2>
                                </div>
                                <p className="mb-6 text-amber-700">You need to approve the transaction before proceeding.</p>
                                <div className="flex justify-end gap-3">
                                    <Button 
                                        onClick={handleSetApproval} 
                                        className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        disabled={isApproving}
                                    >
                                        {isApproving ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Approving...
                                            </>
                                        ) : (
                                            'Set Approval'
                                        )}
                                    </Button>
                                    <Button 
                                        onClick={handleCancel} 
                                        className="border-2 border-amber-300 text-amber-700 hover:bg-amber-50 font-semibold transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                                        variant="outline"
                                        disabled={isApproving}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : buyingStep === 'confirm' ? (
                            // Confirmation step
                            <div className="flex flex-col border-2 border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 shadow-lg">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                                    </div>
                                    <h2 className="text-lg font-bold text-green-800">Confirm Transaction</h2>
                                </div>
                                <p className="mb-6 text-green-700">
                                    You are about to buy <span className="font-bold text-green-800 bg-green-100 px-2 py-1 rounded">
                                        {amount} {selectedOption === 'A' ? market.optionA : market.optionB}
                                    </span> share(s).
                                </p>
                                <div className="flex justify-end gap-3">
                                    <Button 
                                        onClick={handleConfirm} 
                                        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                                        disabled={isConfirming}
                                    >
                                        {isConfirming ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Confirming...
                                            </>
                                        ) : (
                                            'Confirm'
                                        )}
                                    </Button>
                                    <Button 
                                        onClick={handleCancel} 
                                        className="border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none" 
                                        variant="outline"
                                        disabled={isConfirming}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            // Amount input step
                            <div className="flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg sm:rounded-xl p-4 sm:p-6 border border-blue-200">
                                <div className="flex items-center gap-2 mb-3 sm:mb-4">
                                    <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                                    </div>
                                    <span className="text-xs sm:text-sm font-medium text-blue-700">
                                        {`1 ${selectedOption === 'A' ? market.optionA : market.optionB} = 1 PREDICT`}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-3 sm:gap-3 mb-4 sm:mb-6">
                                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 overflow-visible">
                                        <div className="flex-grow relative">
                                            <Input
                                                type="number"
                                                min="0"
                                                step="1"
                                                placeholder="Enter amount"
                                                value={amount}
                                                onChange={(e) => {
                                                    const value = Math.max(0, Number(e.target.value));
                                                    setAmount(value);
                                                    setError(null);
                                                }}
                                                onKeyDown={(e) => {
                                                    if (e.key === '-' || e.key === 'e') {
                                                        e.preventDefault();
                                                    }
                                                }}
                                                className={cn(
                                                    "w-full h-10 sm:h-12 text-base sm:text-lg font-medium border-2 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 transition-all duration-200",
                                                    error && "border-red-400 focus-visible:ring-red-200 bg-red-50"
                                                )}
                                            />
                                        </div>
                                        <span className="font-bold text-blue-800 bg-blue-100 px-3 py-2 rounded-lg whitespace-nowrap text-sm sm:text-base text-center sm:text-left">
                                            {selectedOption === 'A' ? market.optionA : market.optionB}
                                        </span>
                                    </div>
                                    <div className="min-h-[20px] sm:min-h-[24px]">
                                        {error && (
                                            <div className="flex items-center gap-2 text-xs sm:text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                                                <div className="w-3 h-3 sm:w-4 sm:h-4 bg-red-200 rounded-full flex items-center justify-center flex-shrink-0">
                                                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full"></div>
                                                </div>
                                                <span className="leading-relaxed">{error}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
                                    <Button 
                                        onClick={checkApproval} 
                                        className="flex-1 h-10 sm:h-12 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                                    >
                                        Confirm
                                    </Button>
                                    <Button 
                                        onClick={handleCancel} 
                                        variant="outline" 
                                        className="flex-1 h-10 sm:h-12 border-2 border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold transform hover:scale-105 transition-all duration-200 text-sm sm:text-base"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}