import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
export const predictionMarketContractAddress = "0x7ed35FbA8735B74e51E0d98DB240c678e8DF60AC"
export const tokenContractAddress = "0xead62e5de3b8E7f21301D4e662bde4bCB57aE64A"

export const predictionMarketContract = getContract({
    client: client,
    chain: base,
    address: predictionMarketContractAddress
})

export const tokenContract = getContract({
    client: client,
    chain: base,
    address: tokenContractAddress
})