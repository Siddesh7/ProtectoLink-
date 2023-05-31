import React, { useState } from "react";

const buyingTokens: string[] = ["Demo Token", "FUSDT"];
const buyingTokensAddresses: string[] = [
  "0xefA725A5df23b6836EE9660Af6477D664BB0818B",
  "0x9BCA8aC4e7ae4868A19ff7d9EC75524F0078297e",
];
const sellingTokens: string[] = ["FDAIX"];
const sellingTokensAddresses: string[] = [
  "0x5d8b4c2554aeb7e86f387b4d6c00ac33499ed01f",
];
interface Props {
  buy: (
    buyToken: string,
    sellToken: string,
    numberOfTokens: number | null,
    frequency: number | null
  ) => void;
  loading: any;
}
const days: number[] = [7, 14, 30, 60];

const SIPForm: React.FC<Props> = ({ buy, loading }) => {
  const [selectedBuyingToken, setSelectedBuyingToken] = useState<string>("");
  const [selectedNumberOfTokens, setSelectedNumberOfTokens] = useState<
    number | null
  >(null);
  const [selectedSellingToken, setSelectedSellingToken] = useState<string>("");
  const [selectedFrequency, setSelectedFrequency] = useState<number | null>(
    null
  );

  const handleBuyingTokenChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedBuyingToken(event.target.value);
  };

  const handleNumberOfTokensChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedNumberOfTokens(parseInt(event.target.value));
  };

  const handleSellingTokenChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedSellingToken(event.target.value);
  };

  const handleFrequencyChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const selectedDays = parseInt(event.target.value);
    const seconds = !isNaN(selectedDays) ? selectedDays * 24 * 60 * 60 : null;
    setSelectedFrequency(seconds);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    buy(
      selectedBuyingToken,
      selectedSellingToken,
      selectedNumberOfTokens,
      selectedFrequency
    );
    // Perform your desired action with the form values
    console.log(
      `I want to buy ${selectedBuyingToken} token for ${selectedNumberOfTokens} ${selectedSellingToken} every ${selectedFrequency} days`
    );
  };

  return (
    <div className="card w-full bg-neutral text-neutral-content">
      <div className="card-body items-center text-center">
        <div className="flex justify-center">
          <form className="flex items-center" onSubmit={handleSubmit}>
            <p className="mr-2">I want to buy</p>

            <select
              id="buyingToken"
              name="buyingToken"
              className="mr-2 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 text-black"
              value={selectedBuyingToken}
              onChange={handleBuyingTokenChange}
            >
              <option value="">Select a token to buy</option>
              {buyingTokens.map((token, index) => (
                <option key={index} value={buyingTokensAddresses[index]}>
                  {token}
                </option>
              ))}
            </select>

            <span className="mr-2">token for</span>

            <input
              type="number"
              className="mr-2 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 text-black"
              value={
                selectedNumberOfTokens !== null
                  ? selectedNumberOfTokens.toString()
                  : ""
              }
              onChange={handleNumberOfTokensChange}
              placeholder="Number of tokens"
            />

            <select
              id="sellingToken"
              name="sellingToken"
              className="mr-2 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 text-black"
              value={selectedSellingToken}
              onChange={handleSellingTokenChange}
            >
              <option value="">Select a token to sell</option>
              {sellingTokens.map((token, index) => (
                <option key={index} value={sellingTokensAddresses[index]}>
                  {token}
                </option>
              ))}
            </select>

            <span className="mr-2">every</span>

            <select
              id="frequency"
              name="frequency"
              className="mr-2 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-indigo-500 text-black"
              value={
                selectedFrequency !== null
                  ? selectedFrequency / (24 * 60 * 60)
                  : ""
              }
              onChange={handleFrequencyChange}
            >
              <option value="">Select a frequency</option>
              {days.map((day, index) => (
                <option key={index} value={day}>
                  {day} days
                </option>
              ))}
            </select>

            <span>days</span>

            {!loading ? (
              <button
                type="submit"
                className={`ml-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 ${
                  !selectedBuyingToken ||
                  selectedNumberOfTokens === null ||
                  !selectedSellingToken ||
                  selectedFrequency === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled
              >
                Create SIP
              </button>
            ) : (
              <button
                type="submit"
                className={`ml-4 py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 ${
                  !selectedBuyingToken ||
                  selectedNumberOfTokens === null ||
                  !selectedSellingToken ||
                  selectedFrequency === null
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={
                  !selectedBuyingToken ||
                  selectedNumberOfTokens === null ||
                  !selectedSellingToken ||
                  selectedFrequency === null
                }
              >
                Create SIP
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SIPForm;
