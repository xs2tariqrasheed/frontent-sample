pragma solidity >=0.4.0 <0.6.0;
      import "remix_tests.sol"; // this import is automatically injected by Remix.
      import "./ArenaGolf1538.sol";
     
      // file name has to end with '_test.sol'
      contract dna_version_tests {
        
        GolferTraitsContract golfterTraitsContract;
        uint256 testDna1 = 0x0811111111111111111111111111111122222222333333334444444477777777;
        uint256 appearanceData1 = 0x1111111111111111111111;
        uint256 abilityData1 = 0x22222222333333334444444477777777;
        function beforeAll() public {
            golfterTraitsContract = new GolferTraitsContract();
        }

        function checkDNAVersion() public {
            // use 'Assert' to test the contract
            Assert.equal(golfterTraitsContract.getDnaVersionSupported(), uint(1), "1 should be the version");
        }
        
        function checkDNAVersionWithReturnValue () public view returns (bool) {
            return golfterTraitsContract.getDnaVersionSupported() == 1;
        }
      }
      
      contract appearance_trait_test {
        
        GolferTraitsContract golfterTraitsContract;
        uint256 testDna1 = 0x0811111111111111111111111111111122222222333333334444444477777777;
        uint256 appearanceData1 = 0x1111111111111111111111;

        function beforeAll() public {
            golfterTraitsContract = new GolferTraitsContract();
        }
        
        function checkAppearanceData() public {
            Assert.equal(golfterTraitsContract.getAppearanceData(testDna1), appearanceData1, "Appearance data does not match DNA");
        }
        
        function appearanceTraitsCheckAllTraits() public {
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 0), uint(17), "trait 0 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 1), uint(8), "trait 1 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 2), uint(4), "trait 2 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 3), uint(2), "trait 3 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 4), uint(17), "trait 4 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 5), uint(8), "trait 5 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 6), uint(4), "trait 6 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 7), uint(2), "trait 7 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 8), uint(17), "trait 8 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 9), uint(8), "trait 9 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 10), uint(4), "trait 10 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 11), uint(2), "trait 11 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 12), uint(17), "trait 12 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 13), uint(8), "trait 13 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 14), uint(4), "trait 14 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 15), uint(2), "trait 15 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAppearanceTrait(testDna1, 16), uint(17), "trait 16 decode incorrect");
        }
      }
      
      contract ability_trait_test {
        
        GolferTraitsContract golfterTraitsContract;
        uint256 testDna1 = 0x0811111111111111111111111111111122222222333333334444444477777777;
        uint256 abilityData1 = 0x4444444477777777;
        uint256 peakAbilityData1 = 0x2222222233333333;

        function beforeAll() public {
            golfterTraitsContract = new GolferTraitsContract();
        }

        function checkAbilityData() public {
            Assert.equal(golfterTraitsContract.getAbilityData(testDna1), abilityData1, "Ability data does not match DNA");
        }

        function checkPeakAbilityData() public {
            Assert.equal(golfterTraitsContract.getPeakAbilityData(testDna1), peakAbilityData1, "Peak ability data does not match DNA");
        }

        function abilityTraitsCheckAllTraits() public {
            Assert.equal(golfterTraitsContract.decodeAbility(testDna1, 0), uint(30583), "trait 0 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAbility(testDna1, 1), uint(30583), "trait 1 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAbility(testDna1, 2), uint(17476), "trait 2 decode incorrect");
            Assert.equal(golfterTraitsContract.decodeAbility(testDna1, 3), uint(17476), "trait 3 decode incorrect");
        }

        function peakAbilityTraitsCheckAllTraits() public {
            Assert.equal(golfterTraitsContract.decodePeakAbility(testDna1, 0), uint(13107), "peak trait 0 decode incorrect");
            Assert.equal(golfterTraitsContract.decodePeakAbility(testDna1, 1), uint(13107), "peak trait 1 decode incorrect");
            Assert.equal(golfterTraitsContract.decodePeakAbility(testDna1, 2), uint(8738), "peak trait 2 decode incorrect");
            Assert.equal(golfterTraitsContract.decodePeakAbility(testDna1, 3), uint(8738), "peak trait 3 decode incorrect");
        }
      }
      
/*      // file name has to end with '_test.sol'
      contract test_2 {
        
        ArenaGolfNFT arenaGolfNFT;
        //GolferTraitsContract golfterTraitsContract;
        function beforeAll() public {
            arenaGolfNFT = new ArenaGolfNFT('','');
            //golfterTraitsContract = new GolferTraitsContract();
            //arenaGolfNFT.setGolferTraitsContract(1,address(golfterTraitsContract));
        }

        function checkGeneration() public {
            // use 'Assert' to test the contract
            Assert.equal(arenaGolfNFT.getCurrentGeneration(), uint(0), "0 should be the version");
        }
      }
*/