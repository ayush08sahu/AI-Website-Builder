import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import LoginModel from "../components/LoginModel";
import { useDispatch, useSelector } from "react-redux";
import { Coins } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const highlights = [
    "AI Generated Code",
    "Fully Responsive Layouts",
    "Production Ready Output",
  ];

  const [openLogin, setOpenLogin] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("logout");
      await axios.get(`${serverUrl}/api/auth/logout`, {
        withCredentials: true,
      });
      dispatch(setUserData(null));
      setOpenProfile(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold">GenWeb.ai</div>
          <div className="flex items-center gap-5">
            <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer">
              Pricing
            </div>
            {userData && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10 transition">
                <Coins size={14} className="text-yellow-400" />
                <span className="text-zinc-300">Credits</span>
                <span>{userData.credits}</span>
                <span className="font-semibold">+</span>
              </div>
            )}
            {!userData ? (
              <button
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
                onClick={() => setOpenLogin(true)}
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <img
                    className="w-9 h-9 rounded-full border border-white/20 object-cover"
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?name=${userData.name}`
                    }
                    alt=""
                  />
                </button>
                <AnimatePresence>
                  {openProfile && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="absolute right-0 mt-3 w-60 rounded-xl bg-[#0b0b0b] border border-white/10 shadow-2xl overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="text-sm font-medium truncate">
                            {userData.name}
                          </p>
                          <p className="text-xs text-zinc-500 truncate">
                            {userData.email}
                          </p>
                        </div>

                        <button className="md:hidden w-full px-4 py-3 flex items-center gap-2 text-sm border-b border-white/10 hover:bg-white/5">
                          <Coins size={14} className="text-yellow-400" />
                          <span className="text-zinc-300">Credits</span>
                          <span>{userData.credits}</span>
                          <span className="font-semibold">+</span>
                        </button>

                        <button
                          className="w-full px-4 py-3 text-left text-sm hover:bg-white/5"
                          onClick={() => navigate("/dashboard")}
                        >
                          Dashboard
                        </button>
                        <button
                          className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-white/5"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <section className="pt-44 pb-32 px-6 text-center">
        <motion.h1
          className="text-5xl md:text-7xl font-bold leading-tight"
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
        >
          Build Stunning Website <br />
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            With AI
          </span>
        </motion.h1>
        <motion.p
          className="mt-8 text-lg text-zinc-400 max-w-2xl mx-auto"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.3 }}
        >
          Describe your idea and let AI generate a modern, responsive,
          production-ready website.
        </motion.p>

        <motion.div
          className="mt-12"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
        >
          <button
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            onClick={() => navigate("/dashboard")}
            onClickCapture={() => !userData && setOpenLogin(true)}
          >
            {userData ? "Go to Dashboard" : "Get Started"}
          </button>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((h, i) => (
            <motion.div
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-8"
              initial={{ y: 40, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
            >
              <h1 className="text-xl font-semibold mb-3">{h}</h1>
              <p className="text-sm text-zinc-400">
                GenWeb.ai builds real websites - clean code, animation,
                responsiveness and scalable structure.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 py-10 text-center text-sm text-zinc-500">
        &copy; {new Date().getFullYear()} GenWeb.ai All rights reserved.
      </footer>

      {openLogin && (
        <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </div>
  );
};

export default Home;
