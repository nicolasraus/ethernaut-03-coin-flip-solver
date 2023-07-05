const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
require("dotenv").config();

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy, log } = deployments;

  const { deployer } = await getNamedAccounts();

  let coinFlipAddress;
  if (developmentChains.includes(network.name)) {
    coinFlip = await ethers.getContract("CoinFlip", deployer);
    coinFlipAddress = await coinFlip.getAddress();
  } else {
    coinFlipAddress = process.env.TARGET_CONTRACT_ADDRESS;
  }
  const args = [coinFlipAddress];
  let solver = await deploy("Solver", {
    from: deployer,
    args: args,
    log: true,
  });
  log("Solver deployed!");
  log(
    "__________________________________________________________________________________________________________"
  );

  solver = await ethers.getContract("Solver", deployer);
  for (let i = 0; i < 10; i = await solver.consecutiveWins()) {
    txResponse = await solver.solve();
    await txResponse.wait(1);
    console.log("Consecutive wins: ", await solver.consecutiveWins().then(v => v.toString()))
  }
};

module.exports.tags = ["all", "solver"];
