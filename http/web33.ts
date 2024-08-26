import Moralis from "moralis";

const polygonamoy = "0x13882";
const sepolia = "0xaa36a7";

const currentChain = polygonamoy;

export async function getWalletNFTsX(address: string) {
  const response = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: currentChain,
    format: "decimal",
    mediaItems: false,
    normalizeMetadata: true,
    address: address as `0x${string}`,
  });

  return response.raw;
}

export async function getContractNFTsX(address: string) {
  const response = await Moralis.EvmApi.nft.getContractNFTs({
    chain: currentChain,
    format: "decimal",
    normalizeMetadata: true,
    address: address as `0x${string}`,
  });

  return response.raw;
}

export async function getNFTMetadataX(address: string, id: string) {
  try {
    const response = await Moralis.EvmApi.nft.getNFTMetadata({
      chain: currentChain,
      format: "decimal",
      normalizeMetadata: true,
      mediaItems: false,
      address: address,
      tokenId: id,
    });

    return response?.raw;
  } catch (error) {
    console.log("throw error ", error);
    throw Error("ferfrerferfer");
  }
}

export async function getNFTCollectionStatsX(address: string) {
  try {
    const response = await Moralis.EvmApi.nft.getNFTCollectionStats({
      chain: currentChain,
      address: "0xdf5824198a2a606f124d2adf195f88427e7f0dd0",
    });

    return response?.raw;
  } catch (error) {
    console.log("throw error ", error);
    // throw Error("ferfrerferfer");
  }
}

// export async function getMultipleNFTs(address: string, id: string) {
//   const response = await Moralis.EvmApi.nft.getMultipleNFTs({
//     chain: currentChain,
//     tokens: [
//       {
//         tokenAddress: address,
//         tokenId: id,
//       },
//       {
//         tokenAddress: "0x3c64dc415ebb4690d1df2b6216148c8de6dd29f7",
//         tokenId: "1",
//       },
//       {
//         tokenAddress: "0x3c64dc415ebb4690d1df2b6216148c8de6dd29f7",
//         tokenId: "200",
//       },
//     ],
//   });

//   return response.raw;
// }

// export async function getNFT(address: string, id: string) {
//   const response = await Moralis.EvmApi.nft.getMultipleNFTs({
//     chain: currentChain,
//     tokens: [
//       {
//         tokenAddress: address,
//         tokenId: id,
//       },
//     ],
//   });

//   return response.raw;
// }
