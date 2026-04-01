"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "./NavbarShop.module.css";

const NavbarShop = ({ onClose }) => {
  return (
    <div className={styles.megaMenuContainer}>
      <div className={styles.megaMenuContent}>
        
     
        <div className={styles.shopTextSide}>
          <h2 className={styles.shopMainHeading}>OUR Shop</h2>
          <p className={styles.shopSubDescription}>
            From home brewing to bulk supply, discover coffee and equipment made to perform.
          </p>
          
          <div className={styles.horizontalDivider}></div>

          <h3 className={styles.categoryTitle}>Coffee</h3>
          <ul className={styles.linkStack}>
            <li>
              <Link href="/shop/coffee-beans" onClick={onClose}>Coffee Beans</Link>
            </li>
            <li>
              <Link href="/shop/coffee-dripbags" onClick={onClose}>Coffee Drip bags</Link>
            </li>
            <li>
              <Link href="/shop/coffee-capsules" onClick={onClose}>Coffee Capsules</Link>
            </li>
          </ul>
        </div>

    
        <div className={styles.shopImageSide}>
          <Image 
            src="/image.png" 
            alt="Seasonal Coffee Release"
            fill
            className={styles.featuredImage}
          />
          <div className={styles.imageTextOverlay}>
            <h4>Seasonal Release</h4>
            <p>Indonesia Banner Mariah Triple Wet Hull<br/>Citrus, nutty, chocolate</p>
            <Link href="/shop/seasonal" onClick={onClose} className={styles.exploreButton}>
              Explore
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NavbarShop;