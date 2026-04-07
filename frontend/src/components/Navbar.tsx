import { Plus } from "lucide-react";
import { motion } from "framer-motion";

export default function Navbar({ search, setSearch, onAdd }: any) {
  return (
    <div className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur rounded border-b border-gray-800 px-6 py-3 mb-3 flex items-center justify-between">

      {/* Logo */}
      <h1 className="text-xl font-bold text-white flex items-center gap-2">
        💼 Job Tracker
      </h1>

      {/* Search */}
      <input
        placeholder="Search company or role..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full max-w-md mx-6 bg-gray-900 border border-gray-700 p-2 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

        <div className="flex gap-2">
            {/* Add Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAdd}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 rounded-lg text-white"
            >
                <Plus size={16} />
                Add
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = "/";
                }}
                className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-700 px-4 py-2 rounded-lg text-white"
            >
                Logout
            </motion.button>
        </div>
    </div>
  );
}