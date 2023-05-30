// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./AutomateTaskCreator.sol";
import "./socket.sol";

contract SocketBuyerFactory is AutomateTaskCreator {
    uint256 public lastExecuted;
    bytes32 public taskId;

    event TaskCreated(bytes32 taskId);
    address[] public deployedSocketContracts;

    constructor(address _automate) AutomateTaskCreator(_automate, msg.sender) {}

    receive() external payable {}

    function getDeployedSocketContracts()
        external
        view
        returns (address[] memory)
    {
        return deployedSocketContracts;
    }

    function depositToGelatotreasury() external payable {
        _depositFunds(msg.value, ETH);
    }

    function createTask(
        address _tokenIn,
        address _tokenOut,
        uint256 _amount
    ) external {
        socketBuyer newContract = new socketBuyer(
            msg.sender,
            _tokenOut,
            _tokenIn,
            _amount
        );
        deployedSocketContracts.push(address(newContract));
        ModuleData memory moduleData = ModuleData({
            modules: new Module[](2),
            args: new bytes[](2)
        });

        moduleData.modules[0] = Module.RESOLVER;
        moduleData.modules[1] = Module.PROXY;

        moduleData.args[0] = _resolverModuleArg(
            address(newContract),
            abi.encodeCall(newContract.checker, ())
        );
        moduleData.args[1] = _proxyModuleArg();

        bytes32 id = _createTask(
            address(newContract),
            abi.encode(newContract.buyImmediately.selector),
            moduleData,
            address(0)
        );

        taskId = id;
        emit TaskCreated(id);
    }
}
