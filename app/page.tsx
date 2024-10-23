import ApproveButton from "@/app/components/approve-button";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex text-center flex-col gap-4 justify-center items-center max-w-sm w-full mt-24">
        <w3m-button />

        <ApproveButton />
      </main>
    </div>
  );
}
