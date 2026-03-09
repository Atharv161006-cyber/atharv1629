
import React, { useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { searchByImage } from '../services/geminiService';

interface VisualSearchProps {
  onSearch: (query: string) => void;
  onClose: () => void;
}

const VisualSearch: React.FC<VisualSearchProps> = ({ onSearch, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
        setError(null);
      }
    } catch (err) {
      console.error("Camera Error:", err);
      setError("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsCameraActive(false);
    }
  }, []);

  const captureAndSearch = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const base64Image = canvas.toDataURL('image/jpeg', 0.8);
      
      setIsAnalyzing(true);
      stopCamera();

      const query = await searchByImage(base64Image);
      if (query) {
        onSearch(query);
        onClose();
      } else {
        setError("Could not identify product. Try again.");
        setIsAnalyzing(false);
      }
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [stopCamera]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white w-full max-w-lg rounded-[2.5rem] overflow-hidden shadow-2xl relative"
      >
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-black p-2 rounded-xl">
              <i className="fas fa-camera text-white text-sm"></i>
            </div>
            <h3 className="font-black text-black uppercase tracking-widest text-xs">Visual Search</h3>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-gray-100 flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times text-gray-400"></i>
          </button>
        </div>

        <div className="relative aspect-[4/3] bg-gray-900 overflow-hidden">
          {isCameraActive && (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              className="w-full h-full object-cover"
            />
          )}
          
          {isAnalyzing && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white">
              <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
              <p className="font-bold tracking-tight">Analyzing Image...</p>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-rose-500/90 text-white p-8 text-center">
              <i className="fas fa-exclamation-triangle text-3xl mb-4"></i>
              <p className="font-bold mb-6">{error}</p>
              <button 
                onClick={startCamera}
                className="bg-white text-rose-600 px-6 py-2 rounded-xl font-bold hover:bg-gray-100 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </div>

        <div className="p-8 flex flex-col items-center">
          <p className="text-gray-500 text-sm mb-8 text-center font-medium">
            Point your camera at a product to find it in our store.
          </p>
          
          <div className="flex gap-4 w-full">
            <button 
              onClick={onClose}
              className="flex-grow py-4 rounded-2xl border-2 border-gray-100 font-bold text-gray-400 hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button 
              onClick={captureAndSearch}
              disabled={!isCameraActive || isAnalyzing}
              className="flex-grow py-4 rounded-2xl bg-black text-white font-bold hover:bg-gray-900 transition-all shadow-xl shadow-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <i className="fas fa-circle text-[8px] animate-pulse text-rose-500"></i>
              Capture
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VisualSearch;
