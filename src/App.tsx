import { useEffect, useState } from "react";
import { SafeEventEmitterProvider, UserInfo } from "@web3auth/base";
import { ethers } from "ethers";
import {
  SIPFactoryABI,
  SocketFactoryABI,
  RebalancerFactoryABI,
} from "./constants";
import { Loading } from "./components/Loading";
import { getChainConfig } from "./utils";
import {
  GaslessOnboarding,
  GaslessWalletConfig,
  GaslessWalletInterface,
  LoginConfig,
} from "@gelatonetwork/gasless-onboarding";
import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SIPCard from "./components/SIP";
function App() {
  const [contractsConfig, setContractsConfig] = useState<
    | {
        chainId: number;
        SIPFactory?: string;
        SocketFactory?: string;
        RebalancerFactory?: string;
      }
    | undefined
  >(undefined);

  const [currentChain, setCurrentChain] = useState<{
    id: number;
    name: string;
  }>();
  const [gelatoLogin, setGelatoLogin] = useState<
    GaslessOnboarding | undefined
  >();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [web3AuthProvider, setWeb3AuthProvider] =
    useState<SafeEventEmitterProvider | null>(null);
  const [smartWallet, setSmartWallet] = useState<GaslessWalletInterface | null>(
    null
  );
  const [SIPFactoryContract, setSIPFactoryContract] =
    useState<ethers.Contract | null>(null);
  const [socketFactory, setSocketFactory] = useState<ethers.Contract | null>(
    null
  );
  const [rebalancerFactory, setRebalancerFactory] =
    useState<ethers.Contract | null>(null);
  const [user, setUser] = useState<Partial<UserInfo> | null>(null);
  const [wallet, setWallet] = useState<{
    address: string;
    balance: string;
    chainId: number;
  } | null>(null);
  const [isDeployed, setIsDeployed] = useState<boolean>(false);
  const createSIP = async (
    buyToken: string,
    sellToken: string,
    numberOfTokens: number | null,
    frequency: number | null
  ) => {
    if (!SIPFactoryContract) {
      return;
    }

    let { data } = await SIPFactoryContract.populateTransaction.createSIP(
      sellToken,
      buyToken,
      String(frequency)
    );
    if (!data) {
      return;
    }
    if (!smartWallet) {
      return;
    }
    try {
      const { taskId } = await smartWallet.sponsorTransaction(
        contractsConfig?.SIPFactory!,
        data
      );
      console.log(taskId);
    } catch (error) {
      console.log("error");
    }
    console.log(buyToken, sellToken, numberOfTokens, frequency);
  };

  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        const queryParams = new URLSearchParams(window.location.search);
        const chainIdParam = queryParams.get("chainId");
        const {
          apiKey,
          chainId,
          SIPFactory,
          RebalancerFactory,
          SocketFactory,
          rpcUrl,
          name,
        } = getChainConfig(chainIdParam);
        setCurrentChain({ name, id: chainId });
        const smartWalletConfig: GaslessWalletConfig = { apiKey };
        const loginConfig: LoginConfig = {
          domains: [window.location.origin],
          chain: {
            id: chainId,
            rpcUrl,
          },
          ui: {
            theme: "dark",
          },
          openLogin: {
            redirectUrl: `${window.location.origin}/?chainId=${chainId}`,
          },
        };
        const gelatoLogin = new GaslessOnboarding(
          loginConfig,
          smartWalletConfig
        );
        setContractsConfig({
          chainId,
          SIPFactory,
          SocketFactory,
          RebalancerFactory,
        });
        await gelatoLogin.init();
        setGelatoLogin(gelatoLogin);
        const provider = gelatoLogin.getProvider();
        if (provider) {
          setWeb3AuthProvider(provider);
        }
      } catch (error) {
        console.log("error");
      } finally {
        setIsLoading(false);
      }
    };
    init();
  }, []);

  useEffect(() => {
    const init = async () => {
      if (!gelatoLogin || !web3AuthProvider) {
        return;
      }
      setIsLoading(true);
      const web3Provider = new ethers.providers.Web3Provider(web3AuthProvider!);
      const signer = web3Provider.getSigner();
      setWallet({
        address: await signer.getAddress(),
        balance: (await signer.getBalance()).toString(),
        chainId: await signer.getChainId(),
      });
      const user = await gelatoLogin.getUserInfo();
      setUser(user);
      const gelatoSmartWallet = gelatoLogin.getGaslessWallet();
      setSmartWallet(gelatoSmartWallet);
      setIsDeployed(await gelatoSmartWallet.isDeployed());
      const SIP = new ethers.Contract(
        contractsConfig?.SIPFactory!,
        SIPFactoryABI,
        new ethers.providers.Web3Provider(web3AuthProvider!).getSigner()
      );
      setSIPFactoryContract(SIP);
      const Socket = new ethers.Contract(
        contractsConfig?.SocketFactory!,
        SocketFactoryABI,
        new ethers.providers.Web3Provider(web3AuthProvider!).getSigner()
      );
      setSocketFactory(Socket);
      const Rebalancer = new ethers.Contract(
        contractsConfig?.RebalancerFactory!,
        SocketFactoryABI,
        new ethers.providers.Web3Provider(web3AuthProvider!).getSigner()
      );
      setRebalancerFactory(Rebalancer);
      const fetchStatus = async () => {
        if (
          !SIPFactoryContract ||
          !rebalancerFactory ||
          !socketFactory ||
          !gelatoSmartWallet
        ) {
          return;
        }

        setIsDeployed(await gelatoSmartWallet.isDeployed());
      };
      await fetchStatus();
      const interval = setInterval(fetchStatus, 5000);
      setIsLoading(false);
      return () => clearInterval(interval);
    };
    init();
  }, [web3AuthProvider]);

  const login = async () => {
    if (!gelatoLogin) {
      return;
    }
    const web3authProvider = await gelatoLogin.login();
    setWeb3AuthProvider(web3authProvider);
    console.log("logged in");
  };

  const logout = async () => {
    if (!gelatoLogin) {
      return;
    }
    await gelatoLogin.logout();
    setWeb3AuthProvider(null);
    setWallet(null);
    setUser(null);
    setSmartWallet(null);
    setSIPFactoryContract(null);
  };

  const loggedInView = (
    <div className="bg-base-200">
      <Navbar action={logout} type={"Logout"} loading={isLoading} />
      <h1>wallet {smartWallet?.getAddress()!}</h1>
      <Hero login={login} wallet={web3AuthProvider} loading={isLoading} />

      <SIPCard buy={createSIP} loading={smartWallet?.isInitiated()} />
    </div>
  );

  const toLoginInView = (
    <div>
      <Navbar action={login} type={"Login"} loading={isLoading} />

      <Hero login={login} wallet={web3AuthProvider} loading={isLoading} />
    </div>
  );

  return (
    <>
      {/* {web3AuthProvider && (
        <div className="flex justify-between p-5 gap-5 items-center">
          <button onClick={logout} className="px-4 py-1 border-2 ">
            <p className="font-semibold text-gray-800 text-lg">Logout</p>
          </button>
        </div>
      )} */}

      <div className="bg-base-200">
        {web3AuthProvider ? loggedInView : toLoginInView}
      </div>
    </>
  );
}

export default App;
