import { ThirdwebSDK } from "@thirdweb-dev/sdk";

const sdk = new ThirdwebSDK({
  // sesuaikan dengan chain yang kamu pakai
  clientId: process.env.THIRDWEB_CLIENT_ID!,
});

export default sdk;
