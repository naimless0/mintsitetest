import { useContract, useContractRead, useContractWrite, Web3Button, useAddress, ConnectWallet } from "@thirdweb-dev/react";
import styles from "../styles/Home.module.css";
import { ethers } from "ethers";


const contractAddress = "0xA96a6Bdf602488e8fD5a753107963034cBd27AA0";


export default function Home() {

  const { contract } = useContract(contractAddress);
  const address = useAddress();
  const { data: getnumdata } = useContractRead(contract, "nextTokenIdToClaim"); 
  const { mutateAsync: claim, isLoading } = useContractWrite(contract, "claim");
  const { data: priceToPass } = useContractRead(contract, "nextTokenIdToClaim");
  const call = async () => {
    const _price = await priceToPass / 2;
    const data = await contract?.call(
      "claim", // Name of your function as it is on the smart contract
      [address, "1", "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", "500000000000000000", { "proof": ["0x0000000000000000000000000000000000000000000000000000000000000000"], "quantityLimitPerWallet": 0, "pricePerToken": 0, "currency": "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee" }, "0x00"],
      {
        value: ethers.utils.parseEther(_price.toString()), // send token with the contract call
      },
    );
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Mint Your Card Now!
        </h1>

        <p className={styles.description}>
          Join the Nation of the Disciplined!
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
            <h2>Mint Your Card!</h2>
            <p>
              {contract && 
              <>
              <div>
                <button

               onClick={() => call()}
               className={styles.buttn1}
               >
               Mint 

              </button>
              </div>
              </>}
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
