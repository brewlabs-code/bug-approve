import { useCallback, useEffect } from "react";
import { erc20Abi, parseUnits } from "viem";
import {
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";

export const useApproveSpend = ({
  totalAmount,
  spenderAddress,
  tokenAddress,
}: {
  totalAmount: number;
  spenderAddress: `0x${string}`;
  tokenAddress: `0x${string}`;
}) => {
  const { chain, chainId, address } = useAccount();

  const { data: decimals } = useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: "decimals",
  });

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
      chainId: chainId,
      address: tokenAddress,
    } as const;

    const amountInWei = parseUnits(totalAmount.toString(), decimals);

    writeContract({
      ...tokenContract,
      functionName: "approve",
      args: [spenderAddress, amountInWei],
      chain,
      account: address,
    });
  }, [
    address,
    chain,
    chainId,
    decimals,
    isApproved,
    isApproving,
    isPending,
    spenderAddress,
    tokenAddress,
    totalAmount,
    writeContract,
  ]);

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
