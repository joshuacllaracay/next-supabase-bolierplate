'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';
import { VideoPreview } from './VideoPreview';

export function TrimmerDemo() {
  const [startTime] = useState('00:03');
  const [endTime] = useState('00:09');
  const cursorControls = useAnimation();
  const downloadControls = useAnimation();

  // Animate cursor movement and input focus
  useEffect(() => {
    const animateCursor = async () => {
      // Initial position - hide cursor
      await cursorControls.start({ opacity: 0, x: 0, y: 0 });
      await new Promise(resolve => setTimeout(resolve, 2000)); // Wait for video to start playing
      
      // Show cursor
      await cursorControls.start({ opacity: 1 });
      
      // Move to start time input and click
      await cursorControls.start({ 
        x: 100, 
        y: 350,
        transition: { duration: 1, ease: 'easeInOut' }
      });
      await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
      await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Move to end time input and click
      await cursorControls.start({ 
        x: 400,
        transition: { duration: 1, ease: 'easeInOut' }
      });
      await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
      await cursorControls.start({ scale: 1, transition: { duration: 0.1 } });
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Move to download button and click
      await cursorControls.start({ 
        x: 250,
        y: 450,
        transition: { duration: 1, ease: 'easeInOut' }
      });
      await cursorControls.start({ scale: 0.8, transition: { duration: 0.1 } });
      await downloadControls.start({ scale: 0.95, transition: { duration: 0.1 } });
      await downloadControls.start({ scale: 1, transition: { duration: 0.1 } });
      
      // Hide cursor
      await cursorControls.start({ opacity: 0, transition: { duration: 0.5 } });
      
      // Restart animation after delay
      setTimeout(animateCursor, 2000);
    };

    animateCursor();
  }, [cursorControls, downloadControls]);

  return (
    <div className="w-full max-w-4xl mx-auto mt-12 space-y-8">
      {/* Video Preview */}
      <VideoPreview />

      {/* Trimming Interface */}
      <motion.div
        className="bg-card rounded-lg p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="space-y-6">
          {/* Time Input Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Start Time</label>
              <input
                type="text"
                value={startTime}
                readOnly
                className="w-full px-3 py-2 rounded-md border bg-background cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Time</label>
              <input
                type="text"
                value={endTime}
                readOnly
                className="w-full px-3 py-2 rounded-md border bg-background cursor-pointer"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4">
            <motion.button
              className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Preview Trim
            </motion.button>
            <motion.button
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={downloadControls}
            >
              Download
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Animated Cursor */}
      <motion.div
        className="fixed w-6 h-6 pointer-events-none z-50"
        animate={cursorControls}
        initial={{ opacity: 0, x: 0, y: 0 }}
      >
        <svg
          viewBox="0 0 24 24"
          className="text-white drop-shadow-lg"
          style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
        >
          <path
            fill="currentColor"
            d="M3.5,2.1c0.8,0,1.5,0.7,1.5,1.5v5.8l3.8-2.6l0.1-0.1c0.5-0.3,1.1-0.1,1.4,0.3l3.8,5.5l3.8-2.6
            c0.5-0.3,1.1-0.2,1.4,0.3s0.2,1.1-0.3,1.4l-4.5,3.1c-0.5,0.3-1.1,0.2-1.4-0.3L8.7,8.8L5,11.3c-0.5,0.3-1.1,0.2-1.4-0.3
            C3.5,10.8,3.5,10.5,3.5,10.2V3.6C3.5,2.8,4.2,2.1,5,2.1H3.5z"
          />
        </svg>
      </motion.div>
    </div>
  );
}
