"use client";
import React from "react";
import { motion } from "framer-motion";

export interface TestimonialItem {
  text: string;
  image: string;
  name: string;
  role: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: TestimonialItem[];
  duration?: number;
}) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-black"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ text, image, name, role }, i) => (
                <div 
                  className="p-8 rounded-3xl border border-neutral-800 bg-neutral-900/40 text-white shadow-xl shadow-blue-500/5 max-w-xs w-full flex flex-col justify-between hover:border-blue-900/50 transition-colors duration-300" 
                  key={`${index}-${i}`}
                >
                  <div className="text-xs text-neutral-300 leading-relaxed font-normal italic">"{text}"</div>
                  <div className="flex items-center gap-3 mt-6 pt-4 border-t border-neutral-850">
                    <img
                      width={36}
                      height={36}
                      referrerPolicy="no-referrer"
                      src={image}
                      alt={name}
                      className="h-9 w-9 rounded-full object-cover border border-neutral-800"
                    />
                    <div className="flex flex-col text-left">
                      <div className="font-bold text-white text-xs tracking-tight leading-4">{name}</div>
                      <div className="text-[10px] text-neutral-400 font-medium leading-4 tracking-tight">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
