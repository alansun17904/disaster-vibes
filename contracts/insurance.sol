pragma solidity >=0.4.22 <0.7.0;


/**
 * @title Insurance
 */
contract Insurance {
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
        require(msg.sender == insurer, "Caller is not insured.");
        _;
    }
    
    modifier isBothParties() {
        require((msg.sender == insurer) || (msg.sender == insured), 
                "You are not the insurer, neither are you the insured party.");
        _;
    }

    event PayToInsured(address indexed insurerWallet, address indexed insuredWallet,
                       uint amount);
    event PayToInsurer(address indexed insurerWallet, address indexed insuredWallet,
                       uint amount);

    /**
     * @dev Set contract deployer as owner
     */
    constructor(address _insured, address _insurer, string memory _location,
                int32 _rainfallThreshold, uint _premium, uint _payout, uint _collateralPercentage) public {
        insured = _insured;
        insurer = _insurer;
        location = _location;
        premium = _premium;
        payout = _payout;
        collateralPercentage = _collateralPercentage;
        creationTime = now;
        state = State.Created;
        claimable = false;
        rainfallThreshold = _rainfallThreshold;
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
    
    function claim() public isInsured {
        require(
            state == State.Active,
            "This contract is not active."
        );
        require(
            claimable == true,
            "The conditions of this contract are not met yet."
        );
        emit PayToInsured(insurer, insured, payout);
    }
    
    function payOutPremium() public isInsurer {
        require(
            state == State.Active,
            "This contract is not active"
        );
        require(
            claimable == false,
            "The conditions for claiming are met; therefore there will be no premiums outputted."
        );
        emit PayToInsurer(insurer, insured, premium);
    }
    
    // function collectCollateral() payable public isInsurer {
    //     require(
    //         msg.value >= collateralPercentage * payout,
    //         "The amount of collateral that you paid is not enough to cover the "
    //     );
        
    // }
}
