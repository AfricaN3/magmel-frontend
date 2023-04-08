import {
  WalletDisconnectButton,
  WalletMultiButton,
} from "@rentfuse-labs/neo-wallet-adapter-react-ui";
import { useWallet } from "@rentfuse-labs/neo-wallet-adapter-react";

const ButtonConnect = () => {
  const { connected } = useWallet();
  if (!connected) {
    return <WalletMultiButton size={"small"} className="wallet-btn" />;
  } else {
    return <WalletDisconnectButton size={"small"} className="wallet-btn" />;
  }
};

export default ButtonConnect;
