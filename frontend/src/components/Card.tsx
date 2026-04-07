import { motion } from "framer-motion";

export default function Card({ item }: any) {
  return (
    <motion.div
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