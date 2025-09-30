import { client } from "@/app/client";
import { getContract } from "thirdweb";
import { base } from "thirdweb/chains";
export const predictionMarketContractAddress = "0x143c799c91f5226d8e70852f820b98cabc69457e"
export const tokenContractAddress = "0x57bc1A787c0DF21691B0b6d5990518a4C536a63b"

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