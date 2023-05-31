export const SUPPORTED_NETWORKS: { name: string; chainId: number }[] = [
  { name: "Mumbai", chainId: 80001 },
];

export const getChainConfig = (
  chainId: string | null
): {
  name: string;
  chainId: number;
  SIPFactory: string;
  RebalancerFactory: string;
  SocketFactory: string;

  apiKey: string;
  rpcUrl: string;
} => {
  return {
    name: "Mumbai",
    apiKey: process.env.REACT_APP_SPONSOR_API_KEY!,
    chainId: 80001,
    SIPFactory: "0xFF42b61c2b525ce8D53928256B65b8158852FB4C",
    RebalancerFactory: "0x9B4fd31d624a975D65182f7a9786b0F14a461f9b",
    SocketFactory: "0x87A5A2E29cB8DB7D7622CFc2A01478C92049E5f7",
    rpcUrl: process.env.REACT_APP_MUMBAI_RPC_URL!,
  };
};
