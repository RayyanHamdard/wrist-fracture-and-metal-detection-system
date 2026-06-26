import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../components/ImageUploader';
import { motion, AnimatePresence } from 'framer-motion';
import { FiDownload, FiFileText, FiAlertCircle, FiCheckCircle, FiArrowLeft, FiInfo } from 'react-icons/fi';

// Backend API base URL — configurable via VITE_API_URL for deployment.
const API_BASE = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

interface Detection {
  class_name: string;
  confidence: number;
}

interface ProcessedResult {
  processed_image_url: string;
  detections_url: string;
  report_url?: string;
  detections: Detection[];
  warning?: string;
}

// Dissolvability reference for common orthopedic implant metals. A metal is
// only reported as "dissolvable" when the user identifies it as a bioabsorbable
// metal — it is NEVER inferred from the detection confidence. Time values are
// general, literature-based resorption ranges for biodegradable implants and
// are not patient-specific.
interface MetalProfile {
  label: string;
  dissolvable: boolean;
  time: string; // estimated resorption time; empty for permanent metals
}

const METAL_PROFILES: Record<string, MetalProfile> = {
  magnesium:       { label: 'Magnesium (Mg)',         dissolvable: true,  time: '~6-12 months' },
  zinc:            { label: 'Zinc (Zn)',              dissolvable: true,  time: '~12-24 months' },
  iron:            { label: 'Iron (Fe)',              dissolvable: true,  time: '~24+ months (very slow)' },
  stainless_steel: { label: 'Stainless steel (316L)', dissolvable: false, time: '' },
  titanium:        { label: 'Titanium (Ti)',          dissolvable: false, time: '' },
  cobalt_chromium: { label: 'Cobalt-chromium (CoCr)', dissolvable: false, time: '' },
  nitinol:         { label: 'Nitinol (NiTi)',         dissolvable: false, time: '' },
};

