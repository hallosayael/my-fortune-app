import { Frog } from "frog";
import sdk from "../../../lib/thirdweb";

const fortunes = [
  "Today the chain is on your side.",
  "Gas fees will smile upon you.",
  "Your next tx brings good vibes.",
  "A new onchain path opens for you.",
  "Expect bullish optimism today.",
];

const tokens = ["ETH", "BASE", "OP", "ARB", "SOL"];
const vibes = ["Ultra Chill", "Bullish", "Zen Mode", "Chaotic Good"];

function random<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export const app = new Frog({
  basePath: "/api/frame",
});

app.frame("/", (c) => {
  return c.res({
    image: "🔮 Tap to Reveal Today’s Onchain Fortune",
    buttons: [{ label: "Reveal Fortune", action: "/fortune" }],
  });
});

app.frame("/fortune", (c) => {
  const fortune = random(fortunes);
  const token = random(tokens);
  const vibe = random(vibes);
  const num = Math.floor(Math.random() * 999) + 1;

  // simpan di context
  c.var = { fortune, token, vibe, num };

  return c.res({
    image: `🔮 ${fortune}\n\n💠 Lucky Token: ${token}\n🔢 Number: ${num}\n✨ Vibes: ${vibe}`,
    buttons: [
      { label: "Mint NFT", action: "/mint" },
      { label: "New Fortune", action: "/fortune" },
      { label: "Back", action: "/" },
    ],
  });
});

app.frame("/mint", async (c) => {
  const { fortune, token, vibe, num } = c.var;

  const contractAddress = process.env.FORTUNE_CONTRACT!;
  const contract = await sdk.getContract(contractAddress, "nft-collection");

  const metadata = {
    name: `Onchain Fortune #${num}`,
    description: "Daily fortune from the Fortune Cookie mini app",
    image: `${process.env.NEXT_PUBLIC_BASE_URL}/api/og?fortune=${encodeURIComponent(fortune)}&token=${token}&vibe=${vibe}&num=${num}`,
    properties: {
      token,
      vibe,
      number: num,
    },
  };

  const to = c.address!;
  const tx = await contract?.erc721.mintTo(to, metadata);

  return c.res({
    image: `🎉 NFT Minted!\n\nView TX: ${tx?.receipt.transactionHash}`,
    buttons: [
      { label: "New Fortune", action: "/fortune" },
      { label: "Back", action: "/" },
    ],
  });
});

export const GET = app.fetch;
export const POST = app.fetch;
