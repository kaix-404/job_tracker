import { motion } from "framer-motion";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { useState } from "react";
import Column from "./Column.tsx";
import API from "../api/axios";
import Card from "./Card.tsx";

const columns = ["Applied", "Phone Screen", "Interview", "Offer", "Rejected"];

export default function KanbanBoard({ data = [], isLoading, refetch }: any) {

  const [activeItem, setActiveItem] = useState<any>(null);

  const handleDragEnd = async (event: any) => {
    const { active, over } = event;

    if (over) {
      try {
        await API.put(`/applications/${active.id}`, {
          status: over.id
        });
        refetch && refetch();
      } catch (err) {
        console.error("Drag update failed", err);
      }
    }

    setActiveItem(null);
  };

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
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={(event) => {
        const dragged = data.find((d: any) => d._id === event.active.id);
        setActiveItem(dragged);
      }}
      onDragEnd={handleDragEnd}
    >
      
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
              id={col}
              title={col}
              items={data.filter((app: any) => app.status === col)}
            />
          </motion.div>
        ))}
      </motion.div>
      <DragOverlay>
        {activeItem ? <Card item={activeItem} /> : null}
      </DragOverlay>
    </DndContext>
    
  );
}