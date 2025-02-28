'use client';

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrimmerDemo } from "@/components/TrimmerDemo";
import { motion } from "framer-motion";
import { useState, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  xOffset: number;
}

// Generate random particle positions
const generateParticles = (count: number): Particle[] => {
  return Array.from({ length: count }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 300 - 100, // Even more vertical spread
    size: Math.random() * 8 + 4, // Increased size (4-12px)
    duration: Math.random() * 20 + 20, // 20-40 seconds
    delay: Math.random() * 3,
    opacity: Math.random() * 0.3 + 0.7, // Higher opacity (0.7-1.0)
    xOffset: Math.random() * 150 - 75 // Wider movement range
  }));
};

const ParticleComponent = ({ x, y, size, duration, delay, opacity, xOffset }: Particle) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-br from-purple-500 to-blue-500 dark:from-purple-400 dark:to-blue-400"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: size,
      height: size,
      opacity,
      boxShadow: '0 0 20px rgba(147, 51, 234, 0.6), 0 0 40px rgba(147, 51, 234, 0.4)'
    }}
    animate={{
      y: [0, -500], // Longer vertical movement
      x: [0, xOffset],
      opacity: [opacity, opacity * 0.9], // Less fade out
      scale: [1, 2, 1], // More dramatic scale effect
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

export default function YTrimmer() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(200)); // Significantly more particles
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Global Particles Container */}
      <div className="fixed inset-0 pointer-events-none">
        {particles.map((particle, index) => (
          <ParticleComponent key={index} {...particle} />
        ))}
        {/* Global Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-50/30 to-gray-50/50 dark:via-gray-900/30 dark:to-gray-900/50" />
      </div>

      <Header />
      
      {/* Hero Section */}
      <section className="relative flex-1 min-h-[80vh] flex items-center justify-center">
        {/* Content */}
        <div className="container px-4 relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl font-bold tracking-tight sm:text-6xl bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Trim YouTube Videos with Ease
            </motion.h1>
            <motion.p 
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              YTrimmer lets you extract and download specific portions of YouTube videos.
              Simply paste your video link, set the start and end times, and get your
              perfectly trimmed video in seconds.
            </motion.p>
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <a
                href="#demo"
                className="rounded-md bg-gradient-to-r from-purple-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
              >
                Try it Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="relative bg-white/50 dark:bg-gray-900/50 py-24">
        <div className="container px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">Try Our Video Trimmer</h2>
            <TrimmerDemo />
          </motion.div>
        </div>
      </section>

      <section className="relative py-24">
        <div className="container px-4">
          <motion.div 
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="grid gap-8 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg"
              >
                <div className="mb-2 text-xl font-medium">1. Paste Link</div>
                <p className="text-gray-600 dark:text-gray-400">Enter your YouTube video URL</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg"
              >
                <div className="mb-2 text-xl font-medium">2. Set Times</div>
                <p className="text-gray-600 dark:text-gray-400">Choose start and end timestamps</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                className="p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg"
              >
                <div className="mb-2 text-xl font-medium">3. Download</div>
                <p className="text-gray-600 dark:text-gray-400">Get your trimmed video instantly</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
