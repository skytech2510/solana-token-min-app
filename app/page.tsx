/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useAtom } from "jotai";
import { balanceAtom } from "./store";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect } from "react";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

export default function Home() {
  const walletModal = useWalletModal();
  const [balance, setBalance] = useAtom(balanceAtom);
  const { publicKey, disconnect, connected, } = useWallet();
  const { connection } = useConnection();
  useEffect(() => {
    if (publicKey) {
      console.log(publicKey?.toString());
      console.log(connected);
      const connection = new Connection("https://devnet.helius-rpc.com/?api-key=d1c3593c-f343-4a65-91ac-d0b473e62342", "confirmed");
      connection.getBalance(publicKey).then(e => {
        console.log(e)
        setBalance(e / LAMPORTS_PER_SOL);
      });
    }
  }, [publicKey, connection, connected]);
  const handleDisconnect = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    connected && await disconnect();
  }
  const handleConnect = () => {
    !connected && walletModal.setVisible(true);
  }
  return (
    <div className=" flex flex-col items-center gap-5 mt-10 p-20">
      <div>
        {connected ? `Your current Balance is ${balance}` : "Please connect Wallet"}
      </div>
      <div>
        {!connected ? <button
          className="shadow-[inset_0_-4px_4px_#FFFFFF40] bg-gradient-to-tr from-slate-900 to-green-800 p-3 rounded-lg inset-6 text-white"
          onClick={handleConnect}
        >
          Connect Wallet
        </button> : <button onClick={handleDisconnect} className="shadow-[inset_0_-4px_4px_#FFFFFF40] bg-gradient-to-tr from-slate-900 to-red-800 p-3 rounded-lg inset-6 text-white">
          Disconnect Wallet
        </button>}

      </div>
      <div
      >
      </div>
    </div >
  );
}
