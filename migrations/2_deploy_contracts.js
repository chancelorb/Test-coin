var TriveCoin = artifacts.require("./TriveCoin.sol");

module.exports = function(deployer) {
  deployer.deploy(TriveCoin);
};
