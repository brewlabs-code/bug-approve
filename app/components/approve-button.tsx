"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { useApproveSpend } from "@/app/hooks/useApproveSpend";

import { erc20Abi } from "viem";
import { useReadContract } from "wagmi";

const ApproveButton = () => {
  const { status, chain } = useAccount();
  const [amount, setAmount] = useState("");

  const [tokenAddress, setTokenAddress] = useState(
    "0xdac17f958d2ee523a2206206994597c13d831ec7"
  );

  // Spender is Brew MP on Ethereum
  const [spenderAddress, setSpenderAddress] = useState(
    "0x42765B74Ac590281dCDadcD72C6d7448761Cfcf5"
  );

  const { triggerApprove, isApprovalError } = useApproveSpend({
    totalAmount: parseFloat(amount) || 0,
    spenderAddress: spenderAddress as `0x${string}`,
    tokenAddress: tokenAddress as `0x${string}`,
  });

  const { data: tokenName } = useReadContract({
    abi: erc20Abi,
    address: tokenAddress as `0x${string}`,
    functionName: "name",
  });

  if (status !== "connected") return null;

  return (
    <div className="flex text-center flex-col gap-4 justify-center items-center max-w-sm w-full">
      <p>
        To replicate the bug please make sure you have USDT on the Ethereum
        Network
      </p>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="amount" className="text-left text-sm font-medium">
          Amount
        </label>
        <input
          id="amount"
          type="number"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="p-2 border rounded-md w-full text-black"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label htmlFor="tokenAddress" className="text-left text-sm font-medium">
          Token Address - {tokenName}
        </label>
        <input
          id="tokenAddress"
          type="text"
          placeholder="Enter token address"
          value={tokenAddress}
          onChange={(e) => setTokenAddress(e.target.value)}
          className="p-2 border rounded-md w-full text-black"
        />
      </div>

      <div className="flex flex-col gap-2 w-full">
        <label
          htmlFor="spenderAddress"
          className="text-left text-sm font-medium"
        >
          Spender Address
        </label>
        <input
          id="spenderAddress"
          type="text"
          placeholder="Enter spender address"
          value={spenderAddress}
          onChange={(e) => setSpenderAddress(e.target.value)}
          className="p-2 border rounded-md w-full text-black"
        />
      </div>

      <button
        className={`bg-blue-500 text-white p-2 rounded-md w-full ${
          !amount || !spenderAddress || !tokenAddress
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={triggerApprove}
        disabled={!amount || !spenderAddress || !tokenAddress}
      >
        Approve {tokenName} on {chain?.name}
      </button>
      {isApprovalError && (
        <p className="text-red-500">Error approving: See console output</p>
      )}
    </div>
  );
};

export default ApproveButton;
