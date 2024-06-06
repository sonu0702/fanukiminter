"use client"
import Image from "next/image";
import styles from "./page.module.css";
import { ThirdwebProvider, useAddress, useDisconnect } from "@thirdweb-dev/react";
import { metamaskWallet } from "@thirdweb-dev/react";
import Mint from "./components/Mint";
const metamaskConfig = metamaskWallet();
export default function Home() {
  return (
    <ThirdwebProvider activeChain={"sepolia"}
      clientId="b5606e9418d0011ea5803e1d9d53218b"
      supportedWallets={[metamaskConfig]}
    >
      <main className={styles.main}>
        <Mint />
      </main>
    </ThirdwebProvider>
  );
}
