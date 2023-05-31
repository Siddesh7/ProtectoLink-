# Glacier | Zapier of DeFi
## Version 0.0.1

Investing in Cryptocurrencies in a sense is risky and it is also difficult to understand DeFi Jargon, Glacier tries to solve both of these by offering gasless defi experience powered by Gelato Network Relay. To make investing even more compounding, Superfluid money streams are used to buy token reguraly.

*Glacier* offers 3 products
1. Glacier Portfolio Rebalancer - Automatically swaps tokens based on predefined logic using Gelato Automation and Uniswap

2. Glacier SIP - Offers systematic buying experience without head work.
3. Glacier Triggers - Set trigger to do actions, set buy token action when you receive a token.

Contracts are deployed in Polygon Mumbai
```
 SIPFactory: "0xFF42b61c2b525ce8D53928256B65b8158852FB4C",
 RebalancerFactory: "0x9B4fd31d624a975D65182f7a9786b0F14a461f9b",
 SocketFactory: "0x87A5A2E29cB8DB7D7622CFc2A01478C92049E5f7",
```

Glacier uses Gasless transaction using Gelato Network Relay and 1balance. Gelato Automation is used to trigger functions in the contract.
Superfluid money streams are used for SIP usecase to dollar cost average buying tokens.
