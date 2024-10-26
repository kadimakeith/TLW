/*import React, { useState, useEffect } from "react";
import HowItWorks from "./HowItWorks";
import TimeLockWalletArtifact from "../ignition/deployments/chain-11155111/artifacts/TimeLockWallet#TimeLockWallet.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faClock, 
  faWallet, 
  faLock, 
  faRotate, 
  faPaperPlane,
  faCircleExclamation,
  faCircleCheck,
  faCircleInfo 
} from "@fortawesome/free-solid-svg-icons";
import Web3 from "web3";

const CONTRACT_ADDRESS = "0x84Ea1D5Db386B3762E79326652853A08DE89c70a"; 
const ABI = TimeLockWalletArtifact.abi;

function Timelock() {
  const [releaseTime, setReleaseTime] = useState("");
  const [amount, setAmount] = useState("");
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState(null);
  const [locks, setLocks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);

  useEffect(() => {      
    connectWallet();

  }, []);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to use this app.");
      }

      const web3Instance = new Web3(window.ethereum);
      await window.ethereum.enable();
      setWeb3(web3Instance);

      const accounts = await web3Instance.eth.getAccounts();
      setAccount(accounts[0]);

      const contractInstance = new web3Instance.eth.Contract(
        ABI,
        CONTRACT_ADDRESS
      );
      setContract(contractInstance);

      loadLocks(contractInstance, accounts[0], web3Instance);

      const balanceInWei = await web3Instance.eth.getBalance(accounts[0]);
      const balanceInEth = web3Instance.utils.fromWei(balanceInWei);
      setBalance(balanceInEth);

    } catch (error) {
      setStatus({
        type: "error",
        message: error.message
      });
    }
  };

  const loadLocks = async (contractInstance, userAccount, web3Instance) => {
    try {
      const locksCount = await contractInstance.methods.getLocksCount().call();
      console.log("Total locks:", locksCount);
      const loadedLocks = [];
      
      for (let i = 0; i < locksCount; i++) {
        const lock = await contractInstance.methods.getLockDetails(i).call();
        console.log("Lock details:", lock);
        if (lock.recipient.toLowerCase() === userAccount.toLowerCase()) {
          loadedLocks.push({
            id: i,
            amount: web3Instance.utils.fromWei(lock.amount),
            releaseTime: new Date(lock.releaseTime * 1000),
            withdrawn: lock.withdrawn,
          });
        }
      }
      
      console.log("Loaded locks for account:", loadedLocks);
      setLocks(loadedLocks);
    } catch (error) {
      console.error("Error loading locks:", error);
    }
  };
  

  const handleLockFunds = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!web3.utils.isAddress(recipient)) {
        throw new Error("Invalid recipient address");
      }

      const releaseTimestamp = Math.floor(new Date(releaseTime).getTime() / 1000);
      const amountInWei = web3.utils.toWei(amount);

      await contract.methods.lockFunds(recipient, releaseTimestamp)
        .send({
          from: account,
          value: amountInWei
        })
        .on('transactionHash', (hash) => {
          setStatus({
            type: "info",
            message: `Transaction pending... Hash: ${hash}`
          });
        })
        .on('receipt', (receipt) => {
          setStatus({
            type: "success",
            message: "Funds locked successfully!"
          });
          loadLocks(contract, account);
        })
        .on('error', (error) => {
          throw error;
        });

      // Reset form
      setAmount("");
      setReleaseTime("");
      setRecipient("");
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdraw = async (lockId) => {
    setIsLoading(true);
    try {
      await contract.methods.withdraw(lockId)
        .send({ from: account })
        .on('transactionHash', (hash) => {
          setStatus({
            type: "info",
            message: `Withdrawal pending... Hash: ${hash}`
          });
        })
        .on('receipt', () => {
          setStatus({
            type: "success",
            message: "Funds withdrawn successfully!"
          });
          loadLocks(contract, account);
        })
        .on('error', (error) => {
          throw error;
        });
    } catch (error) {
      setStatus({
        type: "error",
        message: error.message
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case "error":
        return faCircleExclamation;
      case "success":
        return faCircleCheck;
      default:
        return faCircleInfo;
    }
  };

  const getStatusStyle = (type) => {
    switch (type) {
      case "error":
        return { backgroundColor: "#fee2e2", color: "#dc2626" };
      case "success":
        return { backgroundColor: "#dcfce7", color: "#16a34a" };
      default:
        return { backgroundColor: "#dbeafe", color: "#2563eb" };
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f8fafc",
      padding: "1rem"
    }}>
      <div style={{
        maxWidth: "1024px",
        margin: "0 auto"
      }}>
        <div style={{
          marginBottom: "2rem",
          textAlign: "center"
        }}>
          <h1 style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#1e293b",
            marginBottom: "0.5rem"
          }}>
            TimeLock Wallet
          </h1>
          <p style={{
            color: "#64748b"
          }}>
            Secure time-based fund management on the blockchain
          </p>
        </div>

        <HowItWorks />

        {account ? (
          <div style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1.5rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
          }}>
            <p style={{
              fontSize: "0.875rem",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <FontAwesomeIcon icon={faWallet} />
              Connected: {account.slice(0, 6)}...{account.slice(-4)}
            </p>
            <p style={{
              fontSize: "0.875rem",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <FontAwesomeIcon icon={faWallet} />
              Balance: {balance} ETH
            </p>
          </div>
        ) : (
          <button
            onClick={connectWallet}
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "white",
              padding: "0.75rem",
              borderRadius: "0.5rem",
              border: "none",
              cursor: "pointer",
              marginBottom: "1.5rem",
              transition: "background-color 0.2s"
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
            onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
          >
            Connect Wallet
          </button>
        )}

        {status && (
          <div 
            style={{
              padding: "1rem",
              borderRadius: "0.5rem",
              marginBottom: "1.5rem",
              ...getStatusStyle(status.type)
            }}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "0.25rem"
            }}>
              <FontAwesomeIcon icon={getStatusIcon(status.type)} />
              <strong>{status.type === "error" ? "Error" : "Status"}</strong>
            </div>
            <p>{status.message}</p>
          </div>
        )}

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "1.5rem"
        }}>
          <div style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
          }}>
            <h2 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <FontAwesomeIcon icon={faLock} /> Lock Funds
            </h2>
            <form onSubmit={handleLockFunds} style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.25rem"
                }}>
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem"
                  }}
                  placeholder="0x..."
                />
              </div>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.25rem"
                }}>
                  Release Time
                </label>
                <input
                  type="datetime-local"
                  value={releaseTime}
                  onChange={(e) => setReleaseTime(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem"
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#374151",
                  marginBottom: "0.25rem"
                }}>
                  Amount (ETH)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    border: "1px solid #d1d5db",
                    borderRadius: "0.375rem"
                  }}
                  placeholder="0.0"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                style={{
                  width: "100%",
                  backgroundColor: "#2563eb",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "0.5rem",
                  border: "none",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? "0.5" : "1",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#1d4ed8")}
                onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#2563eb")}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faRotate} spin />
                ) : (
                  "Lock Funds"
                )}
              </button>
            </form>
          </div>

          <div style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)"
          }}>
            <h2 style={{
              fontSize: "1.25rem",
              fontWeight: "600",
              marginBottom: "1rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem"
            }}>
              <FontAwesomeIcon icon={faClock} /> Active Locks
            </h2>
            <div style={{display: "flex", flexDirection: "column", gap: "1rem"}}>
              {locks.length === 0 ? (
                <p style={{
                  color: "#6b7280",
                  textAlign: "center",
                  padding: "1rem 0"
                }}>
                  No active locks found
                </p>
              ) : (
                locks.map((lock) => (
                  <div
                    key={lock.id}
                    style={{
                      border: "1px solid #d1d5db",
                      borderRadius: "0.5rem",
                      padding: "1rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem"
                    }}
                  >
                    <p style={{fontSize: "0.875rem", color: "#6b7280"}}>
                      Amount: {lock.amount} ETH
                    </p>
                    <p style={{fontSize: "0.875rem", color: "#6b7280"}}>
                      Release: {lock.releaseTime.toLocaleString()}
                    </p>
                    {!lock.withdrawn && new Date() >= lock.releaseTime && (
                      <button
                        onClick={() => handleWithdraw(lock.id)}
                        disabled={isLoading}
                        style={{
                          width: "100%",
                          backgroundColor: "#059669",
                          color: "white",
                          padding: "0.5rem",
                          borderRadius: "0.5rem",
                          border: "none",
                          cursor: isLoading ? "not-allowed" : "pointer",
                          opacity: isLoading ? "0.5" : "1",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "0.5rem",
                          transition: "background-color 0.2s"
                        }}
                        onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#047857")}
                        onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#059669")}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                        Withdraw
                      </button>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timelock;*/
