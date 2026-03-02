/* eslint-disable no-unused-vars */

import { Button } from "../ui/Button";
import { motion } from "framer-motion";

const HeroButtons = ({ onOpenResume, onScrollToWork }) => {
  const btnStyle = "rounded-full px-8 py-6 text-sm font-bold uppercase tracking-wider transition-all duration-300";

  return (
    <>
    <div className="heroBtn_wrapper flex gap-4 justify-between">
      <div className="flex flex-wrap items-center justify-center gap-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button size="lg" 
        onClick={onScrollToWork}
        className={`${btnStyle} bg-white text-black hover:bg-diner-crimson hover:text-white border-none`}>
          Explore Work
        </Button>
      </motion.div>
    </div>

    <div className="flex flex-wrap items-center justify-center gap-4">
      
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button 
          onClick={onOpenResume} 
          variant="outline" 
          size="lg" 
          className={`${btnStyle} border-white/20 text-white hover:bg-white/10`}
        >
          View Résumé
        </Button>
      </motion.div>
    </div>
    </div>
    </>
  );
};

export default HeroButtons;