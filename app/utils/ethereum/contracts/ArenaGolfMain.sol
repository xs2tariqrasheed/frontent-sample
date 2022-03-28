/**
 * @title Arena Golf - In The Arena Sports (ITAS)
 * @author Second Legion Studios, Brian Burns <brian@secondlegion.com>
 */

pragma solidity ^0.5.16;

/**
 * @notice Query if a contract implements an interface
 * @dev Interface identification is specified in ERC-165. This function
 * uses less than 30,000 gas.
 */
contract ERC165 {
    /**
     * @dev Returns true if this contract implements the interface defined by
     * `interfaceId`. See the corresponding
     * https://eips.ethereum.org/EIPS/eip-165#how-interfaces-are-identified[EIP section]
     * to learn more about how these ids are created.
     *
     * This function call must use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool);
}


/**
 * @title ERC721 Non-Fungible Token Standard basic interface
 * @dev see https://github.com/ethereum/EIPs/blob/master/EIPS/eip-721.md
 *  Note: the ERC-165 identifier for this interface is 0x80ac58cd.
 */
contract ERC721 /* is ERC165 */ {
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);

    function balanceOf(address owner) public view returns (uint256 balance);
    function ownerOf(uint256 tokenId) public view returns (address owner);
    function safeTransferFrom(address from, address to, uint256 tokenId) public;
    function transferFrom(address from, address to, uint256 tokenId) public;
    function approve(address to, uint256 tokenId) public;
    function getApproved(uint256 tokenId) public view returns (address operator);
    function setApprovalForAll(address operator, bool _approved) public;
    function isApprovedForAll(address owner, address operator) public view returns (bool);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public;
}


/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
contract ERC721Receiver {
    /**
     * @notice Handle the receipt of an NFT
     * @dev The ERC721 smart contract calls this function on the recipient
     * after a {IERC721-safeTransferFrom}. This function MUST return the function selector,
     * otherwise the caller will revert the transaction. The selector to be
     * returned can be obtained as `this.onERC721Received.selector`. This
     * function MAY throw to revert and reject the transfer.
     * Note: the ERC721 contract address is always the message sender.
     * @param operator The address which called `safeTransferFrom` function
     * @param from The address which previously owned the token
     * @param tokenId The NFT identifier which is being transferred
     * @param data Additional data with no specified format
     * @return bytes4 `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
     */
    function onERC721Received(address operator, address from, uint256 tokenId, bytes memory data)
    public returns (bytes4);
}


/**
 * @title ERC-721 Non-Fungible Token Standard, optional metadata extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 * Note: the ERC-165 identifier for this interface is 0x5b5e139f.
 */
contract ERC721Metadata /* is ERC721 */ {
    function name() external view returns (string memory);
    function symbol() external view returns (string memory);
    function tokenURI(uint256 tokenId) external view returns (string memory);
}


/**
 * @title ERC-721 Non-Fungible Token Standard, optional enumeration extension
 * @dev See https://eips.ethereum.org/EIPS/eip-721
 * Note: the ERC-165 identifier for this interface is 0x780e9d63.
 */
contract ERC721Enumerable /* is ERC721 */ {
    function totalSupply() public view returns (uint256);
    function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256 tokenId);
    function tokenByIndex(uint256 index) public view returns (uint256);
}


/**
 * @title ERC1538 Transparent Contract Standard
 * @dev See https://eips.ethereum.org/EIPS/eip-1538
 */
contract ERC1538 {
    event CommitMessage(string message);
    event FunctionUpdate(bytes4 indexed functionId, address indexed oldDelegate, address indexed newDelegate, string functionSignature);
    function updateContract(address _delegate, string calldata _functionSignatures, string calldata _commitMessage) external;
}


/**
 * @title ERC1538 Transparent Contract Standard
 * @dev See https://eips.ethereum.org/EIPS/eip-1538
 */
contract ERC1538Query {
    function totalFunctions() external view returns(uint256);
    function functionByIndex(uint256 _index) external view returns(string memory functionSignature, bytes4 functionId, address delegate);
    function functionExists(string calldata _functionSignature) external view returns(bool);
    function functionSignatures() external view returns(string memory);
    function delegateFunctionSignatures(address _delegate) external view returns(string memory);
    function delegateAddress(string calldata _functionSignature) external view returns(address);
    function functionById(bytes4 _functionId) external view returns(string memory signature, address delegate);
    function delegateAddresses() external view returns(address[] memory);
}


/**
 * @title Counters
 * @author Matt Condon (@shrugs)
 * @dev Provides counters that can only be incremented or decremented by one. This can be used e.g. to track the number
 * of elements in a mapping, issuing ERC721 ids, or counting request ids.
 *
 * Include with `using Counters for Counters.Counter;`
 * Since it is not possible to overflow a 256 bit integer with increments of one, `increment` can skip the {SafeMath}
 * overflow check, thereby saving gas. This does assume however correct usage, in that the underlying `_value` is never
 * directly accessed.
 */
library Counters {
    using SafeMath for uint256;

    struct Counter {
        // This variable should never be directly accessed by users of the library: interactions must be restricted to
        // the library's function. As of Solidity v0.5.2, this cannot be enforced, though there is a proposal to add
        // this feature: see https://github.com/ethereum/solidity/issues/4637
        uint256 _value; // default: 0
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        // The {SafeMath} overflow check can be skipped here, see the comment at the top
        counter._value += 1;
    }

    function decrement(Counter storage counter) internal {
        counter._value = counter._value.sub(1);
    }
}


/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following 
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // According to EIP-1052, 0x0 is the value returned for not-yet created accounts
        // and 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 is returned
        // for accounts without code, i.e. `keccak256('')`
        bytes32 codehash;
        bytes32 accountHash = 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470;
        // solhint-disable-next-line no-inline-assembly
        assembly { codehash := extcodehash(account) }
        return (codehash != accountHash && codehash != 0x0);
    }

    /**
     * @dev Converts an `address` into `address payable`. Note that this is
     * simply a type cast: the actual underlying value is not changed.
     *
     * _Available since v2.4.0._
     */
    function toPayable(address account) internal pure returns (address payable) {
        return address(uint160(account));
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     *
     * _Available since v2.4.0._
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-call-value
        (bool success, ) = recipient.call.value(amount)("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }
}


/**
 * @dev Wrappers over Solidity's arithmetic operations with added overflow
 * checks.
 *
 * Arithmetic operations in Solidity wrap on overflow. This can easily result
 * in bugs, because programmers usually assume that an overflow raises an
 * error, which is the standard behavior in high level programming languages.
 * `SafeMath` restores this intuition by reverting the transaction when an
 * operation overflows.
 *
 * Using this library instead of the unchecked operations eliminates an entire
 * class of bugs, so it's recommended to use it always.
 */
library SafeMath {
    /**
     * @dev Returns the addition of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `+` operator.
     *
     * Requirements:
     * - Addition cannot overflow.
     */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");

        return c;
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        return sub(a, b, "SafeMath: subtraction overflow");
    }

    /**
     * @dev Returns the subtraction of two unsigned integers, reverting with custom message on
     * overflow (when the result is negative).
     *
     * Counterpart to Solidity's `-` operator.
     *
     * Requirements:
     * - Subtraction cannot overflow.
     *
     * _Available since v2.4.0._
     */
    function sub(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b <= a, errorMessage);
        uint256 c = a - b;

        return c;
    }

    /**
     * @dev Returns the multiplication of two unsigned integers, reverting on
     * overflow.
     *
     * Counterpart to Solidity's `*` operator.
     *
     * Requirements:
     * - Multiplication cannot overflow.
     */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
        // benefit is lost if 'b' is also tested.
        // See: https://github.com/OpenZeppelin/openzeppelin-contracts/pull/522
        if (a == 0) {
            return 0;
        }

        uint256 c = a * b;
        require(c / a == b, "SafeMath: multiplication overflow");

        return c;
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        return div(a, b, "SafeMath: division by zero");
    }

    /**
     * @dev Returns the integer division of two unsigned integers. Reverts with custom message on
     * division by zero. The result is rounded towards zero.
     *
     * Counterpart to Solidity's `/` operator. Note: this function uses a
     * `revert` opcode (which leaves remaining gas untouched) while Solidity
     * uses an invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        // Solidity only automatically asserts when dividing by 0
        require(b > 0, errorMessage);
        uint256 c = a / b;
        // assert(a == b * c + a % b); // There is no case in which this doesn't hold

        return c;
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b) internal pure returns (uint256) {
        return mod(a, b, "SafeMath: modulo by zero");
    }

    /**
     * @dev Returns the remainder of dividing two unsigned integers. (unsigned integer modulo),
     * Reverts with custom message when dividing by zero.
     *
     * Counterpart to Solidity's `%` operator. This function uses a `revert`
     * opcode (which leaves remaining gas untouched) while Solidity uses an
     * invalid opcode to revert (consuming all remaining gas).
     *
     * Requirements:
     * - The divisor cannot be zero.
     *
     * _Available since v2.4.0._
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
    }
}


/**
 * @title Upgrade Storage
 * @dev Stores base level data fields required for ERC-1538 delegate contracts and control
 */
contract UpgradeStorage {
    // Owner of the transparent contract
    // Has control of (most) contract elements
    address public ownerPrimary;
    address public ownerSecondary;

    // Address of owner wallets to transfer funds
    address public ITASWallet;
    address public SecondLegionWallet;

    // Contracts that need access for gameplay
    // (state = 1 means access is active, state = 0 means disabled)
    mapping(address => uint8) public otherOperators;

    // Tracks if contract is paused or not. If paused, most actions are blocked
    bool public paused;

    // maps functions to the delegate contracts that execute the functions
    // funcId => delegate contract
    mapping(bytes4 => address) internal delegates;

    // array of function signatures supported by the contract
    bytes[] internal funcSignatures;

    // maps each function signature to its position in the funcSignatures array.
    // signature => index+1
    mapping(bytes => uint256) internal funcSignatureToIndex;
}