import React, { useState, useEffect } from "react";
import HowItWorks from "./HowItWorks";
import TimeLockWalletArtifact from "../ignition/deployments/chain-11155111/artifacts/TimeLockWallet#TimeLockWallet.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faWallet,
  faPaperPlane,
  faCircleExclamation,
  faCircleCheck,
  faCircleInfo,
  faHistory,
  faChevronLeft,
  faChevronRight,
  faExternalLink,
} from "@fortawesome/free-solid-svg-icons";
import Web3 from "web3";

const CONTRACT_ADDRESS = "0x53520E911Cc3546197Ad73cD3bBBc6084128DA02";
const ABI = TimeLockWalletArtifact.abi;
const ITEMS_PER_PAGE = 3;

function Timelock() {
  const [releaseTime, setReleaseTime] = useState("");
  const [amount, setAmount] = useState("");
  const [contract, setContract] = useState(null);
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState("");
  const [recipient, setRecipient] = useState("");
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [activeLocks, setActiveLocks] = useState([]);
  const [pastLocks, setPastLocks] = useState([]);
  const [activeLocksPage, setActiveLocksPage] = useState(1);
  const [pastLocksPage, setPastLocksPage] = useState(1);
  const [networkId, setNetworkId] = useState("");

    // Initialize Web3 and load data
    useEffect(() => {
      const init = async () => {
        if (window.ethereum) {
          try {
            await connectWallet();
          } catch (error) {
            console.error("Initialization error:", error);
            setStatus({ type: "error", message: "Failed to initialize: " + error.message });
          }
        } else {
          setStatus({ type: "error", message: "Please install MetaMask to use this app." });
        }
      };
  
      init();
  
      // Set up event listeners
      if (window.ethereum) {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
      }
  
      return () => {
        if (window.ethereum) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }, []);
  
    // Reload locks when account changes
    useEffect(() => {
      if (contract && account && web3) {
        loadLocks(contract, account, web3);
      }
    }, [contract, account, web3]);
  
    const handleAccountsChanged = async (accounts) => {
      if (accounts.length === 0) {
        resetState();
      } else {
        setAccount(accounts[0]);
        await updateBalance(accounts[0]);
      }
    };
  
    const resetState = () => {
      setAccount("");
      setBalance(0);
      setContract(null);
      setActiveLocks([]);
      setPastLocks([]);
      setStatus(null);
    };
  
    const handleChainChanged = () => {
      window.location.reload();
    };
  
    const updateBalance = async (accountAddress) => {
      if (!web3 || !accountAddress) return;
  
      try {
        const balanceInWei = await web3.eth.getBalance(accountAddress);
        const balanceInEth = web3.utils.fromWei(balanceInWei, "ether");
        setBalance(parseFloat(balanceInEth).toFixed(5));
      } catch (error) {
        console.error("Error updating balance:", error);
      }
    };
  
    const connectWallet = async () => {
      try {
        if (!window.ethereum) {
          throw new Error("Please install MetaMask to use this app.");
        }
  
        const web3Instance = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        if (!accounts || accounts.length === 0) {
          throw new Error("No accounts found. Please connect your wallet.");
        }
  
        setWeb3(web3Instance);
        setAccount(accounts[0]);
  
        const networkId = await web3Instance.eth.net.getId();
        setNetworkId(networkId);
  
        const contractInstance = new web3Instance.eth.Contract(ABI, CONTRACT_ADDRESS);
        setContract(contractInstance);

        loadLocks(contractInstance, accounts[0], web3Instance);
        const balanceInWei = await web3Instance.eth.getBalance(accounts[0]);
        const balanceInEth = web3Instance.utils.fromWei(balanceInWei, "ether");
        setBalance(parseFloat(balanceInEth).toFixed(5));
  
      } catch (error) {
        console.error("Wallet connection error:", error);
        setStatus({ type: "error", message: error.message });
        throw error;
      }
    };
  
    const loadLocks = async (contractInstance, userAccount, web3Instance) => {
      if (!contractInstance || !userAccount || !web3Instance) return;
  
      try {
        const locksCount = await contractInstance.methods.getLocksCount().call();
        const active = [];
        const past = [];
  
        for (let i = 0; i < locksCount; i++) {
          try {
            const lock = await contractInstance.methods.getLockDetails(i).call();
            
            if (lock.recipient.toLowerCase() === userAccount.toLowerCase()) {
              const lockData = {
                id: i,
                amount: web3Instance.utils.fromWei(lock.amount, "ether"),
                releaseTime: new Date(Number(lock.releaseTime) * 1000),
                withdrawn: lock.withdrawn,
                sender: lock.sender || "",
              };
  
              if (lock.withdrawn) {
                past.push(lockData);
              } else {
                active.push(lockData);
              }
            }
          } catch (error) {
            console.error(`Error loading lock ${i}:`, error);
            continue;
          }
        }
  
        setActiveLocks(active);
        setPastLocks(past);
      } catch (error) {
        console.error("Error loading locks:", error);
        setStatus({ type: "error", message: "Error loading locks: " + error.message });
      }
    };
  
    const handleLockFunds = async (e) => {
      e.preventDefault();
      if (!web3 || !contract || !account) {
        setStatus({ type: "error", message: "Please connect your wallet first" });
        return;
      }
  
      setIsLoading(true);
      setStatus(null);
  
      try {
        if (!web3.utils.isAddress(recipient)) {
          throw new Error("Invalid recipient address");
        }
  
        const releaseTimestamp = Math.floor(new Date(releaseTime).getTime() / 1000);
        const currentTimestamp = Math.floor(Date.now() / 1000);
        
        if (releaseTimestamp <= currentTimestamp) {
          throw new Error("Release time must be in the future");
        }
  
        if (parseFloat(amount) <= 0) {
          throw new Error("Amount must be greater than 0");
        }
  
        const amountInWei = web3.utils.toWei(amount, "ether");
        const userBalance = await web3.eth.getBalance(account);
  
        if (new web3.utils.BN(amountInWei).gt(new web3.utils.BN(userBalance))) {
          throw new Error("Insufficient balance");
        }
  
        const transaction = await contract.methods.lockFunds(recipient, releaseTimestamp).send({
          from: account,
          value: amountInWei,
        });
  
        setStatus({ 
          type: "success", 
          message: `Funds locked successfully! Transaction: ${transaction.transactionHash}` 
        });
  
        // Reset form
        setAmount("");
        setReleaseTime("");
        setRecipient("");
  
        // Refresh data
        await loadLocks(contract, account, web3);
        await updateBalance(account);
      } catch (error) {
        console.error("Lock funds error:", error);
        setStatus({ 
          type: "error", 
          message: error.message.includes("User denied") 
            ? "Transaction cancelled by user"
            : `Error locking funds: ${error.message}`
        });
      } finally {
        setIsLoading(false);
      }
    };
  
    const handleWithdraw = async (lockId) => {
      if (!web3 || !contract || !account) {
        setStatus({ type: "error", message: "Please connect your wallet first" });
        return;
      }
  
      setIsLoading(true);
      setStatus(null);
  
      try {
        const transaction = await contract.methods.withdraw(lockId).send({ 
          from: account 
        });
  
        setStatus({ 
          type: "success", 
          message: `Funds withdrawn successfully! Transaction: ${transaction.transactionHash}` 
        });
  
        // Refresh data
        await loadLocks(contract, account, web3);
        await updateBalance(account);
      } catch (error) {
        console.error("Withdrawal error:", error);
        setStatus({ 
          type: "error", 
          message: error.message.includes("User denied") 
            ? "Transaction cancelled by user"
            : `Error withdrawing funds: ${error.message}`
        });
      } finally {
        setIsLoading(false);
      }
    };

  const getStatusIcon = (type) => {
    switch (type) {
      case "error":
        return faCircleExclamation;
      case "success":
        return faCircleCheck;
      default:
        return faCircleInfo;
    }
  };

  const getStatusStyle = (type) => {
    switch (type) {
      case "error":
        return { backgroundColor: "#fee2e2", color: "#dc2626" };
      case "success":
        return { backgroundColor: "#dcfce7", color: "#16a34a" };
      default:
        return { backgroundColor: "#dbeafe", color: "#2563eb" };
    }
  };

  const getExplorerUrl = (hash) => {
    const baseUrl = networkId === "11155111" ? "https://sepolia.etherscan.io" : "https://etherscan.io";
    return `${baseUrl}/tx/${hash}`;
  };

  const LockCard = ({ lock, isActive }) => (
    <div
      style={{
        border: "1px solid #d1d5db",
        borderRadius: "0.5rem",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
      }}
    >
      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Amount: {lock.amount} ETH</p>
      <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>Release: {lock.releaseTime.toLocaleString()}</p>
      {lock.transactionHash && (
        <a
          href={getExplorerUrl(lock.transactionHash)}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.875rem",
            color: "#2563eb",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            textDecoration: "none",
          }}
        >
          View on Explorer <FontAwesomeIcon icon={faExternalLink} />
        </a>
      )}
      {lock.sender && (
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>
          Sender: {lock.sender.slice(0, 6)}...{lock.sender.slice(-4)}
        </p>
      )}
      {isActive && !lock.withdrawn && new Date() >= lock.releaseTime && (
        <button
          onClick={() => handleWithdraw(lock.id)}
          disabled={isLoading}
          style={{
            width: "100%",
            backgroundColor: "#059669",
            color: "white",
            padding: "0.5rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? "0.5" : "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#047857")}
          onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#059669")}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
          Withdraw
        </button>
      )}
    </div>
  );

  const Pagination = ({ currentPage, setCurrentPage, totalItems }) => {
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

    return totalPages > 1 ? (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", marginTop: "1rem" }}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          style={{
            padding: "0.5rem",
            borderRadius: "0.375rem",
            border: "1px solid #d1d5db",
            backgroundColor: "white",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
            opacity: currentPage === 1 ? "0.5" : "1",
            transition: "opacity 0.2s",
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <span style={{ fontSize: "0.875rem" }}>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          style={{
            padding: "0.5rem",
            borderRadius: "0.375rem",
            border: "1px solid #d1d5db",
            backgroundColor: "white",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            opacity: currentPage === totalPages ? "0.5" : "1",
            transition: "opacity 0.2s",
          }}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
    ) : null;
  };

  const renderLocks = (locks, isActive, page, setPage) => {
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const currentLocks = locks.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
      <>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "1rem",
          }}
        >
          {currentLocks.map((lock) => (
            <LockCard key={lock.id} lock={lock} isActive={isActive} />
          ))}
        </div>
        <Pagination currentPage={page} setCurrentPage={setPage} totalItems={locks.length} />
      </>
    );
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.5rem", color: "#111827", marginBottom: "1.5rem" }}>
        <FontAwesomeIcon icon={faClock} /> Timelock
      </h2>

      <p style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            fontSize: "1rem",
            justifyContent: "center",
            color: "#64748b"
          }}>
            Secure time-based fund management on the blockchain
      </p>



      
      {/*<HowItWorks />*/}

      {account ? (
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "0.5rem",
            padding: "1rem",
            marginBottom: "1.5rem",
            boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          > 
            <FontAwesomeIcon icon={faWallet} />
            Connected: {account.slice(0, 6)}...{account.slice(-4)}
          </p>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#64748b",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <FontAwesomeIcon icon={faWallet} />
            Balance: {balance} ETH
          </p>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          style={{
            width: "100%",
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.75rem",
            borderRadius: "0.5rem",
            border: "none",
            cursor: "pointer",
            marginBottom: "1.5rem",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
          onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
        >
          Connect Wallet
        </button>
      )}


      {status && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.75rem 1rem",
            borderRadius: "0.5rem",
            marginBottom: "1rem",
            ...getStatusStyle(status.type),
          }}
        >
          <FontAwesomeIcon icon={getStatusIcon(status.type)} />
          <span style={{ fontSize: "0.875rem" }}>{status.message}</span>
        </div>
      )}

      <form
        onSubmit={handleLockFunds}
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <input
          type="text"
          placeholder="Recipient Address"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
          style={{
            padding: "0.75rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
          }}
        />
        <input
          type="number"
          placeholder="Amount in ETH"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{
            padding: "0.75rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
          }}
        />
        <input
          type="datetime-local"
          value={releaseTime}
          onChange={(e) => setReleaseTime(e.target.value)}
          required
          style={{
            padding: "0.75rem 1rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
          }}
        />
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "0.75rem",
            borderRadius: "0.375rem",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? "0.5" : "1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.5rem",
            transition: "background-color 0.2s",
          }}
          onMouseOver={(e) => !isLoading && (e.target.style.backgroundColor = "#2563eb")}
          onMouseOut={(e) => !isLoading && (e.target.style.backgroundColor = "#3b82f6")}
        >
          <FontAwesomeIcon icon={faWallet} />
          Lock Funds
        </button>
      </form>

      <h3 style={{ fontSize: "1.25rem", color: "#111827", marginBottom: "1rem" }}>
        Active Locks <FontAwesomeIcon icon={faCircleInfo} />
      </h3>
      {activeLocks.length === 0 ? (
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>No active locks found.</p>
      ) : (
        renderLocks(activeLocks, true, activeLocksPage, setActiveLocksPage)
      )}

      <h3 style={{ fontSize: "1.25rem", color: "#111827", marginTop: "2rem", marginBottom: "1rem" }}>
        Past Locks <FontAwesomeIcon icon={faHistory} />
      </h3>
      {pastLocks.length === 0 ? (
        <p style={{ fontSize: "0.875rem", color: "#6b7280" }}>No past locks found.</p>
      ) : (
        renderLocks(pastLocks, false, pastLocksPage, setPastLocksPage)
      )}

    </div>
  );
}

export default Timelock;

