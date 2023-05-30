// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.6;
pragma abicoder v2;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";

contract socketBuyer {
    address public owner;
    address public targetTokenAddress;
    address public tokenAddress;
    ISwapRouter public immutable swapRouter;
    uint24 public constant poolFee = 3000;
    bool status;
    uint256 amountToBuy;

    constructor(
        address _owner,
        address _tokenOut,
        address _tokenIn,
        uint256 _amount
    ) {
        owner = _owner;
        status = true;
        tokenAddress = _tokenIn;
        targetTokenAddress = _tokenOut;
        amountToBuy = _amount * 1e18;
        swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
    }

    receive() external payable {}

    function buyImmediately() external returns (uint256 amountOut) {
        // msg.sender must approve this contract
        TransferHelper.safeTransferFrom(
            tokenAddress,
            owner,
            address(this),
            amountToBuy
        );

        TransferHelper.safeApprove(
            tokenAddress,
            address(swapRouter),
            amountToBuy
        );
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: tokenAddress,
                tokenOut: targetTokenAddress,
                fee: poolFee,
                recipient: owner,
                deadline: block.timestamp,
                amountIn: amountToBuy,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }

    function withdraw() public returns (bool success) {
        require(msg.sender == owner, "You cannot withdraw!");

        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(address(this));
        if (balance > 0) {
            token.transfer(owner, balance);
        }

        IERC20 targetToken = IERC20(targetTokenAddress);
        uint256 targetBalance = targetToken.balanceOf(address(this));
        if (targetBalance > 0) {
            targetToken.transfer(owner, targetBalance);
        }

        return true;
    }

    function checker()
        external
        view
        returns (bool canExec, bytes memory execPayload)
    {
        IERC20 token = IERC20(tokenAddress);
        uint256 balance = token.balanceOf(owner);
        canExec = (balance >= amountToBuy);

        execPayload = abi.encodeCall(this.buyImmediately, ());
    }
}