/**
 * @title ERC721FullStorage
 * @dev Storage contract for all ERC-721 data using the inherited storage pattern.
 */
contract ERC721FullStorage is UpgradeStorage {
    // total number of tokens
    uint256 internal tokenCount;

    // Mapping from token ID to owner
    mapping(uint256 => address) internal _tokenOwner;

    // Mapping from token ID to approved address
    mapping(uint256 => address) internal _tokenApprovals;

    // Mapping from owner to number of owned token
    mapping(address => Counters.Counter) internal _ownedTokensCount;

    // Mapping from owner to operator approvals
    mapping(address => mapping(address => bool)) internal _operatorApprovals;

    // Mapping from owner to list of owned token IDs
    mapping(address => uint256[]) internal _ownedTokens;

    // Mapping from token ID to index of the owner tokens list
    mapping(uint256 => uint256) internal _ownedTokensIndex;

    // Array with all token ids, used for enumeration
    uint256[] internal _allTokens;

    // Mapping from token id to position in the allTokens array
    mapping(uint256 => uint256) internal _allTokensIndex;

    // Token name
    string internal _name;

    // Token symbol
    string internal _symbol;

    // Token URI
    string internal tokenURIBase;

    // Mapping of interface ids to whether or not it's supported.
    mapping(bytes4 => bool) internal supportedInterfaces;
}


/**
 * @title ArenaGolfStorage
 * @dev Storage contract for all Arena Golf data using the inherited storage pattern.
 */
contract ArenaGolfStorage is ERC721FullStorage {

    // mapping of dna version to a traits contract that can decode and encode the dna
    mapping(uint256 => GolferTraitsContract) internal golferTraitsContract;

    // current generation of Arena Golf golfers
    uint256 internal currentGeneration;
    
    // Token ID => Generation of the Golfer
    mapping(uint256 => uint256) internal tokenIdToGolferGeneration;
    // Token ID => Golfer's DNA value
    mapping(uint256 => uint256) internal tokenIdToGolferDna;
    // Token ID => Version of the Golfer's DNA
    mapping(uint256 => uint256) internal tokenIdToGolferDnaVersion;
    // Token ID => List of item IDs owned by the golfer
    mapping(uint256 => uint256[]) internal tokenIdToGolferItems;
    // Token ID => Mapping of item IDs to the index position in the player's list
    mapping(uint256 => mapping(uint256 => uint256)) internal tokenIdToGolferItemListIndex;

    // Training Session ID => Session Data
    mapping(uint256 => GolferTrainingSession) internal trainingSessionIdToData;

    // All data from a single training session
    struct GolferTrainingSession {
        uint256 timestamp;
        uint256 trainerTokenId;
        uint256 studentTokenId;
        uint256 ability;
        uint256 pointsEarned;
        uint256 specialEarned;
    }
    // Token ID => List of all student training session IDs
    mapping(uint256 => uint256[]) internal tokenIdToStudentTrainingSessionIds;
    // Token ID => List of all trainer training session IDs
    mapping(uint256 => uint256[]) internal tokenIdToTrainerTrainingSessionIds;
    // Token ID => Ability => Total training points earned (student)
    mapping(uint256 => mapping(uint256 => uint256)) internal tokenIdToTotalTrainingAbilityPointsEarned;
    // Token ID => Ability => Total training points trained (trainer)
    mapping(uint256 => mapping(uint256 => uint256)) internal tokenIdToTotalTrainingAbilityPointsTaught;

    // Cooldown Level => Duration in Seconds
    mapping(uint256 => uint256) internal cooldownLevelToDuration;
    // Token ID => trainer current cooldown level
    mapping(uint256 => uint256) internal tokenIdToTrainerCooldownLevel;
    // Token ID => timestamp last training session began as a trainer
    mapping(uint256 => uint256) internal tokenIdToTrainerLastCooldownStart;
    // Token ID => student current cooldown level
    mapping(uint256 => uint256) internal tokenIdToStudentCooldownLevel;
    // Token ID => timestamp last training session began as a student
    mapping(uint256 => uint256) internal tokenIdToStudentLastCooldownStart;

    // Token ID => ID of the Trainer Auction the trainer is
    // currently listing services (0 = Not on auction)
    mapping(uint256 => uint256) internal tokenIdToTrainerAuctionId;
    // Token ID => ID of the Sale Auction ID the golfer is listed
    // for sale (0 = Not on auction)
    mapping(uint256 => uint256) internal tokenIdToSaleAuctionId;    
}

/**
 * @title ITAS Control and Storage
 * @dev Provides for contract ownership, wallet ownership, and operational control of contracts.
 */
contract ITASControlAndStorage is ArenaGolfStorage{

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event WalletTransferred(address indexed previousWallet, address indexed newWallet);

    constructor() public {
        ownerPrimary = msg.sender;
        ownerSecondary = msg.sender;
        ITASWallet = msg.sender;
        SecondLegionWallet = msg.sender;
    }

    modifier onlyOwner() {
        require (msg.sender == ownerPrimary || msg.sender == ownerSecondary);
        _;
    }

    modifier anyOperator() {
        require (
            msg.sender == ownerPrimary ||
            msg.sender == ownerSecondary ||
            otherOperators[msg.sender] == 1
        );
        _;
    }

    modifier onlyOtherOperators() {
        require (otherOperators[msg.sender] == 1);
        _;
    }

    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    function owner() public view returns (address) {
        return ownerPrimary;
    }

    function isOwner() public view returns (bool) {
        if (msg.sender == ownerPrimary ||
            msg.sender == ownerSecondary) {
            return true;
        }
        return false;
    }

    function setPrimaryOwner(address _newOwner) external onlyOwner {
        require (_newOwner != address(0));
        emit OwnershipTransferred(ownerPrimary, _newOwner);
        ownerPrimary = _newOwner;
    }

    function setSecondaryOwner(address _newOwner) external onlyOwner {
        require (_newOwner != address(0));
        emit OwnershipTransferred(ownerSecondary, _newOwner);
        ownerSecondary = _newOwner;
    }

    function transferITASWalletOwnership(address _newWalletAddress) onlyOwner external {
        require(_newWalletAddress != address(0));
        emit WalletTransferred(ITASWallet, _newWalletAddress);
        ITASWallet = _newWalletAddress;        
    }

    function transferSecondLegionWalletOwnership(address _newWalletAddress) onlyOwner external {
        require(_newWalletAddress != address(0));
        emit WalletTransferred(SecondLegionWallet, _newWalletAddress);
        SecondLegionWallet = _newWalletAddress;
    }

    function setOtherOperator(address _newOperator, uint8 _state) external onlyOwner {
        require (_newOperator != address(0));
        otherOperators[_newOperator] = _state;
    }

    function pause() public onlyOwner whenNotPaused {
        paused = true;
    }

    function unpause() public onlyOwner {
        paused = false;
    }
}

/**
 * @title Arena Golf Main contract
 * @dev This contract utilizes the transparent proxy pattern as defined
 * in the ERC1538 standard - https://eips.ethereum.org/EIPS/eip-1538
 */
contract ArenaGolfMain is ArenaGolfStorage {
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    event CommitMessage(string message);
    event FunctionUpdate(bytes4 indexed functionId, address indexed oldDelegate, address indexed newDelegate, string functionSignature);

    constructor(address _erc1538Delegate) public {
        ownerPrimary = msg.sender;
        ownerSecondary = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);

        paused = false;
        _name = "ArenaGolf-Golfer-NFT";
        _symbol = "GOLFER";

        //ERC165
        supportedInterfaces[0x01ffc9a7] = true;
        //ERC721
        supportedInterfaces[0x80ac58cd] = true;
        //ERC721Metadata
        supportedInterfaces[0x5b5e139f] = true;
        //ERC721Enumerable
        supportedInterfaces[0x780e9d63] = true;
        //ERC1538
        supportedInterfaces[0x61455567] = true;

        //Adding ERC1538 updateContract function
        bytes memory signature = "updateContract(address,string,string)";
        bytes4 funcId = bytes4(keccak256(signature));
        delegates[funcId] = _erc1538Delegate;
        funcSignatures.push(signature);
        funcSignatureToIndex[signature] = funcSignatures.length;
        emit FunctionUpdate(funcId, address(0), _erc1538Delegate, string(signature));
        emit CommitMessage("Added ERC1538 updateContract function at contract creation");
    }

    function() external payable {
        address delegate = delegates[msg.sig];
        require(delegate != address(0), "Function does not exist.");
        assembly {
            let ptr := mload(0x40)
            calldatacopy(ptr, 0, calldatasize)
            let result := delegatecall(gas, delegate, ptr, calldatasize, 0, 0)
            let size := returndatasize
            returndatacopy(ptr, 0, size)
            switch result
            case 0 {revert(ptr, size)}
            default {return (ptr, size)}
        }
    }
}

/**
 * @title ERC1538 Transparent Contract Standard - implementation
 * @dev See https://eips.ethereum.org/EIPS/eip-1538
 */