const XRayUpload: React.FC = () => {
  const navigate = useNavigate();
  const [processedResult, setProcessedResult] = useState<ProcessedResult | null>(null);
  const [confidence, setConfidence] = useState<number>(0.3);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // The metal type the user selects for each detected metal implant, keyed by
  // its row index. This — not detection confidence — drives the dissolvability
  // verdict.
  const [metalChoices, setMetalChoices] = useState<Record<number, string>>({});

  const handleImageUpload = async (file: File) => {
    setIsProcessing(true);
    setError(null);
    // Clear any previous result so an invalid/rejected upload never shows
    // stale bounding boxes, detections, or download buttons.
    setProcessedResult(null);
    // Reset metal-type selections so a new scan never inherits a previous
    // image's dissolvability choices.
    setMetalChoices({});

    const formData = new FormData();
    formData.append('file', file);
    formData.append('conf_threshold', confidence.toString());
  
    try {
      // Send the auth token so the backend can put the logged-in user's name
      // on the report. Anonymous uploads still work (no header sent).
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/xray/`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        setProcessedResult(data);

        // Record the completed analysis so dashboard stats (e.g. "Total
        // Analyses") reflect it. Only runs on a successful detection — failed
        // uploads and rejected/invalid images never reach this branch. Sent
        // best-effort so it can never break the result display.
        if (token) {
          try {
            const recordData = new FormData();
            recordData.append('image_type', 'xray');
            recordData.append('original_filename', file.name);
            if (data.processed_image_url) {
              recordData.append('processed_filename', data.processed_image_url);
            }
            recordData.append('detections', JSON.stringify(data.detections || []));
            await fetch(`${API_BASE}/analysis/record`, {
              method: 'POST',
              headers: { Authorization: `Bearer ${token}` },
              body: recordData,
            });
          } catch (recordErr) {
            console.error('Failed to record analysis:', recordErr);
          }
        }
      } else {
        const errorData = await response.json();
        setError(errorData.detail || 'Failed to process image');
      }
    } catch (error) {
      setError('Error uploading the image. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDownload = async (url: string, filename: string) => {
    try {
      const response = await fetch(`${API_BASE}/xray/download/${url}`);
      if (!response.ok) throw new Error('Failed to fetch the file');
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
      setError('Error downloading file');
    }
  };

  const getHealingInfo = (detection: Detection) => {
    const confidencePercentage = detection.confidence * 100;
    
    if (detection.class_name === "fracture") {
      const months = Math.min(Math.ceil(confidencePercentage / 10), 10);
      return `${months} month${months > 1 ? "s" : ""}`;
    }
    return "N/A";
  };

  // Dissolvability verdict for a detected metal, derived from the metal type the
  // user selected for this row. Returns null until a type is chosen, so the UI
  // shows the selector first and the verdict only after the user identifies the
  // metal.
  const renderMetalForecast = (index: number) => {
    const choice = metalChoices[index];
    if (!choice) return null;
    const profile = METAL_PROFILES[choice];
    if (!profile) return null;

    return profile.dissolvable ? (
      <span className="text-green-300 text-xs font-medium">
        Dissolvable · {profile.time}
      </span>
    ) : (
      <span className="text-amber-300 text-xs font-medium">
        Not dissolvable (permanent)
      </span>
    );
  };

  const getSeverityColor = (confidence: number) => {
    if (confidence >= 0.7) return 'text-red-400 bg-red-500/20';
    if (confidence >= 0.4) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-green-400 bg-green-500/20';
  };

  const filteredDetections = processedResult?.detections?.filter(d => d.class_name !== "text") || [];
  const hasAbnormalities = filteredDetections.length > 0;
  const hasMetal = filteredDetections.some(d => d.class_name === "metal");

  return (
    <div className="min-h-screen gradient-primary relative">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/start')}
          className="mb-6 flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span>Back to Selection</span>
        </motion.button>

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
              X-Ray Image Analysis
            </h1>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
              Upload your X-ray image for AI-powered fracture and abnormality detection
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Upload Section */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-[#0f1f35]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 sm:p-6 md:p-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-sm font-bold">1</span>
                Upload Image
              </h2>
              
              {/* Confidence Threshold Slider */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-slate-300 flex items-center gap-2">
                    Detection Threshold
                    <div className="group relative">
                      <FiInfo className="w-4 h-4 text-slate-400 cursor-help" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 w-48 text-center">
                        Higher values show only high-confidence detections
                      </div>
                    </div>
                  </label>
                  <span className="text-teal-400 font-semibold bg-teal-500/20 px-3 py-1 rounded-full text-sm">
                    {(confidence * 100).toFixed(0)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1.0"
                  step="0.05"
                  value={confidence}
                  onChange={(e) => setConfidence(parseFloat(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                  style={{
                    background: `linear-gradient(to right, rgb(20 184 166) 0%, rgb(20 184 166) ${(confidence - 0.2) / 0.8 * 100}%, rgb(55 65 81) ${(confidence - 0.2) / 0.8 * 100}%, rgb(55 65 81) 100%)`
                  }}
                />
                <div className="flex justify-between mt-1 text-xs text-slate-500">
                  <span>20%</span>
                  <span>100%</span>
                </div>
              </div>
              
              <ImageUploader 
                maxSize={25} 
                onImageUpload={handleImageUpload}
                disabled={isProcessing}
              />
              
              {/* Processing indicator */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-6 flex flex-col items-center"
                  >
                    <div className="relative">
                      <div className="w-16 h-16 border-4 border-teal-500/30 rounded-full animate-pulse" />
                      <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-teal-500 rounded-full animate-spin" />
                    </div>
                    <p className="mt-4 text-slate-300 font-medium">Analyzing image...</p>
                    <p className="text-slate-500 text-sm">This may take a few seconds</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Error message */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mt-4 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-start gap-3"
                  >
                    <FiAlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <p className="text-red-300 text-sm">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <p className="mt-6 text-xs sm:text-sm text-slate-400 text-center">
                Supported formats: PNG, JPG, GIF (max 25MB)
              </p>
            </motion.div>

            {/* Results Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-[#0f1f35]/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 sm:p-6 md:p-8"
            >
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-teal-500/20 flex items-center justify-center text-teal-400 text-sm font-bold">2</span>
                Analysis Results
              </h2>

              {processedResult ? (
                <div className="space-y-6">
                  {/* Validation warning from backend */}
                  {processedResult.warning && (
                    <div className="p-4 bg-yellow-500/20 border border-yellow-500/30 rounded-xl flex items-start gap-3">
                      <FiAlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" />
                      <p className="text-yellow-300 text-sm">{processedResult.warning}</p>
                    </div>
                  )}

                  {/* Processed Image */}
                  <div className="relative rounded-xl overflow-hidden bg-gray-900/50">
                    <img
                      src={`${API_BASE}/xray/download/${processedResult.processed_image_url}`}
                      alt="Processed X-Ray"
                      className="w-full h-auto object-contain"
                    />
                  </div>

                  {/* Status Banner */}
                  <div className={`p-4 rounded-xl flex items-center gap-3 ${hasAbnormalities ? 'bg-yellow-500/20 border border-yellow-500/30' : 'bg-green-500/20 border border-green-500/30'}`}>
                    {hasAbnormalities ? (
                      <>
                        <FiAlertCircle className="w-5 h-5 text-yellow-400" />
                        <span className="text-yellow-300 font-medium">{filteredDetections.length} abnormalit{filteredDetections.length > 1 ? 'ies' : 'y'} detected</span>
                      </>
                    ) : (
                      <>
                        <FiCheckCircle className="w-5 h-5 text-green-400" />
                        <span className="text-green-300 font-medium">No abnormalities detected</span>
                      </>
                    )}
                  </div>

                  {/* Prompt: when a metal implant is detected, ask the user to
                      identify it so dissolvability comes from real input rather
                      than being assumed for every metal. */}
                  {hasMetal && (
                    <div className="p-3 bg-teal-500/10 border border-teal-500/30 rounded-xl flex items-start gap-2">
                      <FiInfo className="w-4 h-4 text-teal-300 shrink-0 mt-0.5" />
                      <p className="text-teal-200 text-xs">
                        A metal implant was detected. Choose its metal type in the Dissolve Forecast
                        column to see whether it is dissolvable and its estimated resorption time.
                      </p>
                    </div>
                  )}

                  {/* Detections Table */}
                  {hasAbnormalities && (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-700">
                            <th className="text-left py-3 px-2 text-slate-400 text-sm font-medium">Finding</th>
                            <th className="text-left py-3 px-2 text-slate-400 text-sm font-medium">Confidence</th>
                            <th className="text-left py-3 px-2 text-slate-400 text-sm font-medium hidden sm:table-cell">Healing Time</th>
                            <th className="text-left py-3 px-2 text-slate-400 text-sm font-medium hidden md:table-cell">Dissolve Forecast</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredDetections.map((detection, index) => (
                            <motion.tr
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="border-b border-gray-700/50"
                            >
                              <td className="py-3 px-2">
                                <span className="capitalize text-white font-medium">{detection.class_name}</span>
                              </td>
                              <td className="py-3 px-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getSeverityColor(detection.confidence)}`}>
                                  {(detection.confidence * 100).toFixed(1)}%
                                </span>
                              </td>
                              <td className="py-3 px-2 text-slate-300 hidden sm:table-cell">{getHealingInfo(detection)}</td>
                              <td className="py-3 px-2 hidden md:table-cell">
                                {detection.class_name === "metal" ? (
                                  <div className="flex flex-col gap-1.5 min-w-[12rem]">
                                    <select
                                      value={metalChoices[index] ?? ''}
                                      onChange={(e) =>
                                        setMetalChoices((prev) => ({ ...prev, [index]: e.target.value }))
                                      }
                                      aria-label="Select detected metal type"
                                      className="bg-gray-800 border border-slate-600 text-slate-200 text-xs rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-teal-500"
                                    >
                                      <option value="">Select metal type…</option>
                                      {Object.entries(METAL_PROFILES).map(([key, profile]) => (
                                        <option key={key} value={key}>{profile.label}</option>
                                      ))}
                                    </select>
                                    {renderMetalForecast(index)}
                                  </div>
                                ) : (
                                  <span className="text-slate-300">N/A</span>
                                )}
                              </td>
                            </motion.tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Dissolvability disclaimer (shown only when a metal is present) */}
                  {hasMetal && (
                    <p className="text-xs text-slate-500">
                      Dissolvability is based on the metal type you select. Time estimates are
                      general, literature-based resorption ranges for biodegradable implants — not
                      patient-specific medical guidance. Confirm the implant material and plan with
                      a qualified clinician.
                    </p>
                  )}

                  {/* Download Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDownload(processedResult.processed_image_url, 'processed-xray.png')}
                      className="flex-1 flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                    >
                      <FiDownload className="w-5 h-5" />
                      Download Image
                    </motion.button>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleDownload(processedResult.report_url || processedResult.detections_url, 'detection_report.txt')}
                      className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
                    >
                      <FiFileText className="w-5 h-5" />
                      Download Report
                    </motion.button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-20 h-20 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                    <svg className="w-10 h-10 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-slate-400 font-medium mb-2">No results yet</p>
                  <p className="text-slate-500 text-sm">Upload an X-ray image to see analysis results</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default XRayUpload;
