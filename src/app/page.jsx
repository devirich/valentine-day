"use client";
import { useState } from "react";
import styles from "./page.module.css";
import Gallery from "./components/Gallery";
import CardGallery from "./components/CardGallery";

export default function Home() {
  const [explode, setExplode] = useState(false);
  const [hearts, setHearts] = useState([]);

  const handleHeartClick = () => {
    setExplode(true);

    // สร้างหัวใจเล็กๆ จำนวน 20 ดวงแบบสุ่ม
    const newHearts = Array.from({ length: 200 }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100 + "vw",
      animationDelay: Math.random() * 2 + "s",
    }));

    setHearts(newHearts);

    setTimeout(() => {
      setExplode(false);
      setHearts([]);
    }, 4500); // รีเซ็ตหลังจาก 1.5 วินาที
  };

  return (
    <div className="mt-5 mb-5">
      <main>
        <div className="container text-center">
          <div className="mt-5 mb-5">
            <CardGallery />
          </div>
          <div className="row">
            <div className="col">
              <div
                className={`${styles.heart} ${explode ? styles.explode : ""}`}
                onClick={handleHeartClick}
              >
                <h5>Click Here!</h5>
                ❤️
              </div>
            </div>
          </div>
          <Gallery />
        </div>
      </main>

      {/* แสดงหัวใจเล็ก ๆ ที่ตกลงมาบนหน้าจอ */}
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={styles.fallingHeart}
          style={{ left: heart.left, animationDelay: heart.animationDelay }}
        >
          ❤️
        </div>
      ))}
    </div>
  );
}
