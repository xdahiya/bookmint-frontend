"use client";
import { allCategories } from "@/config/docs";
import { motion, useTransform, useScroll } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";

export const Categories = () => {
  return (
    <>
      <div className="bg-[url('/bg-pattern.png')] bg-no-repeat bg-bottom bg-contain lg:bg-cover bg-fixed">
        {/* <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase ">Scroll down</span>
      </div> */}
        <HorizontalScrollCarousel />
        {/* <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase ">Scroll up</span>
      </div> */}
      </div>
    </>
  );
};

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x1 = useTransform(scrollYProgress, [0, 1], ["1%", "-25%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["1%", "-75%"]);

  return (
    <section ref={targetRef} className="relative h-[200vh] ">
      <div className="sticky top-[30%] flex h-[40vh] items-center overflow-hidden md:hidden">
        <motion.div style={{ x: x2 }} className="flex gap-4">
          {allCategories.map((card: any, index: any) => {
            return <Card card={card} id={index} key={index} />;
          })}
        </motion.div>
      </div>
      <div className="sticky top-[30%] hidden h-[40vh] items-center overflow-hidden md:flex">
        <motion.div style={{ x: x1 }} className="flex gap-4">
          {allCategories.map((card: any, index: any) => {
            return <Card card={card} id={index} key={index} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

const Card = ({ card }: any) => {
  return (
    <Link href={card.url} key={card.id}>
      <div className="group relative md:h-[200px] md:w-[200px]  h-[150px] w-[150px] overflow-hidden ">
        <div
          style={{
            backgroundImage: `url(${card.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
          className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110"
        ></div>
        <div className="absolute inset-0 z-10 grid place-content-center">
          <p className=" p-8 text-md md:text-2xl font-black uppercase  backdrop-blur-lg">
            {card.name}
          </p>
        </div>
      </div>
    </Link>
  );
};
