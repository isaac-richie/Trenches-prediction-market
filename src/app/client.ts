// src/client.ts
import { createThirdwebClient } from "thirdweb";

const clientId = process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID;

if (!clientId) {
  throw new Error(
    "Missing NEXT_PUBLIC_THIRDWEB_CLIENT_ID environment variable. " +
    "Please add it to your .env.local file or Vercel environment variables. " +
    "Get your client ID from https://thirdweb.com/dashboard"
  );
}

export const client = createThirdwebClient({
  clientId,
});
