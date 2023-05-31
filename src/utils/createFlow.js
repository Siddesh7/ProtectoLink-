import { ethers } from "ethers";

export function calculateFlowRate(amount) {
  if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
    alert("You can only calculate a flowRate based on a number");
    return;
  } else if (typeof Number(amount) === "number") {
    if (Number(amount) === 0) {
      return 0;
    }
    const amountInWei = ethers.BigNumber.from(amount);
    const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
    const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
    return calculatedFlowRate;
  }
}
