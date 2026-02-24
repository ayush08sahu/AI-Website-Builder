import React from "react";
import { motion } from "motion/react";

function LoginModel({ open, onClose }) {
  return (
    <>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        ></motion.div>
      )}
    </>
  );
}

export default LoginModel;
