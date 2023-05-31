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
    SIPFactory: "0x036D0922f3E83e36d34ffA474c43237745e35216",
    RebalancerFactory: "0xa1bf4c495b6d9277b42cE629EfFCCA4EC321D8f4",
    SocketFactory: "0x19305eD7E94C84f9C09B6F11b676fAAdfFa6AcA0",
    rpcUrl: process.env.REACT_APP_MUMBAI_RPC_URL!,
  };
};
