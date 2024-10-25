/*// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const JAN_1ST_2030 = 1893456000;
const ONE_GWEI = 1_000_000_000n;

module.exports = buildModule("LockModule", (m) => {
  const unlockTime = m.getParameter("unlockTime", JAN_1ST_2030);
  const lockedAmount = m.getParameter("lockedAmount", ONE_GWEI);

  const lock = m.contract("Lock", [unlockTime], {
    value: lockedAmount,
  });

  return { lock };
});
const hre = require("hardhat");

async function main() {
  // Get the contract factory (it automatically references the compiled ABI and bytecode)
  const TimeLockWallet = await hre.ethers.getContractFactory("TimeLockWallet");

  // Deploy the contract instance
  const timeLockWallet = await TimeLockWallet.deploy();

  // Wait until the contract is deployed on the network
  await timeLockWallet.deployed();

  console.log("TimeLockWallet deployed to:", timeLockWallet.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


const { buildModule } = require("@nomicfoundation/hardhat-ignition");

const deploymentModule = buildModule("TimeLockWallet", (m) => {
  // Declare the contract to be deployed
  const timeLockWallet = m.contract("TimeLockWallet");

  return {
    timeLockWallet,
  };
});

export default deploymentModule;*/

/*const { buildModule } = require("@nomicfoundation/hardhat-ignition");

const deploymentModule = buildModule("TimeLockWallet", (m) => {
  const timeLockWallet = m.contract("TimeLockWallet");

  return {
    timeLockWallet,
  };
});

module.exports = deploymentModule;*/

const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

/**
 * @param {Object} config Deployment configuration
 * @param {Object} config.initialLock Optional initial lock configuration
 * @param {string} config.initialLock.recipient Recipient address
 * @param {number} config.initialLock.releaseTime Release timestamp
 * @param {string} config.initialLock.amount Amount in ETH
 * @returns {Promise<Object>} Deployed contract instances
 */
const deploymentModule = buildModule("TimeLockWallet", (m, config) => {
  /* Set default values
  const moduleConfig = {
    initialLock: null, // Optional initial lock configuration
    ...config,
  };*/

  // Deploy the TimeLockWallet contract
  const timeLockWallet = m.contract("TimeLockWallet");

  /* If initial lock configuration is provided, schedule the lock
  if (moduleConfig.initialLock) {
    const { recipient, releaseTime, amount } = moduleConfig.initialLock;

    m.call(
      timeLockWallet,
      "lockFunds",
      [recipient, releaseTime],
      {
        id: "initial-lock",
        after: [timeLockWallet],
        value: amount, // Amount in wei
      }
    );
  }*/

  // Return deployed contract instance
  return {
    timeLockWallet,
  };
});

module.exports = deploymentModule;