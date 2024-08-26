const FAQ = [
  {
    title: "What is NFT",
    desc: "A NFT or non-fungible token is a digital asset. NFTs are unique i.e one is not equal to another.",
  },
  {
    title: "Why Buy NFT's/What Make them valuable",
    desc: `There are a ton of reasons to buy these items/NFTs.
    Unique - Each NFT is unique, it's only one of its kind.
    Copyrights - Your NFT might come with the copyrights to the asset if the seller chooses to transfer them.
    Rare - Since they are unique and cannot be copied, they are rare.
    Immutable - No one can remove or edit the digital asset this means it can never change, removed or taken down off the blockchain.
    Forever - NFTs are forever. As the data always exists on the blockchain.
    Resellable - You can always resell your NFT.`,
  },
  {
    title: "What is NFT Marketplace",
    desc: `The NFTSpace marketplace features all forms of digital artworks and collectibles. The NFTSpace marketplace provides the community and liquidity for users to launch and trade NFTs.`,
  },
  {
    title: "What is NFTSpace Marketplace",
    desc: `The NFTSpace marketplace features all forms of digital artworks and collectibles. The NFTSpace marketplace provides the community and liquidity for users to launch and trade NFTs.`,
  },
  {
    title: "How to find any NFT contract address",
    desc: `NFTSpace supports ERC-721 tokens. You can check the contract address of your assets on relevant NFT platforms, or on your Wallet’s Etherscan page under ERC-721 tokens.`,
  },
  {
    title: "How to create your own NFT in NFTSpace",
    desc: `With few steps you canconvert your digital art to NFTs and they are ready to trade. You can also deposit and withdraw the NFTs to a compatible wallet or another exchange.`,
  },
  {
    title: "How to buy an NFT on NFTSpace Marketplace",
    desc: `You can now buy NFTs on NFTSpace Marketplace using a fixed price, by making an offer to the seller, or bidding in an NFT auction. NFT purchases comes with avery simple fee structure to support creators and depositors. To purchase an NFT, you’re first of all going to need a NFTSpace or metamask account.`,
  },
  {
    title: "How to sell an NFT on NFTSpace Marketplace",
    desc: `You can sell your NFTs NFTSpace Marketplace using a fixed price,bids and Auctions You can also accept payments in several different cryptocurrencies. If you submited your digital art for creating NFT collection, The NFTSpace team will review your digital art before listing it on NFTSpace Marketplace.If you want to sell your NFT listed on any other platform you are free to sell.`,
  },
  {
    title: "Who is a NFT creator",
    desc: `NFT Creators are those who creates the digital art and convert/mint them to NFTs. If the creatos art is royalty based then the creators also receive a % of royalty payment from all subsequent trading.`,
  },
];

export default function Faq() {
  return (
    <div className="m-4 -z-10 bg-muted/5 bg-[url('/pattern1.png')] ">
      <div className="z-10 relative w-full px-6 pt-10 pb-8 mt-8 shadow-xl ring-1 ring-gray-900/5  bg-muted/50 sm:mx-auto sm:max-w-2xl sm:rounded-lg sm:px-10 ">
        <div className="mx-auto px-5">
          <div className="flex flex-col items-center">
            <h2 className="mt-5 text-center text-3xl font-bold tracking-tight md:text-5xl">
              FAQ
            </h2>
            <p className="mt-3 text-lg md:text-xl">Frequenty asked questions</p>
          </div>
          <div className="mx-auto mt-8 grid max-w-xl divide-y divide-neutral-200">
            {FAQ.map((item, index) => {
              return (
                <div key={index} className="py-5 bg-muted/95 p-10">
                  <details className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                      <span> {item.title}</span>
                      <span className="transition group-open:rotate-180">
                        <svg
                          fill="none"
                          height={24}
                          shapeRendering="geometricPrecision"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          width={24}
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </span>
                    </summary>
                    <p className="group-open:animate-fadeIn mt-3 ">
                      {item.desc}
                    </p>
                  </details>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
