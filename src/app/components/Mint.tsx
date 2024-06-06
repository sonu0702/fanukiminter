"use client"
import Image from "next/image";
import styles from "../page.module.css";
import { useAddress, useDisconnect, useConnect, metamaskWallet } from "@thirdweb-dev/react";
import {
    useContract,
    useClaimNFT,
    Web3Button,
} from "@thirdweb-dev/react";

const metamaskConfig = metamaskWallet();
const contractAddress = '0x55e3e0FAC3F347E280A9D0267F84176f6179C0F4'
export default function Mint() {
    const connect = useConnect();
    const address = useAddress();
    const disconnect = useDisconnect();
    const { contract } = useContract(contractAddress);
    const {
        mutateAsync: claimNft,
        isLoading,
        error,
    } = useClaimNFT(contract);
    return (
        <>
            <h2>
                Fanuki
            </h2>
            <h3>
                Fanuki is on sepolia
            </h3>

            {address ? (<button
                style={{
                    minWidth: '150px', minHeight: '43px',
                    backgroundColor: '#ffffff', color: '#000000'
                }}
                onClick={disconnect}
            >
                Disconnect {address}
            </button>) : null}

            <div className={styles.center}>
                <Image
                    className={styles.logo}
                    src="/1.png"
                    alt="Collectible"
                    width={400}
                    height={400}
                    priority
                />
            </div>
            {
                address ? (<Web3Button
                    contractAddress={contractAddress}
                    action={() =>
                        claimNft({
                            to: address, // Use useAddress hook to get current wallet address
                            quantity: 1,
                        })
                    }
                >
                    Claim NFT
                </Web3Button>) :
                    (<button
                        style={{
                            minWidth: '150px', minHeight: '43px',
                            backgroundColor: '#ffffff', color: '#000000'
                        }}
                        onClick={async () => {
                            const wallet = await connect(metamaskConfig, { chainId: 11155111 });
                            console.log("connected to ", wallet);
                        }}
                    >
                        Connect to MetaMask
                    </button>)
            }

            <div>
            </div>
        </>


    )
}