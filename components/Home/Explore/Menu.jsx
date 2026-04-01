import Image from "next/image";
import Link from "next/link";
import styles from "./Menu.module.css";
import breakfast from "./Menu1.png";
import breads from "./Menu2.png";
import beverages from "./Menu3.png";
import desserts from "./Menu4.png";


const MobileArrow = () => (
  <svg 
    className={styles.mobileArrow} 
    width="20" 
    height="20" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <line x1="7" y1="17" x2="17" y2="7"></line>
    <polyline points="7 7 17 7 17 17"></polyline>
  </svg>
);

export default function Menu() {
  return (
    <section className={styles.menuSection}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.heading}>Explore our Menu</h2>
          <p className={styles.subtext}>
            From espresso classics to signature drinks and bites. Surge is more
            than beans. Discover what’s served daily at our Dubai cafés.
          </p>
        </div>

        <Link href="ourmenu" className={styles.viewMenu}>
          <span>View Menu</span>
          <div className={styles.arrowBox}>
            <svg width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </Link>
      </div>

      <div className={styles.menuGrid}>
       
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image src={breakfast} alt="Breakfast" className={styles.image} />
          </div>
          <div className={styles.cardTitle}>
            <span>Breakfast</span>
            <MobileArrow />
          </div>
        </div>

       
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image src={breads} alt="Breads" className={styles.image} />
          </div>
          <div className={styles.cardTitle}>
            <span>Breads</span>
            <MobileArrow />
          </div>
        </div>

      
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image src={beverages} alt="Beverages" className={styles.image} />
          </div>
          <div className={styles.cardTitle}>
            <span>Beverages</span>
            <MobileArrow />
          </div>
        </div>

      
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image src={desserts} alt="Desserts" className={styles.image} />
          </div>
          <div className={styles.cardTitle}>
            <span>Desserts</span>
            <MobileArrow />
          </div>
        </div>
      </div>
    </section>
  );
}