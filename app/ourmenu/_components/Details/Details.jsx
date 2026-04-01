'use client';

import { useState } from 'react';
import Image from 'next/image';
import styles from './Details.module.css';
import breakfastImg from './breakfast.png';
import breadImg from './bread.png';
import pastryImg from './pastry.png';
import beveragesImg from './beverages.png';
import cakeImg from './cake.png';

const SECTIONS = [
  {
    title: "Breakfast",
    image: breakfastImg,
    items: [
      { id: 101, name: 'Almond Danish', price: 'AED 12', note: 'Buttery, flaky almond delight', image: breakfastImg },
      { id: 102, name: 'Basque Cheesecake', price: 'AED 12', note: 'Caramelized top, creamy center', image: pastryImg },
      { id: 103, name: 'Blueberry Cheesecake', price: 'AED 12', note: 'Rich and fruity', image: cakeImg },
      { id: 104, name: 'Blueberry Danish', price: 'AED 12', note: 'Buttery, flaky almond delight', image: breakfastImg },
      { id: 105, name: 'Chocolate Cake', price: 'AED 12', note: 'Decadent cocoa', image: breakfastImg },
      { id: 106, name: 'Chocolate Mousse', price: 'AED 12', note: 'Light and airy', image: breakfastImg },
    ]
  },
  {
    title: "Bread",
    image: breadImg,
    items: [
      { id: 201, name: 'Almond Danish', price: 'AED 12', note: 'Buttery, flaky almond delight', image: breadImg },
      { id: 202, name: 'Basque Cheesecake', price: 'AED 12', note: 'Caramelized top, creamy center', image: pastryImg },
      { id: 203, name: 'Blueberry Cheesecake', price: 'AED 12', note: 'Rich and fruity', image: cakeImg },
      { id: 204, name: 'Blueberry Danish', price: 'AED 12', note: 'Buttery, flaky almond delight', image: breakfastImg },
      { id: 205, name: 'Chocolate Cake', price: 'AED 12', note: 'Decadent cocoa', image: breakfastImg },
      { id: 206, name: 'Chocolate Mousse', price: 'AED 12', note: 'Light and airy', image: breakfastImg },
    ]
  },
  {
    title: "Pastries",
    image: pastryImg,
    items: [
      { id: 301, name: 'Almond Danish', price: 'AED 12', note: 'Buttery, flaky almond delight', image: pastryImg },
      { id: 302, name: 'Basque Cheesecake', price: 'AED 12', note: 'Caramelized top, creamy center', image: pastryImg },
      { id: 303, name: 'Blueberry Cheesecake', price: 'AED 12', note: 'Rich and fruity', image: pastryImg },
      { id: 304, name: 'Blueberry Danish', price: 'AED 12', note: 'Buttery, flaky almond delight', image: pastryImg },
      { id: 305, name: 'Chocolate Cake', price: 'AED 12', note: 'Decadent cocoa', image: pastryImg },
      { id: 306, name: 'Chocolate Mousse', price: 'AED 12', note: 'Light and airy', image: pastryImg },
    ]
  },
  {
    title: "Beverages",
    image: beveragesImg,
    items: [
      { id: 401, name: 'Almond Danish', price: 'AED 12', note: 'Buttery, flaky almond delight', image: beveragesImg },
      { id: 402, name: 'Basque Cheesecake', price: 'AED 12', note: 'Caramelized top, creamy center', image: pastryImg },
      { id: 403, name: 'Blueberry Cheesecake', price: 'AED 12', note: 'Rich and fruity', image: breakfastImg },
      { id: 404, name: 'Blueberry Danish', price: 'AED 12', note: 'Buttery, flaky almond delight', image: breakfastImg },
      { id: 405, name: 'Chocolate Cake', price: 'AED 12', note: 'Decadent cocoa', image: breakfastImg },
      { id: 406, name: 'Chocolate Mousse', price: 'AED 12', note: 'Light and airy', image: breakfastImg },
    ]
  }
];

export default function Details() {
  
  const [selections, setSelections] = useState(
    SECTIONS.reduce((acc, section, index) => {
      acc[index] = {
        image: section.image,
      
        activeId: index === 0 ? 101 : null 
      };
      return acc;
    }, {})
  );

  const handleItemClick = (sectionIndex, item) => {
    setSelections(prev => ({
      ...prev,
      [sectionIndex]: {
        image: item.image,
        activeId: item.id
      }
    }));
  };

  return (
    <main className={styles.container}>
      {SECTIONS.map((section, sectionIndex) => (
        <section key={sectionIndex} className={styles.selectedSection}>
          <h2 className={styles.categoryTitle}>{section.title}</h2>
          
          <div className={styles.menuContainer}>
            <div className={styles.itemList}>
              {section.items.map((item) => (
                <div 
                  key={item.id} 

                  className={`${styles.menuItem} ${selections[sectionIndex].activeId === item.id ? styles.activeItem : ''}`}
                  onClick={() => handleItemClick(sectionIndex, item)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className={styles.itemInfo}>
                    <h1>{item.name}</h1> 
                    <p>{item.note}</p>
                  </div>
                  <span className={styles.price}>{item.price}</span>
                </div>
              ))}
            </div>

            <div className={styles.imageWrapper}>
              <Image 
                src={selections[sectionIndex].image} 
                alt={`${section.title} Selection`}
                width={541} 
                height={541}
                className={styles.menuImage}
                priority={sectionIndex === 0} 
              />
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}