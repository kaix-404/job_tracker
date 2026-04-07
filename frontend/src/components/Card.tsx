import { motion } from "framer-motion";
import { useDraggable } from "@dnd-kit/core";

export default function Card({ item }: any) {
    const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item._id });
    
    const style = {
        transform: transform
            ? `translate(${transform.x}px, ${transform.y}px)`
            : undefined,
        zIndex: isDragging ? 50 : "auto",
        opacity: isDragging ? 0.5 : 1
    };

    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-900 border border-gray-800 p-3 mb-3 rounded-xl shadow hover:shadow-xl hover:shadow-blue-500/10 cursor-pointer"
        >
            <h3 className="font-semibold text-white">{item.company}</h3>
            <p className="text-sm text-gray-400">{item.role}</p>

            <p className="text-xs text-gray-500 mt-2">
                {new Date(item.dateApplied).toLocaleDateString()}
            </p>
        </motion.div>
    );
}