contract ERC1538Delegate is ERC1538, ITASControlAndStorage {

    function updateContract(address _delegate, string calldata _functionSignatures, string calldata _commitMessage) external onlyOwner {
        // pos is first used to check the size of the delegate contract.
        // After that pos is the current memory location of _functionSignatures.
        // It is used to move through the characters of _functionSignatures
        uint256 pos;
        if(_delegate != address(0)) {
            assembly {
                pos := extcodesize(_delegate)
            }
            require(pos > 0, "_delegate address is not a contract and is not address(0)");
        }
        // creates a bytes vesion of _functionSignatures
        bytes memory signatures = bytes(_functionSignatures);
        // stores the position in memory where _functionSignatures ends.
        uint256 signaturesEnd;
        // stores the starting position of a function signature in _functionSignatures
        uint256 start;
        assembly {
            pos := add(signatures,32)
            start := pos
            signaturesEnd := add(pos,mload(signatures))
        }
        // the function id of the current function signature
        bytes4 funcId;
        // the delegate address that is being replaced or address(0) if removing functions
        address oldDelegate;
        // the length of the current function signature in _functionSignatures
        uint256 num;
        // the current character in _functionSignatures
        uint256 char;
        // the position of the current function signature in the funcSignatures array
        uint256 index;
        // the last position in the funcSignatures array
        uint256 lastIndex;
        // parse the _functionSignatures string and handle each function
        for (; pos < signaturesEnd; pos++) {
            assembly {char := byte(0,mload(pos))}
            // 0x29 == )
            if (char == 0x29) {
                pos++;
                num = (pos - start);
                start = pos;
                assembly {
                    mstore(signatures,num)
                }
                funcId = bytes4(keccak256(signatures));
                oldDelegate = delegates[funcId];
                if(_delegate == address(0)) {
                    index = funcSignatureToIndex[signatures];
                    require(index != 0, "Function does not exist.");
                    index--;
                    lastIndex = funcSignatures.length - 1;
                    if (index != lastIndex) {
                        funcSignatures[index] = funcSignatures[lastIndex];
                        funcSignatureToIndex[funcSignatures[lastIndex]] = index + 1;
                    }
                    funcSignatures.length--;
                    delete funcSignatureToIndex[signatures];
                    delete delegates[funcId];
                    emit FunctionUpdate(funcId, oldDelegate, address(0), string(signatures));
                }
                else if (funcSignatureToIndex[signatures] == 0) {
                    require(oldDelegate == address(0), "FuncId clash.");
                    delegates[funcId] = _delegate;
                    funcSignatures.push(signatures);
                    funcSignatureToIndex[signatures] = funcSignatures.length;
                    emit FunctionUpdate(funcId, address(0), _delegate, string(signatures));
                }
                else if (delegates[funcId] != _delegate) {
                    delegates[funcId] = _delegate;
                    emit FunctionUpdate(funcId, oldDelegate, _delegate, string(signatures));

                }
                assembly {signatures := add(signatures,num)}
            }
        }
        emit CommitMessage(_commitMessage);
    }
}


/**
 * @title ERC1538QueryDelegates implementation for for querying function
 * information from a transparent contract
 * @dev See https://eips.ethereum.org/EIPS/eip-1538
 *
 * Function signatures (to load into the updateContract function)
 * "functionByIndex(uint256)functionExists(string)delegateAddress(string)delegateAddresses()delegateFunctionSignatures(address)functionById(bytes4)functionBySignature(string)functionSignatures()totalFunctions()"
 */
contract ERC1538QueryDelegates is ERC1538Query, ArenaGolfStorage {

    function totalFunctions() external view returns(uint256) {
        return funcSignatures.length;
    }

    function functionByIndex(uint256 _index) external view returns(string memory functionSignature, bytes4 functionId, address delegate) {
        require(_index < funcSignatures.length, "functionSignatures index does not exist.");
        bytes memory signature = funcSignatures[_index];
        functionId = bytes4(keccak256(signature));
        delegate = delegates[functionId];
        return (string(signature), functionId, delegate);
    }

    function functionExists(string calldata _functionSignature) external view returns(bool) {
        return funcSignatureToIndex[bytes(_functionSignature)] != 0;
    }

    function functionSignatures() external view returns(string memory) {
        uint256 signaturesLength;
        bytes memory signatures;
        bytes memory signature;
        uint256 functionIndex;
        uint256 charPos;
        uint256 funcSignaturesNum = funcSignatures.length;
        bytes[] memory memoryFuncSignatures = new bytes[](funcSignaturesNum);
        for(; functionIndex < funcSignaturesNum; functionIndex++) {
            signature = funcSignatures[functionIndex];
            signaturesLength += signature.length;
            memoryFuncSignatures[functionIndex] = signature;
        }
        signatures = new bytes(signaturesLength);
        functionIndex = 0;
        for(; functionIndex < funcSignaturesNum; functionIndex++) {
            signature = memoryFuncSignatures[functionIndex];
            for(uint256 i = 0; i < signature.length; i++) {
                signatures[charPos] = signature[i];
                charPos++;
            }
        }
        return string(signatures);
    }

    function delegateFunctionSignatures(address _delegate) external view returns(string memory) {
        uint256 funcSignaturesNum = funcSignatures.length;
        bytes[] memory delegateSignatures = new bytes[](funcSignaturesNum);
        uint256 delegateSignaturesPos;
        uint256 signaturesLength;
        bytes memory signatures;
        bytes memory signature;
        uint256 functionIndex;
        uint256 charPos;
        for(; functionIndex < funcSignaturesNum; functionIndex++) {
            signature = funcSignatures[functionIndex];
            if(_delegate == delegates[bytes4(keccak256(signature))]) {
                signaturesLength += signature.length;
                delegateSignatures[delegateSignaturesPos] = signature;
                delegateSignaturesPos++;
            }

        }
        signatures = new bytes(signaturesLength);
        functionIndex = 0;
        for(; functionIndex < delegateSignatures.length; functionIndex++) {
            signature = delegateSignatures[functionIndex];
            if(signature.length == 0) {
                break;
            }
            for(uint256 i = 0; i < signature.length; i++) {
                signatures[charPos] = signature[i];
                charPos++;
            }
        }
        return string(signatures);
    }

    function delegateAddress(string calldata _functionSignature) external view returns(address) {
        require(funcSignatureToIndex[bytes(_functionSignature)] != 0, "Function signature not found.");
        return delegates[bytes4(keccak256(bytes(_functionSignature)))];
    }

    function functionById(bytes4 _functionId) external view returns(string memory signature, address delegate) {
        for(uint256 i = 0; i < funcSignatures.length; i++) {
            if(_functionId == bytes4(keccak256(funcSignatures[i]))) {
                return (string(funcSignatures[i]), delegates[_functionId]);
            }
        }
        revert("functionId not found");
    }

    function delegateAddresses() external view returns(address[] memory) {
        uint256 funcSignaturesNum = funcSignatures.length;
        address[] memory delegatesBucket = new address[](funcSignaturesNum);
        uint256 numDelegates;
        uint256 functionIndex;
        bool foundDelegate;
        address delegate;
        for(; functionIndex < funcSignaturesNum; functionIndex++) {
            delegate = delegates[bytes4(keccak256(funcSignatures[functionIndex]))];
            for(uint256 i = 0; i < numDelegates; i++) {
                if(delegate == delegatesBucket[i]) {
                    foundDelegate = true;
                    break;
                }
            }
            if(foundDelegate == false) {
                delegatesBucket[numDelegates] = delegate;
                numDelegates++;
            }
            else {
                foundDelegate = false;
            }
        }
        address[] memory delegates_ = new address[](numDelegates);
        functionIndex = 0;
        for(; functionIndex < numDelegates; functionIndex++) {
            delegates_[functionIndex] = delegatesBucket[functionIndex];
        }
        return delegates_;
    }
}


/**
 * @title ERC721FullToken
 * @dev The full implementation of ERC721, ERC721Metadata, and ERC721Enumerable
 */
