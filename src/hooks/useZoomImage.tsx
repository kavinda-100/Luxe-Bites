"use client";

import React from "react";

export function useZoomImage() {
  const [position, setPosition] = React.useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLDivElement;
    const { left, top, width, height } = target.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setPosition({ x, y });
  };

  return {
    position,
    handleMouseMove,
  };
}

//* example JSX usage:
// <div
//   className="image-container"
//   style={{
//     height: "300px",
//   }}
//   onMouseMove={(e) => handleMouseMove(e)}
// >
//   <img
//     src={image}
//     alt={name}
//     className={"zoom-image"}
//     style={{
//       transformOrigin: `${position.x}% ${position.y}%`,
//     }}
//   />
// </div>

//* example CSS usage:
//.image-container {
//     position: relative;
//     overflow: hidden;
//     border-radius: 10px;
//     width: 100%;
//     /* Adjust the height as needed form the div */
// }
//
// .zoom-image {
//     width: 100%;
//     height: 100%;
//     border-radius: 10px;
//     object-fit: cover;
//     transition: transform 0.3s ease;
// }
//
// .image-container:hover .zoom-image {
//     transform: scale(1.5); /* Adjust the scale as needed */
// }
