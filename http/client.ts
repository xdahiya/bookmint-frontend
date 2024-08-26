import { GLOABAL_CONSTANTS } from "@/constants";
import axios from "axios";

const api = axios.create({
  baseURL: GLOABAL_CONSTANTS.SERVER_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
  },
});

export const getCollections = (queryParam: string) =>
  api.get(`/collections?${queryParam}`);

export const getCollection = (id: string) => api.get(`/collections/${id}`);

export const getContractNFTs = async (id: string) => {
  const { data } = await api.get(`/nfts/getContractNFTs/${id}`);
  return data;
};

export const getWalletNFTs = async (id: string) => {
  const { data } = await api.get(`/nfts/getWalletNFTs/${id}`);
  return data;
};

export const getNFTMetadata = async (contract_id: string, id: string) => {
  const { data } = await api.get(`/nfts/getNFTMetadata/${contract_id}/${id}`);
  return data;
};

export const findUser = (address: string) =>
  api.get(`/users/findUser?publicAddress=${address}`);

export const addUser = (data: any) => api.post(`/users/addUser`, data);
export const loginUser = (data: any) => api.post(`/users/loginUser`, data);

export const selfUser = () => api.get(`/users/self`);
export const getUser = (publicAddress: string) =>
  api.get(`/users/user?publicAddress=${publicAddress}`);

export const logoutUser = () => api.post(`/users/logout`);

export const createCollection = (collectionData: FormData) =>
  api.post(`/collections`, collectionData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateCollection = (
  collectionId: string,
  collectionData: FormData
) =>
  api.put(`/collections/${collectionId}`, collectionData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const updateUser = (userData: FormData) =>
  api.put(`/users/updateUser`, userData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const generateImageX = async (data: { prompt: string }) => {
  const response = await api.post(`/ai/generate`, data);
  return response;
};

export const findMyAIImages = async () => {
  const response = await api.get(`/ai/my`);
  return response;
};
