const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");

module.exports = async ({ getNamedAccounts, deployments }) => {
  if (developmentChains.includes(network.name)) {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();

    const args = [];
    const coinFlip = await deploy("CoinFlip", {
      from: deployer,
      args: args,
      log: true,
    });

    log("CoinFlip deployed!");
    log(
      "__________________________________________________________________________________________________________"
    );
  }
};

module.exports.tags = ["all", "coinflip"];
