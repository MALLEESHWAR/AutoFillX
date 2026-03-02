import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileText, X, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DocumentUploaderProps {
  onUpload: (file: File) => void;
  isProcessing: boolean;
  uploadedFile: File | null;
  onClear: () => void;
}

export const DocumentUploader: React.FC<DocumentUploaderProps> = ({ 
  onUpload, 
  isProcessing, 
  uploadedFile,
  onClear 
}) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onUpload(acceptedFiles[0]);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    multiple: false,
    disabled: isProcessing
  });

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {uploadedFile ? (
          <motion.div 
            key="uploaded"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative p-10 glass-card-premium rounded-[48px] flex items-center justify-between group overflow-hidden border-emerald-500/20"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
            
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-3xl flex items-center justify-center shadow-inner border border-emerald-500/20">
                <FileText size={40} />
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <p className="text-xl font-bold text-white truncate max-w-[300px] tracking-tight">{uploadedFile.name}</p>
                  <CheckCircle2 size={20} className="text-emerald-400" />
                </div>
                <p className="text-sm font-medium text-emerald-400/60 uppercase tracking-widest">
                  {(uploadedFile.size / 1024).toFixed(1)} KB • Verified Intelligence
                </p>
              </div>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClear}
              className="w-12 h-12 flex items-center justify-center bg-white/[0.03] border border-white/[0.1] rounded-2xl text-slate-400 hover:text-white hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300 shadow-lg"
            >
              <X size={24} />
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            key="uploader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full"
          >
            <div 
              {...getRootProps()} 
              className={`
                relative p-24 border-2 border-dashed rounded-[56px] transition-all duration-500 cursor-pointer
                flex flex-col items-center justify-center gap-10 overflow-hidden group
                ${isDragActive ? 'border-indigo-500 bg-indigo-500/5 scale-[1.01]' : 'border-white/[0.1] hover:border-indigo-500/50 hover:bg-white/[0.02]'}
                ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}
              `}
            >
              <input {...getInputProps()} />
              
              <motion.div 
                animate={isDragActive ? { y: -15, scale: 1.1 } : { y: 0, scale: 1 }}
                className="w-24 h-24 bg-indigo-500/10 text-indigo-400 rounded-[32px] flex items-center justify-center shadow-2xl border border-indigo-500/20 group-hover:bg-indigo-500 group-hover:text-white transition-all duration-500"
              >
                <Upload size={48} />
              </motion.div>
              
              <div className="text-center space-y-4">
                <p className="text-3xl font-bold text-white tracking-tighter">
                  {isDragActive ? 'Release to Process' : 'Upload Intelligence'}
                </p>
                <p className="text-slate-400 text-lg font-light max-w-[320px] mx-auto leading-relaxed">
                  Drop your official documents here for AI-powered extraction.
                </p>
              </div>

              <div className="flex items-center gap-4 px-6 py-3 bg-white/[0.03] border border-white/[0.05] rounded-2xl text-xs font-bold text-slate-500 uppercase tracking-[0.2em]">
                PDF • JPG • PNG
              </div>

              {isProcessing && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-bg-dark/90 backdrop-blur-2xl flex items-center justify-center z-20"
                >
                  <div className="flex flex-col items-center gap-8">
                    <div className="relative">
                      <div className="w-24 h-24 border-2 border-white/[0.05] rounded-full" />
                      <div className="absolute inset-0 w-24 h-24 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <div className="absolute inset-4 border border-indigo-500/20 rounded-full animate-pulse" />
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-2xl font-bold text-white tracking-tighter shimmer-text">AI Neural Extraction</p>
                      <p className="text-slate-500 font-medium uppercase tracking-[0.2em] text-[10px]">Analyzing document structure...</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
