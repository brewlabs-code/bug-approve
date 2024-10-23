"use client";

import { useAccount } from "wagmi";
import { useApproveSpend } from "@/app/hooks/useApproveSpend";

const ApproveButton = () => {
  const { status } = useAccount();
  const { triggerApprove, isApprovalError } = useApproveSpend();

  if (status !== "connected") return null;

  return (
    <div className="flex text-center flex-col gap-4 justify-center items-center max-w-sm w-full">
      <p>
        To replicate the bug please make sure you have USDT on the Ethereum
        Network
      </p>
      <button
        className="bg-blue-500 text-white p-2 rounded-md"
        onClick={triggerApprove}
      >
        Approve USDT on ETH
      </button>
      {isApprovalError && (
        <p className="text-red-500">Error approving: See console output</p>
      )}
    </div>
  );
};

export default ApproveButton;
