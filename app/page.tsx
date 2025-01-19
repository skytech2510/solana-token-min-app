"use client"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useAtom } from "jotai";
import { balanceAtom } from "./store";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { Connection } from "@solana/web3.js";

export default function Home() {
  const walletModal = useWalletModal();
  const [balance, setBalance] = useAtom(balanceAtom);
  const { publicKey, disconnect, } = useWallet();
  const { connection } = useConnection();
  useEffect(() => {
    if (publicKey) {
      console.log(publicKey?.toString());
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=d1c3593c-f343-4a65-91ac-d0b473e62342", "confirmed");
      connection.getBalance(publicKey).then(e => {
        setBalance(e);
      });
    }
  }, [publicKey, connection]);
  return (
    <div>
      <div>
        {balance}
      </div>
      <button
        onClick={() => {
          walletModal.setVisible(true);
        }}
      >
        Connect Wallet
      </button>
    </div>
  );
}
