import { useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import AddApplicationModal from "../components/AddApplicationModal";
import Navbar from "../components/Navbar";
import { useQuery } from "@tanstack/react-query";
import API from "../api/axios";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await API.get("/applications");
      return res.data;
    }
  });

  // Safe filtering
  const filteredData = data.filter((app: any) =>
    app.company?.toLowerCase().includes(search.toLowerCase()) ||
    app.role?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen text-white bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute inset-0 z-1">

        {Array.from({ length: 20 }).map((_, i) => (
            <div
                key={i}
                className="absolute w-1 h-1 bg-white/50 rounded-full animate-ping"
                style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 3}s`
                }}
            />
        ))}

        <div className="absolute w-72 h-72 bg-indigo-900 rounded-full blur-3xl top-10 left-10 animate-slow-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-900 rounded-full blur-3xl bottom-10 right-10 animate-slow-pulse"></div>
        <div className="absolute w-72 h-72 bg-violet-900 rounded-full blur-3xl top-1/2 left-1/2 animate-slow-pulse"></div>
 
      </div>

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 -z-10 opacity-10 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Navbar */}
      <Navbar 
        search={search} 
        setSearch={setSearch} 
        onAdd={() => setOpen(true)} 
      />

      {/* Main Content */}
      <div className="p-6">

        {/* Stats */}
        <div className="grid grid-cols-5 gap-3 mb-6">
          {["Applied", "Phone Screen", "Interview", "Offer", "Rejected"].map(col => (
            <div
              key={col}
              className="bg-white/5 backdrop-blur-sm border border-gray-800 p-4 rounded-xl text-center hover:shadow-lg hover:shadow-purple-500/10 transition"
            >
              <p className="text-sm text-gray-400">{col}</p>
              <p className="text-2xl font-bold">
                {data.filter((a: any) => a.status === col).length}
              </p>
            </div>
          ))}
        </div>

        {/* Kanban Wrapper (Glass Effect) */}
        <div className="bg-gray-900/20 backdrop-blur-sm border border-gray-800 rounded-xl p-4">
          <KanbanBoard
            data={filteredData}
            isLoading={isLoading}
          />
        </div>

      </div>

      {/* Modal */}
      {open && (
        <AddApplicationModal
          onClose={() => setOpen(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
}