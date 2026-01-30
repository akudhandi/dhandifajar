'use client';

import { motion, useTransform, MotionValue } from 'motion/react';
import React from 'react';

interface DockItemProps {
  icon: React.ReactNode;
  index: number;
  total: number;
  hover: MotionValue<number>;
  baseSize: number;
  magnification: number;
  onClick?: () => void;
}

const DockItem: React.FC<DockItemProps> = ({
  icon,
  index,
  total,
  hover,
  baseSize,
  magnification,
  onClick
}) => {
  const center = (total - 1) / 2;
  const offset = index - center;

  // size membesar saat hover
  const size = useTransform(
    hover,
    [0, 1],
    [baseSize, magnification]
  );

  // 🔥 SEBAR KE SAMPING
  const x = useTransform(
    hover,
    [0, 1],
    [offset * 6, offset * 28]
  );

  const y = useTransform(
    hover,
    [0, 1],
    [0, Math.abs(offset) * -6]
  );

  return (
    <motion.button
      onClick={onClick}
      style={{ width: size, height: size, x, y }}
      className="dock-item"
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
    >
      {icon}
    </motion.button>
  );
};

export default DockItem;

