"use client";

import React from "react";
import dynamic from "next/dynamic";

const Slider = dynamic(() => import("./Slider"), { ssr: false });

interface SliderWrapperProps {
  images: any[]; // Replace 'any' with the appropriate type if known
}

const SliderWrapper: React.FC<SliderWrapperProps> = ({ images }) => {
  return <Slider images={images} />;
};

export default SliderWrapper;
