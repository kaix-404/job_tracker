import { motion } from "framer-motion";
import { DndContext, closestCenter, DragOverlay } from "@dnd-kit/core";
import { useState, useMemo } from "react";
import Column from "./Column.tsx";
import API from "../api/axios";
import Card from "./Card.tsx";

const columns = ["Applied", "Phone Screen", "Interview", "Offer", "Rejected"];

export default function KanbanBoard({ data = [], isLoading, refetch }: any) {

  const [activeItem, setActiveItem] = useState<any>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  
  const groupedData = useMemo(() => {
    return columns.reduce((acc: any, col) => {
      acc[col] = data.filter((app: any) => app.status === col);
      return acc;
    }, {});
  }, [data]);

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

        const rect = event.active.rect.current?.initial;
        const pointer = event.activatorEvent;

        if (rect && pointer instanceof MouseEvent) {
          setOffset({
            x: pointer.clientX - rect.left,
            y: pointer.clientY - rect.top
          });
        } else if (rect && pointer instanceof TouchEvent) {
          const touch = pointer.touches[0];
          setOffset({
            x: touch.clientX - rect.left,
            y: touch.clientY - rect.top
          });
        }
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
              items={groupedData[col]}
            />
          </motion.div>
        ))}
      </motion.div>
      <DragOverlay>
        {activeItem ? (
          <div className="pointer-events-none scale-105">
            <Card item={activeItem} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
    
  );
}