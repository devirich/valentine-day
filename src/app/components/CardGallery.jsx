"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import AOS from "aos";

export default function Gallery() {
  const images = [
    "/assets/101.jpg",
    "/assets/102.jpg",
    "/assets/103.jpg",
    "/assets/104.jpg",
    "/assets/105.jpg",
    "/assets/106.jpg",
    "/assets/107.jpg",
    "/assets/108.jpg",
  ];
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // ป้องกันปัญหา Hydration Failed
    AOS.init({ duration: 1000, once: true });
  }, []);

  if (!isClient) return null; // รอให้โหลดฝั่ง Client ก่อนค่อยแสดง Component

  return (
    <div className="container mt-5" id="gallery">
      <h2 className="text-center mb-4">Gallery</h2>
      <div className="row">
        {images.map((src, index) => (
          <div
            key={index}
            className="col-lg-3 col-md-6 col-12 mb-4"
            data-aos={index % 2 === 0 ? "flip-right" : "flip-left"}
          >
            <div className="card border-0 shadow-sm hover-effect">
              <div className="image-container">
                <Image
                  src={src}
                  alt={`Gallery Image ${index + 1}`}
                  layout="fill"
                  className="card-img-top"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .image-container {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
        }
        .card-img-top {
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }
        .hover-effect:hover .card-img-top {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
