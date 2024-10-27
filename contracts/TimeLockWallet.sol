// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TimeLockWallet {
    // Fee collector address
    address public constant FEE_COLLECTOR = 0x0788AcB08De2f55b7f2086d1F45478A926921E29;
    // Fee percentage (100 = 1%, 1000 = 10%)
    uint256 public constant FEE_BASIS_POINTS = 100; // 1% fee
    uint256 public constant BASIS_POINTS = 10000; // 100%
    
    // Struct to hold lock details
    struct Lock {
        uint256 amount;
        uint256 releaseTime;
        address recipient;
        bool withdrawn;
        bytes32 blockHash;
        uint256 blockNumber;
        uint256 timestamp;     
        address sender;        
    }
    
    // Mapping to store multiple locks
    mapping(uint256 => Lock) public locks;
    uint256 public nextLockId;

    // Events
    event FundsLocked(uint256 indexed lockId, address indexed sender, address indexed recipient, uint256 amount, uint256 releaseTime, bytes32 blockHash, uint256 blockNumber, uint256 timestamp);   
    event FundsWithdrawn(uint256 indexed lockId, address indexed recipient, uint256 amount, uint256 fee);
    event FeeCollected(uint256 indexed lockId, uint256 feeAmount);

    modifier validLock(uint256 lockId) {
        require(lockId < nextLockId, "TimeLockWallet: invalid lock id");
        require(!locks[lockId].withdrawn, "TimeLockWallet: funds already withdrawn");
        _;
    }

    /**
     * @notice Locks funds for a specific recipient
     * @param recipient Address that can withdraw the funds
     * @param releaseTime Timestamp when funds can be withdrawn
     * @return lockId Unique identifier for this lock
     */
    function lockFunds(address recipient, uint256 releaseTime) 
        external 
        payable 
        returns (uint256 lockId) 
    {
        require(recipient != address(0), "TimeLockWallet: recipient is zero address");
        require(msg.value > 0, "TimeLockWallet: amount must be greater than zero");
        require(releaseTime > block.timestamp, "TimeLockWallet: release time must be in future");

        lockId = nextLockId++;
        locks[lockId] = Lock({
            amount: msg.value,
            releaseTime: releaseTime,
            recipient: recipient,
            withdrawn: false,
            blockHash: blockhash(block.number),
            blockNumber: block.number,
            timestamp: block.timestamp,
            sender: msg.sender
        });

        emit FundsLocked(
            lockId, 
            msg.sender, 
            recipient, 
            msg.value, 
            releaseTime, 
            blockhash(block.number), 
            block.number,
            block.timestamp
        );    
        
    }

    /**
     * @notice Gets details of a specific lock
     * @param lockId The ID of the lock
     * @return amount The locked amount
     * @return releaseTime The timestamp when funds can be withdrawn
     * @return recipient The address that can withdraw the funds
     * @return withdrawn Whether the funds have been withdrawn
     * @return blockHash The block hash when the lock was created
     * @return blockNumber The block number when the lock was created
     */
    function getLockDetails(uint256 lockId) 
        external 
        view 
        returns (
            uint256 amount,
            uint256 releaseTime,
            address recipient,
            bool withdrawn,
            bytes32 blockHash,
            uint256 blockNumber,
            uint256 timestamp,
            address sender
        ) 
    {
        require(lockId < nextLockId, "TimeLockWallet: invalid lock id");
        Lock storage lock = locks[lockId];
        return (
            lock.amount,
            lock.releaseTime,
            lock.recipient,
            lock.withdrawn,
            lock.blockHash,
            lock.blockNumber,
            lock.timestamp,
            lock.sender
        );
    }

    function withdraw(uint256 lockId) external validLock(lockId) {
        Lock storage lock = locks[lockId];
        require(msg.sender == lock.recipient, "TimeLockWallet: caller is not the recipient");
        require(block.timestamp >= lock.releaseTime, "TimeLockWallet: release time not reached");

        lock.withdrawn = true;
        uint256 amount = lock.amount;
        
        // Calculate fee
        uint256 feeAmount = (amount * FEE_BASIS_POINTS) / BASIS_POINTS;
        uint256 recipientAmount = amount - feeAmount;

        // Send fee to collector
        if (feeAmount > 0) {
            (bool feeSuccess, ) = FEE_COLLECTOR.call{value: feeAmount}("");
            require(feeSuccess, "TimeLockWallet: fee transfer failed");
            emit FeeCollected(lockId, feeAmount);
        }

        // Send remaining amount to recipient
        (bool success, ) = lock.recipient.call{value: recipientAmount}("");
        require(success, "TimeLockWallet: transfer failed");

        emit FundsWithdrawn(lockId, lock.recipient, recipientAmount, feeAmount);
    }

    function calculateFee(uint256 amount) public pure returns (uint256) {
        return (amount * FEE_BASIS_POINTS) / BASIS_POINTS;
    }

    function getBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getLocksCount() external view returns (uint256) {
        return nextLockId;
    }
}