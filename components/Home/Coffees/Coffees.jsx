"use client"; 
import { useState } from "react";
import Image from "next/image";
import styles from "./Coffees.module.css";
import coffeeBagImg from "./coffees.png";

export default function Coffees() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const coffeeData = [
    { id: 1, name: "Indonesia Banner Mariah Triple Wet Hull", notes: "Citrus, nutty, chocolate", price: "AED 60", image: coffeeBagImg },
    { id: 2, name: "Indonesia Banner Mariah Triple Wet Hull", notes: "Citrus, nutty, chocolate", price: "AED 60", image: coffeeBagImg },
    { id: 3, name: "Indonesia Banner Mariah Triple Wet Hull", notes: "Citrus, nutty, chocolate", price: "AED 60", image: coffeeBagImg },
    { id: 4, name: "Indonesia Banner Mariah Triple Wet Hull", notes: "Citrus, nutty, chocolate", price: "AED 60", image: coffeeBagImg },
  ];

  const cardsToShow = 3; 
  const maxIndex = coffeeData.length - cardsToShow;

  const nextSlide = () => {
    if (currentIndex < maxIndex) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <section className={styles.selectedSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.headerText}>
          <h2 className={styles.selectedHeading}>Selected Coffees</h2>
          <p className={styles.selectedSubtext}>
            The White Mantis coffee experience, delivered seamlessly to your door. Subscribe for a  never-ending supply of excellence.
          </p>
        </div>

        <div className={styles.sliderControls}>
          <button 
            className={`${styles.arrowBtn} ${currentIndex === 0 ? styles.disabled : ""}`} 
            onClick={prevSlide}
            disabled={currentIndex === 0}
          >
           <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.75 0.75L0.75 6.75L6.75 12.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </button>

          <button 
            className={`${styles.arrowBtn} ${currentIndex >= maxIndex ? styles.disabled : styles.activeBtn}`} 
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
          >
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.75 0.75L6.75 6.75L0.75 12.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          </button>
        </div>
      </div>
 {/* Pervious Next */}
      <div className={styles.sliderWindow}>
        <div 
          className={styles.coffeeGrid} 
          style={{ transform: `translateX(-${currentIndex * (100 / cardsToShow)}%)` }} 
        >
          {coffeeData.map((coffee) => (
            <div key={coffee.id} className={styles.coffeeCard}>
              
             
              <div className={styles.productImageWrapper}>
                <Image
                  src={coffee.image}
                  alt={coffee.name}
                  width={300}
                  height={400}
                  className={styles.productImg}
                  priority
                />
              </div>

              <div className={styles.cardTop}>
                <div className={styles.cardInfo}>
                  <h3 className={styles.coffeeName}>{coffee.name}</h3>
                  <p className={styles.coffeeNotes}>{coffee.notes}</p>
                  <p className={styles.price}>{coffee.price}</p>
                </div>
                
                <div className={styles.cardArrow}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}