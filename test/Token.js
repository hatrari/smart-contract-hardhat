// Load dependencies
const { expect } = require('chai');
 
let Token;
let token;
 
// Start test block
describe('Box (proxy)', function () {
  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    token = await upgrades.deployProxy(Token, ['Name', 'SYM', 'URL/'], {initializer: 'initialize'});
  });
 
  // Test case
  it('retrieve returns a value previously initialized', async function () {
    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
    await token.mint('0x99378fA69039eBF93FAC3D1dc976Ea8CBd53Dc36');
		await token.mint('0x99378fA69039eBF93FAC3D1dc976Ea8CBd53Dc36');
		await token.mint('0x7e520577e6424CC9094ee448f801B65e2661AD2F');
		await token.mint('0x99378fA69039eBF93FAC3D1dc976Ea8CBd53Dc36');
		const tokens = await token.tokensOfOwner('0x99378fA69039eBF93FAC3D1dc976Ea8CBd53Dc36');
		console.log(tokens);
		console.log((await token.tokenURI(0)).toString());
		console.log((await token.totalSupply()).toString());
		console.log((await token.ownerOf(0)).toString());
		expect((await token.name()).toString()).to.equal('Name');
  });
});
