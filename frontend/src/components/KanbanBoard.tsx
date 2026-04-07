import { motion } from "framer-motion";
import Column from "./Column.tsx";

const columns = ["Applied", "Phone Screen", "Interview", "Offer", "Rejected"];

export default function KanbanBoard({ data = [], isLoading }: any) {
  if (isLoading) return <div>Loading...</div>;

  if (!data.length) {
    return (
        <div className="text-center text-gray-400 mt-10">
        <p>No applications yet</p>
        <p className="text-sm">Click + to add your first job</p>
        </div>
    );
    }

  return (
    <motion.div
        className="grid grid-cols-5 gap-4"
        initial="hidden"
        animate="visible"
        variants={{
            hidden: {},
            visible: {
            transition: {
                staggerChildren: 0.1
            }
            }
        }}
    >
        {columns.map((col) => (
            <motion.div
                key={col}
                variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 }
                }}
            >
            <Column
                title={col}
                items={data.filter((app: any) => app.status === col)}
            />
            </motion.div>
        ))}
    </motion.div>
  );
}