import React, { useCallback, useState } from 'react';
import { Upload, X, Image as ImageIcon, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  maxSize?: number;
  onImageUpload?: (file: File) => void;
  disabled?: boolean;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  maxSize = 5,
  onImageUpload,
  disabled = false
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragging(true);
    } else if (e.type === "dragleave") {
      setIsDragging(false);
    }
  }, [disabled]);

  const validateFile = (file: File): boolean => {
    setError(null);
    
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return false;
    }
    
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return false;
    }
    
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  }, [disabled]);

  const handleFile = (file: File) => {
    if (disabled) return;
    
    if (validateFile(file)) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        setFileName(file.name);
      };
      reader.readAsDataURL(file);
      onImageUpload?.(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    setPreview(null);
    setFileName(null);
    setError(null);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={false}
        animate={{
          borderColor: isDragging ? 'rgb(20 184 166)' : 'rgba(255, 255, 255, 0.2)',
          backgroundColor: isDragging ? 'rgba(20, 184, 166, 0.1)' : 'rgba(0, 0, 0, 0.2)'
        }}
        className={`
          relative rounded-xl border-2 border-dashed transition-all duration-300
          ${preview ? 'border-none bg-transparent p-0' : 'p-6 sm:p-8'}
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleChange}
          id="image-upload"
          disabled={disabled}
        />
        
        <AnimatePresence mode="wait">
          {preview ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative group"
            >
              {/* Image container */}
              <div className="relative rounded-xl overflow-hidden bg-gray-900/50">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-auto max-h-64 object-contain"
                />
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <label
                    htmlFor="image-upload"
                    className={`text-white font-medium ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    Click to change image
                  </label>
                </div>
              </div>

              {/* File info bar */}
              <div className="mt-3 flex items-center justify-between bg-slate-800/50 rounded-lg px-4 py-2">
                <div className="flex items-center gap-2 min-w-0">
                  <CheckCircle className="w-4 h-4 text-teal-400 shrink-0" />
                  <span className="text-sm text-slate-300 truncate">{fileName}</span>
                </div>
                
                {!disabled && (
                  <button
                    onClick={removeImage}
                    className="p-1.5 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors shrink-0 ml-2"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.label
              key="upload"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              htmlFor="image-upload"
              className={`flex flex-col items-center justify-center py-8 ${disabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              {/* Upload icon with animation */}
              <motion.div
                animate={{
                  y: isDragging ? -10 : 0,
                  scale: isDragging ? 1.1 : 1
                }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`
                  w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300
                  ${isDragging ? 'bg-teal-500/30' : 'bg-gray-700/50'}
                `}
              >
                <Upload className={`w-8 h-8 ${isDragging ? 'text-teal-400' : 'text-slate-400'}`} />
              </motion.div>
              
              {/* Text */}
              <p className="text-base sm:text-lg font-medium text-white mb-2">
                {isDragging ? 'Drop your image here' : 'Upload your X-ray image'}
              </p>
              <p className="text-sm text-slate-400 text-center">
                <span className="text-teal-400 font-medium">Click to browse</span> or drag and drop
              </p>
              <p className="text-xs text-slate-500 mt-2">
                PNG, JPG, or GIF (max. {maxSize}MB)
              </p>

              {/* Decorative elements */}
              <div className="flex items-center gap-3 mt-6">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center border border-slate-600">
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center border border-slate-600">
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center border border-slate-600">
                    <ImageIcon className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
                <span className="text-xs text-slate-500">Multiple formats supported</span>
              </div>
            </motion.label>
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-3 flex items-center gap-2 text-red-400 text-sm"
          >
            <X className="w-4 h-4" />
            {error}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImageUploader;
