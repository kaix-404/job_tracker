import { useDroppable } from "@dnd-kit/core";
import Card from "./Card.tsx";

const colors: any = {
  Applied: "bg-blue-900/30 border-blue-700",
  "Phone Screen": "bg-yellow-900/30 border-yellow-700",
  Interview: "bg-purple-900/30 border-purple-700",
  Offer: "bg-green-900/30 border-green-700",
  Rejected: "bg-red-900/30 border-red-700"
};

export default function Column({ id, title, items }: any) {
    const { setNodeRef } = useDroppable({ id });

    return (
        <div ref={setNodeRef} className={`p-3 rounded-xl border ${colors[title]}`}>
        <h2 className="font-bold mb-3">{title}</h2>

        {items.map((item: any) => (
            <Card key={item._id} item={item} />
        ))}
        </div>
    );
    }