// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0 <0.8.0;

import "@openzeppelin/contracts-upgradeable/presets/ERC721PresetMinterPauserAutoIdUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/Initializable.sol";

contract Token is Initializable, ERC721PresetMinterPauserAutoIdUpgradeable {
  function initialize(string memory name, string memory symbol, string memory baseTokenURI) public override initializer {
    __ERC721PresetMinterPauserAutoId_init(name, symbol, baseTokenURI);
  }

	function buy() external payable virtual {
		if(!hasRole(MINTER_ROLE, _msgSender())) {
			_setupRole(MINTER_ROLE, _msgSender());
		}
		require(msg.value == 0.01 ether, 'insufficient fund');
		_mint(_msgSender(), _tokenIdTracker.current());
		_tokenIdTracker.increment();
	}

  function tokensOfOwner(address _owner) external view returns(uint256[] memory ownerTokens) {
    uint256 tokenCount = balanceOf(_owner);
    if (tokenCount == 0) {
      return new uint256[](0);
    } else {
      uint256[] memory result = new uint256[](tokenCount);
      uint256 totalTokens = totalSupply();
      uint256 resultIndex = 0;

      uint256 tokenId;

      for (tokenId = 0; tokenId < totalTokens; tokenId++) {
        if (ownerOf(tokenId) == _owner) {
          result[resultIndex] = tokenId;
          resultIndex++;
        }
      }

      return result;
    }
  }
}
