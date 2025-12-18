//@ts-nocheck
"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
// replace icons with your own if needed
import {
  FiCircle,
  FiCode,
  FiFileText,
  FiLayers,
  FiLayout,
} from "react-icons/fi";
import Image from "next/image";
import { Button } from "../ui/button";
import { MdOutlineDashboardCustomize } from "react-icons/md";

const DEFAULT_ITEMS = [
  {
    title: "Add your transaction",
    description: "Easily add income and expenses.",
    id: 1,
    icon: <FiFileText className="h-[16px] w-[16px] " />,
    imageSrc: "/transaction-form.png",
  },
  {
    title: "Streamline Your Transaction Flows",
    description:
      "With our intuitive interface, you can easily see all your transactions at a glance.",
    id: 2,
    imageSrc: "/test.png",
    icon: <MdOutlineDashboardCustomize className="h-[16px] w-[16px] " />,
  },
  {
    title: "Display All Transactions in One Place",
    description: "View all your financial transactions in a single,table ",
    id: 3,
    icon: <FiLayers className="h-[16px] w-[16px] " />,
    imageSrc: "/transactions-table.png",
  },
];

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

function CarouselItem({
  item,
  index,
  itemWidth,
  round,
  trackItemOffset,
  x,
  transition,
}) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className={`relative shrink-0 flex flex-col ${
        round
          ? "items-center justify-center text-center  border-0"
          : "items-start justify-between  backdrop-blur-sm border rounded-[12px]"
      } overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{
        width: "100%",
        height: round ? itemWidth : "700px",
        rotateY: rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={transition}
    >
      <div className={`${round ? "p-0 m-0" : "mb-4 p-5"}`}>
        <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full ">
          {item.icon}
        </span>
      </div>
      <div className="flex-1 flex items-center justify-center w-full">
        <Image
          className="rounded-lg"
          src={item.imageSrc}
          alt="decorative bg"
          width={600}
          height={300}
        />
      </div>
      <div className="p-5">
        <div className="mb-1 font-black text-lg ">{item.title}</div>
        <p className="text-sm ">{item.description}</p>
      </div>
    </motion.div>
  );
}

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}) {
  const containerPadding = 16;
  const [containerWidth, setContainerWidth] = useState(baseWidth);

  // Memoize itemWidth and trackItemOffset
  const itemWidth = useMemo(
    () => containerWidth - containerPadding * 2,
    [containerWidth]
  );

  const trackItemOffset = useMemo(() => itemWidth + GAP, [itemWidth]);
  const itemsForRender = useMemo(() => {
    if (!loop) return items;
    if (items.length === 0) return [];
    return [items[items.length - 1], ...items, items[0]];
  }, [items, loop]);

  const [position, setPosition] = useState(loop ? 1 : 0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);
  // Add resize observer to track container width
  useEffect(() => {
    if (!containerRef.current) return;

    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth;
        setContainerWidth(width);
      }
    };

    // Initial measurement
    updateWidth();

    // Update on resize
    const resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (!autoplay || itemsForRender.length <= 1) return undefined;
    if (pauseOnHover && isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, autoplayDelay);

    return () => clearInterval(timer);
  }, [autoplay, autoplayDelay, isHovered, pauseOnHover, itemsForRender.length]);

  useEffect(() => {
    const startingPosition = loop ? 1 : 0;
    setPosition(startingPosition);
    x.set(-startingPosition * trackItemOffset);
  }, [items.length, loop, trackItemOffset, x]);

  useEffect(() => {
    if (!loop && position > itemsForRender.length - 1) {
      setPosition(Math.max(0, itemsForRender.length - 1));
    }
  }, [itemsForRender.length, loop, position]);

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (!loop || itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = items.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
        ? -1
        : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
          right: 0,
        },
      };

  const activeIndex =
    items.length === 0
      ? 0
      : loop
      ? (position - 1 + items.length) % items.length
      : Math.min(position, items.length - 1);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-4  ${
        round ? "rounded-full border border-white" : "rounded-[24px] "
      }`}
      style={{
        width: `100%`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex "
        drag={isAnimating ? false : "x"}
        {...dragProps}
        style={{
          width: "100%",
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${
            position * trackItemOffset + itemWidth / 2
          }px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(position * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        {itemsForRender.map((item, index) => (
          <CarouselItem
            key={`${item?.id ?? index}-${index}`}
            item={item}
            index={index}
            itemWidth={itemWidth}
            round={round}
            trackItemOffset={trackItemOffset}
            x={x}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <button
              className="h-4 w-4 cursor-pointer p-0 "
              onClick={() => setPosition(loop ? index + 1 : index)}
              key={index}
            >
              <motion.div
                className={`h-2 w-2 rounded-full transition-colors duration-150 ${
                  activeIndex === index
                    ? round
                      ? "bg-"
                      : "bg-primary"
                    : round
                    ? "bg-red-500"
                    : "bg-primary/65"
                }`}
                animate={{
                  scale: activeIndex === index ? 1.2 : 1,
                }}
                transition={{ duration: 0.15 }}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
