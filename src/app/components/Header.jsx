"use client"
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";

function Header() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <header className="position-relative w-100 vh-100 overflow-hidden bg-light">
      <div className="position-absolute top-0 start-0 w-100 h-100">
        <Image
          src="/assets/valentine-bg.jpg"
          alt="Valentine 2025"
          layout="fill"
          objectFit="cover"
          priority={true}
          className="w-100 h-100 opacity-75"
        />
      </div>
      <div
        data-aos="fade-up"
        className="position-relative z-1 text-center text-white d-flex flex-column justify-content-center align-items-center h-100 px-3"
      >
        <h1 className="display-3 fw-bold text-shadow text-pink">
          Happy Valentine’s Day in 2025
        </h1>
        <h2 className="fw-bold fw-light">E3N</h2>

        {/* ปุ่มเปิด/ปิดเสียงเพลง */}
        <button
          onClick={toggleAudio}
          className="btn btn-light mt-4 shadow-lg rounded-circle"
        >
          {isPlaying ? "🔊 Stop Music" : "🎶 Play Music"}
        </button>
        <audio ref={audioRef} loop>
          <source src="/assets/flightless_bird.mp3" type="audio/mp3" />
        </audio>

        {/* ไอคอน Scroll Down */}
        <div className="text-center mt-4">
          <p className="fw-light">คลิกเพื่อดูแกลลอรี่</p>
          <a href="#gallery" className="text-decoration-none">
            <i className="bi bi-arrow-down-circle-fill fs-1 text-danger animate__animated animate__bounce infinite"></i>
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;
