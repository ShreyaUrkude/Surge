"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./Navbar.module.css";
import logo from "./logo.png";
import NavbarShop from "./NavbarShop";

export default function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleShopClick = (e) => {
    e.preventDefault(); 
    setIsShopOpen(!isShopOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/" className={styles.logoLink}>
          <Image src={logo} alt="Logo" width={89} height={25} priority />
        </Link>
      </div>

      <div className={styles.hamburger} onClick={() => setMenuOpen(!menuOpen)}>
        <span className={menuOpen ? styles.lineOpen : ""}></span>
        <span className={menuOpen ? styles.lineOpen : ""}></span>
        <span className={menuOpen ? styles.lineOpen : ""}></span>
      </div>

      <div className={`${styles.navWrapper} ${menuOpen ? styles.active : ""}`}>
        <nav className={styles.menuCenter}>
          
          <div className={styles.shopTrigger}>
            <Link 
              href="/shop" 
              className={styles.navLinkRed} 
              onClick={handleShopClick}
            >
              Our Shop 
              
            </Link>
            
           
            {isShopOpen && (
    <div className={styles.dropdownWrapper}>
     
      <div className={styles.desktopOnly}>
        <NavbarShop onClose={() => setIsShopOpen(false)} />
      </div>

   
      <div className={styles.mobileOnly}>
        <ul className={styles.linkStack}>
          <li>
            <Link href="/shop/coffee-beans" onClick={() => setIsShopOpen(false)}>
              Coffee beans
            </Link>
          </li>
          <li>
            <Link href="/shop/coffee-dripbags" onClick={() => setIsShopOpen(false)}>
              Coffee Drip bags
            </Link>
          </li>
          <li>
            <Link href="/shop/coffee-capsules" onClick={() => setIsShopOpen(false)}>
              Coffee Capsules
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )}
          </div>

        
          <div className={styles.mobileLine}></div>
          <Link href="/about-us" className={styles.navLink}>About Us</Link>
          <div className={styles.mobileLine}></div>
          <Link href="/events" className={styles.navLink}>Events</Link>
          <div className={styles.mobileLine}></div>
          <Link href="/ourmenu" className={styles.navLink}>Cafe Menu</Link>
        </nav>

        <nav className={styles.menuRight}>
          <div className={styles.mobileLine}></div>
          <Link href="/contact">Contact Us</Link>
          <div className={styles.mobileLine}></div>
          <Link href="/blogs">Blogs</Link>
          <div className={styles.mobileLine}></div>
          <Link href="/cart">Cart</Link>
          <div className={styles.mobileLine}></div>
          <Link href="/Login">Login</Link>
          <div className={styles.mobileLine}></div>
          <Link href="/account" className={styles.account}>
            / Account
          </Link>
        </nav>
      </div>
    </header>
  );
}