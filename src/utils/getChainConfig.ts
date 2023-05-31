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
  target: string;
  apiKey: string;
  rpcUrl: string;
} => {
  return {
    name: "Mumbai",
    apiKey: process.env.REACT_APP_SPONSOR_API_KEY!,
    chainId: 80001,
    target: "0x036D0922f3E83e36d34ffA474c43237745e35216",
    SIPFactory: "0xFF42b61c2b525ce8D53928256B65b8158852FB4C",
    RebalancerFactory: "0xa1bf4c495b6d9277b42cE629EfFCCA4EC321D8f4",
    SocketFactory: "0x87A5A2E29cB8DB7D7622CFc2A01478C92049E5f7",
    rpcUrl: process.env.REACT_APP_MUMBAI_RPC_URL!,
  };
};
