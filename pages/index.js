import { useContract, useContractRead, useContractWrite, Web3Button, useAddress, ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { ethers, utils } from "ethers";


const contractAddress = "0x8F08597e28F2b4F4F153970742B1cc532C619F57";


export default function Home() {
  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const { data: getnumdata } = useContractRead(contract, "nextTokenIdToClaim"); 
  const { mutateAsync: claim, isLoading } = useContractWrite(contract, "claim")

  const call = async () => {
    try {
      const data = await claim({ args: [_receiver, _quantity, _currency, _pricePerToken, _allowlistProof, _data] });
      console.info("contract call successs", data);
    } catch (err) {
      console.error("contract call failure", err);
    }
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Mint Your Card Now!
        </h1>

        <p className={styles.description}>
          Join Now!
        </p>
        <div className={styles.connect}>
          <ConnectWallet />
        </div>
        <div className={styles.grid}>
          <a className={styles.card}>
            <h2>Price to Mint Next Card &rarr;</h2>
            <p>
              {getnumdata?.toNumber()/2} Matic
            </p>
          </a>

          <a className={styles.card}>
            <h2>Mint Your NFT Card &rarr;</h2>
            <p>
               <Web3Button
               contractAddress = "0x8F08597e28F2b4F4F153970742B1cc532C619F57"
               action={(contract) => {
                contract.call("claim", [address, "1", "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "500000000000000000", { "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"], "quantityLimitPerWallet": 0, "pricePerToken": 0, "currency": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" }, "0x00"], utils.parseEther("2") ,)
               }
              }
                  onSuccess={(result) => alert("Congratulations!")}
                >
                 Mint
                </Web3Button>
            </p>
          </a>

          <a
            className={styles.card}
          >
            <h2> ID# of the Next NFT Card to be Minted &rarr;</h2>
            <p> 
                {getnumdata?.toNumber()}
            </p>
          </a>
        </div>
      </main>
    </div>
  );
}
