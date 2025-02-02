import axios from "axios";
import { metadataTypes } from "./types";
const uploadImage = async (file: File) => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
            headers: {
                'Content-Type': "multipart/form-data",
                'pinata_api_key': "f405d86a2838de081d08",
                'pinata_secret_api_key': "c223f69a7ed8cd82b5a94d432387563f2d7536915eefdb9e1c24be578b4a6b26"

            }
        })
        return `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
    }
    catch (e) {
        console.log(e);
        return e;
    }
}
const uploadMetadata = async (metadata: metadataTypes) => {
    try {
        const response = await axios.post('https://api.pinata.cloud/pinning/pinJSONToIPFS', metadata, {
            headers: {
                "Content-Type": "application/json",
                'pinata_api_key': "f405d86a2838de081d08",
                'pinata_secret_api_key': "c223f69a7ed8cd82b5a94d432387563f2d7536915eefdb9e1c24be578b4a6b26"
            }
        })
        return `https://ipfs.io/ipfs/${response.data.IpfsHash}`;
    }
    catch (e) {
        return e;
    }
}
export { uploadImage, uploadMetadata };