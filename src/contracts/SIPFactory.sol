// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./AutomateTaskCreator.sol";
import "./Host.sol";

contract SIPFactory is AutomateTaskCreator {
    uint256 public count;
    bytes32 public taskId;

    uint256 public constant INTERVAL = 5 minutes;
    event CounterTaskCreated(bytes32 taskId);
    address[] public deployedSIPContracts;

    constructor(
        address _automate,
        address _fundsOwner
    ) AutomateTaskCreator(_automate, _fundsOwner) {}

    receive() external payable {}

    function getDeployedSIPContracts()
        external
        view
        returns (address[] memory)
    {
        return deployedSIPContracts;
    }

    function createSIP(address _tokenIn, address _tokenOut) external {
        SimpleBuyerContract newContract = new SimpleBuyerContract(
            msg.sender,
            _tokenOut,
            _tokenIn
        );
        deployedSIPContracts.push(address(newContract));

        bytes memory execData = abi.encodeCall(newContract.buyPerodically, ());

        ModuleData memory moduleData = ModuleData({
            modules: new Module[](2),
            args: new bytes[](2)
        });
        moduleData.modules[0] = Module.TIME;
        moduleData.modules[1] = Module.PROXY;

        moduleData.args[0] = _timeModuleArg(block.timestamp, INTERVAL);
        moduleData.args[1] = _proxyModuleArg();

        bytes32 id = _createTask(
            address(newContract),
            execData,
            moduleData,
            address(0)
        );

        taskId = id;
        emit CounterTaskCreated(id);
    }

    function depositForCounter() external payable {
        _depositFunds(msg.value, ETH);
    }
}
