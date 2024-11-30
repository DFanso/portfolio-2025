import { Analytics } from "@/components/sections/Analytics";

export default function DashboardPage() {
  return (
    <main className="w-full min-h-screen bg-black text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-[var(--green)]">Analytics Dashboard</h1>
        <Analytics />
      </div>
    </main>
  );
}
