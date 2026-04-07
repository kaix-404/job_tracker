import { useState } from "react";
import API from "../api/axios";
import toast from "react-hot-toast";

interface FormData {
  email: string;
  password: string;
}

export default function Auth() {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [form, setForm] = useState<FormData>({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      const url = isLogin ? "/auth/login" : "/auth/register";
      const res = await API.post(url, form);

      localStorage.setItem("token", res.data.token);
      toast.success(isLogin ? "Logged in!" : "Registered!");

      window.location.href = "/";
    } catch (err: any) {
      console.error(err);
      toast.error(err?.response?.data?.message || "Auth failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0b0f17] text-white">
      <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-xl w-80">

        <h2 className="text-xl font-bold mb-4 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>

        {/* Email */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none"
        />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-gray-800 rounded outline-none"
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-2 rounded hover:opacity-90 transition"
        >
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>

        {/* Toggle */}
        <p
          className="mt-3 text-sm text-gray-400 text-center cursor-pointer"
          onClick={() => setIsLogin(!isLogin)}
        >
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>

      </div>
    </div>
  );
}