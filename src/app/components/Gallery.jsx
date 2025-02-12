"use client";
import Image from "next/image";

export default function Gallery() {
  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          Various memories that have been together
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6 col-12">
              <h4 className="text-danger">💖 วาเลนไทน์ 💖 </h4>
              ในทุกๆ ปี มีวันหนึ่งที่พิเศษกว่าวันไหนๆ วันนั้นคือ วันวาเลนไทน์
              วันที่ไม่ใช่แค่เทศกาลแห่งความรัก
              แต่เป็นโอกาสที่เราจะได้บอกกับใครบางคนว่า…
              เขาคือคนสำคัญที่สุดในชีวิตของเรา 💑✨
              ความรักไม่ได้ยิ่งใหญ่เพราะของขวัญราคาแพง หรือดอกกุหลาบช่อโต 💐
              แต่ยิ่งใหญ่เพราะการมีอยู่ของ "ใครบางคน" ที่ทำให้ทุกๆ วันมีความหมาย
              🥰 ไม่ว่าจะเป็นรอยยิ้มในตอนเช้า คำพูดห่วงใยในทุกๆ วัน
              หรือการจับมือกันในวันที่เหนื่อยล้า วาเลนไทน์ปีนี้…อยากบอกเธอว่า 💖
              ขอบคุณที่อยู่ข้างกันในทุกช่วงเวลา 💖
              ขอบคุณที่เป็นเหตุผลให้หัวใจเต้นแรง 💖 ขอบคุณที่ทำให้ทุกๆ
              วันมีความสุขมากขึ้น ไม่มีคำไหนจะบรรยายความรู้สึกดีๆ ได้เท่ากับ…
              ฉันรักเธอ
              <p>❤️ สุขสันต์วันวาเลนไทน์น๊าาาา 🎀💌</p>
              <p className="text-danger">
                ปล. กูให้ ChatGPT เจนบทความนี้ขึ้นมา 😂😂
              </p>
            </div>
            <div className="col-md-6 col-12">
              <div
                id="carouselGallery"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner">
                  {[
                    "/assets/1.jpg",
                    "/assets/2.jpg",
                    "/assets/3.JPEG",
                    "/assets/5.jpg",
                    "/assets/6.JPG",
                    "/assets/7.png",
                    "/assets/8.png",
                    "/assets/9.jpg",
                    "/assets/10.jpg",
                    "/assets/11.jpg",
                    "/assets/12.jpg",
                    "/assets/13.jpg",
                    "/assets/14.jpg",
                    "/assets/15.jpg",
                  ].map((src, index) => (
                    <div
                      key={index}
                      className={`carousel-item ${index === 0 ? "active" : ""}`}
                    >
                      <Image
                        src={src}
                        alt={`Gallery Image ${index + 1}`}
                        width={400} // ลดขนาดรูป
                        height={250} // ลดขนาดรูป
                        className="d-block w-100"
                        style={{
                          objectFit: "cover",
                          maxWidth: "100%", // ทำให้ responsive
                          height: "auto", // ให้สูงปรับตามสัดส่วน
                          borderRadius: "10px", // ทำให้มีขอบมนเล็กน้อย (ถ้าต้องการ)
                        }}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselGallery"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselGallery"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