contract ERC721FullToken is ITASControlAndStorage, ERC165, ERC721, ERC721Metadata, ERC721Enumerable {
    using SafeMath for uint256;
    using Address for address;
    using Counters for Counters.Counter;

    // Equals to `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`
    // which can be also obtained as `IERC721Receiver(0).onERC721Received.selector`
    bytes4 private constant _ERC721_RECEIVED = 0x150b7a02;

    /**
     * @dev Constructor function
     */
    constructor (string memory name, string memory symbol) public {
        _name = name;
        _symbol = symbol;
    }

    /**
     * @dev See {IERC165-supportsInterface}.
     *
     * Time complexity O(1), guaranteed to always use less than 30 000 gas.
     */
    function supportsInterface(bytes4 interfaceId) external view returns (bool) {
        return supportedInterfaces[interfaceId];
    }

    /**
     * @dev Gets the token name.
     * @return string representing the token name
     */
    function name() external view returns (string memory) {
        return _name;
    }

    /**
     * @dev Gets the token symbol.
     * @return string representing the token symbol
     */
    function symbol() external view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns an URI for a given token ID.
     * Throws if the token ID does not exist. May return an empty string.
     * @param tokenId uint256 ID of the token to query
     */
    function tokenURI(uint256 tokenId) external view returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return _appendUintToString(tokenURIBase, tokenId);
    }

    /**
     * @dev Gets the balance of the specified address.
     * @param owner address to query the balance of
     * @return uint256 representing the amount owned by the passed address
     */
    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "ERC721: balance query for the zero address");

        return _ownedTokensCount[owner].current();
    }

    /**
     * @dev Gets the owner of the specified token ID.
     * @param tokenId uint256 ID of the token to query the owner of
     * @return address currently marked as the owner of the given token ID
     */
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _tokenOwner[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");

        return owner;
    }

    /**
     * @dev Approves another address to transfer the given token ID
     * The zero address indicates there is no approved address.
     * There can only be one approved address per token at a given time.
     * Can only be called by the token owner or an approved operator.
     * @param to address to be approved for the given token ID
     * @param tokenId uint256 ID of the token to be approved
     */
    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");

        require(msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not owner nor approved for all"
        );

        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }

    /**
     * @dev Gets the approved address for a token ID, or zero if no address set
     * Reverts if the token ID does not exist.
     * @param tokenId uint256 ID of the token to query the approval of
     * @return address currently approved for the given token ID
     */
    function getApproved(uint256 tokenId) public view returns (address) {
        require(_exists(tokenId), "ERC721: approved query for nonexistent token");

        return _tokenApprovals[tokenId];
    }

    /**
     * @dev Sets or unsets the approval of a given operator
     * An operator is allowed to transfer all tokens of the sender on their behalf.
     * @param to operator address to set the approval
     * @param approved representing the status of the approval to be set
     */
    function setApprovalForAll(address to, bool approved) public {
        require(to != msg.sender, "ERC721: approve to caller");

        _operatorApprovals[msg.sender][to] = approved;
        emit ApprovalForAll(msg.sender, to, approved);
    }

    /**
     * @dev Tells whether an operator is approved by a given owner.
     * @param owner owner address which you want to query the approval of
     * @param operator operator address which you want to query the approval of
     * @return bool whether the given operator is approved by the given owner
     */
    function isApprovedForAll(address owner, address operator) public view returns (bool) {
        return _operatorApprovals[owner][operator];
    }

    /**
     * @dev Transfers the ownership of a given token ID to another address.
     * Usage of this method is discouraged, use {safeTransferFrom} whenever possible.
     * Requires the msg.sender to be the owner, approved, or operator.
     * @param from current owner of the token
     * @param to address to receive the ownership of the given token ID
     * @param tokenId uint256 ID of the token to be transferred
     */
    function transferFrom(address from, address to, uint256 tokenId) public {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");

        _transferFrom(from, to, tokenId);
    }

    /**
     * @dev Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement {IERC721Receiver-onERC721Received},
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`; otherwise,
     * the transfer is reverted.
     * Requires the msg.sender to be the owner, approved, or operator
     * @param from current owner of the token
     * @param to address to receive the ownership of the given token ID
     * @param tokenId uint256 ID of the token to be transferred
     */
    function safeTransferFrom(address from, address to, uint256 tokenId) public {
        safeTransferFrom(from, to, tokenId, "");
    }

    /**
     * @dev Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement {IERC721Receiver-onERC721Received},
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`; otherwise,
     * the transfer is reverted.
     * Requires the msg.sender to be the owner, approved, or operator
     * @param from current owner of the token
     * @param to address to receive the ownership of the given token ID
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes data to send along with a safe transfer check
     */
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: transfer caller is not owner nor approved");
        _safeTransferFrom(from, to, tokenId, _data);
    }

    /**
     * @dev Gets the token ID at a given index of the tokens list of the requested owner.
     * @param owner address owning the tokens list to be accessed
     * @param index uint256 representing the index to be accessed of the requested tokens list
     * @return uint256 token ID at the given index of the tokens list owned by the requested address
     */
    function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256) {
        require(index < balanceOf(owner), "ERC721Enumerable: owner index out of bounds");
        return _ownedTokens[owner][index];
    }

    /**
     * @dev Gets the total amount of tokens stored by the contract.
     * @return uint256 representing the total amount of tokens
     */
    function totalSupply() public view returns (uint256) {
        return _allTokens.length;
    }

    /**
     * @dev Gets the token ID at a given index of all the tokens in this contract
     * Reverts if the index is greater or equal to the total number of tokens.
     * @param index uint256 representing the index to be accessed of the tokens list
     * @return uint256 token ID at the given index of the tokens list
     */
    function tokenByIndex(uint256 index) public view returns (uint256) {
        require(index < totalSupply(), "ERC721Enumerable: global index out of bounds");
        return _allTokens[index];
    }

    /**
     * @dev Safely transfers the ownership of a given token ID to another address
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`; otherwise,
     * the transfer is reverted.
     * Requires the msg.sender to be the owner, approved, or operator
     * @param from current owner of the token
     * @param to address to receive the ownership of the given token ID
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes data to send along with a safe transfer check
     */
    function _safeTransferFrom(address from, address to, uint256 tokenId, bytes memory _data) internal {
        _transferFrom(from, to, tokenId);
        require(_checkOnERC721Received(from, to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Returns whether the specified token exists.
     * @param tokenId uint256 ID of the token to query the existence of
     * @return bool whether the token exists
     */
    function _exists(uint256 tokenId) internal view returns (bool) {
        address owner = _tokenOwner[tokenId];
        return owner != address(0);
    }

    /**
     * @dev Returns whether the given spender can transfer a given token ID.
     * @param spender address of the spender to query
     * @param tokenId uint256 ID of the token to be transferred
     * @return bool whether the msg.sender is approved for the given token ID,
     * is an operator of the owner, or is the owner of the token
     */
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        require(_exists(tokenId), "ERC721: operator query for nonexistent token");
        address owner = ownerOf(tokenId);
        return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
    }

    /**
     * @dev Internal function to safely mint a new token.
     * Reverts if the given token ID already exists.
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`; otherwise,
     * the transfer is reverted.
     * @param to The address that will own the minted token
     * @param tokenId uint256 ID of the token to be minted
     */
    function _safeMint(address to, uint256 tokenId) internal {
        _safeMint(to, tokenId, "");
    }

    /**
     * @dev Internal function to safely mint a new token.
     * Reverts if the given token ID already exists.
     * If the target address is a contract, it must implement `onERC721Received`,
     * which is called upon a safe transfer, and return the magic value
     * `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`; otherwise,
     * the transfer is reverted.
     * @param to The address that will own the minted token
     * @param tokenId uint256 ID of the token to be minted
     * @param _data bytes data to send along with a safe transfer check
     */
    function _safeMint(address to, uint256 tokenId, bytes memory _data) internal {
        _mint(to, tokenId);
        require(_checkOnERC721Received(address(0), to, tokenId, _data), "ERC721: transfer to non ERC721Receiver implementer");
    }

    /**
     * @dev Internal function to mint a new token.
     * Reverts if the given token ID already exists.
     * @param to The address that will own the minted token
     * @param tokenId uint256 ID of the token to be minted
     */
    function _mint(address to, uint256 tokenId) internal {
        require(to != address(0), "ERC721: mint to the zero address");
        require(!_exists(tokenId), "ERC721: token already minted");

        _tokenOwner[tokenId] = to;
        _ownedTokensCount[to].increment();

        _addTokenToOwnerEnumeration(to, tokenId);

        _addTokenToAllTokensEnumeration(tokenId);
        
        emit Transfer(address(0), to, tokenId);
    }

    /**
     * @dev Internal function to burn a specific token.
     * Reverts if the token does not exist.
     * Deprecated, use {_burn} instead.
     * @param owner owner of the token to burn
     * @param tokenId uint256 ID of the token being burned
     */
    function _burn(address owner, uint256 tokenId) internal {
        require(ownerOf(tokenId) == owner, "ERC721: burn of token that is not own");

        _clearApproval(tokenId);

        _ownedTokensCount[owner].decrement();
        _tokenOwner[tokenId] = address(0);

        _removeTokenFromOwnerEnumeration(owner, tokenId);
        // Since tokenId will be deleted, we can clear its slot in _ownedTokensIndex to trigger a gas refund
        _ownedTokensIndex[tokenId] = 0;

        _removeTokenFromAllTokensEnumeration(tokenId);

        emit Transfer(owner, address(0), tokenId);
    }

    /**
     * @dev Internal function to burn a specific token.
     * Reverts if the token does not exist.
     * @param tokenId uint256 ID of the token being burned
     */
    function _burn(uint256 tokenId) internal {
        _burn(ownerOf(tokenId), tokenId);
    }

    /**
     * @dev Internal function to transfer ownership of a given token ID to another address.
     * As opposed to {transferFrom}, this imposes no restrictions on msg.sender.
     * @param from current owner of the token
     * @param to address to receive the ownership of the given token ID
     * @param tokenId uint256 ID of the token to be transferred
     */
    function _transferFrom(address from, address to, uint256 tokenId) internal {
        require(ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");

        _clearApproval(tokenId);

        _ownedTokensCount[from].decrement();
        _ownedTokensCount[to].increment();

        _tokenOwner[tokenId] = to;

        _removeTokenFromOwnerEnumeration(from, tokenId);

        _addTokenToOwnerEnumeration(to, tokenId);

        emit Transfer(from, to, tokenId);
    }

    /**
     * @dev Internal function to invoke {IERC721Receiver-onERC721Received} on a target address.
     * The call is not executed if the target address is not a contract.
     *
     * This function is deprecated.
     * @param from address representing the previous owner of the given token ID
     * @param to target address that will receive the tokens
     * @param tokenId uint256 ID of the token to be transferred
     * @param _data bytes optional data to send along with the call
     * @return bool whether the call correctly returned the expected magic value
     */
    function _checkOnERC721Received(address from, address to, uint256 tokenId, bytes memory _data)
        internal returns (bool)
    {
        if (!to.isContract()) {
            return true;
        }

        bytes4 retval = ERC721Receiver(to).onERC721Received(msg.sender, from, tokenId, _data);
        return (retval == _ERC721_RECEIVED);
    }

    /**
     * @dev Gets the list of token IDs of the requested owner.
     * @param owner address owning the tokens
     * @return uint256[] List of token IDs owned by the requested address
     */
    function _tokensOfOwner(address owner) internal view returns (uint256[] storage) {
        return _ownedTokens[owner];
    }

    /**
     * @dev Private function to clear current approval of a given token ID.
     * @param tokenId uint256 ID of the token to be transferred
     */
    function _clearApproval(uint256 tokenId) private {
        if (_tokenApprovals[tokenId] != address(0)) {
            _tokenApprovals[tokenId] = address(0);
        }
    }

    /**
     * @dev Private function to append an integer value to a string.
     * @param inStr Base string
     * @param v Integer to append
     * @return str - The resulting string
     */
    function _appendUintToString(string storage inStr, uint256 v) private pure returns (string memory str) {
        uint256 maxlength = 100;
        bytes memory reversed = new bytes(maxlength);
        uint256 i = 0;
        uint8 remainder = 0;
        while (v != 0) {
            remainder = uint8(v % 10);
            v = v / 10;
            reversed[i++] = byte(48 + remainder);
        }
        bytes memory inStrb = bytes(inStr);
        bytes memory s = new bytes(inStrb.length + i);
        uint256 j;
        for (j = 0; j < inStrb.length; j++) {
            s[j] = inStrb[j];
        }
        for (j = 0; j < i; j++) {
            s[j + inStrb.length] = reversed[i - 1 - j];
        }
        str = string(s);
    }

    /**
     * @dev Private function to add a token to this extension's ownership-tracking data structures.
     * @param to address representing the new owner of the given token ID
     * @param tokenId uint256 ID of the token to be added to the tokens list of the given address
     */
    function _addTokenToOwnerEnumeration(address to, uint256 tokenId) private {
        _ownedTokensIndex[tokenId] = _ownedTokens[to].length;
        _ownedTokens[to].push(tokenId);
    }

    /**
     * @dev Private function to add a token to this extension's token tracking data structures.
     * @param tokenId uint256 ID of the token to be added to the tokens list
     */
    function _addTokenToAllTokensEnumeration(uint256 tokenId) private {
        _allTokensIndex[tokenId] = _allTokens.length;
        _allTokens.push(tokenId);
    }

    /**
     * @dev Private function to remove a token from this extension's ownership-tracking data structures. Note that
     * while the token is not assigned a new owner, the `_ownedTokensIndex` mapping is _not_ updated: this allows for
     * gas optimizations e.g. when performing a transfer operation (avoiding double writes).
     * This has O(1) time complexity, but alters the order of the _ownedTokens array.
     * @param from address representing the previous owner of the given token ID
     * @param tokenId uint256 ID of the token to be removed from the tokens list of the given address
     */
    function _removeTokenFromOwnerEnumeration(address from, uint256 tokenId) private {
        // To prevent a gap in from's tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = _ownedTokens[from].length.sub(1);
        uint256 tokenIndex = _ownedTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary
        if (tokenIndex != lastTokenIndex) {
            uint256 lastTokenId = _ownedTokens[from][lastTokenIndex];

            _ownedTokens[from][tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
            _ownedTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index
        }

        // This also deletes the contents at the last position of the array
        _ownedTokens[from].length--;

        // Note that _ownedTokensIndex[tokenId] hasn't been cleared: it still points to the old slot (now occupied by
        // lastTokenId, or just over the end of the array if the token was the last one).
    }

    /**
     * @dev Private function to remove a token from this extension's token tracking data structures.
     * This has O(1) time complexity, but alters the order of the _allTokens array.
     * @param tokenId uint256 ID of the token to be removed from the tokens list
     */
    function _removeTokenFromAllTokensEnumeration(uint256 tokenId) private {
        // To prevent a gap in the tokens array, we store the last token in the index of the token to delete, and
        // then delete the last slot (swap and pop).

        uint256 lastTokenIndex = _allTokens.length.sub(1);
        uint256 tokenIndex = _allTokensIndex[tokenId];

        // When the token to delete is the last token, the swap operation is unnecessary. However, since this occurs so
        // rarely (when the last minted token is burnt) that we still do the swap here to avoid the gas cost of adding
        // an 'if' statement (like in _removeTokenFromOwnerEnumeration)
        uint256 lastTokenId = _allTokens[lastTokenIndex];

        _allTokens[tokenIndex] = lastTokenId; // Move the last token to the slot of the to-delete token
        _allTokensIndex[lastTokenId] = tokenIndex; // Update the moved token's index

        // This also deletes the contents at the last position of the array
        _allTokens.length--;
        _allTokensIndex[tokenId] = 0;
    }
}


/**
 * @title ArenaGolfNFT
 * @dev Golfer NFT implementation used for ArenaGolf based
 * on the ERC721Full token standard
 */
contract ArenaGolfNFT is ERC721FullToken {
    using SafeMath for uint256;

    uint256 constant internal DNA_VERSION_MASK = 0xF800000000000000000000000000000000000000000000000000000000000000;
    uint256 constant internal DNA_VERSION_START_BIT = 251;

    /**
     * @dev ArenaGolfNFT constructor
     * @param _name The name of the NFTs
     * @param _symbol Symbol to use for the NFTs
     */
    constructor(string memory _name, string memory _symbol) ERC721FullToken(_name, _symbol) public {
        currentGeneration = 0;
    }

    /**
     * @dev Sets the address of each golferTraitsContract (one address per DNA version)
     * @notice The golfer traits contract has the dna mapping for a single dna version. Each new version
     * of dna may have its own mapping, which would point to a new golfer traits contract that
     * can encode and decode that mapping.
     * @param _dnaVersion The dna version
     * @param _golferTraitsContractAddress The address of the contract that can encode/decode this version
     *  of the dna
     */
    function setGolferTraitsContract(uint256 _dnaVersion, address _golferTraitsContractAddress) external onlyOwner {
        require (_dnaVersion != 0);
        require (_golferTraitsContractAddress != address(0));
        golferTraitsContract[_dnaVersion] = GolferTraitsContract(_golferTraitsContractAddress);
    }

    /**
     * @dev Transfers a new golfer to an address without checking approval; call _transferFrom()
     * directly
     * @notice Transferring a newly auctioned golfer directly from sale contract operator can
     * bypass the approval check
     * @param _from The address the golfer is being sent from
     * @param _to The address of the recipient
     * @param _tokenId The token ID to transfer
     */
    function transferNewGolfer(address _from, address _to, uint256 _tokenId) external anyOperator {
        _transferFrom(_from, _to, _tokenId); 
    }

    /**
     * @dev Set the base Token URI
     * @param _tokenURI The base URI string for token lookups
     */
    function setTokenURI(string calldata _tokenURI) external anyOperator {
        tokenURIBase = _tokenURI;
    }

    /**
     * @dev Get all golfer token info
     * @param _tokenId token ID of the golfer to modify
     * @return token - address that owns of the token
     * @return dna - dna value of the golfer token
     * @return trainerCooldownLevel - The current cooldown index for token as a trainer
     * @return trainerLastCooldownStart - Timestamp of last training session as a trainer
     * @return studentCooldownLevel - The current cooldown index for token as a student
     * @return studentLastCooldownStart - Timestamp of last training session as a student
     * @return trainingAuctionId - Current training auction token is being listed
     * (0 means not currently in an auction)
     * @return saleAuctionId - Current sales auction token is being listed
     * (0 means not currently in a sales auction)
     */
    function getGolferInfo(uint256 _tokenId) external view
        returns (
            address tokenOwner,
            uint256 dna,
            uint256 generation,
            uint256 trainerCooldownLevel,
            uint256 trainerLastCooldownStart,
            uint256 studentCooldownLevel,
            uint256 studentLastCooldownStart,
            uint256 trainingAuctionId,
            uint256 saleAuctionId
        ) {
        tokenOwner = ownerOf(_tokenId);
        dna = tokenIdToGolferDna[_tokenId];
        generation = tokenIdToGolferGeneration[_tokenId];
        trainerCooldownLevel = tokenIdToTrainerCooldownLevel[_tokenId];
        trainerLastCooldownStart = tokenIdToTrainerLastCooldownStart[_tokenId];
        studentCooldownLevel = tokenIdToStudentCooldownLevel[_tokenId];
        studentLastCooldownStart = tokenIdToStudentLastCooldownStart[_tokenId];
        trainingAuctionId = tokenIdToTrainerAuctionId[_tokenId];
        saleAuctionId = tokenIdToSaleAuctionId[_tokenId];
    }

    /**
     * @dev Get the address of the golfer traits contract that has can decode/encode a
     * particular version of dna
     * @param _dnaVersion The dna version
     * @return address of the golfer traits contract
     */
    function getGolferTraitsContract(uint256 _dnaVersion) external view returns (address) {
        require (_dnaVersion != 0);
        return address(golferTraitsContract[_dnaVersion]);
    }

    /**
     * @dev Given a list of golfer tokens, return their dna values
     * @param _tokenIds List of token IDs
     */
    function getMultipleGolfersDna(uint256[] calldata _tokenIds) external view returns (uint256[] memory) {
        uint256[] memory golfers = new uint256[](_tokenIds.length);
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            golfers[i] = tokenIdToGolferDna[_tokenIds[i]];
        }
        return golfers;
    }

    /**
     * @dev Return the caller's list of owned golfers (token IDs)
     * @return List of the player's golfer token IDs
     */
    function getMyGolfers() external view returns (uint256[] memory) {
        return _tokensOfOwner(msg.sender);
    }

    /**
     * @dev Return a player's list of owned golfers (token IDs)
     * @param _player The address of a player
     * @return List of the player's golfer token IDs
     */
    function getPlayerGolfers(address _player) external view returns (uint256[] memory) {
        return _tokensOfOwner(_player);
    }

    /**
     * @dev Mint a new golfer given an owner and a dna value.
     * @param _tokenOwner The address of the token owner
     * @param _dna The dna value given to the newly minted golfer
     * @return Token ID of the new golfer token
     */
    function mintGolfer(address _tokenOwner, uint256 _dna) public anyOperator returns (uint256 tokenId) {
        require(_tokenOwner != address(0));
        require(_dna > 0);

        tokenId = totalSupply();
        tokenIdToGolferDna[tokenId] = _dna;
        tokenIdToGolferGeneration[tokenId] = currentGeneration;
        tokenIdToGolferDnaVersion[tokenId] = decodeDnaVersionFromDna(_dna);

        _mint(_tokenOwner, tokenId);

        return tokenId;
    }

    /**
     * @dev Batch transfer of golfers from one address to another
     * @param _from The address golfers are being sent from
     * @param _to The address of the recipient
     * @param _tokenIds List of token IDs to transfer
     */
    function batchTransferGolfers(address _from, address _to, uint256[] memory _tokenIds) public {
        require (_from != address(0));
        require (_to != address(0));
        require (_tokenIds.length > 0);

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            transferFrom(_from, _to, _tokenIds[i]);
        }
    }

    /**
     * @dev Batch safe transfer of golfers from one address to another
     * @param _from The address golfers are being sent from
     * @param _to The address of the recipient
     * @param _tokenIds List of token IDs to transfer
     */
    function batchSafeTransferGolfers(address _from, address _to, uint256[] memory _tokenIds) public {
        require (_from != address(0));
        require (_to != address(0));
        require (_tokenIds.length > 0);

        for (uint256 i = 0; i < _tokenIds.length; i++) {
            safeTransferFrom(_from, _to, _tokenIds[i]);
        }
    }

    /**
     * @dev Increment the generation. Generation is a global value given to all golfers
     * as they are minted. Once generation is incremented, all subsequently minted
     * golfers will be the new generation (generation cannot be rolled back)
     */
    function incrementGeneration() public anyOperator {
        // new generation of golfers
        currentGeneration = currentGeneration.add(1);
    }

    /**
     * @dev Add an item to the golfer's set of items. Simply append the item to the list
     * of existing items owned by the golfer.
     * @notice Add an item to a golfer's list of owned items.
     * @param _tokenId Token ID of the golfer to give the item
     * @param _itemId The ID of the item to give to the golfer
     */
    function addItemToGolfer(uint256 _tokenId, uint256 _itemId) public anyOperator {
        require (_exists(_tokenId));
        tokenIdToGolferItems[_tokenId].push(_itemId);
    }

    /**
     * @dev Delete all items belonging to a golfer.
     * @notice Will remove all golfer items; must re-add items if removed
     * @param _tokenId Token ID of the golfer to remove the items
     */
    function deleteGolferItems(uint256 _tokenId) public anyOperator {
        require (_exists(_tokenId));
        delete tokenIdToGolferItems[_tokenId];
    }

    /**
     * @dev Get the golfer's dna value
     * @param _tokenId Token ID of the golfer
     * @return The dna value of the golfer
     */
    function getGolferDna(uint256 _tokenId) public view returns (uint256) {
        return tokenIdToGolferDna[_tokenId];
    }

    /**
     * @dev Get the current generation of newly created golfer's in Arena Golf
     * @return The current generation
     */
    function getCurrentGeneration() public view returns (uint256) {
        return currentGeneration;
    }

    /**
     * @dev Given a golfer token ID and an appearance trait index, return the
     * golfer's appearance trait
     * @param _tokenId Token ID of the golfer
     * @param _traitIndex The dna trait index of the trait to be decoded
     * @return Appearance trait value
     */
    function getGolferAppearanceTrait(uint256 _tokenId, uint256 _traitIndex) public view returns (uint256) {
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        return golferTraitsContract[dnaVersion].decodeAppearanceTrait(golferDna, _traitIndex);
    }

    /**
     * @dev Given a golfer token ID and a current ability trait index, return the
     * golfer's current ability trait value
     * @param _tokenId Token ID of the golfer
     * @param _traitIndex The dna trait index of the ability trait to be decoded
     * @return Current ability trait value
     */
    function getGolferAbilityTrait(uint256 _tokenId, uint256 _traitIndex) public view returns (uint256) {
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        return golferTraitsContract[dnaVersion].decodeAbility(golferDna, _traitIndex);
    }

    /**
     * @dev Given a golfer token ID and a peak ability trait index, return the
     * golfer's peak ability trait value
     * @param _tokenId Token ID of the golfer
     * @param _traitIndex The dna trait index of the peak ability trait to be decoded
     * @return Peak ability trait value
     */
    function getGolferPeakAbilityTrait(uint256 _tokenId, uint256 _traitIndex) public view returns (uint256) {
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        return golferTraitsContract[dnaVersion].decodePeakAbility(golferDna, _traitIndex);
    }

    /**
     * @dev Given a golfer token ID, return the golfer's entire ability data
     * field from the dna value
     * @param _tokenId Token ID of the golfer
     * @return Full ability data value
     */
    function getGolferAbilityData(uint256 _tokenId) public view returns (uint256) {
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        return golferTraitsContract[dnaVersion].getAbilityData(golferDna);
    }

    /**
     * @dev Given a golfer token ID and a special ability trait index, return the
     * golfer's special ability trait value
     * @param _tokenId Token ID of the golfer
     * @param _traitIndex The dna trait index of the trait to be decoded
     * @return Special ability trait value
     */
    function getGolferSpecialAbilityTrait(uint256 _tokenId, uint256 _traitIndex) public view returns (uint256) {
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        return golferTraitsContract[dnaVersion].decodeSpecialAbility(golferDna, _traitIndex);
    }

    /**
     * @dev Get any arbitrary length trait data from a golfer's dna
     * @param _tokenId Token ID of the golfer
     * @param _traitLength The length of the trait data to return (in bits)
     * @param _traitPosition LSB position of the trait data to return
     * @return The decoded data value from the golfer's dna
     */
    function getGolferDnaData(uint256 _tokenId, uint256 _traitLength, uint256 _traitPosition) public view returns (uint256) {
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        return golferTraitsContract[dnaVersion].decodeDnaData(golferDna, _traitLength, _traitPosition);
    }

    /**
     * @dev Given a golfer token ID and an item index, return the owned item
     * @param _tokenId Token ID of the golfer
     * @param _itemIndex The item index in the golfer's item list
     * @return Item ID at the index specified
     */
    function getGolferItem(uint256 _tokenId, uint256 _itemIndex) public view returns (uint256) {
        require (_exists(_tokenId));
        return tokenIdToGolferItems[_tokenId][_itemIndex];
    }

    /**
     * @dev Given a golfer token ID, return all owned items
     * @param _tokenId Token ID of the golfer
     * @return Item IDs of all items owned by the golfer token
     */
    function getGolferItems(uint256 _tokenId) public view returns (uint256[] memory) {
        require (_exists(_tokenId));
        return tokenIdToGolferItems[_tokenId];
    }

    /**
     * @dev Decode the dna version from a dna value (introspecively). The position of
     * the dna version in the dna bitmap must be the same across all versions of dna.
     * @param _dna The dna value to decode
     * @return The dna version
     */
    function decodeDnaVersionFromDna(uint256 _dna) public pure returns (uint256) {
        return uint256((_dna & DNA_VERSION_MASK) >> DNA_VERSION_START_BIT);
    }

    /**
     * @dev Override _transferFrom to check if golfer can be transferred.
     * Transfer a token assuming there is nothing in ArenaGolf gameplay
     * preventing the transfer (such as token for sale or listed for training)
     * @notice Check if transfer is allowed before a token can be transferred
     * @param from The address golfer token is being sent from
     * @param to The address of the recipient
     * @param tokenId Token ID to transfer
     */
    // override _transferFrom to check if golfer can be transferred
    function _transferFrom(address from, address to, uint256 tokenId) internal {
        require(_isTransferAllowed(tokenId));
        super._transferFrom(from, to, tokenId);
    }

    /**
     * @dev Perform some checks to determine if a token transfer should be allowed.
     * @param _tokenId Token ID to check
     * @return True if transfer is allowed. Otherwise return false.
     */
    function _isTransferAllowed(uint256 _tokenId) internal view returns (bool) {
        // If golfer is currently training or for sale, block the transfer of the golfer
        if ((tokenIdToTrainerAuctionId[_tokenId] > 0) || (tokenIdToSaleAuctionId[_tokenId] > 0)) {
            return false;
        }
        return true;
    }
}


/**
 * @title ArenaGolfAbilityUpgrades
 * @dev Golfer ability upgrade functionality
 */
contract ArenaGolfAbilityUpgrades is ITASControlAndStorage {
    using SafeMath for uint256;

    /**
     * @dev ArenaGolfAbilityUpgrades constructor
     */
    constructor() public {}

    /**
     * @dev Increase a golfer's ability value by a certain amount
     * @notice Updating a golfer's ability will permanently increase the ability value in the
     * golfer's DNA
     * @param _tokenId The token ID of the golfer to update
     * @param _ability The ability to increase (0-3)
     * @param _amountIncrease The amount of increase in hundredths ex. 500 = 5.00
     @ @return The new ability value after increase
     */
    function upgradeGolferAbility(uint256 _tokenId, uint256 _ability, uint256 _amountIncrease) external anyOperator returns (uint256) {
        // first get current and peak values
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        uint256 currentAbilityValue = golferTraitsContract[dnaVersion].decodeAbility(golferDna, _ability);
        uint256 peakAbilityValue = golferTraitsContract[dnaVersion].decodePeakAbility(golferDna, _ability);

        // calculate the new ability value and ensure it does not increase beyond peak
        uint256 newAbilityValue = currentAbilityValue + _amountIncrease;
        if (newAbilityValue > peakAbilityValue) {
            newAbilityValue = peakAbilityValue;
        }
        tokenIdToGolferDna[_tokenId] = golferTraitsContract[dnaVersion].encodeAbility(golferDna, _ability, newAbilityValue);
        return newAbilityValue;
    }

    /**
     * @dev Increase all four golfer ability values by a certain amount
     * @notice Updating a golfer's ability will permanently increase the ability value in the
     * golfer's DNA
     * @param _tokenId The token ID of the golfer to update
     * @param _amountIncrease The amount of increase in hundredths ex. 500 = 5.00 per ability. Increase values can be
     * passed in each of the 4 array values corresponding to each ability. Passing a value of 0 means no increase
     * for that ability.
     */
    function upgradeGolferAbilities(uint256 _tokenId, uint256[4] calldata _amountIncrease) external anyOperator {
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        uint256[4] memory currentAbilityValues = golferTraitsContract[dnaVersion].decodeAbilities(golferDna);
        uint256[4] memory peakAbilityValues = golferTraitsContract[dnaVersion].decodePeakAbilities(golferDna);
        uint256 newAbilityValue;
        // loop through all 4 core abilities
        for (uint256 i = 0; i < 4; i++) {
            if (_amountIncrease[i] > 0) {
                // calculate the new ability value and ensure it does not increase beyond peak
                newAbilityValue = currentAbilityValues[i] + _amountIncrease[i];
                if (newAbilityValue > peakAbilityValues[i]) {
                    newAbilityValue = peakAbilityValues[i];
                }
                golferDna = golferTraitsContract[dnaVersion].encodeAbility(golferDna, i, newAbilityValue);
            }
        }
        tokenIdToGolferDna[_tokenId] = golferDna;
    }

    /**
     * @dev Batch set golfer abilities in an efficient, yet safe, manner so as not to
     * modify any part of the DNA except for the current ability values. Caller should
     * perform bounds checks to ensure new values are below golfer peak values.
     * @notice Batch set multiple golfer abilities values
     * @param _tokenIds List of token IDs to modify
     * @param _newDna List of dna containing the pre-encoded ability values
     */
    function safeBatchSetGolfersAbilities(uint256[] calldata _tokenIds, uint256[] calldata _newDna) external anyOperator {
        // Prevent caller from modifying anything except for abilities
        uint256 dnaWithClearedAbilities;        
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            dnaWithClearedAbilities = (tokenIdToGolferDna[_tokenIds[i]] & 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000000000000000);
            tokenIdToGolferDna[_tokenIds[i]] = dnaWithClearedAbilities | (_newDna[_tokenIds[i]] & 0x000000000000000000000000000000000000000000000000FFFFFFFFFFFFFFFF);
        }
    }

    /**
     * @dev Set a golfer's 4 abilities efficiently by passing in one 64 bit ability value.
     * Caller should perform bounds checks to ensure new values are below golfer peak values.
     * @notice Set a golfer's 4 ability values
     * @param _tokenId token ID of the golfer to modify
     * @param _newAbilityValue New ability data value
     */
    function setGolferAbilities(uint256 _tokenId, uint256 _newAbilityValue) external anyOperator returns (uint256) {
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        tokenIdToGolferDna[_tokenId] = golferTraitsContract[dnaVersion].encodeAllAbilities(golferDna, _newAbilityValue);
        return tokenIdToGolferDna[_tokenId];
    }

    /**
     * @dev This function is efficient update of multiple golfer abilities. Caller should 
     * perform bounds checks to ensure new values are below golfer peak values.
     * @notice Batch set multiple golfer abilities values
     * @param _tokenIds List of token IDs to modify
     * @param _newAbilityValues List of new ability data values
     */
    function batchSetGolferAbilities(uint256[] calldata _tokenIds, uint256[] calldata _newAbilityValues) external anyOperator {
        uint256 golferDna;
        uint256 dnaVersion;
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            golferDna = tokenIdToGolferDna[_tokenIds[i]];
            dnaVersion = tokenIdToGolferDnaVersion[_tokenIds[i]];
            tokenIdToGolferDna[_tokenIds[i]] = golferTraitsContract[dnaVersion].encodeAllAbilities(golferDna, _newAbilityValues[i]);
        }
    }

    /**
     * @dev Function to update the special abilities of a golfer.
     * @param _tokenId token ID of the golfer to modify
     * @param _specialAbility The special ability to modify
     * @param _newValue The new special ability value
     * @return The new dna of the golfer
     */
    function setGolferSpecialAbilities(uint256 _tokenId, uint256 _specialAbility, uint256 _newValue) external anyOperator returns (uint256) {
        uint256 golferDna = tokenIdToGolferDna[_tokenId];
        uint256 dnaVersion = tokenIdToGolferDnaVersion[_tokenId];
        tokenIdToGolferDna[_tokenId] = golferTraitsContract[dnaVersion].encodeSpecialAbility(golferDna, _specialAbility, _newValue);
        return tokenIdToGolferDna[_tokenId];
    }
}


