"use client"
import { useEffect, useState } from "react";
import { uploadImage } from "../utiles";

const NFT: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);

    const handleMint = async () => {
        console.log(await uploadImage(file));
    }
    return (
        <div>
            <div>
                <input type="file" onChange={(e) => {
                    setFile(e.target.files[0]);
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