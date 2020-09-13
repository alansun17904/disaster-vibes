pragma solidity ^0.4.4;

import "InsurCoin.sol";

/**
 * @title Insurance
 */
contract Insurance is InsurCoin {
    address public id;
    address private insurer;
    address private insured;
    string private location;
    uint private collateralPercentage;
    uint private collateral;
    uint premium;
    uint payout;
    int32 rainfallThreshold;
    bool claimable;
    bool premiumCheck;
    bool claimCheck;
    uint creationTime;
    
    enum State { Locked, Inactive, Active, Created }
    State public state;
    
    // modifier to check if caller is insurer
    modifier isInsurer() {
        require(msg.sender == insurer, "Caller is not insurer.");
        _;
    }
    
    // modifier to check if caller is insured
    modifier isInsured() {
        require(msg.sender == insured, "Caller is not insured.");
        _;
    }
    
    modifier isBothParties() {
        require((msg.sender == insurer) || (msg.sender == insured), 
                "You are not the insurer, neither are you the insured party.");
        _;
    }

    /**
     * @dev Set contract deployer as owner
     */
    constructor(address _insured, address _insurer, string memory _location,
                int32 _rainfallThreshold, uint _premium, uint _payout, uint _collateralPercentage) public {
        // If the insurer cannot pay the collateral then the contract cannot be constructed.
        require(
            balances[_insurer] >= _payout * _collateralPercentage / 100,
            "The insurer does not have enough in their account to pay the deposit/collateral."
        );
        require(
            balances[_insured] >= _premium,
            "The insured does not have enough in their account to pay the initial premium."
        );
        insured = _insured;
        insurer = _insurer;
        location = _location;
        premium = _premium;
        payout = _payout;
        collateralPercentage = _collateralPercentage;
        collateral = payout * collateralPercentage / 100;
        creationTime = now;
        state = State.Created;
        claimable = false;
        premiumCheck = false;
        claimCheck = false;
        rainfallThreshold = _rainfallThreshold;
        balances[insurer] -= collateral;
    }
    
    function setState(State s) public isBothParties {
        state = s;
    }
    
    function getInsurer() public isBothParties view returns (address) {
        return (insurer);
    }
    
    function getInsured() public isBothParties view returns (address) {
        return (insured);
    }
    
    function getLocation() public isBothParties view returns (string memory) {
        return (location);
    }
    
    function getCollateral() public isBothParties view returns (uint) {
        return (collateral);
    }
    
    function setClaimable(bool _claimable) public isBothParties {
        claimable = _claimable;
    }
    
    function claim() public isInsured {
        require(
            claimCheck == false,
            "The claim has already been claimed"
        );
        require(
            state == State.Active,
            "This contract is not active."
        );
        require(
            claimable == true,
            "The conditions of this contract are not met yet."
        );
        if (transferFrom(insurer, msg.sender, payout)) {
            claimCheck = true;
            returnCollateral();
            state = State.Locked;
        } else {
            balances[insured] += collateral;
        }
    }
    
    function payOutPremium() public isInsurer {
        require(
            premiumCheck == false,
            "The premium has already been payed."
        );
        require(
            state == State.Active,
            "This contract is not active"
        );
        require(
            claimable == false,
            "The conditions for claiming are met; therefore there will be no premiums outputted."
        );
        if (transferFrom(insured, msg.sender, premium)) {
            premiumCheck = true;
            returnCollateral();
            state = State.Locked;
        }
    }
    
    function returnCollateral() public isInsurer {
        require(
            state != State.Locked,
            "This contract is closed."
        );
        require(
            state == State.Inactive,
            "This contract is still active"
        );
        require(
            claimable == false,
            "The conditions for claiming are met; therefore the collateral + any additional payments have been forwarded to the insured party."
        );
        require(
            premiumCheck || claimCheck,
            "One party still needs to claim / pay their dues before collateral can be refunded."
        );
        state = State.Locked;
        balances[insurer] += collateral;
    }
}
