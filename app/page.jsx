"use client"

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Scrollbar } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/navigation';
import './page.css'
import Stars from "@/components/Stars";


export default function Home() {
  const [products, setProducts] = useState([]);
  const [color, setColor] = useState({});


  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        const initialColors = {};
        data.forEach((_, i) => {
          initialColors[i] = "yellow";
        });
        setColor(initialColors);
      });
  }, []);

  const handleColorChange = (index, newColor) => {
    setColor((prev) => ({
      ...prev,
      [index]: newColor,
    }));
  };

  return (
    <div className="container">
      <h1>Product List</h1>
      <div className="home">
        <Swiper
          modules={[Navigation, Scrollbar]}
          navigation
          scrollbar={{ draggable: true }}
          spaceBetween={30}
          slidesOffsetBefore={50}
          slidesPerView={4}
          breakpoints={{
            1024: { slidesPerView: 4 },
            768: { slidesPerView: 3 },
            480: { slidesPerView: 2 },
            0: { slidesPerView: 1 },
          }}
        >
          {products.map((product, i) => (
            <SwiperSlide className="swiper-slide" key={i}>
              <img src={product.images[color[i]]} width={200} alt="" />
              <h2>{product.name}</h2>
              <h3>${product.dynamicPriceUsd} USD</h3>
              <div className="btn">
                <button className={`yellow color-btn ${color[i] === "yellow" ? "selected" : ""}`} onClick={() => handleColorChange(i, "yellow")}></button>
                <button className={`white color-btn ${color[i] === "white" ? "selected" : ""}`} onClick={() => handleColorChange(i, "white")}></button>
                <button className={`rose color-btn ${color[i] === "rose" ? "selected" : ""}`} onClick={() => handleColorChange(i, "rose")}></button>
              </div>
              <p>{color[i]} Gold</p>
              <div className="stars">
                <Stars rating={product.popularityScore} />
                <p className="rate">{product.popularityScore}/5</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
