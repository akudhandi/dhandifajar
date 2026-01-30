'use client';

import React, {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  ReactElement,
  ReactNode,
  useEffect,
  useMemo,
  useRef
} from 'react';
import gsap from 'gsap';
import './CardSwap.css';

export interface CardSwapProps {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (idx: number) => void;
  skewAmount?: number;
  easing?: 'linear' | 'elastic';
  children: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  customClass?: string;
}

// Gunakan React.HTMLAttributes untuk menghindari konflik ref di cloneElement
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ customClass, ...rest }, ref) => (
    <div
      ref={ref}
      {...rest}
      className={`card ${customClass ?? ''} ${rest.className ?? ''}`.trim()}
    />
  )
);
Card.displayName = 'Card';

interface Slot {
  x: number;
  y: number;
  z: number;
  zIndex: number;
}

const makeSlot = (i: number, distX: number, distY: number, total: number): Slot => ({
  x: i * distX,
  y: -i * distY,
  z: -i * distX * 1.5,
  zIndex: total - i
});

const placeNow = (el: HTMLElement, slot: Slot, skew: number) => {
  gsap.set(el, {
    x: slot.x,
    y: slot.y,
    z: slot.z,
    xPercent: -50,
    yPercent: -50,
    skewY: skew,
    transformOrigin: 'center center',
    zIndex: slot.zIndex,
    force3D: true
  });
};

const CardSwap: React.FC<CardSwapProps> = ({
  width = 800,
  height = 600,
  cardDistance = 60,
  verticalDistance = 70,
  delay = 3000,
  pauseOnHover = true,
  onCardClick,
  skewAmount = 6,
  easing = 'elastic',
  children
}) => {
  const config =
    easing === 'elastic'
      ? {
          ease: 'elastic.out(0.6,0.9)',
          durDrop: 2,
          durMove: 2,
          durReturn: 2,
          promoteOverlap: 0.9,
          returnDelay: 0.05
        }
      : {
          ease: 'power1.inOut',
          durDrop: 0.8,
          durMove: 0.8,
          durReturn: 0.8,
          promoteOverlap: 0.45,
          returnDelay: 0.2
        };

  const childArr = useMemo(
    () => Children.toArray(children) as ReactElement<CardProps>[],
    [children]
  );

  const refs = useRef<(HTMLDivElement | null)[]>([]);

  const order = useRef<number[]>(Array.from({ length: childArr.length }, (_, i) => i));
  const container = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const total = childArr.length;

    const swap = () => {
      if (order.current.length < 2) return;

      const [front, ...rest] = order.current;
      const elFront = refs.current[front];
      if (!elFront) return;

      const tl = gsap.timeline();
      tlRef.current = tl;

      tl.to(elFront, {
        y: '+=500',
        duration: config.durDrop,
        ease: config.ease
      });

      tl.addLabel('promote', `-=${config.durDrop * config.promoteOverlap}`);

      rest.forEach((idx, i) => {
        const el = refs.current[idx];
        if (!el) return;

        const slot = makeSlot(i, cardDistance, verticalDistance, total);
        tl.set(el, { zIndex: slot.zIndex }, 'promote');
        tl.to(
          el,
          {
            x: slot.x,
            y: slot.y,
            z: slot.z,
            duration: config.durMove,
            ease: config.ease
          },
          `promote+=${i * 0.15}`
        );
      });

      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);

      tl.addLabel('return', `promote+=${config.durMove * config.returnDelay}`);
      // Perbaikan error "Type Tween is not assignable to void"
      tl.call(() => { gsap.set(elFront, { zIndex: backSlot.zIndex }); }, undefined, 'return');

      tl.to(
        elFront,
        {
          x: backSlot.x,
          y: backSlot.y,
          z: backSlot.z,
          duration: config.durReturn,
          ease: config.ease
        },
        'return'
      );

      tl.call(() => {
        order.current = [...rest, front];
      });
    };

    // Initial placement
    refs.current.forEach((el, i) => {
      if (el) placeNow(el, makeSlot(i, cardDistance, verticalDistance, total), skewAmount);
    });

    intervalRef.current = setInterval(swap, delay);
    startedRef.current = true;

    if (pauseOnHover && container.current) {
      const node = container.current;
      const pause = () => {
        tlRef.current?.pause();
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
      const resume = () => {
        intervalRef.current = setInterval(swap, delay);
      };

      node.addEventListener('mouseenter', pause);
      node.addEventListener('mouseleave', resume);

      return () => {
        node.removeEventListener('mouseenter', pause);
        node.removeEventListener('mouseleave', resume);
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [cardDistance, verticalDistance, delay, pauseOnHover, skewAmount, easing, childArr.length]);

  return (
    <div 
      ref={container} 
      className="card-swap-container" 
      style={{ 
        width, 
        height, 
        position: 'relative', 
        overflow: 'visible' // KUNCI AGAR TIDAK TERPOTONG
      }}
    >
      {childArr.map((child, i) => (
        isValidElement<CardProps>(child) ? (
          cloneElement(child, {
            ...child.props,
            key: i,
            // Perbaikan error Ref
            ref: (el: HTMLDivElement) => { refs.current[i] = el; },
            style: { 
              width, 
              height, 
              position: 'absolute',
              top: '50%',
              left: '50%',
              ...child.props.style 
            },
            onClick: (e: React.MouseEvent<HTMLDivElement>) => {
              child.props.onClick?.(e);
              onCardClick?.(i);
            }
          })
        ) : child
      ))}
    </div>
  );
};

export default CardSwap;