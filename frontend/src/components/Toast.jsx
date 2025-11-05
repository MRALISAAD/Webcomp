import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { playSound } from "../utils/sound";

export default function Toast({ type, message }) {
  useEffect(() => {
    if (!type) return;
    playSound(type);
  }, [type]);

  return (
    <AnimatePresence>
      <motion.div
        key="toast"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-5 right-5 z-[60] rounded-xl px-4 py-3 text-sm font-medium text-white shadow-lg backdrop-blur-md ${
          type === "success" ? "bg-green-600" : "bg-red-600"
        }`}
      >
        {message}
      </motion.div>
    </AnimatePresence>
  );
}
