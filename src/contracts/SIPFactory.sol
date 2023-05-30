// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./AutomateTaskCreator.sol";
import "./sip.sol";

contract SIPFactory is AutomateTaskCreator {
    bytes32 public taskId;
    event TaskCreated(bytes32 taskId);
    address[] public deployedSIPContracts;

    constructor(address _automate) AutomateTaskCreator(_automate, msg.sender) {}

    receive() external payable {}

    function getDeployedSIPContracts()
        external
        view
        returns (address[] memory)
    {
        return deployedSIPContracts;
    }

    function depositToGelatotreasury() external payable {
        _depositFunds(msg.value, ETH);
    }

    function createSIP(
        address _tokenIn,
        address _tokenOut,
        uint256 interval
    ) external returns (address) {
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

        return address(newContract);
    }
}
