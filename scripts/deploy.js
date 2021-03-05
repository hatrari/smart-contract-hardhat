const { ethers, upgrades } = require('hardhat');

async function main() {
  const Token = await ethers.getContractFactory('Token');
  const token = await upgrades.deployProxy(Token, ['Lettres Tokens', 'LRT', 'https://ha-api-tokens.herokuapp.com/tokens/']);
  await token.deployed();
  console.log('Token deployed at: ', token.address);
}

main();
