import { motion } from "framer-motion";
import { memo } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Card({ item }: any) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item._id });
    
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0 : 1
    }
    
    console.log("Rendering card:", item._id);
    return (
        <motion.div
            ref={setNodeRef}
            {...listeners}
            {...attributes}
            style={style}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25 }}
            className="bg-gray-900 border border-gray-800 p-3 mb-3 rounded-xl shadow hover:shadow-xl hover:shadow-blue-500/10 cursor-grab active:cursor-grabbing transition-opacity duration-200"
        >
            <h3 className="font-semibold text-white">{item.company}</h3>
            <p className="text-sm text-gray-400">{item.role}</p>

            <p className="text-xs text-gray-500 mt-2">
                {new Date(item.dateApplied).toLocaleDateString("en-GB")}
            </p>

        </motion.div>
    );
}

export default memo(Card);