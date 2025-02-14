"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const noTextsArr = [
  "No",
  "Are you sure?",
  "Really?",
  "Pinky promise?",
  "Think again!",
  "I'll be so sad...",
  "World-ending sad!",
  "Universe-crumbling sad!",
  "Okay, I give up...",
  "Just kidding! PLEASE!",
  "💔 Heartbroken! 💔",
  "Final offer!",
];

enum Stages {
  stageNo = "stage-no",
  stageYes = "stage-yes",
  unhappy = "unhappy",
}

export default function Valentine() {
  const [stage, setStage] = useState(Stages.stageNo);
  const [counter, setCounter] = useState(0);
  const [hearts, setHearts] = useState<number[]>([]);

  const createHearts = () => {
    const newHearts = Array.from({ length: 5 }, (_, i) => Date.now() + i);
    setHearts(newHearts);
  };

  const changeNoText = () => {
    setCounter((prev) => {
      if (prev < noTextsArr.length - 1) {
        createHearts();
        return prev + 1;
      } else {
        setStage(Stages.unhappy);
        return 0;
      }
    });
  };

  useEffect(() => {
    if (stage === Stages.stageYes) {
      const interval = setInterval(() => {
        createHearts();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [stage]);

  return (
    <div className="min-h-screen bg-gradient-to-br via-rose-100 to-red-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Floating Hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart}
          className="absolute text-4xl text-red-400 opacity-20"
          initial={{ y: -10, x: Math.random() * 100 }}
          animate={{
            y: "100vh",
            x: Math.random() * 100,
            rotate: 360,
            opacity: [1, 0.8, 0],
          }}
          transition={{ duration: 5 + Math.random() * 5, ease: "linear" }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="max-w-2xl w-full relative z-10">
        <AnimatePresence mode="wait">
          <motion.section
            className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 relative overflow-hidden"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            {stage === Stages.stageNo && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="text-center relative">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], rotate: [0, -5, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="inline-block"
                  >
                    <Image
                      className="mx-auto rounded-full border-[6px] border-pink-200/80 shadow-lg"
                      src="/valentine/valentine-bear.gif"
                      alt="Valentine Bear"
                      width={220}
                      height={220}
                      priority
                    />
                  </motion.div>
                  <div className="absolute -top-4 right-0 left-0 mx-auto w-24 h-24 bg-pink-400/20 blur-3xl rounded-full" />
                </div>

                <motion.h1
        className="text-4xl md:text-5xl font-bold text-pink-600 leading-tight text-center"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
      >
        Dearest Kristine... 🌹
        <br />
        <motion.span
          className="block mt-2 text-3xl md:text-4xl font-medium text-rose-600"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          Will you be my Valentine?
        </motion.span>
      </motion.h1>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
                  <motion.button
                    whileHover={{ scale: 1.05, filter: "hue-rotate(15deg)" }}
                    whileTap={{ scale: 0.95 }}
                    className="relative bg-gradient-to-r from-green-400 to-emerald-600 text-white px-10 py-4 rounded-[2rem] shadow-xl hover:shadow-emerald-200/50 transition-all text-xl font-bold overflow-hidden"
                    style={{
                      fontSize: `${16 + counter * 2}px`,
                      minWidth: `${140 + counter * 20}px`,
                      padding: "1rem 2rem",
                    }}
                    onClick={() => setStage(Stages.stageYes)}
                  >
                    <span className="relative z-10 whitespace-nowrap">ABSOLUTELY YES</span>
                    <div className="absolute inset-0 bg-white/10 mix-blend-overlay animate-pulse" />
                  </motion.button>

                  <motion.button
                    whileHover={{ x: [-3, 3, -3], scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-rose-500 to-pink-600 text-white px-8 py-3 rounded-[2rem] shadow-xl hover:shadow-rose-200/50 transition-all font-semibold relative overflow-hidden"
                    onClick={changeNoText}
                  >
                    <span className="relative z-10 whitespace-nowrap">{noTextsArr[counter]}</span>
                    <div className="absolute inset-0 bg-black/5 mix-blend-overlay" />
                  </motion.button>
                </div>

                <motion.div
                  className="mt-6 h-2 bg-pink-100 rounded-full overflow-hidden"
                  animate={{ width: ["0%", `${(counter / (noTextsArr.length - 1)) * 100}%`] }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="h-full bg-gradient-to-r from-pink-400 to-rose-500 transition-all duration-500" />
                </motion.div>
              </motion.div>
            )}

            {stage === Stages.stageYes && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center space-y-8 relative"
              >
                <div className="absolute -top-20 -left-20 w-48 h-48 bg-pink-400/20 blur-3xl rounded-full" />
                <Image
                  className="mx-auto rounded-full border-[6px] border-pink-200/80 shadow-lg"
                  src="/valentine/bear-kiss-bear-kisses.gif"
                  alt="Celebration"
                  width={280}
                  height={280}
                />
                <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                  YIPPEE! YOU SAID YES! 🎉
                </h2>
                <motion.p
                  className="text-2xl text-rose-600/90"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  Let's create forever memories! 💞
                </motion.p>
              </motion.div>
            )}

            {stage === Stages.unhappy && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center space-y-8"
              >
                <Image
                  className="mx-auto rounded-full border-[6px] border-gray-200/80 shadow-lg grayscale"
                  src="/valentine/unhappy-bear.gif"
                  alt="Unhappy Bear"
                  width={220}
                  height={220}
                />
                <h2 className="text-3xl font-bold text-gray-600/90">
                  My Heart Needs Repair... 🛠️
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-8 py-3 rounded-[2rem] shadow-lg"
                  onClick={() => setStage(Stages.stageNo)}
                >
                  Give Me Another Chance? 🌟
                </motion.button>
              </motion.div>
            )}
          </motion.section>
        </AnimatePresence>
      </div>
    </div>
  );
}