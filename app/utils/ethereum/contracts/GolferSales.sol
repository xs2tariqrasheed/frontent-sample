/**
 * @title Arena Golf - In The Arena Sports (ITAS)
 * @author Second Legion Studios, Brian Burns <brian@secondlegion.com>
 */

pragma solidity ^0.5.16;

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
 * @title ITAS Control
 * @dev Provides for contract ownership, wallet ownership, and operational control of contracts.
 */
contract ITASControl {

    // Owner of the contract
    // Has control of (most) contract elements
    address public ownerPrimary;
    address public ownerSecondary;

    // Address of owner wallets to transfer funds
    address payable public ITASWallet;
    address payable public SecondLegionWallet;

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

    function transferITASWalletOwnership(address payable _newWalletAddress) onlyOwner external {
        require(_newWalletAddress != address(0));
        emit WalletTransferred(ITASWallet, _newWalletAddress);
        ITASWallet = _newWalletAddress;        
    }

    function transferSecondLegionWalletOwnership(address payable _newWalletAddress) onlyOwner external {
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

/**
 * @title ERC721 token receiver interface
 * @dev Interface for any contract that wants to support safeTransfers
 * from ERC721 asset contracts.
 */
contract IERC721Receiver {
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

contract ERC721Holder is IERC721Receiver {
    function onERC721Received(address, address, uint256, bytes memory) public returns (bytes4) {
        return this.onERC721Received.selector;
    }
}

/**
 * @title ArenaGolfNFT Interface
 * @dev Provides an interface to the ArenaGolfNFT contract
 */
contract ArenaGolfNFT {
    function mintGolfer (address _tokenOwner, uint256 _type) external returns (uint256 tokenId);
    function transferFrom(address _from, address _to, uint256 _tokenId) public;
    function safeTransferFrom(address from, address to, uint256 tokenId) public;
    function transferNewGolfer(address from, address to, uint256 _tokenId) external;
    function ownerOf(uint256 tokenId) public view returns (address owner);
}


/**
 * @title AuctionBase Contract
 * @dev Base auction functionality
 */
contract AuctionBase is ITASControl, ERC721Holder {
    using SafeMath for uint256;
    using Address for address payable;

    // Represents an auction on a Golfer
    struct Auction {
        // Current owner of NFT
        address payable seller;
        // Price (in wei) at beginning of auction
        uint256 startingPrice;
        // Price (in wei) at end of auction
        uint256 endingPrice;
        // Duration (in seconds) of auction
        uint256 duration;
        // Time when auction started
        // NOTE: 0 if this auction has been concluded
        uint256 startedAt;
    }

    // Reference to contract tracking NFT ownership
    ArenaGolfNFT public nonFungibleContract;

    // Cut owner takes on each auction, measured in basis points (1/100 of a percent).
    // Values 0-10,000 map to 0%-100%
    uint256 public ownerCut;

    // Map from token ID to their corresponding auction.
    mapping (uint256 => Auction) public tokenIdToAuction;

    event AuctionCreated(uint256 indexed tokenId, uint256 startingPrice, uint256 endingPrice, uint256 duration);
    event AuctionSuccessful(uint256 indexed tokenId, uint256 totalPrice, address indexed winner, bool indexed ethereumPayment);
    event AuctionCancelled(uint256 indexed tokenId);

    // Constructor
    constructor() public {}

    /**
     * @dev Returns true if the claimant owns the token.
     * @param _claimant - Address claiming to own the token.
     * @param _tokenId - ID of token whose ownership to verify.
     */
    function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
        return (nonFungibleContract.ownerOf(_tokenId) == _claimant);
    }

    /**
     * @dev Escrows the NFT, assigning ownership to this contract.
     * Throws if the escrow fails.
     * @param _owner - Current owner address of token to escrow.
     * @param _tokenId - ID of token whose approval to verify.
     */
    function _escrow(address _owner, uint256 _tokenId) internal {
        // it will throw if transfer fails
        nonFungibleContract.safeTransferFrom(_owner, address(this), _tokenId);
    }

    /**
     * @dev Transfers an NFT owned by this contract to another address.
     * Returns true if the transfer succeeds.
     * @param _owner - Address of NFT owner.
     * @param _receiver - Address to transfer NFT to.
     * @param _tokenId - ID of token to transfer.
     */
    function _transfer(address _owner, address _receiver, uint256 _tokenId) internal {
        // it will throw if transfer fails
        nonFungibleContract.transferFrom(_owner, _receiver, _tokenId);
    }

    /**
     * @dev Adds an auction to the list of open auctions. Also fires the
     * AuctionCreated event.
     * @param _tokenId The ID of the token to be put on auction.
     * @param _auction Auction to add.
     */
    function _addAuction(uint256 _tokenId, Auction memory _auction) internal {
        // Require that all auctions have a duration of
        // at least one minute. (Keeps our math from getting hairy!)
        require(_auction.duration >= 1 minutes);

        tokenIdToAuction[_tokenId] = _auction;

        emit AuctionCreated(
            uint256(_tokenId),
            uint256(_auction.startingPrice),
            uint256(_auction.endingPrice),
            uint256(_auction.duration)
        );
    }

    /**
     * @dev Cancels an auction unconditionally.
     */
    function _cancelAuction(uint256 _tokenId, address _seller) internal {
        _removeAuction(_tokenId);
        _transfer(address(this), _seller, _tokenId);
        emit AuctionCancelled(_tokenId);
    }

    /**
     * @dev Computes the price and transfers winnings.
     * Does NOT transfer ownership of token.
     */
    function _bid(uint256 _tokenId, uint256 _bidAmount)
        internal
        returns (uint256)
    {
        // Get a reference to the auction struct
        Auction storage auction = tokenIdToAuction[_tokenId];

        // Explicitly check that this auction is currently live.
        // (Because of how Ethereum mappings work, we can't just count
        // on the lookup above failing. An invalid _tokenId will just
        // return an auction object that is all zeros.)
        require(_isOnAuction(auction));

        // Check that the bid is greater than or equal to the current price
        uint256 price = _currentPrice(auction);
        require(_bidAmount >= price);

        // Grab a reference to the seller before the auction struct
        // gets deleted.
        address payable seller = auction.seller;

        // The bid is good! Remove the auction before sending the fees
        // to the sender so we can't have a reentrancy attack.
        _removeAuction(_tokenId);

        // Transfer proceeds to seller (if there are any!)
        if (price > 0) {
            // Calculate the auctioneer's cut.
            // (NOTE: _computeCut() is guaranteed to return a
            // value <= price, so this subtraction can't go negative.)
            uint256 auctioneerCut = _computeCut(price);
            uint256 sellerProceeds = price - auctioneerCut;

            // NOTE: Doing a sendValue() in the middle of a complex
            // method like this is generally discouraged because of
            // reentrancy attacks and DoS attacks if the seller is
            // a contract with an invalid fallback function. We explicitly
            // guard against reentrancy attacks by removing the auction
            // before calling sendValue(), and the only thing the seller
            // can DoS is the sale of their own asset! (And if it's an
            // accident, they can call cancelAuction(). )
            seller.sendValue(sellerProceeds);
        }

        // Calculate any excess funds included with the bid. If the excess
        // is anything worth worrying about, transfer it back to bidder.
        // NOTE: We checked above that the bid amount is greater than or
        // equal to the price so this cannot underflow.
        uint256 bidExcess = _bidAmount - price;

        // Return the funds. Similar to the previous sendValue, this is
        // not susceptible to a re-entry attack because the auction is
        // removed before any transfers occur.
        msg.sender.sendValue(bidExcess);

        // Tell the world!
        emit AuctionSuccessful(_tokenId, price, msg.sender, true);

        return price;
    }

    /**
     * @dev Removes an auction from the list of open auctions.
     * @param _tokenId - ID of NFT on auction.
     */
    function _removeAuction(uint256 _tokenId) internal {
        delete tokenIdToAuction[_tokenId];
    }


    /**
     * @dev Returns true if the NFT is on auction.
     * @param _auction - Auction to check.
     */
    function _isOnAuction(Auction storage _auction) internal view returns (bool) {
        return (_auction.startedAt > 0);
    }

    /**
     * @dev Returns current price of an NFT on auction. Broken into two
     * functions (this one, that computes the duration from the auction
     * structure, and the other that does the price computation) so we
     * can easily test that the price computation works correctly.
     */
    function _currentPrice(Auction storage _auction)
        internal
        view
        returns (uint256)
    {
        uint256 secondsPassed = 0;

        // A bit of insurance against negative values (or wraparound).
        // Probably not necessary (since Ethereum guarnatees that the
        // now variable doesn't ever go backwards).
        if (now > _auction.startedAt) {
            secondsPassed = now - _auction.startedAt;
        }

        return _computeCurrentPrice(
            _auction.startingPrice,
            _auction.endingPrice,
            _auction.duration,
            secondsPassed
        );
    }

    function _computeCurrentPrice(
        uint256 _startingPrice,
        uint256 _endingPrice,
        uint256 _duration,
        uint256 _secondsPassed
    )
        internal
        pure
        returns (uint256)
    {
        // NOTE: We don't use SafeMath (or similar) in this function because
        //  all of our public functions carefully cap the maximum values for
        //  time (at 64-bits) and currency (at 128-bits). _duration is
        //  also known to be non-zero (see the require() statement in
        //  _addAuction())
        if (_secondsPassed >= _duration) {
            // We've reached the end of the dynamic pricing portion
            // of the auction, just return the end price.
            return _endingPrice;
        } else {
            // Starting price can be higher than ending price (and often is!), so
            // this delta can be negative.
            int256 totalPriceChange = int256(_endingPrice) - int256(_startingPrice);

            // This multiplication can't overflow, _secondsPassed will easily fit within
            // 64-bits, and totalPriceChange will easily fit within 128-bits, their product
            // will always fit within 256-bits.
            int256 currentPriceChange = totalPriceChange * int256(_secondsPassed) / int256(_duration);

            // currentPriceChange can be negative, but if so, will have a magnitude
            // less that _startingPrice. Thus, this result will always end up positive.
            int256 currentPrice = int256(_startingPrice) + currentPriceChange;

            return uint256(currentPrice);
        }
    }

    /**
     * @dev Computes owner's cut of a sale.
     * @param _price - Sale price of NFT.
     */
    function _computeCut(uint256 _price) internal view returns (uint256) {
        // NOTE: We don't use SafeMath (or similar) in this function because
        //  all of our entry functions carefully cap the maximum values for
        //  currency (at 128-bits), and ownerCut <= 10000 (see the require()
        //  statement in the ClockAuction constructor). The result of this
        //  function is always guaranteed to be <= _price.
        return _price * ownerCut / 10000;
    }
} 


/**
 * @title GolferSaleAuction Contract
 * @dev Manages any type of golfer sale auctions
 */
contract GolferSaleAuction is AuctionBase {
    using SafeMath for uint256;
    using Address for address payable;

    // for sale state of all tokens. tokens map to bits. 0 = not for sale; 1 = for sale
    // 256 token states per index of this array
    uint256[] internal allGolferForSaleState;
    uint256 internal currentNumberOfAuctions;

    // Constructor
    constructor() public {
        // Cut of each aftermarket sale that goes to the owner in basis points 1/100
        ownerCut = 350;  // 3.5%
    }

    /**
     * @dev Set the new fee going to the dev per sale
     * @param _newOwnerCut New % cut from 0.00%-100.00% (10000 = 100.00)
     */
    function updateOwnerCut (uint256 _newOwnerCut) external onlyOwner {
        require (_newOwnerCut <= 10000);
        ownerCut = _newOwnerCut;
    }

    /**
     * @dev Cancel an auction
     * @param _tokenId Token IDs of the auction to cancel
     */
    function cancelAuction(uint256 _tokenId)
        external
        anyOperator
    {
        Auction storage auction = tokenIdToAuction[_tokenId];
        require(_isOnAuction(auction));
        _cancelAuction(_tokenId, auction.seller);
    }

    /**
     * @dev Cancel auctions in bulk.
     * @param _tokenIds Array of token IDs on auction to cancel
     */
    function batchCancelAuction(uint256[] calldata _tokenIds)
        external
        anyOperator
    {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            Auction storage auction = tokenIdToAuction[_tokenIds[i]];
            require(_isOnAuction(auction));
            _cancelAuction(_tokenIds[i], auction.seller);
        }
    }

    /**
     * @dev Get the current number of active auctions.
     * @return The current number of active auctions.
     */
    function getCurrentNumberOfAuctions() external view returns(uint256) {
        return currentNumberOfAuctions;
    }

    /**
     * @notice Helper function for the UI
     * @dev Index 0 of the uint256 holds first 256 golfer token status; index 1 is next 256 golfer tokens, etc
     * Bit set to value of 1 = For Sale; 0 = Not for Sale
     * @return uint256[] bitmap values up to max tokenId (for ease of querying from UI for marketplace)
     */
    function getAllForSaleState() external view returns(uint256[] memory) {
        return allGolferForSaleState;
    }

    /**
     * @dev Get the current price of a token being auctioned.
     * @param _tokenId The ID of the token being auctioned.
     */
    function getCurrentPrice(uint256 _tokenId)
        external
        view
        returns (uint256)
    {
        Auction storage auction = tokenIdToAuction[_tokenId];
        require(_isOnAuction(auction));
        return _currentPrice(auction);
    }

    /**
     * @dev Get info about an auction
     * @param _tokenId The ID of the token being auctioned.
     * @return seller - The address selling the token.
     * @return startingPrice - The starting price of the auction (in wei)
     * @return endingPrice - The ending price of the auction (in wei)
     * @return duration - The duration of the auction (in secs)
     * @return startedAt - Time the auction began
     */
    function getAuction(uint256 _tokenId)
        external
        view
        returns
    (
        address seller,
        uint256 startingPrice,
        uint256 endingPrice,
        uint256 duration,
        uint256 startedAt
    ) {
        Auction storage auction = tokenIdToAuction[_tokenId];
        require(_isOnAuction(auction));
        return (
            auction.seller,
            auction.startingPrice,
            auction.endingPrice,
            auction.duration,
            auction.startedAt
        );
    }

    /**
     * @dev Creates and begins a new auction.
     * @param _tokenId - ID of token to auction, sender must be owner.
     * @param _startingPrice - Price of item (in wei) at beginning of auction.
     * @param _endingPrice - Price of item (in wei) at end of auction.
     * @param _duration - Length of auction (in seconds).
     * @param _seller - Seller, if not the message sender
     */
    function createAuction(
        uint256 _tokenId,
        uint256 _startingPrice,
        uint256 _endingPrice,
        uint256 _duration,
        address payable _seller
    )
        public
        whenNotPaused
    {
        require(msg.sender == address(nonFungibleContract));
        _escrow(_seller, _tokenId);
        Auction memory auction = Auction(
            _seller,
            _startingPrice,
            _endingPrice,
            _duration,
            now
        );

        _addAuction(_tokenId, auction);
    }

    /**
     * @dev Bids on an open auction, completing the auction and transferring
     * ownership of the NFT if enough Ether is supplied.
     * @param _tokenId - ID of token to bid on.
     */
    function bid(uint256 _tokenId)
        public
        payable
        whenNotPaused
    {
        // _bid will throw if the bid or funds transfer fails
        _bid(_tokenId, msg.value);
        _transfer(msg.sender, msg.sender, _tokenId);
    }

    /**
     * @dev Adds an auction to the list of open auctions. Also fires the
     * AuctionCreated event. Updates sales state array.
     * @param _tokenId The ID of the token to be put on auction.
     * @param _auction Auction to add.
     */
    function _addAuction(uint256 _tokenId, Auction memory _auction) internal {
        // Require that all auctions have a duration of
        // at least one minute. (Keeps our math from getting hairy!)
        require(_auction.duration >= 1 minutes);

        tokenIdToAuction[_tokenId] = _auction;
        _updateSaleState(_tokenId, true);

        emit AuctionCreated(
            uint256(_tokenId),
            uint256(_auction.startingPrice),
            uint256(_auction.endingPrice),
            uint256(_auction.duration)
        );
    }

    /**
     * @dev Removes an auction from the list of open auctions.
     * Updates sales state array.
     * @param _tokenId - ID of NFT on auction.
     */
    function _removeAuction(uint256 _tokenId) internal {
        _updateSaleState(_tokenId, false);
        delete tokenIdToAuction[_tokenId];
    }

    /**
     * @dev Updates sale state bit in the sale state array
     * @param _tokenId ID of NFT on auction.
     * @param _state True if for sale.
     */
    function _updateSaleState(uint256 _tokenId, bool _state) internal {
        if (_tokenId >= allGolferForSaleState.length) {
            for (uint256 i = allGolferForSaleState.length; i <= _tokenId; i++) {
                if (i % 256 == 0) {
                    // create new golfer sale state entry in storage
                    allGolferForSaleState.push(0);
                }
            }
        }
        if (_state == true) {
            // Item is for sale - set bit
            allGolferForSaleState[_tokenId.div(256)] = allGolferForSaleState[_tokenId.div(256)] | (1 << (_tokenId % 256));
            currentNumberOfAuctions = currentNumberOfAuctions.add(1);
        } else {
            // Item is no longer for sale - clear bit
            allGolferForSaleState[_tokenId.div(256)] = allGolferForSaleState[_tokenId.div(256)] & ~(1 << (_tokenId % 256));
            if (currentNumberOfAuctions > 0) {
                currentNumberOfAuctions = currentNumberOfAuctions - 1;
            }
        }
    }
} 


/**
 * @title GolferFounderAuction Contract
 * @dev Manages the founder golfer sale auctions
 */
contract GolferFounderAuction is GolferSaleAuction {
    using SafeMath for uint256;
    using Address for address payable;

    event LogDepositReceived(address indexed sender, uint256 weiValue);

    bool public isGolferFounderAuction = true;
    uint256 public founderSaleCount;
    uint256[5] public lastFounderSalePriceIndex;
    mapping (uint256 => uint256) public golferAbilityIndex;

    // Constructor
    constructor() public {}

    // Fallback function
    function () external payable {
        require(msg.data.length == 0);
        emit LogDepositReceived(msg.sender, msg.value);
    }

    /**
     * @dev Set the address of the Arena Golf NFT contract
     * @param _arenaGolfNFTAddress Address of the Arena Golf NFT contract
     */
    function setGolferNFTContract(address _arenaGolfNFTAddress) external onlyOwner {
        require (_arenaGolfNFTAddress != address(0));
        nonFungibleContract = ArenaGolfNFT(_arenaGolfNFTAddress);
    }

    /**
     * @dev Allows an operator to create an auction for a new founder golfer.
     * @param _golferAttributes The dna of the golfer
     * @param _golferAbilityIndex The indexed price of the golfer (relative strength)
     * @param _startingPrice The starting price of the auction
     * @param _endingPrice The ending price of the auction
     * @param _duration The duration of the auction (in secs)
     */
    function createFounderAuction(
        uint256 _golferAttributes,
        uint256 _golferAbilityIndex,
        uint256 _startingPrice,
        uint256 _endingPrice,
        uint256 _duration
    )
        external
        anyOperator
        whenNotPaused
    {
        require(address(nonFungibleContract) != address(0));
        uint256 tokenId = nonFungibleContract.mintGolfer(address(this), _golferAttributes);
        Auction memory auction = Auction(
            address(this).toPayable(),
            _startingPrice,
            _endingPrice,
            _duration,
            now
        );

        golferAbilityIndex[tokenId] = _golferAbilityIndex;

        _addAuction(tokenId, auction);
    }

    /**
     * @dev Creates and begins a new auction for an existing golfer token.
     * @param _tokenId - ID of token to auction, sender must be owner.
     * @param _startingPrice - Price of item (in wei) at beginning of auction.
     * @param _endingPrice - Price of item (in wei) at end of auction.
     * @param _duration - Length of auction (in seconds).
     * @param _seller - Seller, if not the message sender
     */
    function createAuction(
        uint256 _tokenId,
        uint256 _startingPrice,
        uint256 _endingPrice,
        uint256 _duration,
        address payable _seller
    )
        public
        anyOperator
        whenNotPaused
    {
        super.createAuction(
            _tokenId,
            _startingPrice,
            _endingPrice,
            _duration,
            _seller
        );
    }

    /**
     * @dev Override bid
     * @param _tokenId - ID of token to bid on.
     */
    function bid(uint256 _tokenId)
        public
        payable
        whenNotPaused
    {
        bidFounderEth(_tokenId);
    }

    /**
     * @dev Purchase a golfer with ethereum.
     * @param _tokenId Token ID of the golfer to be purchased
     */
    function bidFounderEth(uint256 _tokenId)
        public
        payable
        whenNotPaused
    {
        uint256 price = _bid(_tokenId, msg.value);
        _transferFromFounderAuction(msg.sender, _tokenId);

        lastFounderSalePriceIndex[founderSaleCount % 5] = price.mul(1000000000000000000).div(golferAbilityIndex[_tokenId]);
        founderSaleCount++;

        _postPurchaseProcessing(price, 0);
    }

    /**
     * @dev Purchase a golfer with a credit card. The monetary transfer happens
     * off-chain, then the token transaction and accounting gets completed here.
     * @notice Allows an approved operator to proxy credit card sales of golfers
     * @param _tokenId Token ID of the golfer to be purchased
     * @param _toAddress Address of the recipient
     * @param _price Price that was paid by the recipient (in wei)
     */
    function bidFounderCreditCard(uint256 _tokenId, address payable _toAddress, uint256 _price)
        public
        anyOperator
        whenNotPaused
    {
        _removeAuction(_tokenId);
        emit AuctionSuccessful(_tokenId, _price, _toAddress, false);

        _transferFromFounderAuction(_toAddress, _tokenId);

        lastFounderSalePriceIndex[founderSaleCount % 5] = _price.mul(1000000000000000000).div(golferAbilityIndex[_tokenId]);

        founderSaleCount++;

        _postPurchaseProcessing(0, _price);
    }

    /**
     * @dev Get the average founder sale price of the last 5 golfers sold
     * weighted by the original index price of those 5 golfers
     * (which correlates to relative strength of the golfer)
     * @return The average sale price per index point of last 5 golfers
     */
    function averageFounderSalePriceIndex() public view returns (uint256) {
        uint256 sum = 0;
        if (founderSaleCount >= 5) {
            for (uint256 i = 0; i < 5; i++) {
                sum += lastFounderSalePriceIndex[i];
            }
            return sum / 5;
        } else {
            if (founderSaleCount > 0) {
                for (uint256 i = 0; i < founderSaleCount; i++) {
                    sum += lastFounderSalePriceIndex[i];
                }
                return sum / founderSaleCount;
            } else {
                return 0;
            }
        }
    }

    /**
     * @dev Bids on an open auction, completing the auction and transferring
     * ownership of the NFT if enough Ether is supplied.
     * @param _tokenId ID of token to bid on.
     * @param _bidAmount Bid amount in wei
     */
    function _bid(uint256 _tokenId, uint256 _bidAmount)
        internal
        returns (uint256)
    {
        // Get a reference to the auction struct
        Auction storage auction = tokenIdToAuction[_tokenId];

        // Explicitly check that this auction is currently live.
        // (Because of how Ethereum mappings work, we can't just count
        // on the lookup above failing. An invalid _tokenId will just
        // return an auction object that is all zeros.)
        require(_isOnAuction(auction));

        // Check that the bid is greater than or equal to the current price
        uint256 price = _currentPrice(auction);
        require(_bidAmount >= price);

        // The bid is good! Remove the auction before sending the fees
        // to the sender so we can't have a reentrancy attack.
        _removeAuction(_tokenId);

        // Calculate any excess funds included with the bid. If the excess
        // is anything worth worrying about, transfer it back to bidder.
        // NOTE: We checked above that the bid amount is greater than or
        // equal to the price so this cannot underflow.
        uint256 bidExcess = _bidAmount - price;

        // Return the funds. Similar to the previous sendValue, this is
        // not susceptible to a re-entry attack because the auction is
        // removed before any transfers occur.
        msg.sender.sendValue(bidExcess);

        // Tell the world!
        emit AuctionSuccessful(_tokenId, price, msg.sender, true);

        return price;
    }

    /**
     * @dev Transfers a new golfer NFT from the founder auction
     * @param _receiver The address of the recipient
     * @param _tokenId The golfer NFT token to transfer
     */
    function _transferFromFounderAuction(address _receiver, uint256 _tokenId) internal {
        // it will throw if transfer fails        
        nonFungibleContract.transferNewGolfer(address(this), _receiver, _tokenId);
    }

    function _postPurchaseProcessing(uint256 weiAmount, uint256 ccWeiAmount) internal {
        // override this function to perform actions following auction completion
    }
}


/**
 * @title FounderCrowdsale Contract
 * @dev Manages the crowdsale and the proceeds
 */
contract FounderCrowdsale is GolferFounderAuction {
    using SafeMath for uint256;

    bool public isGolferFounderCrowdsale = true;

    address payable public tournamentContract;
    mapping(address => uint256) private deposits;

    uint256 internal ethPrizePotSize;
    uint256 internal ccPrizePotSize;

    // Amount of each new asset sale that goes towards the
    // owners and tournament pot in basis points 1/100
    uint256 internal percentToITAS = 7000;  // 70%
    uint256 internal percentToSecondLegion = 2000;  // 20%
    uint256 internal percentToPot = 1000;  // 10%

    // Amount of sales in wei
    uint256 internal ethSalesInWei;
    uint256 internal ccSalesInWei;
    uint256 internal startTime;
    uint256 internal endTime;
    bool internal reopenState;


    /**
     * @dev Reverts if not in crowdsale time range.
     */
    modifier onlyWhileOpen {
        require(isOpen(), "TimedCrowdsale: not open");
        _;
    }

    // Constructor
    constructor(
        address _GolferNFTContractAddress,
        uint256 _startTime,
        uint256 _endTime
    )
        public
    {
        require(_startTime >= block.timestamp, "TimedCrowdsale: opening time is before current time");
        require(_endTime > _startTime, "TimedCrowdsale: opening time is not before closing time");
        startTime = _startTime;
        endTime = _endTime;
        paused = true;
        reopenState = false;
        ethPrizePotSize = 0;
        ccPrizePotSize = 0;
        nonFungibleContract = ArenaGolfNFT(_GolferNFTContractAddress);
    }

    /**
     * @dev Allows for seeding of the prize pot
     */
    function addMoneyToPot() external payable {
        ethPrizePotSize = ethPrizePotSize.add(msg.value);
    }

    /**
     * @dev Set the address of a tournament contract
     */
    function setTournamentContract(address payable _tournamentContractAddress) external onlyOwner {
        require (_tournamentContractAddress != address(0));
        tournamentContract = _tournamentContractAddress;
    }

    /**
     * @dev Allow a tournament contract operator to pull any amount of prize money
     * from this contract for use in an Arena Golf tournament. Check that the 
     * calling contract has been set as the tournament contract address. If calling
     * contract attempts to pull more money than is currently in the prize pot,
     * transfer the full pot amount.
     */
    function transferPotToTournament(uint256 _amountWei, bool _fullAmount) external onlyOtherOperators {
        require(msg.sender == tournamentContract);
        uint256 amountToTransfer = _amountWei;
        if (_fullAmount) {
            ethPrizePotSize = 0;
            // move contract balance to the tournament contract
            tournamentContract.sendValue(address(this).balance);
        } else {
            if (_amountWei > ethPrizePotSize) {
                // don't transfer more than the pot size
                amountToTransfer = ethPrizePotSize;
            }
            // reduce the prize pot balance by the amount being transferred out
            ethPrizePotSize = ethPrizePotSize.sub(amountToTransfer);
            // move pot to the tournament contract
            tournamentContract.sendValue(amountToTransfer);
        }
    }

    /**
     * @dev Get the total ether portion of sales made during the
     * crowdsale
     * @return ETH portion of sales
     */
    function getEthSalesInWei() external view returns (uint256) {
        return ethSalesInWei;
    }

    /**
     * @dev Get the total credit card portion of sales made during the
     * crowdsale
     * @return Credit card portion of sales
     */
    function getCCSalesInWei() external view returns (uint256) {
        return ccSalesInWei;
    }

    /**
     * @dev Get the golfer sales total in wei. This is the sum of the amount
     * puchased in eth and credit card
     * @return Total sales in wei
     */
    function getTotalSalesInWei() external view returns (uint256) {
        return ethSalesInWei.add(ccSalesInWei);
    }

    /**
     * @dev Get the ether portion of the prize pot stored in this contract.
     * This is only the part of the pot from eth sales.
     * @return ETH portion of prize pot in wei
     */
    function getEthPrizePotSize() external view returns (uint256) {
        // eth portion of prize pot does not include portion from credit card sales
        return ethPrizePotSize;
    }

    /**
     * @dev Get the credit card portion of the prize pot. This is only
     * the part of the pot from credit card sales stored off-chain
     * @return Credit card portion of prize pot in wei
     */
    function getCCPrizePotSize() external view returns (uint256) {
        // CC portion of prize pot does not include portion from eth sales
        return ccPrizePotSize;
    }

    /**
     * @dev Get the total prize pot size. This is the sum of the amount
     * stored in the contract and the credit card amount stored off-chain
     * @return Total prize pot in wei
     */
    function getTotalPrizePotSize() external view returns (uint256) {
        return ethPrizePotSize.add(ccPrizePotSize);
    }

    /**
     * @dev Get the current amount of ether (in wei) stored on the contract
     * @return Contract balance in wei
     */
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    /**
     * @dev Function allowing caller to withdraw their stored deposits
     */
    function withdraw() public {
        uint256 payment = deposits[msg.sender];
        deposits[msg.sender] = 0;
        msg.sender.sendValue(payment);
    }

    /**
     * @dev Owner can send deposits stored in an address to that recipient
     */
    function withdrawOwner(address payable _recipient) public onlyOwner {
        uint256 payment = deposits[_recipient];
        deposits[_recipient] = 0;
        _recipient.sendValue(payment);
    }

    /**
     * @dev Allows the contract owner to reopen the crowdsale functionality
     * after it has ended.
     */
    function reopen(bool _state) public onlyOwner {
        require (hasClosed());
        reopenState = _state;
    }

    /**
     * @dev Get the start time of the crowdsale. No purchases can be
     * made before this time.
     * @return The crowdsale opening time.
     */
    function getStartTime() public view returns (uint256) {
        return startTime;
    }

    /**
     * @dev Get the end time of the crowdsale. No purchases can be
     * made after this time.
     * @return The crowdsale closing time.
     */
    function getEndTime() public view returns (uint256) {
        return endTime;
    }

    /**
     * @return True if the crowdsale is open, false otherwise.
     */
    function isOpen() public view returns (bool) {
        return ((block.timestamp >= startTime && block.timestamp <= endTime) || reopenState);
    }

    /**
     * @dev Checks whether the period in which the crowdsale is open has already elapsed.
     * @return Whether crowdsale period has elapsed
     */
    function hasClosed() public view returns (bool) {
        return block.timestamp > endTime;
    }

    /**
     * @dev Add to total eth sales and split proceeds between the prize pot and owner wallets
     */
    function _postPurchaseProcessing(uint256 weiAmount, uint256 ccWeiAmount) internal onlyWhileOpen {
        if (weiAmount > 0) {
            ethSalesInWei = ethSalesInWei.add(weiAmount);
            deposits[ITASWallet] = deposits[ITASWallet].add(weiAmount.mul(percentToITAS).div(10000));
            deposits[SecondLegionWallet] = deposits[SecondLegionWallet].add(weiAmount.mul(percentToSecondLegion).div(10000));
            ethPrizePotSize = ethPrizePotSize.add(weiAmount.mul(percentToPot).div(10000));
        }
        if (ccWeiAmount > 0) {
            ccSalesInWei = ccSalesInWei.add(ccWeiAmount);
            ccPrizePotSize = ccPrizePotSize.add(ccWeiAmount.mul(percentToPot).div(10000));
        }
    }
}