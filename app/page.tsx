/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client"
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useAtom } from "jotai";
import { balanceAtom } from "./store";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useEffect, useState } from "react";
import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";
import Modal from "react-modal"
import { Program, AnchorProvider, setProvider, web3 } from "@project-serum/anchor";
import { createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import idl from "../anchor_cli/sol_transfer/target/idl/sol_transfer.json"
import { BN } from "@coral-xyz/anchor";
const mint_address = new PublicKey("mntetjbaqwSEPS3ms7c9Crwor1PKybJq46qr6LWTjf2");
export default function Home() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [amount, setAmount] = useState<number>(0);
  const [recipientAddress, setRecipientAddress] = useState<string>("");
  const customStyles = {
    content: {
      top: '40%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: "#171717",
      color: "white"
    },
  };
  const walletModal = useWalletModal();
  const [balance, setBalance] = useAtom(balanceAtom);
  const { publicKey, disconnect, connected } = useWallet();
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

  //////////////////////
  const closeModal = () => {
    setIsOpen(false)
  }
  ////////////////////

  const handleTransfer = async () => {
    const connection = new Connection("https://devnet.helius-rpc.com/?api-key=d1c3593c-f343-4a65-91ac-d0b473e62342", "confirmed");
    if (!publicKey) return;
    const provider = new AnchorProvider(connection, window.solana, {});

    setProvider(provider);

    const program = new Program(JSON.parse(JSON.stringify(idl)), "4Lge4mr7XKzuLjjk5bz2A2rZgH71tTgaQPo2T4b1tpRo", provider);

    const recipientPublicKey = new PublicKey(recipientAddress);
    const to_ata = await getAssociatedTokenAddress(mint_address, recipientPublicKey, true, TOKEN_2022_PROGRAM_ID);
    const from_ata = await getAssociatedTokenAddress(mint_address, publicKey, true, TOKEN_2022_PROGRAM_ID);

    const aa = new BN(amount);
    const toAtaInfo = await connection.getAccountInfo(to_ata);

    const transaction = new web3.Transaction();
    if (!toAtaInfo) {
      const createAtaIx = createAssociatedTokenAccountInstruction(publicKey, to_ata, recipientPublicKey, mint_address, TOKEN_2022_PROGRAM_ID);
      transaction.add(createAtaIx);
    }
    // const fromAtaInfo = await connection.getAccountInfo(from_ata);
    // console.log(fromAtaInfo, "SSSSSSSSSSSSS")
    // if (!fromAtaInfo) {
    //   console.log("sdfsdf")
    // }

    const transferIx = await program.methods.transferToken(aa).accounts({
      from: publicKey,
      from_ata: from_ata,
      to_ata: to_ata,
      mint: mint_address,
      token_program: TOKEN_2022_PROGRAM_ID
    }).transaction();
    console.log(transferIx)
    transaction.add(transferIx);
    const latestBlockhash = await connection.getLatestBlockhash();

    transaction.recentBlockhash = latestBlockhash.blockhash;
    transaction.feePayer = publicKey;

    console.log(transferIx)
    const simRes = await connection.simulateTransaction(transaction);
    if (simRes.value.err) {
      console.log(simRes, "Sdfsdf");
      return;
    }

    const signature = await window.solana.signAndSendTransaction(transaction);
    await connection.confirmTransaction(signature.signature);
    console.log("Okay", signature);
    console.log("Transfer successful");

  }
  return (
    <div className=" flex flex-col items-center gap-5 mt-10 p-20">
      <div>
        {connected ? `Your current Balance is ${balance}` : "Please connect Wallet"}
      </div>
      <div className=" space-x-5">
        {!connected ? <button
          className="shadow-[inset_0_-4px_4px_#FFFFFF40] bg-gradient-to-tr from-slate-900 to-green-800 p-3 rounded-lg inset-6 text-white"
          onClick={handleConnect}
        >
          Connect Wallet
        </button> : <button onClick={handleDisconnect} className="shadow-[inset_0_-4px_4px_#FFFFFF40] bg-gradient-to-tr from-slate-900 to-red-800 p-3 rounded-lg inset-6 text-white">
          Disconnect Wallet
        </button>}
        <button onClick={() => {
          connected && setIsOpen(true)
        }} className="shadow-[inset_0_-4px_4px_#FFFFFF40] bg-gradient-to-tr from-blue-900 to-pink-800 p-3 rounded-lg inset-6 text-white" >Transfer</button>

      </div>
      <div
      >
        <Modal isOpen={isOpen} ariaHideApp={false} onRequestClose={closeModal} style={customStyles} contentLabel="SSS">
          <div className=" flex flex-col gap-5 justify-between py-4">
            <h1 className=" text-[28px]">
              Transfer
            </h1>
          </div>
          <div className=" flex flex-col gap-5">
            <div className=" flex flex-row gap-5 items-center">
              <div className=" flex-1">To:</div>
              <input type="text" onChange={(e) => {
                setRecipientAddress(e.target.value);
              }} className="  flex-[3] text-[#333] ring-0 outline-none px-4 py-2 rounded-md transition-all focus:shadow-[0px_0px_4px_2px] focus:shadow-[rgba(255,255,255,0.5)]" />
            </div>
            <div className=" flex flex-row gap-5 items-center">
              <div className=" flex-1">Amount:</div>
              <input type="text" onChange={(e) => {
                setAmount(Number(e.target.value));
              }} className=" flex-[3] text-[#333] ring-0 outline-none px-4 py-2 rounded-md transition-all focus:shadow-[0px_0px_4px_2px] focus:shadow-[rgba(255,255,255,0.5)]" />
            </div>
          </div>
          <div className=" flex flex-row justify-between pt-5">
            <button onClick={handleTransfer} className="shadow-[inset_0_-4px_4px_#FFFFFF40] bg-gradient-to-tr from-blue-900 via-black to-blue-800 p-3 px-4 rounded-lg inset-6 text-white">Send</button>
            <button className="shadow-[inset_0_-4px_4px_#FFFFFF40] bg-gradient-to-tr from-slate-900 to-red-800 p-3 rounded-lg inset-6 text-white" onClick={closeModal}>Cancel</button>
          </div>
        </Modal>
      </div>
    </div >
  );
}
