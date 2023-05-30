// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./rebalancer.sol";
import "./AutomateTaskCreator.sol";

contract PortfolioRebalancerFactory is AutomateTaskCreator {
    address[] public deployedContracts;
    address public immutable owner;
    bytes32 public taskId;
    event TaskCreated(bytes32 taskId);

    constructor(address _automate) AutomateTaskCreator(_automate, msg.sender) {
        owner = msg.sender;
    }

    function depositToGelatotreasury() external payable {
        _depositFunds(msg.value, ETH);
    }

    receive() external payable {}

    function createPortfolioRebalancer(
        address[] memory tokenAddresses,
        uint256[] memory targetWeights,
        address[] memory priceFeedAddresses,
        uint256 portfolioValue,
        uint256 interval
    ) external {
        PortfolioRebalancer newContract = new PortfolioRebalancer(
            tokenAddresses,
            targetWeights,
            priceFeedAddresses,
            portfolioValue
        );
        deployedContracts.push(address(newContract));
        bytes memory execData = abi.encodeCall(newContract.rebalance, ());

        ModuleData memory moduleData = ModuleData({
            modules: new Module[](2),
            args: new bytes[](2)
        });
        moduleData.modules[0] = Module.TIME;
        moduleData.modules[1] = Module.PROXY;

        moduleData.args[0] = _timeModuleArg(block.timestamp, interval);
        moduleData.args[1] = _proxyModuleArg();

        bytes32 id = _createTask(
            address(newContract),
            execData,
            moduleData,
            address(0)
        );

        taskId = id;
        emit TaskCreated(id);
    }

    function getDeployedContracts() external view returns (address[] memory) {
        return deployedContracts;
    }
}
