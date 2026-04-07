import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

export default function ApplicationModal({ app, onClose, refetch }: any) {
  const [form, setForm] = useState({
    company: app?.company || "",
    role: app?.role || "",
    location: app?.location || "",
    status: app?.status || ""
  });

  const handleUpdate = async () => {
    try {
      await API.put(`/applications/${app._id}`, form);
      toast.success("Updated!");
      refetch();
      onClose();
    } catch {
      toast.error("Update failed");
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/applications/${app._id}`);
      toast.success("Deleted!");
      refetch();
      onClose();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">

      <div className="bg-gray-900 p-6 rounded-xl w-[400px] text-white">

        <h2 className="mb-4 font-bold">Edit</h2>

        <input
          className="w-full mb-2 p-2 bg-gray-800 rounded"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <input
          className="w-full mb-2 p-2 bg-gray-800 rounded"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        />

        <div className="flex justify-between mt-4">
          <button onClick={handleDelete} className="bg-red-500 px-3 py-1 rounded">
            Delete
          </button>

          <div className="flex gap-2">
            <button onClick={onClose}>Cancel</button>
            <button onClick={handleUpdate} className="bg-green-500 px-3 py-1 rounded">
              Save
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}