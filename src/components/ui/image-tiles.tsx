'use client';

/** Animated five-image tile stack with spring-driven scatter and hover lifts */

import { motion, Variants } from 'framer-motion';
import Image from 'next/image';

interface ImageRevealProps {
  images: [string, string, string, string, string];
}

const containerVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { delay: 0.2, staggerChildren: 0.15 },
  },
};

const SPRING_ENTER = { type: 'spring' as const, stiffness: 120, damping: 14 };
const SPRING_HOVER = { type: 'spring' as const, stiffness: 200, damping: 15 };

const tileVariants: Variants[] = [
  // Far left
  {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: -10, x: -280, y: 24, transition: SPRING_ENTER },
    hover:   { rotate: -2, x: -290, y: 10, transition: SPRING_HOVER },
  },
  // Left
  {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: -5, x: -140, y: 8, transition: SPRING_ENTER },
    hover:   { rotate: 1,  x: -148, y: 0, transition: SPRING_HOVER },
  },
  // Middle
  {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: 6,  x: 0, y: 0, transition: SPRING_ENTER },
    hover:   { rotate: 0,  x: 0, y: -10, transition: SPRING_HOVER },
  },
  // Right
  {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: -4, x: 140, y: 16, transition: SPRING_ENTER },
    hover:   { rotate: 2,  x: 148, y: 6,  transition: SPRING_HOVER },
  },
  // Far right
  {
    initial: { rotate: 0, x: 0, y: 0 },
    animate: { rotate: 9,  x: 280, y: 28, transition: SPRING_ENTER },
    hover:   { rotate: 3,  x: 288, y: 16, transition: SPRING_HOVER },
  },
];

const zIndices = [50, 40, 30, 20, 10];

export default function ImageReveal({ images }: ImageRevealProps) {
  return (
    <motion.div
      className="relative flex items-center justify-center w-64 h-64 my-16"
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      {images.map((src, i) => (
        <motion.div
          key={i}
          className="absolute w-48 h-48 overflow-hidden rounded-xl shadow-lg bg-white"
          style={{ zIndex: zIndices[i], originX: i < 2 ? '100%' : i === 2 ? '50%' : '0%' }}
          variants={tileVariants[i]}
          whileHover="hover"
          animate="animate"
        >
          <Image
            src={src}
            alt={`Brand ${i + 1}`}
            fill
            sizes="192px"
            className="object-cover p-2 rounded-xl"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
