// .env.local
NEXT_PUBLIC_COPILOTKIT_API_BASE_URL=http://localhost:3000/api/copilotkit

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

// components/Chat.tsx
import { useState } from "react";
import { useCopilotChat } from "@copilotkit/react-core";
import CarCard from "./CarCard";
import cars from "@/data/cars";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, appendMessage } = useCopilotChat();

  const handleSend = () => {
    if (!input.trim()) return;

    appendMessage({ role: "user", content: input });

    const matchedCars = cars.filter(car => {
      const content = input.toLowerCase();
      return (
        content.includes(car.make.toLowerCase()) ||
        content.includes(car.model.toLowerCase()) ||
        content.includes(car.color.toLowerCase())
      );
    });

    if (matchedCars.length > 0) {
      appendMessage({
        role: "assistant",
        content: "Našel jsem pro vás tato auta:",
        cars: matchedCars,
      });
    } else {
      appendMessage({
        role: "assistant",
        content: "Omlouvám se, nenašel jsem žádná odpovídající auta.",
      });
    }

    setInput("");
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.role === "user" ? "text-right" : "text-left"}>
            <p className="mb-1 font-medium">
              {msg.role === "user" ? "Vy" : "Asistent"}:
            </p>
            <p className="bg-gray-200 inline-block rounded px-3 py-2">
              {msg.content}
            </p>
            {msg.cars && (
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {msg.cars.map((car: any) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Napište dotaz..."
          className="flex-1 border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Odeslat
        </button>
      </div>
    </div>
  );
}

// components/CarCard.tsx
export default function CarCard({ car }: { car: any }) {
  const colorMap: Record<string, string> = {
    Green: "bg-green-600",
    Gray: "bg-gray-500",
    Blue: "bg-blue-600",
  };

  return (
    <div className="border rounded-xl overflow-hidden bg-white shadow-md p-2 flex flex-col items-center">
      <img src={car.image} alt={car.model} className="w-full h-48 object-cover rounded" />
      <div className="p-4 text-center">
        <h2 className="text-lg font-semibold mb-1">{car.year} {car.make} {car.model}</h2>
        <p className="text-sm">Make: {car.make}</p>
        <p className="text-sm">Model: {car.model}</p>
        <p className="text-sm">Year: {car.year}</p>
        <p className="text-sm flex items-center justify-center gap-1">
          Color:
          <span className={`w-3 h-3 rounded-full inline-block ${colorMap[car.color]}`} />
          {car.color}
        </p>
        <p className="text-sm font-bold mt-1">${car.price.toLocaleString()}</p>
        <button className="mt-3 bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded">
          Select
        </button>
      </div>
    </div>
  );
}

// data/cars.ts
const cars = [
  {
    id: 1,
    make: "Kia",
    model: "Tasman",
    year: 2025,
    color: "Green",
    price: 20000,
    image: "/cars/tasman.jpg",
  },
  {
    id: 2,
    make: "Kia",
    model: "EV6",
    year: 2025,
    color: "Gray",
    price: 22000,
    image: "/cars/ev6.jpg",
  },
  {
    id: 3,
    make: "Kia",
    model: "EV9",
    year: 2025,
    color: "Blue",
    price: 18000,
    image: "/cars/ev9.jpg",
  },
];

export default cars;
