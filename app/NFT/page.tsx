"use client"
import { useState } from "react";
import { uploadImage, uploadMetadata } from "../utiles";
import { metadataTypes } from "../types";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
const NFT: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const { publicKey, signTransaction } = useWallet();
    const handleMint = async () => {
        if (!file) return;
        const fileUri = await uploadImage(file);
        const metadata: metadataTypes = {
            name: "My NFT",
            symbol: "AAA",
            uri: fileUri as string,
            seller_fee_basis_points: 500,
            creator: "owner"
        }
        const connection = new Connection("https://devnet.helius-rpc.com/?api-key=d1c3593c-f343-4a65-91ac-d0b473e62342", "confirmed");
        const matadataUrl = await uploadMetadata(metadata);



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