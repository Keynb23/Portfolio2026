/* eslint-disable no-unused-vars */
import { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, FileText, Download } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Button } from "../ui/Button";
import { RESUME } from "./RESUME"; // Import the file you shared

/**
 * ResumeModal - Handles the overlay and PDF printing logic
 */
export const ResumeModal = ({ isOpen, onClose }) => {
  const resumeRef = useRef(null);

  // Logic to handle PDF Generation
  const handlePrint = useReactToPrint({
    contentRef: resumeRef,
    documentTitle: "Keyn_Brosdahl_Resume",
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <Motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-1000 flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-xl"
          onClick={onClose}
        >
          <Motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-zinc-900 border border-white/10 w-full max-w-4xl max-h-[90vh] rounded-4xl overflow-hidden flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="p-6 md:p-10 border-b border-white/5 flex justify-between items-center bg-zinc-900/50 sticky top-0 z-10">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-diner-crimson rounded-xl text-white">
                  <FileText size={24} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tighter">My Résumé</h3>
                </div>
              </div>
              <button onClick={onClose} className="p-3 rounded-full hover:bg-white/10 text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Scrollable Body - This is where your RESUME.jsx content lives */}
            <div className="grow overflow-y-auto p-8 md:p-16 custom-scrollbar bg-zinc-900 text-zinc-300">
              <div ref={resumeRef} className="print:p-8 print:bg-white">
                <RESUME />
              </div>
            </div>

            {/* Footer / Action Bar */}
            <div className="p-6 bg-zinc-950 border-t border-white/5 flex justify-center">
              <Button variant="primary" className="rounded-full px-12 gap-3 group" onClick={handlePrint}>
                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
                <span>Download PDF</span>
              </Button>
            </div>
          </Motion.div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
};