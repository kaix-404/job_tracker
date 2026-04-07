import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

export default function AddApplicationModal({ onClose, refetch }: any) {
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);

  const [form, setForm] = useState({
    company: "",
    role: "",
    requiredSkills: [] as string[],
    niceToHaveSkills: [] as string[],
    seniority: "",
    location: ""
  });

  const [suggestions, setSuggestions] = useState<string[]>([]);

  // 🔹 Parse JD
  const handleParse = async () => {
    if (!jd) {
      toast.error("Please paste a job description");
      return;
    }

    try {
      setLoading(true);
      const res = await API.post("/ai/parse", { jd });

      setForm(res.data);
      toast.success("Parsed successfully!");
    } catch {
      toast.error("AI parsing failed");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Generate Resume Points
  const handleGenerate = async () => {
    try {
      setGenerating(true);

      const res = await API.post("/ai/resume", form);

      const parsed = res.data.suggestions
        .split("\n")
        .map((s: string) => s.replace(/^[-•]\s*/, "").trim())
        .filter(Boolean);

      setSuggestions(parsed);

      toast.success("Suggestions generated!");
    } catch {
      toast.error("Failed to generate suggestions");
    } finally {
      setGenerating(false);
    }
  };

  // 🔹 Save Application
  const handleSave = async () => {
    if (!form.company || !form.role) {
      toast.error("Company and role are required");
      return;
    }

    try {
      await API.post("/applications", form);

      toast.success("Application added!");
      refetch();
      onClose();
    } catch {
      toast.error("Failed to save");
    }
  };

  return (
    <motion.div   
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/40 flex justify-center items-center"
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="bg-gray-900 text-white p-6 rounded-2xl w-[500px] max-h-[90vh] overflow-y-auto border border-gray-700 animate-scale-in"
      >

        <h2 className="text-xl font-bold mb-4">Add Application</h2>

        {/* JD Input */}
        <textarea
          placeholder="Paste Job Description..."
          value={jd}
          onChange={(e) => setJd(e.target.value)}
          className="w-full p-2 mb-2 bg-gray-800 border border-gray-700 rounded text-white"
        />

        <button
          onClick={handleParse}
          disabled={loading || !jd}
          className="bg-blue-600 hover:bg-blue-500 px-3 py-1 mb-3 rounded"
        >
          {loading ? "Parsing..." : "Parse with AI"}
        </button>

        {loading && (
            <p className="text-blue-500 text-sm mb-2">
                AI is analyzing job description...
            </p>
        )}

        {/* Form Fields */}
        <input
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
          className="w-full p-2 mb-3 bg-gray-800 border border-gray-700 rounded text-white"
        />

        <input
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full p-2 mb-3 bg-gray-800 border border-gray-700 rounded text-white"
        />

        <input
          placeholder="Location"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          className="w-full p-2 mb-3 bg-gray-800 border border-gray-700 rounded text-white"
        />

        {/* Skills Preview */}
        {form.requiredSkills.length > 0 && (
          <p className="text-xs text-gray-500 mb-3">
            Skills: {form.requiredSkills.join(", ")}
          </p>
        )}

        {/* Resume Suggestions */}
        <button
          onClick={handleGenerate}
          disabled={generating}
          className="bg-purple-600 hover:bg-purple-500 px-3 py-1 mb-3 rounded"
        >
          {generating ? "Generating..." : "Generate Resume Points"}
        </button>

        <div className="mb-4">
          {suggestions.length === 0 ? (
            <p className="text-sm text-gray-500">No suggestions yet</p>
          ) : (
            suggestions.map((suggestion, i) => (
              <div
                key={i}
                className="bg-gray-800 p-2 mb-2 rounded flex justify-between items-center border border-gray-700"
              >
                <span className="text-sm">{suggestion}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(suggestion);
                    toast.success("Copied!");
                  }}
                  className="text-blue-500 text-xs"
                >
                  Copy
                </button>
              </div>
            ))
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-500 px-4 py-1 rounded"
          >
            Save
          </button>
        </div>

      </motion.div>
    </motion.div>
  );
}