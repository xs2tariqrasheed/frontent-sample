import * as fcl from '@onflow/fcl';
import { apiLocation } from '../../config';
const t = require('@onflow/types');

let blockleteVersion = 5;
if (process.env.FLOW_MODE === 'mainnet') {
  blockleteVersion = 'NFT_V2'
}

// This function is called the first time a user wants to engage with the Blocklete
// Smart contracts in order to own a Blocklete. It sets aside storage for the Blocklete.
export const setupAccount = async () => {
  try {
    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    let fungibleContractAddress = contractAddress.serverAddress;
    let fusdContractAddress = contractAddress.serverAddress;
    let nonFungibleContractAddress = contractAddress.serverAddress;
    if (process.env.FLOW_MODE === 'testnet') {
      fusdContractAddress = '0xe223d8a629e49c68';
      nonFungibleContractAddress = '0x631e88ae7f1d7c20';
      fungibleContractAddress = '0x9a0766d93b6608b7';
    }
    else if (process.env.FLOW_MODE === 'mainnet') {
      fusdContractAddress = '0x3c5959b568896393';
      nonFungibleContractAddress = '0x1d7e57aa55817448';
      fungibleContractAddress = '0xf233dcee88fe0abe';
    }

    const response = await fcl
      .send([
        fcl.transaction`
        import FungibleToken from ${fungibleContractAddress}
        import FUSD from ${fusdContractAddress}
        import NonFungibleToken from ${nonFungibleContractAddress}
        import Blockletes_${blockleteVersion} from ${contractAddress.serverAddress
          }
        import BlockleteMarket_${blockleteVersion} from ${contractAddress.serverAddress
          }
        
        
        transaction(beneficiaryAccount: Address, cutPercentage: UFix64) {
            prepare(signer: AuthAccount) {
        
                // If the account doesn't already have a collection
                if signer.borrow<&Blockletes_${blockleteVersion}.Collection>(from: Blockletes_${blockleteVersion}.CollectionStoragePath) == nil {
        
                    // Create a new empty collection and save it to the account
                    signer.save(<-Blockletes_${blockleteVersion}.createEmptyCollection(), to: Blockletes_${blockleteVersion}.CollectionStoragePath)
        
                    // Create a public capability to the Blockletes collection
                    // that exposes the BlockletesCollection interface
                    signer.link<&Blockletes_${blockleteVersion}.Collection{NonFungibleToken.CollectionPublic,Blockletes_${blockleteVersion}.BlockletesCollectionPublic}>(
                        Blockletes_${blockleteVersion}.CollectionPublicPath,
                        target: Blockletes_${blockleteVersion}.CollectionStoragePath
                    )
                }
        
                // If the account doesn't already have a sale collection
                if signer.borrow<&BlockleteMarket_${blockleteVersion}.SaleCollection>(from: BlockleteMarket_${blockleteVersion}.SaleCollectionStoragePath) == nil {
        
                    // Get Medal token reciever to accept payment
                    let ownerCapability = signer.getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)!
                    // Get Medal token reciever for the account where a cut of the purchase will be sent
                    let beneficiaryCapability = getAccount(beneficiaryAccount).getCapability<&FUSD.Vault{FungibleToken.Receiver}>(/public/fusdReceiver)!
        
                    // Create a new empty collection
                    let collection <- BlockleteMarket_${blockleteVersion}.createSaleCollection(ownerCapability: ownerCapability, beneficiaryCapability: beneficiaryCapability, cutPercentage: cutPercentage) as! @BlockleteMarket_${blockleteVersion}.SaleCollection
        
                    // Save it to the account
                    signer.save(<-collection, to: BlockleteMarket_${blockleteVersion}.SaleCollectionStoragePath)
        
                    // Create a public capability for the sale collection
                    // that exposes the sale public interface
                    signer.link<&BlockleteMarket_${blockleteVersion}.SaleCollection{BlockleteMarket_${blockleteVersion}.SalePublic}>(
                        BlockleteMarket_${blockleteVersion}.SaleCollectionPublicPath,
                        target: BlockleteMarket_${blockleteVersion}.SaleCollectionStoragePath
                    )
                }
            }
        }
        `,
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.args([
          fcl.arg(contractAddress.serverAddress, t.Address),
          fcl.arg('0.05', t.UFix64),
        ]),
        fcl.limit(1000),
      ])
      .then(fcl.decode);

    return await fcl.tx(response).onceSealed();
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};

export const setupAccountForFusd = async () => {
  try {

    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    let fusdContractAddress = contractAddress.serverAddress;
    let fungibleContractAddress = contractAddress.serverAddress;
    if (process.env.FLOW_MODE === 'testnet') {
      fusdContractAddress = '0xe223d8a629e49c68';
      fungibleContractAddress = '0x9a0766d93b6608b7';
    }
    else if (process.env.FLOW_MODE === 'mainnet') {
      fusdContractAddress = '0x3c5959b568896393';
      fungibleContractAddress = '0xf233dcee88fe0abe';
    }

    const response = await fcl
      .send([
        fcl.transaction`
        import FungibleToken from ${fungibleContractAddress}
        import FUSD from ${fusdContractAddress}
        // This transaction is what an account would run
        // to set itself up to receive NFTs
        transaction {
          prepare(signer: AuthAccount) {
            let existingVault = signer.borrow<&FUSD.Vault>(from: /storage/fusdVault)
            // If the account is already set up that's not a problem, but we don't want to replace it
            if (existingVault != nil) {
                return
            }
            
            // Create a new FUSD Vault and put it in storage
            signer.save(<-FUSD.createEmptyVault(), to: /storage/fusdVault)
            // Create a public capability to the Vault that only exposes
            // the deposit function through the Receiver interface
            signer.link<&FUSD.Vault{FungibleToken.Receiver}>(
              /public/fusdReceiver,
              target: /storage/fusdVault
            )
            // Create a public capability to the Vault that only exposes
            // the balance field through the Balance interface
            signer.link<&FUSD.Vault{FungibleToken.Balance}>(
              /public/fusdBalance,
              target: /storage/fusdVault
            )
        }
        }
        `,
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.limit(1000),
      ])
      .then(fcl.decode);

    return await fcl.tx(response).onceSealed();
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};

// Checks if a user already has an account setup on the marketplace. If so, no need to setup more
// space.
export const checkIfMarketAccountAlreadySetup = async address => {
  try {
    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    return fcl
      .send([
        fcl.script(`
        import BlockleteMarket_${blockleteVersion} from ${contractAddress.serverAddress
          }
        // Print the NFTs owned by an account
        pub fun main(account: Address): Bool {
            // Get both public account objects
            let account = getAccount(account);
            let acctCapability = account.getCapability(BlockleteMarket_${blockleteVersion}.SaleCollectionPublicPath)!
            if acctCapability.borrow<&{BlockleteMarket_${blockleteVersion}.SalePublic}>() == nil {
              return false;
            }
            return true;
        }       
      `),
        fcl.args([fcl.arg(address, t.Address)]),
      ])
      .then(fcl.decode);
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};

// Called to list a blocklete for sale in the marketplace.
export const listBlockleteForSale = async (tokenId, salePrice) => {
  try {
    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    const response = await fcl
      .send([
        fcl.transaction`
        import Blockletes_${blockleteVersion} from ${contractAddress.serverAddress
          }
        import BlockleteMarket_${blockleteVersion} from ${contractAddress.serverAddress
          }
        transaction(tokenId: UInt64, salePrice: UFix64) {
            prepare(acct: AuthAccount) {
                // borrow a reference to the Blockletes Collection
                let blockletesCollection = acct.borrow<&Blockletes_${blockleteVersion}.Collection>(from: Blockletes_${blockleteVersion}.CollectionStoragePath)
                    ?? panic("Could not borrow from Blockletes Collection in storage")
                // withdraw the specified token from the Collection
                let token <- blockletesCollection.withdraw(withdrawID: tokenId) as! @Blockletes_${blockleteVersion}.NFT
                // borrow a reference to the topshot Sale Collection
                let marketSaleCollection = acct.borrow<&BlockleteMarket_${blockleteVersion}.SaleCollection>(from: BlockleteMarket_${blockleteVersion}.SaleCollectionStoragePath)
                    ?? panic("Could not borrow from sale in storage")
                // List the specified moment for sale
                marketSaleCollection.listForSale(token: <-token, price: salePrice)
            }
        }
        `,
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.args([fcl.arg(tokenId, t.UInt64), fcl.arg(salePrice, t.UFix64)]),
        fcl.limit(2500),
      ])
      .then(fcl.decode);

    return await fcl.tx(response).onceSealed();
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};

// Called to cancel the sale of a blocklete.
export const cancelSaleOfBlocklete = async tokenId => {
  try {
    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    const response = await fcl
      .send([
        fcl.transaction`
        import Blockletes_${blockleteVersion} from ${contractAddress.serverAddress
          }
        import BlockleteMarket_${blockleteVersion} from ${contractAddress.serverAddress
          }
        // Cancel a sale by withdrawing that Blocklete from their
        // sale collection and depositing it into their normal collection
        transaction(tokenID: UInt64) {
            prepare(acct: AuthAccount) {
                // Borrow a reference to the Blockletes NFT collection in the signers account
                let blockleteCollection = acct.borrow<&Blockletes_${blockleteVersion}.Collection>(from: Blockletes_${blockleteVersion}.CollectionStoragePath)
                    ?? panic("Could not borrow from Blockletes collection in storage")
                // borrow a reference to the owner's sale collection
                let blockleteSaleCollection = acct.borrow<&BlockleteMarket_${blockleteVersion}.SaleCollection>(from: BlockleteMarket_${blockleteVersion}.SaleCollectionStoragePath)
                    ?? panic("Could not borrow from sale in storage")
                // withdraw the blocklete from the sale, thereby de-listing it
                let token <- blockleteSaleCollection.withdraw(tokenID: tokenID)
                // deposit the moment into the owner's collection
                blockleteCollection.deposit(token: <-token)
            }
        }
        `,
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.args([fcl.arg(tokenId, t.UInt64)]),
        fcl.limit(2500),
      ])
      .then(fcl.decode);

    return await fcl.tx(response).onceSealed();
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};

// Called to purchase a blocklete from the marketplace.
export const purchaseBlocklete = async (
  sellerAddress,
  tokenId,
  purchaseAmount,
) => {
  try {
    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    let fusdContractAddress = contractAddress.serverAddress;
    let fungibleContractAddress = contractAddress.serverAddress;
    if (process.env.FLOW_MODE === 'testnet') {
      fusdContractAddress = '0xe223d8a629e49c68';
      fungibleContractAddress = '0x9a0766d93b6608b7';
    }
    else if (process.env.FLOW_MODE === 'mainnet') {
      fusdContractAddress = '0x3c5959b568896393';
      fungibleContractAddress = '0xf233dcee88fe0abe';
    }

    const response = await fcl
      .send([
        fcl.transaction`
        import FungibleToken from ${fungibleContractAddress}
        import FUSD from ${fusdContractAddress}
        import Blockletes_${blockleteVersion} from ${contractAddress.serverAddress
          }
        import BlockleteMarket_${blockleteVersion} from ${contractAddress.serverAddress
          }
        transaction(sellerAddress: Address, tokenID: UInt64, purchaseAmount: UFix64) {
          prepare(acct: AuthAccount) {
      
              // borrow a reference to the signer's collection
              let collection = acct.borrow<&Blockletes_${blockleteVersion}.Collection>(from: Blockletes_${blockleteVersion}.CollectionStoragePath)
                  ?? panic("Could not borrow reference to the Blockletes Collection")
      
              // borrow a reference to the signer's fungible token Vault
              let provider = acct.borrow<&FUSD.Vault{FungibleToken.Provider}>(from: /storage/fusdVault)!
              
              // withdraw tokens from the signer's vault
              let tokens <- provider.withdraw(amount: purchaseAmount) as! @FUSD.Vault
      
              // get the seller's public account object
              let seller = getAccount(sellerAddress)
      
              // borrow a public reference to the seller's sale collection
              let blockleteSaleCollection = seller.getCapability(BlockleteMarket_${blockleteVersion}.SaleCollectionPublicPath)!
                  .borrow<&{BlockleteMarket_${blockleteVersion}.SalePublic}>()
                  ?? panic("Could not borrow public sale reference")
          
              // purchase the blocklete
              let purchasedToken <- blockleteSaleCollection.purchase(tokenID: tokenID, buyTokens: <-tokens)
      
              // deposit the purchased blocklete into the signer's collection
              collection.deposit(token: <-purchasedToken)
          }
      }
        `,
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.args([
          fcl.arg(sellerAddress, t.Address),
          fcl.arg(tokenId, t.UInt64),
          fcl.arg(purchaseAmount, t.UFix64),
        ]),
        fcl.limit(2500),
      ])
      .then(fcl.decode);

    return await fcl.tx(response).onceSealed();
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};

// Called to transfer a blocklete to another account.
export const transferBlocklete = async (toAccount, tokenId) => {
  try {
    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    let nonFungibleContractAddress = contractAddress.serverAddress;
    if (process.env.FLOW_MODE === 'testnet') {
      nonFungibleContractAddress = '0x631e88ae7f1d7c20';
    }
    else if (process.env.FLOW_MODE === 'mainnet') {
      nonFungibleContractAddress = '0x1d7e57aa55817448';
    }

    const response = await fcl
      .send([
        fcl.transaction`
        import NonFungibleToken from ${nonFungibleContractAddress}
        import Blockletes_${blockleteVersion} from ${contractAddress.serverAddress
          }
        // This transaction is for transferring and NFT from 
        // one account to another
        transaction(recipient: Address, withdrawID: UInt64) {
            prepare(acct: AuthAccount) {
                
                // get the recipients public account object
                let recipientAccount = getAccount(recipient)
                // borrow a reference to the signer's NFT collection
                let collectionRef = acct.borrow<&Blockletes_${blockleteVersion}.Collection>(from: Blockletes_${blockleteVersion}.CollectionStoragePath)
                    ?? panic("Could not borrow a reference to the owner's collection")
                // borrow a public reference to the receivers collection
                let depositRef = recipientAccount.getCapability(Blockletes_${blockleteVersion}.CollectionPublicPath)!.borrow<&{Blockletes_${blockleteVersion}.BlockletesCollectionPublic}>()!
                // withdraw the NFT from the owner's collection
                let nft <- collectionRef.withdraw(withdrawID: withdrawID)
                // Deposit the NFT in the recipient's collection
                depositRef.deposit(token: <-nft)
            }
        }
        `,
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.args([fcl.arg(toAccount, t.Address), fcl.arg(tokenId, t.UInt64)]),
        fcl.limit(2500),
      ])
      .then(fcl.decode);

    return await fcl.tx(response).onceSealed();
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};

// Called to retreive all the blockletes someone owns on Flow.
export const getMyBlockletes = async address => {
  try {
    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    /*
    // Find the public Receiver capability for their Collections
            let acctCapabilityMarket = account.getCapability(BlockleteMarket_${blockleteVersion}.SaleCollectionPublicPath)!
            // borrow references from the capabilities
            let receiverRefMarket = acctCapabilityMarket.borrow<&{BlockleteMarket_${blockleteVersion}.SalePublic}>()
                ?? panic("Could not borrow account receiver reference")
            
            var marketOwnedNfts = receiverRefMarket.getIDs();

            let allNfts= ownedNfts.concat(marketOwnedNfts)
    */

    return fcl
      .send([
        fcl.script(`
        import Blockletes_${blockleteVersion} from ${contractAddress.serverAddress
          }
        import BlockleteMarket_${blockleteVersion} from ${contractAddress.serverAddress
          }
        pub fun main(account: Address): [UInt64]{
            // Get both public account objects
            let account = getAccount(account);

            // Find the public Receiver capability for their Collections
            let acctCapability = account.getCapability(Blockletes_${blockleteVersion}.CollectionPublicPath)!
            // borrow references from the capabilities
            let receiverRef = acctCapability.borrow<&{Blockletes_${blockleteVersion}.BlockletesCollectionPublic}>()
                ?? panic("Could not borrow account receiver reference")
            
            var ownedNfts = receiverRef.getIDs();

            let acctCapabilityMarket = account.getCapability(BlockleteMarket_${blockleteVersion}.SaleCollectionPublicPath)!
            let receiverRefMarket = acctCapabilityMarket.borrow<&{BlockleteMarket_${blockleteVersion}.SalePublic}>()
                  ?? panic("Could not borrow account receiver reference")
              
            var marketOwnedNfts = receiverRefMarket.getIDs();
            let allNfts= ownedNfts.concat(marketOwnedNfts)
              
            return allNfts;
        }       
      `),
        fcl.args([fcl.arg(address, t.Address)]),
      ])
      .then(fcl.decode);
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};

// Called to verify if an account has been setup before to own a blocklete.
export const checkIfBlockletesAlreadySetup = async address => {
  try {
    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    return fcl
      .send([
        fcl.script(`
        import Blockletes_${blockleteVersion} from ${contractAddress.serverAddress
          }
        // Print the NFTs owned by an account
        pub fun main(account: Address): Bool {
            // Get both public account objects
            let account = getAccount(account);
            let acctCapability = account.getCapability(Blockletes_${blockleteVersion}.CollectionPublicPath)!
            if acctCapability.borrow<&{Blockletes_${blockleteVersion}.BlockletesCollectionPublic}>() == nil {
              return false;
            }
            return true;
        }       
      `),
        fcl.args([fcl.arg(address, t.Address)]),
      ])
      .then(fcl.decode);
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};

// Purchase a Blocklete golfer.
export const purchaseBlockletePack = async price => {
  try {
    let contractAddress = { serverAddress: '0x9969d64233d69723' }

    if (process.env.FLOW_MODE !== 'mainnet') {
      const res = await fetch(`${apiLocation}/flowaddress`, {
        method: 'GET',
      });
      contractAddress = await res.json();
    }

    const response = await fcl
      .send([
        fcl.transaction`
        import FungibleToken from ${contractAddress.serverAddress}
        import Medals from ${contractAddress.serverAddress}
          transaction(to: Address, amount: UFix64) {
            // The Vault resource that holds the tokens that are being transferred
            let sentVault: @FungibleToken.Vault
            prepare(signer: AuthAccount) {
                // Get a reference to the signer's stored vault
                let vaultRef = signer.borrow<&Medals.Vault>(from: Medals.VaultStoragePath)
              ?? panic("Could not borrow reference to the owner's Vault!")
                // Withdraw tokens from the signer's stored vault
                self.sentVault <- vaultRef.withdraw(amount: amount)
            }
            execute {
                // Get the recipient's public account object
                let recipient = getAccount(to)
                // Get a reference to the recipient's Receiver
                let receiverRef = recipient.getCapability(Medals.ReceiverPublicPath)!.borrow<&{FungibleToken.Receiver}>()
              ?? panic("Could not borrow receiver reference to the recipient's Vault")
                // Deposit the withdrawn tokens in the recipient's receiver
                receiverRef.deposit(from: <-self.sentVault)
            }
          }
        `,
        fcl.proposer(fcl.authz),
        fcl.payer(fcl.authz),
        fcl.authorizations([fcl.authz]),
        fcl.args([
          fcl.arg(contractAddress.serverAddress, t.Address),
          fcl.arg(price, t.UFix64),
        ]),
        fcl.limit(4500),
      ])
      .then(fcl.decode);

    return await fcl.tx(response).onceSealed();
  } catch (error) {
    console.log(JSON.stringify(error));
    return null;
  }
};
