/**
 * @title Blocklete Games Tournaments - Turner Sports
 * @author Second Legion Studios, Brian Burns <brian@secondlegion.com>
 */

pragma solidity ^0.7.1;

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
     *
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
     *
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
     *
     * - Subtraction cannot overflow.
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
     *
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
     *
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
     *
     * - The divisor cannot be zero.
     */
    function div(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
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
     *
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
     *
     * - The divisor cannot be zero.
     */
    function mod(uint256 a, uint256 b, string memory errorMessage) internal pure returns (uint256) {
        require(b != 0, errorMessage);
        return a % b;
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
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly { size := extcodesize(account) }
        return size > 0;
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
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain`call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
      return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        return _functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        return _functionCallWithValue(target, data, value, errorMessage);
    }

    function _functionCallWithValue(address target, bytes memory data, uint256 weiValue, string memory errorMessage) private returns (bytes memory) {
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{ value: weiValue }(data);
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}

/**
 * @dev String operations.
 */
library Strings {
    /**
     * @dev Private function to append an integer value to a string.
     * @param inStr Base string
     * @param v Integer to append
     * @return str - The resulting string
     */
    function appendUintToString(string storage inStr, uint256 v) internal pure returns (string memory str) {
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
}

/**
 * @title Blocklete TournamentControl
 * @dev Provides for contract ownership and operational control of contracts.
 */
contract TournamentControl {

    // Owner of the contract
    // Has control of certain contract elements
    address public ownerPrimary;
    address public ownerSecondary;

    // Tracks if contract is paused or not. If paused, most actions are blocked
    bool public paused = false;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        ownerPrimary = msg.sender;
        ownerSecondary = msg.sender;
        emit OwnershipTransferred(address(0), msg.sender);
    }

    /**
     * @dev Throws if called by any account other than the ownerPrimary or ownerSecondary.
     */
    modifier onlyOwner() {
        require (msg.sender == ownerPrimary || msg.sender == ownerSecondary, "TournamentControl: caller is not the owner");
        _;
    }

    /**
     * @dev Returns the address of the current primary owner.
     */
    function owner() public view returns (address) {
        return ownerPrimary;
    }

    /**
     * @dev Returns false if not the current primary or secondary owner.
     */
    function isOwner() public view returns (bool) {
        if (msg.sender == ownerPrimary ||
            msg.sender == ownerSecondary) {
            return true;
        }
        return false;
    }

    /**
     * @dev Transfers ownership of the contract to a new primary owner.
     * Can only be called by the current owner.
     * @param _newOwner address of the new primary owner
     */
    function setPrimaryOwner(address _newOwner) external onlyOwner {
        require (_newOwner != address(0), "TournamentControl: new owner is the zero address");
        emit OwnershipTransferred(ownerPrimary, _newOwner);
        ownerPrimary = _newOwner;
    }

    /**
     * @dev Transfers ownership of the contract to a new secondary owner.
     * Can only be called by the current owner.
     * @param _newOwner address of the new secondary owner
     */
    function setSecondaryOwner(address _newOwner) external onlyOwner {
        require (_newOwner != address(0), "TournamentControl: new owner is the zero address");
        emit OwnershipTransferred(ownerSecondary, _newOwner);
        ownerSecondary = _newOwner;
    }

    /**
     * @dev Modifier to make a function callable only when the contract is not paused.
     */
    modifier whenNotPaused() {
        require(!paused, "TournamentControl: contract is paused");
        _;
    }

    /**
     * @dev Triggers stopped state.
     */
    function pause() public onlyOwner whenNotPaused {
        paused = true;
    }

    /**
     * @dev Returns to normal state.
     */
    function unpause() public onlyOwner {
        paused = false;
    }
}

/**
 * @title FounderCrowdsale Interface
 * @dev Provides an interface to the FounderCrowdsale contract
 */
interface FounderCrowdsale {
    function getEthPrizePotSize() external returns (uint256);
    function transferPotToTournament(uint256 _amountWei, bool _fullAmount) external;
}

/**
 * @title Blocklete Tournament Base Contract
 * @dev Base tournament functionality
 */
contract TournamentBase is TournamentControl{
    using SafeMath for uint256;
    using Address for address payable;

    // All possible tournament states
    enum TournamentStates { NotStarted, Started, Ended, Finalized, Cancelled }

    event TournamentCreated(uint256 indexed tournamentId, address indexed creator, uint256 startTime, uint256 endTime, uint256 totalPayout);
    event TournamentCancelled(uint256 indexed tournamentId, address indexed refundee, uint256 totalRefunded);
    event TournamentFinalized(uint256 indexed tournamentId, uint256 numPayouts, uint256 totalPayout);

    // total number of tournaments ever created, including cancalled tournaments
    uint256 internal totalTournaments;

    // Map unique tournament ID to the address of tournament creator
    mapping (uint256 => address) internal tournamentIdToCreator;

    // Map unique tournament ID to a start and end time for that tournament
    mapping (uint256 => uint256) internal tournamentStartTimes;
    mapping (uint256 => uint256) internal tournamentEndTimes;

    // Map unique tournament ID to a flag indicating finalized state
    mapping (uint256 => bool) internal tournamentFinalized;

    // Map unique tournament ID to a flag indicating cancelled state
    mapping (uint256 => bool) internal tournamentCancelled;

    // Map account address to the total current balance. The balance includes all
    // tournament payouts awarded that have not been withdrawn from the account yet.
    mapping (address => uint256) internal accountAddressToBalance;

    // Map account address to a second "approved" wallet that may withdraw the
    // payout balance from that account. This gives, for example, the owner of a
    // custody wallet account a chance to get a metamask wallet and withdraw their
    // accumulated balance to that wallet instead of the custody account that is
    // used to participate in the Blocklete tournaments
    mapping (address => address) internal accountAddressToApprovedAddress;

    // Map unique tournament ID to the total wei payout that will happen during the 
    // finalization step for that tournament
    mapping (uint256 => uint256) internal tournamentIdToTotalWeiPayout;

    /**
     * @dev TournamentBase constructor
     */
    constructor() {
        totalTournaments = 0;
    }

    /**
     * @dev onlyCreator modifier - check if caller is the tournament creator
     */
    modifier onlyCreator(uint256 _tournamentId) {
        require(msg.sender == tournamentIdToCreator[_tournamentId],
            "TournamentBase: can only by the creator of the tournament");
        _;
    }

    /**
     * @dev Adds a tournament to the list of tournaments. Also fires the
     * TournamentCreated event.
     * @param _startTime The start time of the tournament in secs unix time. (optional - can be 0)
     * @param _endTime The end time of the tournament in secs unix time (optional - can be 0)
     * @param _totalPayout The total payout in wei for the tournament
     */
    function _addTournamant(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _totalPayout
    )
        internal 
    {
        require (_endTime >= _startTime, "TournamentBase: end time cannot be before start time");
        tournamentIdToCreator[totalTournaments] = msg.sender;
        tournamentStartTimes[totalTournaments] = _startTime;
        tournamentEndTimes[totalTournaments] = _endTime;
        tournamentIdToTotalWeiPayout[totalTournaments] = _totalPayout;
        emit TournamentCreated(totalTournaments, msg.sender, _startTime, _endTime, _totalPayout);
        totalTournaments++;
    }

    /**
     * @dev Cancels a tournament and refunds the creator. Also fires the
     * TournamentCancelled event.
     * @param _tournamentId The unique ID of the tournament to be cancelled
     */
    function _cancelTournament(uint256 _tournamentId)
        internal
    {
        require(tournamentFinalized[_tournamentId] == false,
            "TournamentBase: Tournament is already finalized");
        require(tournamentCancelled[_tournamentId] == false,
            "TournamentBase: Tournament is already cancelled");
        tournamentCancelled[_tournamentId] = true;
        // refund the money to the creator
        uint256 refundAmount = tournamentIdToTotalWeiPayout[_tournamentId];
        tournamentIdToTotalWeiPayout[_tournamentId] = 0;
        msg.sender.sendValue(refundAmount);
        emit TournamentCancelled(_tournamentId, msg.sender, refundAmount);
    }
    
    /**
     * @dev Finalize a tournament and payout the tournament proceeds to the list of wallet
     * addresses passed in, in the wei amounts passed in. Also fires the TournamentFinalized
     * event.
     * @param _tournamentId The unique ID of the tournament to be finalized
     * @param _walletAddresses Ordered list of wallet addresses to be paid out
     * @param _weiPayouts Ordered list of wei payout amounts that align (in order) with the
     * list of wallet addresses passed in the _walletAddresses array
     */
    function _finalizeTournament(
        uint256 _tournamentId,
        address[] calldata _walletAddresses,
        uint256[] calldata _weiPayouts
    )
        internal
    {
        require(tournamentEndTimes[_tournamentId] <= block.timestamp,
            "TournamentBase: Tournament cannot be finalized before end time");
        require(tournamentFinalized[_tournamentId] == false,
            "TournamentBase: Tournament is already finalized");
        require(tournamentCancelled[_tournamentId] == false,
            "TournamentBase: Tournament is already cancelled");

        uint256 runningPayoutTotal = 0;

        // add payouts to the balances of the winners
        for (uint256 i = 0; i < _walletAddresses.length; i++) {
            accountAddressToBalance[_walletAddresses[i]] = accountAddressToBalance[_walletAddresses[i]].add(_weiPayouts[i]);
            runningPayoutTotal += _weiPayouts[i];
        }
        
        // ensure sum of individual payouts matches the total payout
        require(runningPayoutTotal == tournamentIdToTotalWeiPayout[_tournamentId],
            "TournamentBase: Sum of wei payouts specified does not match amount in prize pool");

        tournamentFinalized[_tournamentId] = true;
        emit TournamentFinalized(_tournamentId, _walletAddresses.length, runningPayoutTotal);

    }

    /**
     * @dev Function allowing caller to withdraw their balance
     */
    function withdrawMyBalance()
        external
        whenNotPaused
    {
        require(accountAddressToBalance[msg.sender] > 0,
            "TournamentBase: Cannot withdraw. Balance is already 0");
        uint256 payment = accountAddressToBalance[msg.sender];
        accountAddressToBalance[msg.sender] = 0;
        msg.sender.sendValue(payment);
    }

    /**
     * @dev Function allowing caller to withdraw their balance using an approved wallet
     * Caller can call this with their "second" approved wallet (ex. metamask) to withdraw
     * the balance that was accrued with their primary tournament account (ex. custody wallet
     * account)
     * @param _accountAddress The address of the account that was used to accrued the balance
     */
    function withdrawMyBalanceWithApprovedWallet(address _accountAddress)
        external
        whenNotPaused
    {
        require (accountAddressToApprovedAddress[_accountAddress] == msg.sender,
            "TournamentBase: Caller's wallet not approved for withdrawal");
        require (accountAddressToBalance[_accountAddress] > 0,
            "TournamentBase: Cannot withdraw. Balance is already 0");
        uint256 payment = accountAddressToBalance[_accountAddress];
        accountAddressToBalance[_accountAddress] = 0;
        msg.sender.sendValue(payment);
    }
}

/**
 * @title Blocklete Metadata
 * @dev Provides functions for setting and retrieving URI location for each tournament
 * so that rich information about each tournament, including results reporting,
 * can be optionally stored offchain in the specified location.
 */
contract TournamentMetadata is TournamentBase {

    string internal tournamentURIBase;

    constructor() {
    }

    /**
     * @dev Returns a tournament URI for a given tournament ID.
     * Throws if the tournament ID does not exist. May return an empty string.
     * @param _tournamentId ID of the tournament to query
     */
    function getTournamentURI(uint256 _tournamentId) public view returns (string memory) {
        require((_tournamentId < totalTournaments), "Tournament metadata: URI query for nonexistent tournament");
        return Strings.appendUintToString(tournamentURIBase, _tournamentId);
    }
    
    /**
     * @dev Set the base Tournament URI
     * @param _tournamentURIBase The base URI string for tournament lookups
     */
    function setTournamentURI(string calldata _tournamentURIBase) external onlyOwner {
        tournamentURIBase = _tournamentURIBase;
    }
}

/**
 * @title Blockletes Tournaments Contract
 * @dev Manages Tournament Functionality
 */
contract BlockletesTournament is TournamentBase, TournamentMetadata {
    using SafeMath for uint256;
    using Address for address payable;

    uint256 constant MIN_TOURNAMENT_PAYOUT = 10000000000000000;  // .01 ETH
    uint256 constant MAX_PAYOUT_PLACES = 100;

    // Interface to the golfer sales contract
    FounderCrowdsale public golferSalesContract;

    // Map of unique tournament ID to an ordered list of the tournament results.
    // Index 0 in the list would be the 1st place token ID, and index N would be
    // the last place token ID
    mapping (uint256 => uint256[]) internal tournamentIdToOrderedTokenIdResults;

    /**
     * @dev BlockletesTournament constructor
     */
    constructor() {}

    /**
     * @dev receive ether function to accept tournament pot payments
     */
    receive() external payable {}

    /**
     * @dev Set the address of the Golfer Sales contract
     * @param _contractAddress Address of the Golfer Sales contract
     */
    function setGolferSalesContract(address _contractAddress)
        external
        onlyOwner
    {
        require (_contractAddress != address(0),
             "BlockletesTournament: contract is zero address");
        golferSalesContract = FounderCrowdsale(_contractAddress);
    }

    /**
     * @dev Create a tournament. Open to the public, but limited to a minimum pot value to 
     * prevent spam. Caller must pass in a wei value equal to the total payout specified.
     * @param _startTime The start time of the tournament in secs unix time. (optional - can be 0)
     * @param _endTime The end time of the tournament in secs unix time (optional - can be 0)
     * @param _totalPayout The total payout in wei for the tournament
     */
    function createTournament(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _totalPayout
    )
        external payable
        whenNotPaused
    {
        // require minimum amount to prevent spamming contract
        require (_totalPayout > MIN_TOURNAMENT_PAYOUT,
            "BlockletesTournament: Total payout did not meet minimum");
        require (_totalPayout == msg.value,
            "BlockletesTournament: Total payout did not match wei value passed in");
        _addTournamant(_startTime, _endTime, _totalPayout);
    }

    /**
     * @dev Create a tournament. Caller has the option to fund the tournament pot through a
     * combination of both wei passed in during the call and/or through transfer of money
     * from the golfer sales contract pool specifically designated to fund tournaments.
     * The sum of wei passed in and wei transferred from the golfer sales pool must be equal
     * to the total payout specified.
     * @param _startTime The start time of the tournament in secs unix time. (optional - can be 0)
     * @param _endTime The end time of the tournament in secs unix time (optional - can be 0)
     * @param _totalPayout The total payout in wei for the tournament
     * @param _amountPotToTransfer The amount wei payout to fund from the golfer sales contract
     * tournament pool. The transaction will revert if the amount specified is more than
     * the amount currently available in the pool.
     */
    function createTournamentAndTransferPot(
        uint256 _startTime,
        uint256 _endTime,
        uint256 _totalPayout,
        uint256 _amountPotToTransfer
    )
        external payable 
        onlyOwner
    {
        // total payout specified must equal the value eth passed in plus
        // the amount being pulled from the sales contract
        require (_totalPayout == msg.value.add(_amountPotToTransfer),
            "BlockletesTournament: Total payout does not match total wei value");
        require (golferSalesContract.getEthPrizePotSize() >= _amountPotToTransfer,
            "BlockletesTournament: Not enough eth in pool to transfer"); 
        golferSalesContract.transferPotToTournament(_amountPotToTransfer, false);
        _addTournamant(_startTime, _endTime, _totalPayout);
    }

    /**
     * @dev Cancels a tournament and refunds the tournament creator.
     * @param _tournamentId The unique ID of the tournament to be cancelled
     */
    function cancelTournament(uint256 _tournamentId)
        external
        whenNotPaused
        onlyCreator(_tournamentId)
    {
        _cancelTournament(_tournamentId);
    }

    /**
     * @dev Finalize a tournament and payout the tournament proceeds to the list of wallet
     * addresses passed in, in the wei amounts passed in.
     * @param _tournamentId The unique ID of the tournament to be finalized
     * @param _walletAddresses Ordered list of wallet addresses to be paid out
     * @param _weiPayouts Ordered list of wei payout amounts that align (in order) with the
     * list of wallet addresses passed in the _walletAddresses array
     */
    function finalizeTournament(
        uint256 _tournamentId,
        address[] calldata _walletAddresses,
        uint256[] calldata _weiPayouts
    )
        external
        whenNotPaused
        onlyCreator(_tournamentId)
    {
        require (_walletAddresses.length <= MAX_PAYOUT_PLACES,
            "BlockletesTournament: Too many payout places specified");
        _finalizeTournament(_tournamentId, _walletAddresses, _weiPayouts);
    }

    /**
     * @dev Finalize a tournament and payout the tournament proceeds to the list of wallet
     * addresses passed in, in the wei amounts passed in. Caller can pass in an ordered list
     * of token ID results if not relying on the tournament URI for results reporting. 
     * @param _tournamentId The unique ID of the tournament to be finalized
     * @param _walletAddresses Ordered list of wallet addresses to be paid out
     * @param _weiPayouts Ordered list of wei payout amounts that align (in order) with the
     * list of wallet addresses passed in the _walletAddresses array
     * @param _tokenIds Ordered list of token ID results. Index 0 in the list would be the
     * 1st place token ID, and index N would be the last place token ID
     */
    function finalizeTournamentWithResults(
        uint256 _tournamentId,
        address[] calldata _walletAddresses,
        uint256[] calldata _weiPayouts,
        uint256[] calldata _tokenIds
    )
        external
        whenNotPaused
        onlyCreator(_tournamentId)
    {
        require (_walletAddresses.length <= MAX_PAYOUT_PLACES,
            "BlockletesTournament: Too many payout places specified");
        // if no token Id results being reported, then call finalizeTournament()
        require(_tokenIds.length > 0, "BlockletesTournament: Must have at least 1 token result");
        for (uint256 i =0; i < _tokenIds.length; i++) {
            tournamentIdToOrderedTokenIdResults[_tournamentId].push(_tokenIds[i]);
        }
        _finalizeTournament(_tournamentId, _walletAddresses, _weiPayouts);
    }

    /**
     * @dev Function allowing owner/custodian to send balance to recipient.
     * @param _accountAddress The address of the account that has the balance to withdraw ex. a custody
     * wallet
     * @param _destinationWalletAddress The address of destination wallet to send the balance proceeds
     */
    function withdrawBalanceForAccount(address _accountAddress, address payable _destinationWalletAddress)
        external
        onlyOwner
    {
        uint256 payment = accountAddressToBalance[_accountAddress];
        accountAddressToBalance[_accountAddress] = 0;
        _destinationWalletAddress.sendValue(payment);
    }

    /**
     * @dev Function allowing account holder to initiate future withdraws from an approved "second" wallet
     * address different from their account wallet. For example, a custoday wallet can be used to play game,
     * hold NFTs, and win tournaments, but the proceeds from winning tournaments may need to be
     * withdrawn to a non-custody wallet ex. metamask.
     * @param _accountAddress The address of the account
     * @param _approvedWalletAddress The address of a second wallet approved to withdraw the account balance
     */
    function setApprovedAddressForAccount(address _accountAddress, address _approvedWalletAddress) 
        external
        onlyOwner
    {
        require (_accountAddress != address(0) && _approvedWalletAddress != address(0),
            "BlockletesTournament: address is the zero address");
        accountAddressToApprovedAddress[_accountAddress] = _approvedWalletAddress;
    }

    /**
     * @dev Returns finalization status for a tournament
     * @param _tournamentId The unique ID of the tournament
     * @return true if finalized, false if not finalized
     */    
    function isFinalized(uint256 _tournamentId) external view returns (bool) {
        return tournamentFinalized[_tournamentId];
    }

    /**
     * @dev Returns cancelled status for a tournament
     * @param _tournamentId The unique ID of the tournament
     * @return true if cancelled, false if not cancelled
     */
    function isCancelled(uint256 _tournamentId) external view returns (bool) {
        return tournamentCancelled[_tournamentId];
    }

    /**
     * @dev Returns current state if a tournament
     * @param _tournamentId The unique ID of the tournament
     * @return the state according to the TournamentStates enum
     */
    function getTournamentState(uint256 _tournamentId) public view returns (TournamentStates) {
        if (tournamentFinalized[_tournamentId] == true) {
            return TournamentStates.Finalized; 
        } else if (tournamentCancelled[_tournamentId] == true) {
            return TournamentStates.Cancelled; 
        } else if (block.timestamp >= tournamentEndTimes[_tournamentId]) {
            return TournamentStates.Ended;
        } else if (block.timestamp >= tournamentStartTimes[_tournamentId]) {
            return TournamentStates.Started;
        } else {
            return TournamentStates.NotStarted;
        }
    }

    /**
     * @dev Returns tournament info
     * @param _tournamentId The unique ID of the tournament
     * @return creator - The creator of the tournament
     * @return startTime - The start time of the tournament in secs unix time
     * @return endTime - The end time of the tournament in secs unix time
     * @return totalPayout - The total payout in wei for the tournament
     * @return tournamentState - the state according to the TournamentStates enum
     */
    function getTournamentInfo(uint256 _tournamentId)
        external
        view
        returns (address, uint256, uint256, uint256, TournamentStates)
    {
        return (
            tournamentIdToCreator[_tournamentId],
            tournamentStartTimes[_tournamentId],
            tournamentEndTimes[_tournamentId],
            tournamentIdToTotalWeiPayout[_tournamentId],
            getTournamentState(_tournamentId)
        );
    }

    /**
     * @dev Get the total prize payout for a particular tournament.
     * @notice Cancelled tournaments will have a prize payout of 0, since
     * the tournament never happened and pot was refunded back to the creator.
     * @notice Finalized tournaments will return the original prize pot
     * amount, even though the prize was already paid out.
     * @param _tournamentId The unique ID of the tournament
     * @return Total prize payout for the tournament in wei
     */ 
    function getTournamentPrizePot(uint256 _tournamentId)
        external
        view
        returns (uint256)
    {
        return (tournamentIdToTotalWeiPayout[_tournamentId]);
    }

    /**
     * @dev Get the account balance of a particular address.
     * @param _accountAddress The address of the account
     * @return The account balance in wei.
     */
    function getBalance(address _accountAddress)
        external
        view
        returns (uint256)
    {
        return (accountAddressToBalance[_accountAddress]);
    }

    /**
     * @dev Get the caller's account balance.
     * @return The account balance in wei.
     */    
    function getMyBalance()
        external
        view
        returns (uint256)
    {
        return (accountAddressToBalance[msg.sender]);
    }

    /**
     * @dev Get the caller's account balance.
     * @param _tournamentId The unique ID of the tournament
     * @return An array of ordered tournament results
     */ 
    function getTournamentResults(uint256 _tournamentId) 
        external
        view
        returns (uint256[] memory)
    {
        // If no results written in contract, call getTournamentURI()
        // for the off-chain results location
        return tournamentIdToOrderedTokenIdResults[_tournamentId];
    }

    /**
     * @dev Get the total contract balance.
     * @return The contract balance in wei.
     */  
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Get the total number of tournaments ever created, including
     * cancelled tournaments.
     * @return The total number of tournaments ever created.
     */  
    function getTotalTournaments() public view returns (uint256) {
        return totalTournaments;
    }
}
