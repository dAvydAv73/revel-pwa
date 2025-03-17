//nextJs/components/ListItem/ListItem.js
"use client"
import React, { useMemo } from "react";
import { useInView } from "react-intersection-observer";

export const ListItem = ({ children, index = 0 }) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const styles = useMemo(() => ({
   // transform: inView ? "none" : "translateX(-100px)",
    opacity: inView ? 0.8 : 0,
    transition: `all 0.5s ease-in ${index * 0.2}s`,
    color: '#212121',
  }), [inView, index]);

  return (
    
      <li
        ref={ref}
        style={styles}
        className="flex items-start gap-3"
      >
        <span className="inline-block w-2 h-2 mt-2 pt-2 bg-[#212121] opacity-80 rounded-full"></span>
        <div className="flex-1 ">{children}</div>
      </li>
    
  );
};