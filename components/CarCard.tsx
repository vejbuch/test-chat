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
