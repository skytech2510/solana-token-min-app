"use client"
import { useState } from "react";
import { uploadImage, uploadMetadata } from "../utiles";
import { metadataTypes } from "../types";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import idl from "../../contracts/NFT_mint/idl.json";
import { createInitializeMint2Instruction, getOrCreateAssociatedTokenAccount, MINT_SIZE, TOKEN_PROGRAM_ID, getAssociatedTokenAddressSync, Account, getAccount, TokenAccountNotFoundError, TokenInvalidAccountOwnerError, createAssociatedTokenAccountInstruction, ASSOCIATED_TOKEN_PROGRAM_ID, getAssociatedTokenAddress } from "@solana/spl-token";
import { AnchorProvider, Program, setProvider, web3 } from "@project-serum/anchor";
import { simulateTransaction } from "@project-serum/anchor/dist/cjs/utils/rpc";
const programId = new PublicKey('8ZbHaRT5j9hFZjnnb9b8aa8fr6ge9pZqZ7wZBWN3wrsN');
const NFT: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const { publicKey, signTransaction } = useWallet();
    const anchorWallet = useAnchorWallet();
    const handleMint = async () => {
        // if (!file) return;
        // const fileUri = await uploadImage(file);
        // const metadata: metadataTypes = {
        //     name: "My NFT",
        //     symbol: "AAA",
        //     uri: fileUri as string,
        //     seller_fee_basis_points: 500,
        //     creator: "owner"
        // }
        // const metadataUrl = await uploadMetadata(metadata);
        if (!publicKey || !signTransaction || !anchorWallet) {
            console.error("Wallet not connected");
            return;
        }

        const metadataUrl = "https://ipfs.io/ipfs/QmVy1mCVUT5Xi2JqvVjX6ozx7PQiUaibcRo11YDStDaBWv";
        const connection = new Connection("https://devnet.helius-rpc.com/?api-key=d1c3593c-f343-4a65-91ac-d0b473e62342", "confirmed");
        const provider = new AnchorProvider(connection, anchorWallet, {});
        setProvider(provider);
        const program = new Program(JSON.parse(JSON.stringify(idl)), "8ZbHaRT5j9hFZjnnb9b8aa8fr6ge9pZqZ7wZBWN3wrsN", provider);

        // const mintAccount = await createMint(connection, publicKey, publicKey, null, 0);


        // {
        //     fromPubkey: publicKey,
        //     newAccountPubkey: keyPairForMinAccount.publicKey,
        //     space: MINT_SIZE,
        //     lamports,
        // }

        // const keyPairForMinAccount = Keypair.generate();
        // const transaction = new Transaction().add(
        //     SystemProgram.createAccount({ fromPubkey: publicKey, newAccountPubkey: keyPairForMinAccount.publicKey, space: MINT_SIZE, lamports: LAMPORTS_PER_SOL, programId: TOKEN_PROGRAM_ID }),
        //     createInitializeMint2Instruction(keyPairForMinAccount.publicKey, 0, publicKey, null, TOKEN_PROGRAM_ID),
        // );
        // transaction.feePayer = publicKey;
        // transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

        // try {
        //     transaction.sign(keyPairForMinAccount);
        //     const signedTransaction = await anchorWallet.signTransaction(transaction);
        //     // const res = await simulateTransaction(connection, signedTransaction);
        //     // if (res.value.err) {
        //     //     console.log(res.value.err);
        //     // }

        //     const signature = await connection.sendRawTransaction(signedTransaction.serialize());;
        //     await connection.confirmTransaction(signature, "confirmed");

        // } catch (error) {
        //     console.error("Transaction failed:", error);
        // }


        // const associatedToken = getAssociatedTokenAddressSync(keyPairForMinAccount.publicKey, publicKey, false, TOKEN_PROGRAM_ID, ASSOCIATED_TOKEN_PROGRAM_ID);
        // let associatedTokenAccount: Account;
        // try {
        //     associatedTokenAccount = await getAccount(connection, associatedToken);

        // }
        // catch (err) {
        //     if (err instanceof TokenAccountNotFoundError || err instanceof TokenInvalidAccountOwnerError) {
        //         try {
        //             const transaction = new Transaction().add(createAssociatedTokenAccountInstruction(
        //                 publicKey,
        //                 associatedToken,
        //                 publicKey,
        //                 keyPairForMinAccount.publicKey,
        //                 TOKEN_PROGRAM_ID,
        //                 ASSOCIATED_TOKEN_PROGRAM_ID
        //             ))
        //             transaction.feePayer = publicKey;
        //             transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        //             const signedTransaction = await anchorWallet.signTransaction(transaction);
        //             const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        //             await connection.confirmTransaction(signature, "confirmed");
        //             console.log(signature);

        //         }
        //         catch (error) {
        //             return console.log(error);
        //         }
        //         associatedTokenAccount = await getAccount(connection, associatedToken);
        //     }
        //     else {
        //         return;
        //     }
        // }
        // // const associatedTokenAccount = await getOrCreateAssociatedTokenAccount(
        // //     connection,
        // //     wallet as unknown as Signer,
        // //     mintAccount,
        // //     publicKey,
        // //     true,
        // // )


        // // await mintTo(
        // //     connection, wallet as unknown as Signer, mintAccount, associatedTokenAccount.address, publicKey, 1, []
        // // )
        // const tx = await program.methods.initNft(
        //     "My NFT",
        //     "AAA",
        //     metadataUrl
        // ).accounts({
        //     signer: publicKey,
        //     mint: keyPairForMinAccount.publicKey,
        //     associatedTokenAccount: associatedTokenAccount.address,
        //     metadataAccount: associatedTokenAccount.address,
        //     associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        //     tokenProgram: TOKEN_PROGRAM_ID,
        //     systemProgram: SystemProgram.programId
        // }).transaction();
        // console.log(tx);
        // tx.feePayer = publicKey;
        // tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        // tx.sign(keyPairForMinAccount);

        // const signedTransaction = await anchorWallet.signTransaction(tx);
        // // const simRes = await connection.simulateTransaction(tx);
        // // if (simRes.value.err) {
        // //     console.log(simRes, "Sdfsdf");
        // //     return;
        // // }

        // const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        // await connection.confirmTransaction(signature, "confirmed");
        ///////////////////22222222222222222222222222--------------------------------
        // const [mintAddress] = PublicKey.findProgramAddressSync(
        //     [Buffer.from("mint"), publicKey.toBuffer()],
        //     programId
        // );

        // const [metadataAddress] = PublicKey.findProgramAddressSync(
        //     [Buffer.from("metadata"), mintAddress.toBuffer()],
        //     programId
        // );
        // const associatedToken = getAssociatedTokenAddressSync(mintAddress, publicKey, false);
        // let associatedTokenAccount: Account;
        // try {
        //     associatedTokenAccount = await getAccount(connection, associatedToken);

        // }
        // catch (err) {
        //     if (err instanceof TokenAccountNotFoundError || err instanceof TokenInvalidAccountOwnerError) {
        //         try {
        //             const transaction = new Transaction().add(createAssociatedTokenAccountInstruction(
        //                 publicKey,
        //                 associatedToken,
        //                 publicKey,
        //                 mintAddress,
        //             ))
        //             transaction.feePayer = publicKey;
        //             transaction.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;
        //             const signedTransaction = await anchorWallet.signTransaction(transaction);
        //             const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        //             await connection.confirmTransaction(signature, "confirmed");
        //             console.log(signature);

        //         }
        //         catch (error) {
        //             return console.log(error);
        //         }
        //         associatedTokenAccount = await getAccount(connection, associatedToken);
        //     }
        //     else {
        //         return;
        //     }
        // }

        // const tx = await program.methods.initNft("My NFT", "AAA", metadataUrl).accounts({
        //     signer: publicKey,
        //     mint: mintAddress,
        //     associatedTokenAccount: associatedTokenAccount.address,
        //     metadataAccount: metadataAddress,
        //     tokenProgram: TOKEN_PROGRAM_ID,
        //     associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
        //     systemProgram: SystemProgram.programId,
        // }).transaction();

        // tx.feePayer = publicKey;
        // tx.recentBlockhash = (await connection.getRecentBlockhash()).blockhash;

        // const signedTransaction = await anchorWallet.signTransaction(tx);
        // const simRes = await connection.simulateTransaction(signedTransaction);

        // if (simRes.value.err) {
        //     console.log(simRes, "Simulation Error");
        //     return;
        // }

        // const signature = await connection.sendRawTransaction(signedTransaction.serialize());
        // await connection.confirmTransaction(signature, "confirmed");

        // console.log('Transaction signature', signature);
        const mint = web3.Keypair.generate();
        const associatedTokenAccount = await getAssociatedTokenAddress(mint.publicKey, provider.wallet.publicKey);
        const metadataAccount = web3.Keypair.generate();

        const transaction = new Transaction().add(
            program.instruction.initNft("BBBB", "AAAAA", metadataUrl, {
                accounts: {
                    signer: provider.wallet.publicKey,
                    mint: mint.publicKey,
                    associatedTokenAccount,
                    metadataAccount: metadataAccount.publicKey,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    associatedTokenProgram: ASSOCIATED_TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                },
                signers: [mint, metadataAccount],
            })
        );

        const res = await provider.sendAndConfirm(transaction, [mint, metadataAccount]);
        await connection.confirmTransaction(res, "confirmed")
        const accountInfo = await connection.getParsedAccountInfo(associatedTokenAccount);
        if (accountInfo.value) {
            console.log(accountInfo)
            const tokenAmount = accountInfo.value.data.parsed.info.tokenAmount;
            console.log(`Minted tokens: ${tokenAmount.uiAmount}`);
        }
        const metadataAccountInfo = await connection.getAccountInfo(metadataAccount.publicKey);

        if (metadataAccountInfo) {
            const metadataData = metadataAccountInfo.data;
            console.log(metadataData.toString())
            // Decode the data based on how you structured it in MetadataAccount
            const name = metadataData.name; // Assuming you have a way to decode this
            const symbol = metadataData.symbol; // Assuming you have a way to decode this
            const uri = metadataData.uri; // Assuming you have a way to decode this

            console.log('Metadata:', { name, symbol, uri });
        } else {
            console.log("Metadata account not found");
        }
    }
    return (
        <div>
            <div>
                <input type="file" onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                        setFile(e.target.files[0]);
                    }
                }} />
                <input type="text" />
            </div>
            <div>
                <button onClick={handleMint}>Mint</button>
            </div>
        </div>
    )
}
export default NFT;