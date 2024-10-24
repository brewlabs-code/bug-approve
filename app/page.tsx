import ApproveButton from "@/app/components/approve-button";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex text-center flex-col gap-4 justify-center items-center max-w-sm w-full mt-24">
        <w3m-button />

        <ApproveButton />
      </main>
    </div>
  );
}
