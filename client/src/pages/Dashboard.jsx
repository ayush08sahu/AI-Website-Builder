import { ArrowLeft, Rocket, Share2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";

function Dashboard() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [websites, setWebsites] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const handleGetAllWebsites = async () => {
      setLoading(true);
      try {
        const result = await axios.get(`${serverUrl}/api/website/get-all`, {
          withCredentials: true,
        });
        setWebsites(result.data || []);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    handleGetAllWebsites();
  }, []);
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={16} />
            </button>
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </div>
        </div>
        <button
          className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition-transform absolute right-6 top-1/2 -translate-y-1/2"
          onClick={() => navigate("/generate")}
        >
          + New Website
        </button>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          classname="mb-10"
        >
          <p classname="text-sm text-zinc-400 mb-1">Welcome Back</p>
          <h1 classname="text-3xl font-bold">{userData.name}</h1>
          <br />
        </motion.div>
        {loading && (
          <div className="mt-24 text-center text-zinc-400">
            Loading Your Websites...
          </div>
        )}
        {error && !loading && (
          <div className="mt-24 text-center text-red-400">{error}</div>
        )}
        {!loading && websites?.length == 0 && (
          <div className="mt-24 text-center text-zinc-400">
            You have not generated any websites yet.
          </div>
        )}
        {!loading && !error && websites?.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
            {websites.map((w, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition flex flex-col"
              >
                <div className="relative h-40 bg-black cursor-pointer">
                  <iframe
                    srcDoc={w.latestCode}
                    className="absolute inset-0 w-[140%] h-[140%] scale-[0.72] origin-top-left pointer-events-none bg-white"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="p-5 flex flex-col gap-4 flex-1">
                  <h2 className="text-base line-clamp-2 font-semibold">
                    {w.title}
                  </h2>
                  <p className="text-xs text-zinc-400">
                    Last Updated {""}
                    {new Date(w.updatedAt).toLocaleString()}
                  </p>
                  {!w.deployed ? (
                    <button className="mt-auto flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-indigo-500 to-purple-500 hover:scale-105 py-2 px-4 rounded-xl transition">
                      <Rocket size={18} /> Deploy
                    </button>
                  ) : (
                    <button className="mt-auto flex items-center justify-center gap-2 text-sm font-semibold bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 py-2 px-4 rounded-xl transition">
                      <Share2 /> Share Link
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
