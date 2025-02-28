'use client';

import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

export function VideoPreview() {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoPreviewControls = useAnimation();

  useEffect(() => {
    const animateProgress = async () => {
      if (!isPlaying) return;
      
      await videoPreviewControls.start({
        width: '100%',
        transition: {
          duration: 12,
          ease: 'linear',
        }
      });
      
      setIsPlaying(false);
    };

    if (isPlaying) {
      animateProgress();
    }
  }, [isPlaying, videoPreviewControls]);

  return (
    <div className="relative rounded-lg overflow-hidden bg-gray-900">
      {/* Video Preview */}
      <motion.div
        className="aspect-video relative bg-gradient-to-br from-gray-800/80 to-gray-900/80"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Animated Content */}
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm">
          <div className="text-white/50 text-xl font-mono">Video Preview</div>
        </div>
        
        {/* Purple Progress Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-purple-500"
          initial={{ width: '0%' }}
          animate={videoPreviewControls}
        />
        
        {/* Time Markers */}
        <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm backdrop-blur-sm">
          00:00
        </div>
        <div className="absolute bottom-4 right-4 bg-black/50 text-white px-2 py-1 rounded text-sm backdrop-blur-sm">
          00:12
        </div>
      </motion.div>
    </div>
  );
}
