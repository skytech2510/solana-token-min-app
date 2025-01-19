import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react"
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui"
import { PhantomWalletAdapter, SolflareWalletAdapter, MathWalletAdapter, TrustWalletAdapter, CoinbaseWalletAdapter } from "@solana/wallet-adapter-wallets"
import { WalletAccountError, WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { useMemo } from "react";
const HELIUS_RPC_URL = "https://mainnet.helius-rpc.com/?api-key=351fa5ac-9d20-448b-9181-2258dc95374a";
const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const network = WalletAdapterNetwork.Mainnet;
    const endPoint = useMemo(() => HELIUS_RPC_URL, []);
    const wallets = useMemo(() => [
        new PhantomWalletAdapter(),
        new SolflareWalletAdapter(),
        new MathWalletAdapter(),
        new TrustWalletAdapter(),
        new CoinbaseWalletAdapter()
    ], [])
    return (<>
        <ConnectionProvider endpoint={endPoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    </>)
}
export default WalletContextProvider