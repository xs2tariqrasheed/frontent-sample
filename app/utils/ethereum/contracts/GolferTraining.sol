pragma solidity ^0.5.16;

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
     * This test is non-exhaustive, and there may be false-negatives: during the
     * execution of a contract's constructor, its address will be reported as
     * not containing a contract.
     *
     * IMPORTANT: It is unsafe to assume that an address for which this
     * function returns false is an externally-owned account (EOA) and not a
     * contract.
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        // According to EIP-1052, 0x0 is the value returned for not-yet created accounts
        // and 0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470 is returned
        // for accounts without code, i.e. `keccak256('')`
          uint32 size;
          assembly {
            size := extcodesize(account)
          }
          return (size > 0);
    }

    /**
     * @dev Converts an `address` into `address payable`. Note that this is
     * simply a type cast: the actual underlying value is not changed.
     *
     * _Available since v2.4.0._
     */
    function toPayable(address account) internal pure returns (address) {
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
    function sendValue(address recipient, uint256 amount) internal {
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

contract ITASControl {

    // Owner of the contract
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
    bool public paused = false;

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

    modifier whenNotPaused() {
        require(!paused);
        _;
    }

    function pause() public onlyOwner whenNotPaused {
        paused = true;
    }

    function unpause() public onlyOwner {
        paused = false;
    }

    function setOtherOperator(address _newOperator, uint8 _state) external onlyOwner {
        require (_newOperator != address(0));
        otherOperators[_newOperator] = _state;
    }
}

interface ArenaGolfNFT {

}

contract ArenaGolfTraining is ITASControl {
    using SafeMath for uint256;

    ArenaGolfNFT public golferNFTContract;

    uint32[14] public cooldowns = [
        uint32(1 minutes),
        uint32(2 minutes),
        uint32(5 minutes),
        uint32(10 minutes),
        uint32(30 minutes),
        uint32(1 hours),
        uint32(2 hours),
        uint32(4 hours),
        uint32(8 hours),
        uint32(16 hours),
        uint32(1 days),
        uint32(2 days),
        uint32(4 days),
        uint32(7 days)
    ];

    // Actually, may be better to leave these in the NFT contract so all NFT info is there
    // this contract can increment these levels when training is complete
    mapping(uint256 => uint256) internal tokenIdToTrainerAuction;
    mapping(uint256 => uint256) internal tokenIdToTrainerCooldownLevel;
    mapping(uint256 => uint256) internal tokenIdToTrainerLastCooldownStart;
    mapping(uint256 => uint256) internal tokenIdToStudentCooldownLevel;
    mapping(uint256 => uint256) internal tokenIdToStudentLastCooldownStart;

    constructor(
        address _GolferNFTContractAddress
    )
        public
    {
        golferNFTContract = ArenaGolfNFT(_GolferNFTContractAddress);
    }

    function setGolferNFTContract(address _arenaGolfNFTAddress) external onlyOwner {
        require (_arenaGolfNFTAddress != address(0));
        golferNFTContract = ArenaGolfNFT(_arenaGolfNFTAddress);
    }

    function listTrainer(uint256 _tokenId, uint256 _ability, uint256 _price, uint256 _duration) external {
        // check that msg.sender owns the token

        // check if currently in a cooldown period - if so, reject

        // check if trainer is already listed their training services

        // set state in NFT contract to isTraining state to block transfers of the NFT until delisted

        // create training auction in auction contract

        // update the trainer => auction mapping in this contract
    }

    function cancelTrainer(uint256 _tokenId) external {
        // check that msg.sender owns the token (or operator of that token?)

        // cancel auction in auction contract

        // update the trainer => auction mapping in this contract

        // set isTraining state in NFT contract to false for the Trainer
    }

    function getTrained(uint256 _tokenIdStudent, uint256 _tokenIdTrainer) external payable {
        // check that msg.sender owns the token (or operator of that token?)

        // check if currently in a cooldown period - if so, reject

        // calc improvement amount

        // call function in the NFT contract to:
            // increment the cooldown levels for both student and trainer
            // set the lastCooldownStart times to now for both student and trainer
            // upgrade the actual student values in the NFT contract
            // set isTraining state in NFT contract to false for the Trainer
    }

    function _trainingCalculation(uint256 _tokenIdStudent, uint256 _tokenIdTrainer, uint256 _ability) internal {
        // get current ability value of student
        // get current ability value of trainer
        // perform the calculation
    }

    function _isTrainerInCooldown(uint256 _tokenId) internal returns (bool) {
        // get trainer cooldownLastStart and cooldownLevel for that token
        // cooldownDuration cooldowns[cooldownLevel]
        // if (cooldownLastStart + cooldownDuration <= now) {
        //    return false;
        // } else {
        //    return true;
        // }
    }

    function _isStudentInCooldown(uint256 _tokenId) internal returns (bool) {
        // get student cooldownLastStart and cooldownLevel for that token
        // cooldownDuration cooldowns[cooldownLevel]
        // if (cooldownLastStart + cooldownDuration <= now) {
        //    return false;
        // } else {
        //    return true;
        // }
    }
}