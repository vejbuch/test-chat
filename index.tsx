// pages/index.tsx
import { CopilotKit } from "@copilotkit/react-core";
import Chat from "@/components/Chat";

export default function Home() {
  return (
    <CopilotKit url={process.env.NEXT_PUBLIC_COPILOTKIT_API_BASE_URL}>
      <main className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold mb-4">Vyhledávání aut v chatu</h1>
          <Chat />
        </div>
      </main>
    </CopilotKit>
  );
}