/**
 * @title GolferTraitsContract
 * @dev Golfer DNA Version 1
 *
 * Golfer DNA mapping of bits
 *     (MSB) 256 ... 0 (LSB)
 *
 * 0-127: Golfer ability values
 *     0-63: Current ability values (modifiable); each current ability is 16 bits
 *     64-127: Peak ability traits (cannot be modified); each peak ability is 16 bits
 * 128-212 (85 bits): Golfer appearance traits
 *     17 traits; each trait is 5 bits (cannot be modified)
 * 213-236 (24 bits)
 *     3 special abilities; each special ability is 8 bits (modifiable)
 * 237-250 (14 bits)
 *     14 reserved bits
 * 251-255 (5 bits)
 *     DNA version = 1
 *
 * @notice This contract is used for encoding and decoding a golfer's DNA that
 * has a version 1 DNA mappings.
 */
contract GolferTraitsContract {
    bool constant public isGolferTraits = true;

    uint256 constant internal ABILITY_TRAITS_START_BIT = 0;
    uint256 constant internal PEAK_ABILITY_TRAITS_START_BIT = 64;
    uint256 constant internal TOTAL_ABILITY_TRAITS = 4;
    uint256 constant internal APPEARANCE_TRAITS_START_BIT = 128;
    uint256 constant internal TOTAL_APPEARANCE_TRAITS = 17;
    uint256 constant internal SPECIAL_ABILITY_TRAITS_START_BIT = 213;
    uint256 constant internal TOTAL_SPECIAL_ABILITY_TRAITS = 3;
    uint256 constant internal RESERVED_START_BIT = 237;
    uint256 constant internal DNA_VERSION_START_BIT = 251;
    
    uint256 constant internal ABILITY_MASK_1 =               0x000000000000000000000000000000000000000000000000000000000000FFFF;
    uint256 constant internal ABILITY_MASK_2 =               0x00000000000000000000000000000000000000000000000000000000FFFF0000;
    uint256 constant internal ABILITY_MASK_3 =               0x0000000000000000000000000000000000000000000000000000FFFF00000000;
    uint256 constant internal ABILITY_MASK_4 =               0x000000000000000000000000000000000000000000000000FFFF000000000000;
    uint256 constant internal ABILITY_MASK_ALL =             0x000000000000000000000000000000000000000000000000FFFFFFFFFFFFFFFF;
    uint256 constant internal PEAK_ABILITY_MASK_1 =          0x00000000000000000000000000000000000000000000FFFF0000000000000000;
    uint256 constant internal PEAK_ABILITY_MASK_2 =          0x0000000000000000000000000000000000000000FFFF00000000000000000000;
    uint256 constant internal PEAK_ABILITY_MASK_3 =          0x000000000000000000000000000000000000FFFF000000000000000000000000;
    uint256 constant internal PEAK_ABILITY_MASK_4 =          0x00000000000000000000000000000000FFFF0000000000000000000000000000;
    uint256 constant internal PEAK_ABILITY_MASK_ALL =        0x00000000000000000000000000000000FFFFFFFFFFFFFFFF0000000000000000;
    uint256 constant internal APPEARANCE_MASK_ALL =          0x00000000001FFFFFFFFFFFFFFFFFFFFF00000000000000000000000000000000;
    uint256 constant internal SPECIAL_ABILITY_MASK_1 =       0x000000001FE00000000000000000000000000000000000000000000000000000;
    uint256 constant internal SPECIAL_ABILITY_MASK_2 =       0x0000001FE0000000000000000000000000000000000000000000000000000000;
    uint256 constant internal SPECIAL_ABILITY_MASK_3 =       0x00001FE000000000000000000000000000000000000000000000000000000000;
    uint256 constant internal SPECIAL_ABILITY_MASK_ALL =     0x00001FFFFFE00000000000000000000000000000000000000000000000000000;
    uint256 constant internal RESERVED_MASK =                0x07FFE00000000000000000000000000000000000000000000000000000000000;
    uint256 constant internal DNA_VERSION_MASK =             0xF800000000000000000000000000000000000000000000000000000000000000;

    uint256 constant internal ABILITY_INV_MASK_1 =           0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000;
    uint256 constant internal ABILITY_INV_MASK_2 =           0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000FFFF;
    uint256 constant internal ABILITY_INV_MASK_3 =           0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000FFFFFFFF;
    uint256 constant internal ABILITY_INV_MASK_4 =           0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000FFFFFFFFFFFF;
    uint256 constant internal ABILITY_INV_MASK_ALL =         0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000000000000000;
    uint256 constant internal PEAK_ABILITY_INV_MASK_ALL =    0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0000000000000000FFFFFFFFFFFFFFFF;
    uint256 constant internal APPEARANCE_INV_MASK_ALL =      0xFFFFFFFFFFE000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
    uint256 constant internal SPECIAL_ABILITY_INV_MASK_1 =   0xFFFFFFFFE01FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
    uint256 constant internal SPECIAL_ABILITY_INV_MASK_2 =   0xFFFFFFE01FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
    uint256 constant internal SPECIAL_ABILITY_INV_MASK_3 =   0xFFFFE01FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
    uint256 constant internal SPECIAL_ABILITY_INV_MASK_ALL = 0xFFFFE000001FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
    uint256 constant internal RESERVED_INV_MASK =            0xF8001FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;
    uint256 constant internal DNA_VERSION_INV_MASK =         0x07FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF;

    constructor() public {}

    /**
     * @dev Given a number get a slice of any bits, at certain offset
     * @param _n A number to be sliced
     * @param _nbits How many bits long is the new number
     * @param _offset How many bits to skip
     * @return The slice value
     */
    function _sliceNumber(uint256 _n, uint256 _nbits, uint256 _offset) public pure returns (uint256) {
        // mask is made by shifting left an offset number of times
        uint256 mask = uint256((2**_nbits) - 1) << _offset;
        // AND n with mask, and trim to max of _nbits bits
        return uint256((_n & mask) >> _offset);
    }

    function getDnaVersionSupported() public pure returns(uint256) {
        // This contract is for version 1 dna only
        return 1;
    }

    function getAppearanceData(uint256 _dna) public pure returns (uint256) {
        return ((_dna & APPEARANCE_MASK_ALL) >> APPEARANCE_TRAITS_START_BIT);
    }

    function getAbilityData(uint256 _dna) public pure returns (uint256) {
        return ((_dna & ABILITY_MASK_ALL) >> ABILITY_TRAITS_START_BIT);
    }

    function getPeakAbilityData(uint256 _dna) public pure returns (uint256) {
        return ((_dna & PEAK_ABILITY_MASK_ALL) >> PEAK_ABILITY_TRAITS_START_BIT);
    }

    function decodeDnaData(uint256 _dna, uint256 _len, uint256 _pos) public pure returns(uint256) {
        return _sliceNumber(_dna, _len, _pos);
    }


    function decodeAppearanceTrait(uint256 _dna, uint256 _trait) public pure returns (uint256) {
        require(_trait < TOTAL_APPEARANCE_TRAITS);
        return _sliceNumber(_dna, uint256(5), (APPEARANCE_TRAITS_START_BIT + (_trait * 5)));
    }

    function decodeAllAppearanceTraits(uint256 _dna) public pure returns(uint256[TOTAL_APPEARANCE_TRAITS] memory) {
        uint256[TOTAL_APPEARANCE_TRAITS] memory traits;
        for(uint256 i = 0; i < TOTAL_APPEARANCE_TRAITS; i++) {
            traits[i] = _sliceNumber(_dna, uint256(5), (APPEARANCE_TRAITS_START_BIT + (i * 5)));
        }
        return traits;
    }
    
    function decodeAbility(uint256 _dna, uint256 _ability) public pure returns (uint256) {
        require (_ability < TOTAL_ABILITY_TRAITS);
        uint256 abilityMask = 0;
        if (_ability == 0) {
            abilityMask = ABILITY_MASK_1;
        } else if (_ability == 1) {
            abilityMask = ABILITY_MASK_2;
        } else if (_ability == 2) {
            abilityMask = ABILITY_MASK_3;
        } else if (_ability == 3) {
            abilityMask = ABILITY_MASK_4;
        }
        return ((_dna & abilityMask) >> (ABILITY_TRAITS_START_BIT + (_ability * 16)));
    }

    function decodeAbilities(uint256 _dna) public pure returns (uint256[TOTAL_ABILITY_TRAITS] memory) {
        uint256[TOTAL_ABILITY_TRAITS] memory traits;
        uint256 abilityMask = 0;
        for(uint256 i = 0; i < TOTAL_ABILITY_TRAITS; i++) {
            if (i == 0) {
                abilityMask = ABILITY_MASK_1;
            } else if (i == 1) {
                abilityMask = ABILITY_MASK_2;
            } else if (i == 2) {
                abilityMask = ABILITY_MASK_3;
            } else if (i == 3) {
                abilityMask = ABILITY_MASK_4;
            }
            traits[i] = ((_dna & abilityMask) >> (ABILITY_TRAITS_START_BIT + (i * 16)));
        }
        return traits;
    }

    function decodePeakAbility(uint256 _dna, uint256 _ability) public pure returns (uint256) {
        require (_ability < TOTAL_ABILITY_TRAITS);
        uint256 abilityMask = 0;
        if (_ability == 0) {
            abilityMask = PEAK_ABILITY_MASK_1;
        } else if (_ability == 1) {
            abilityMask = PEAK_ABILITY_MASK_2;
        } else if (_ability == 2) {
            abilityMask = PEAK_ABILITY_MASK_3;
        } else if (_ability == 3) {
            abilityMask = PEAK_ABILITY_MASK_4;
        }
        return ((_dna & abilityMask) >> (PEAK_ABILITY_TRAITS_START_BIT + (_ability * 16)));
    }

    function decodePeakAbilities(uint256 _dna) public pure returns (uint256[TOTAL_ABILITY_TRAITS] memory) {
        uint256[TOTAL_ABILITY_TRAITS] memory traits;
        uint256 abilityMask = 0;
        for(uint256 i = 0; i < TOTAL_ABILITY_TRAITS; i++) {
            if (i == 0) {
                abilityMask = PEAK_ABILITY_MASK_1;
            } else if (i == 1) {
                abilityMask = PEAK_ABILITY_MASK_2;
            } else if (i == 2) {
                abilityMask = PEAK_ABILITY_MASK_3;
            } else if (i == 3) {
                abilityMask = PEAK_ABILITY_MASK_4;
            }
            traits[i] = ((_dna & abilityMask) >> (PEAK_ABILITY_TRAITS_START_BIT + (i * 16)));
        }
        return traits;
    }

    function decodeSpecialAbility(uint256 _dna, uint256 _specialAbility) public pure returns (uint256) {
        require (_specialAbility < TOTAL_SPECIAL_ABILITY_TRAITS);
        uint256 specialAbilityMask = 0;
        if (_specialAbility == 0) {
            specialAbilityMask = SPECIAL_ABILITY_MASK_1;
        } else if (_specialAbility == 1) {
            specialAbilityMask = SPECIAL_ABILITY_MASK_2;
        } else if (_specialAbility == 2) {
            specialAbilityMask = SPECIAL_ABILITY_MASK_3;
        }
        return ((_dna & specialAbilityMask) >> (SPECIAL_ABILITY_TRAITS_START_BIT + (_specialAbility * 8)));
    }

    function decodeSpecialAbilities(uint256 _dna) public pure returns (uint256[TOTAL_SPECIAL_ABILITY_TRAITS] memory) {
        uint256[TOTAL_SPECIAL_ABILITY_TRAITS] memory traits;
        uint256 specialAbilityMask = 0;
        for(uint256 i = 0; i < TOTAL_SPECIAL_ABILITY_TRAITS; i++) {
            if (i == 0) {
                specialAbilityMask = SPECIAL_ABILITY_MASK_1;
            } else if (i == 1) {
                specialAbilityMask = SPECIAL_ABILITY_MASK_2;
            } else if (i == 2) {
                specialAbilityMask = SPECIAL_ABILITY_MASK_3;
            }
            traits[i] = ((_dna & specialAbilityMask) >> (SPECIAL_ABILITY_TRAITS_START_BIT + (i * 8)));
        }
        return traits;
    }

    function decodeDnaReserved(uint256 _dna) public pure returns (uint256) {
        return ((_dna & RESERVED_MASK) >> RESERVED_START_BIT);
    }

    function encodeAbility(uint256 _dna, uint256 _ability, uint256 _newValue) public pure returns (uint256) {
        require (_ability < TOTAL_ABILITY_TRAITS);
        uint256 dnaMask = 0;
        if (_ability == 0) {
            dnaMask = ABILITY_INV_MASK_1;
        } else if (_ability == 1) {
            dnaMask = ABILITY_INV_MASK_2;
        } else if (_ability == 2) {
            dnaMask = ABILITY_INV_MASK_3;
        } else if (_ability == 3) {
            dnaMask = ABILITY_INV_MASK_4;
        }
        return ((_dna & dnaMask) | (_newValue << (_ability * 16)));
    }

    function encodeAllAbilities(uint256 _dna, uint256 _newValue) public pure returns (uint256) {
        return ((_dna & ABILITY_INV_MASK_ALL) | uint64(_newValue));
    }

    function encodeSpecialAbility(uint256 _dna, uint256 _specialAbility, uint256 _newValue) public pure returns (uint256) {
        require (_specialAbility < TOTAL_SPECIAL_ABILITY_TRAITS);
        uint256 dnaMask = 0;
        if (_specialAbility == 0) {
            dnaMask = SPECIAL_ABILITY_INV_MASK_1;
        } else if (_specialAbility == 1) {
            dnaMask = SPECIAL_ABILITY_INV_MASK_2;
        } else if (_specialAbility == 2) {
            dnaMask = SPECIAL_ABILITY_INV_MASK_3;
        }
        return ((_dna & dnaMask) | (_newValue << (SPECIAL_ABILITY_TRAITS_START_BIT + (_specialAbility * 8))));
    }
}

