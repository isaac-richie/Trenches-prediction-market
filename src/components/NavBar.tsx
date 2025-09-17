"use client"
import { client } from "@/app/client";
import { ConnectButton, darkTheme, lightTheme, useActiveAccount } from "thirdweb/react";
import { base } from "thirdweb/chains";
import { inAppWallet } from "thirdweb/wallets";
import { tokenContractAddress } from "@/constants/contracts";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";
import { Loader2, Search } from "lucide-react";

export function NavBar() {
    const account = useActiveAccount();
    const [isClaiming, setIsClaiming] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="mb-4 sm:mb-6">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-4 bg-white/90 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/20 min-w-0">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-tight text-center lg:text-left truncate max-w-full lg:max-w-none">
                    Trenches Prediction Market
                </h1>
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full lg:w-auto flex-wrap min-w-0">
                    {/* Search Bar */}
                    <div className="relative group w-full sm:w-auto sm:flex-1 lg:flex-none min-w-0">
                        <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 group-focus-within:text-blue-500 transition-colors duration-200" />
                        <Input
                            type="text"
                            placeholder="Search markets..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 sm:pl-12 w-full sm:w-64 lg:w-80 h-10 sm:h-12 bg-white/80 border-2 border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-200 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-200 placeholder:text-gray-400 text-sm sm:text-base truncate"
                        />
                    </div>
                    <div className="items-center flex gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
                    {account && (
                        <Button className="bg-gradient-to-r from-emerald-400 to-green-400 hover:from-emerald-500 hover:to-green-500 text-white font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 h-10 sm:h-12 px-3 sm:px-6 text-sm sm:text-base flex-1 sm:flex-none">
                            {isClaiming ? ( <>
                                <Loader2 className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4 animate-spin" />
                                <span className="hidden sm:inline">Claiming...</span>
                                <span className="sm:hidden">Claiming</span>
                            </> 
                            ) : (
                                    <>
                                        <span className="hidden sm:inline">Buy Tokens</span>
                                        <span className="sm:hidden">Buy</span>
                                    </>
                            )}
                        </Button>
                    )}
                    <div className="transform hover:scale-105 transition-transform duration-200 flex-1 sm:flex-none shrink-0">
                        <ConnectButton
                            client={client}
                            theme={darkTheme()}
                            chain={base}
                            connectButton={{
                                label: "Connect Wallet",
                                style: {
                                    fontSize: "0.75rem !important",
                                    height: "2.5rem !important",
                                    borderRadius: "0.5rem !important",
                                    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important",
                                    border: "none !important",
                                    fontWeight: "600 !important",
                                    boxShadow: "0 4px 15px 0 rgba(102, 126, 234, 0.4) !important",
                                }
                            }} detailsButton={
                                {
                                    displayBalanceToken: {
                                       [base.id]: tokenContractAddress
                                   } 
                                }
                            }
                        />
                    </div>
                    </div>
                </div>
            </div>
            
            {/* Notes Section */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-lg">📝</span>
                    </div>
                    <h3 className="text-lg font-bold text-blue-900">Important Notes</h3>
                </div>
                <div className="text-sm text-blue-800 space-y-2">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <p>Connect your wallet to start trading predictions</p>
                    </div>                  
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <p>All markets are on Base network</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <p>Predictions can be made until market closes</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                        <p className="font-semibold text-amber-700">Gamble responsibly Amigo! 🎯</p>
                    </div>
                </div>
            </div>
        </div>
    )
}