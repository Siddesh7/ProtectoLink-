// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@uniswap/v3-periphery/contracts/libraries/TransferHelper.sol";
import "@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PortfolioRebalancer {
    struct TokenInfo {
        address tokenAddress;
        uint256 targetWeight; // Target weight in percentage (e.g., 30%)
        AggregatorV3Interface priceFeed; // Chainlink price feed for the token
    }

    address public owner;
    TokenInfo[] public tokens;
    uint256 public totalPortfolioValue;
    ISwapRouter public immutable swapRouter;
    uint24 public constant poolFee = 3000;
    address public constant FUSDT = 0x9BCA8aC4e7ae4868A19ff7d9EC75524F0078297e;
    address public constant DT = 0xefA725A5df23b6836EE9660Af6477D664BB0818B;

    constructor(
        address _owner,
        address[] memory tokenAddresses,
        uint256[] memory targetWeights,
        address[] memory priceFeedAddresses,
        uint256 portfolioValue
    ) payable {
        owner = _owner;
        swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
        require(
            tokenAddresses.length > 0,
            "At least one token should be provided"
        );
        require(
            tokenAddresses.length == targetWeights.length &&
                tokenAddresses.length == priceFeedAddresses.length,
            "Token addresses, weights, and price feeds mismatch"
        );

        uint256 totalWeight;
        for (uint256 i = 0; i < tokenAddresses.length; i++) {
            require(tokenAddresses[i] != address(0), "Invalid token address");
            require(
                targetWeights[i] > 0,
                "Target weight should be greater than 0"
            );
            require(
                priceFeedAddresses[i] != address(0),
                "Invalid price feed address"
            );

            totalWeight += targetWeights[i];
            tokens.push(
                TokenInfo({
                    tokenAddress: tokenAddresses[i],
                    targetWeight: targetWeights[i],
                    priceFeed: AggregatorV3Interface(priceFeedAddresses[i])
                })
            );
        }

        require(totalWeight <= 100, "Total target weight exceeds 100%");

        totalPortfolioValue = portfolioValue;
    }

    receive() external payable {}

    modifier onlyOwner() {
        require(msg.sender == owner, "Caller is not the owner");
        _;
    }

    function rebalance() external {
        uint256 totalWeight;
        address[] memory tokenAddresses = new address[](tokenCount());

        // Calculate total weight and collect token addresses
        for (uint256 i = 0; i < tokenCount(); i++) {
            address tokenAddress = getTokenAddress(i);
            tokenAddresses[i] = tokenAddress;
            totalWeight += tokens[i].targetWeight;
        }

        require(
            totalPortfolioValue > 0,
            "Total portfolio value should be greater than 0"
        );

        // Perform selling for all tokens first
        for (uint256 i = 0; i < tokenCount(); i++) {
            address tokenAddress = tokenAddresses[i];
            IERC20 token = IERC20(tokenAddress);
            uint256 balance = token.balanceOf(address(this));
            uint256 tokenPrice = getTokenPrice(i);
            uint256 balanceValue = (balance / 1e18) * tokenPrice;
            uint256 targetValue = (totalPortfolioValue *
                tokens[i].targetWeight) / 100;

            if (balanceValue > targetValue) {
                // Calculate the surplus in dollars
                uint256 surplus = balanceValue - targetValue;

                // Calculate the amount of tokens to sell based on the token's price in dollars
                uint256 sellAmount = (surplus) / tokenPrice;

                // Sell tokens
                if (sellAmount > 0) {
                    sellTokens(tokenAddress, FUSDT, sellAmount);
                }
            }
        }

        // Perform buying for all tokens after selling is completed
        for (uint256 i = 0; i < tokenCount(); i++) {
            address tokenAddress = tokenAddresses[i];
            IERC20 token = IERC20(tokenAddress);
            uint256 balance = token.balanceOf(address(this));
            uint256 tokenPrice = getTokenPrice(i);
            uint256 balanceValue = (balance / 1e18) * tokenPrice;
            uint256 targetValue = (totalPortfolioValue *
                tokens[i].targetWeight) / 100;

            if (balanceValue < targetValue) {
                // Calculate the deficit in dollars
                uint256 deficit = targetValue - balanceValue;

                // Calculate the amount of tokens to buy based on the token's price in dollars
                uint256 buyAmount = (deficit) / tokenPrice;

                // Buy tokens
                if (buyAmount > 0) {
                    buyTokens(FUSDT, tokenAddress, buyAmount);
                }
            }
        }
    }

    function addToken(
        address tokenAddress,
        uint256 targetWeight,
        address priceFeedAddress
    ) external onlyOwner {
        require(tokenAddress != address(0), "Invalid token address");
        require(targetWeight > 0, "Target weight should be greater than 0");
        require(priceFeedAddress != address(0), "Invalid price feed address");

        uint256 totalWeight;
        for (uint256 i = 0; i < tokenCount(); i++) {
            totalWeight += tokens[i].targetWeight;
        }

        require(
            totalWeight + targetWeight <= 100,
            "Total target weight exceeds 100%"
        );

        tokens.push(
            TokenInfo({
                tokenAddress: tokenAddress,
                targetWeight: targetWeight,
                priceFeed: AggregatorV3Interface(priceFeedAddress)
            })
        );
    }

    function removeToken(address tokenAddress) external onlyOwner {
        for (uint256 i = 0; i < tokenCount(); i++) {
            if (tokens[i].tokenAddress == tokenAddress) {
                tokens[i] = tokens[tokenCount() - 1];
                tokens.pop();
                return;
            }
        }

        revert("Token address not found");
    }

    function tokenCount() public view returns (uint256) {
        return tokens.length;
    }

    function getTokenAddress(uint256 index) public view returns (address) {
        require(index < tokenCount(), "Index out of range");

        return tokens[index].tokenAddress;
    }

    function getTokenTargetWeight(uint256 index) public view returns (uint256) {
        require(index < tokenCount(), "Index out of range");

        return tokens[index].targetWeight;
    }

    function getTokenPrice(uint256 index) public view returns (uint256) {
        require(index < tokenCount(), "Index out of range");

        (, int256 price, , , ) = tokens[index].priceFeed.latestRoundData();
        require(price > 0, "Invalid price");
        int256 priceRounded = price / 100000000;
        return uint256(priceRounded);
    }

    function depositTokens() external returns (uint256[] memory) {
        require(tokenCount() > 0, "No tokens added to the portfolio");
        require(totalPortfolioValue > 0, "Portfolio value not set");

        uint256[] memory targetDeposits = new uint256[](tokenCount()); // Initialize targetDeposits array

        for (uint256 i = 0; i < tokenCount(); i++) {
            address tokenAddress = getTokenAddress(i);
            IERC20 token = IERC20(tokenAddress);
            uint256 tokenPrice = getTokenPrice(i);
            uint256 targetValue = (totalPortfolioValue *
                tokens[i].targetWeight) / 100;
            uint256 targetDeposit = (targetValue * 1e18) / tokenPrice;
            targetDeposits[i] = targetDeposit; // Store the targetDeposit value in the array
            require(
                token.balanceOf(msg.sender) >= targetDeposit,
                "Not sufficient balance"
            );
            token.transferFrom(msg.sender, address(this), targetDeposit);
        }

        return targetDeposits;
    }

    function buyTokens(
        address _from,
        address _to,
        uint256 _value
    ) internal returns (uint256 amountOut) {
        TransferHelper.safeApprove(address(this), address(swapRouter), _value);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: _from,
                tokenOut: _to,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: _value,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }

    function sellTokens(
        address _from,
        address _to,
        uint256 _value
    ) internal returns (uint256 amountOut) {
        TransferHelper.safeApprove(address(this), address(swapRouter), _value);
        ISwapRouter.ExactInputSingleParams memory params = ISwapRouter
            .ExactInputSingleParams({
                tokenIn: _from,
                tokenOut: _to,
                fee: poolFee,
                recipient: address(this),
                deadline: block.timestamp,
                amountIn: _value,
                amountOutMinimum: 0,
                sqrtPriceLimitX96: 0
            });

        amountOut = swapRouter.exactInputSingle(params);
    }

    function withdrawTokens() external onlyOwner {
        for (uint256 i = 0; i < tokenCount(); i++) {
            address tokenAddress = getTokenAddress(i);
            IERC20 token = IERC20(tokenAddress);
            uint256 balance = token.balanceOf(address(this));
            token.transfer(owner, balance);
        }
    }
}