/**
 * @title DecimalContract
 * @dev This is a delegate contract fixing the fact that metamask
 * will not add a token when it is behind the transparent proxy contract
 * because demicals returns garbage value when not defined. Decimals
 * doesn't even apply to ERC-721 tokens, so explicitly returning
 * decimals = 0 here so that GOLFERS can be added to metamask.
 * @notice Upgraded functionality of ArenaGolfMain using ERC-1538
 */
contract DecimalContract {
    constructor() public {}

    function decimals() public pure returns (uint8) {
        return 0;
    }
}

/**
 * @title GolferSalesHelper
 * @dev Golfer ability upgrade functionality
 */
contract GolferP2PSalesHelper is ArenaGolfNFT {
    using SafeMath for uint256;

    /**
     * @dev GolferSalesHelper constructor
     */
    constructor(string memory _name, string memory _symbol) ArenaGolfNFT(_name, _symbol) public {}

    /**
     * @dev Transfers an existing golfer to an address without checking approval; call _transferFrom()
     * directly and clear the sales state.
     * @notice Transferring an auctioned golfer directly from sale contract can
     * bypass the approval check
     * @param _from The address the golfer is being sent from
     * @param _to The address of the recipient
     * @param _tokenId The token ID to transfer
     */
    function transferGolferAfterPurchase(address _from, address _to, uint256 _tokenId) external onlyOtherOperators {
        if (tokenIdToSaleAuctionId[_tokenId] > 0) {
            // clear the sales state
            tokenIdToSaleAuctionId[_tokenId] = 0;
        }
        _transferFrom(_from, _to, _tokenId); 
    }
    
    /**
     * @dev Golfer NFT has a change of sale state. Either pass an auction ID > 0
     * to indicates the golfer is currently listed for sale or auction ID = 0
     * for a golfer that is no longer listed for sale.
     * @notice Update a golfer NFT sales state
     * @param _tokenId Token ID of the golfer NFT
     * @param _auctionId ID of the sales auction (0 means not listed for sale)
     */
    function setGolferSaleState(uint256 _tokenId, uint256 _auctionId) public onlyOtherOperators {
        tokenIdToSaleAuctionId[_tokenId] = _auctionId;
    }

    /**
     * @dev Get ID of the golfer auction golfer is listed for sale. Auction ID = 0 means
     * golfer is not currently for sale
     * @notice Get the golfer auction ID
     * @param _tokenId Token ID of the golfer NFT
     * @return ID of the sales auction (0 means not listed for sale)
     */
    function getGolferSaleState(uint256 _tokenId) public view returns(uint256 _saleState) {
        return tokenIdToSaleAuctionId[_tokenId];
    }

    /**
     * @dev Perform some checks to determine if a golfer is available to be listed for
     * sale.
     * @param _tokenId Token ID of the golfer NFT
     * @return true if can be listed for sale, otherwise false
     */
    function canGolferBeListedForSale(uint256 _tokenId) public view returns(bool _canList) {
        // If golfer is currently training or for sale, block the transfer of the golfer
        if ((tokenIdToTrainerAuctionId[_tokenId] > 0) || (tokenIdToSaleAuctionId[_tokenId] > 0)) {
            return false;
        }
        return true;
    }
    
}