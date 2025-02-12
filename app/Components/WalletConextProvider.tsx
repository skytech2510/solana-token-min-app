// app/components/WalletContextProvider.tsx

'use client';

import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { useMemo } from "react";

const HELIUS_RPC_URL = "https://devnet.helius-rpc.com/?api-key=d1c3593c-f343-4a65-91ac-d0b473e62342";

const WalletContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const endpoint = HELIUS_RPC_URL;

    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter(),
        ],
        []
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect={true}>
                <WalletModalProvider>
                    {children}
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

export default WalletContextProvider;
