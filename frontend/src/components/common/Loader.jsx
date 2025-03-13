import { motion } from "motion/react";

export default function Loader() {
  return (
    <motion.div
      className="h-20 w-20 rounded-full border-t-4 border-orange-600 lg:scale-200"
      animate={{ rotate: 360 }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        repeatType: "loop",
      }}
    />
  );
}
