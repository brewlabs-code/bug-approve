import { useCallback, useEffect } from "react";
import { erc20Abi, parseUnits } from "viem";
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

export const useApproveSpend = () => {
  // Hardcoded values for testing
  const decimals = 6;
  const totalAmount = 1000;

  const { chain, address } = useAccount();

  const {
    data: hash,
    isPending,
    writeContract,
    error: approvalError,
    isError: isApprovalError,
  } = useWriteContract();

  const { isLoading: isApproving, isSuccess: isApproved } =
    useWaitForTransactionReceipt({
      hash,
    });

  const triggerApprove = useCallback(() => {
    if (!totalAmount || !decimals || isPending || isApproving || isApproved)
      return;

    console.log("Starting approval");

    const tokenContract = {
      abi: erc20Abi,
      chainId: 1,
      address: "0xdac17f958d2ee523a2206206994597c13d831ec7",
    } as const;

    const amountInWei = parseUnits(totalAmount.toString(), decimals);

    writeContract({
      ...tokenContract,
      functionName: "approve",
      args: [
        "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984" as `0x${string}`,
        amountInWei,
      ],
      chain,
      account: address,
    });
  }, [address, chain, isApproved, isApproving, isPending, writeContract]);

  useEffect(() => {
    if (isPending) {
      console.log("Approve spending cap in wallet");
    }

    if (isApproving) {
      console.log("Approval in progress");
    }

    if (isApproved) {
      console.log("Approval complete");
    }

    if (isApprovalError) {
      console.error("Approval error");
      console.error(approvalError);
      console.error(approvalError?.name);
    }
  }, [
    isApproving,
    isApproved,
    isPending,
    isApprovalError,
    approvalError?.name,
    approvalError,
  ]);

  return {
    hash,
    isPending,
    isApproved,
    isApproving,
    triggerApprove,
    approvalError,
    isApprovalError,
  };
};
