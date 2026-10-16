import { forwardRef, useRef } from "react";
import { Download, X } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import Resume from "./Resume";

// Native <dialog> gives us Esc-to-close, focus trapping, and a backdrop for free.
const ResumeDialog = forwardRef(function ResumeDialog(_props, ref) {
  const paperRef = useRef(null);
  const print = useReactToPrint({
    contentRef: paperRef,
    documentTitle: "Keyn_Brosdahl_Resume",
    pageStyle: "@page { size: letter; margin: 0.5in; }",
  });

  const close = () => ref.current?.close();

  return (
    <dialog
      ref={ref}
      aria-label="Résumé"
      onClick={(e) => e.target === e.currentTarget && close()}
      className="m-auto h-[min(92svh,1100px)] w-[min(92vw,820px)] max-w-none overflow-hidden rounded-2xl bg-neutral-900 p-0 text-white shadow-2xl"
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <p className="text-sm font-medium">Résumé</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={print}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-sage"
            >
              <Download size={15} /> Download PDF
            </button>
            <button
              type="button"
              onClick={close}
              aria-label="Close résumé"
              className="cursor-pointer rounded-full p-2 text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-neutral-800 p-3 sm:p-6">
          <div ref={paperRef} className="mx-auto max-w-[8.5in] overflow-hidden rounded-md shadow-lg">
            <Resume />
          </div>
        </div>
      </div>
    </dialog>
  );
});

export default ResumeDialog;
