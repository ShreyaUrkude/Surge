import Image from "next/image";

import styles from "./Allmenu.module.css";
import breakfast from "./breakfast.png";
import breads from "./bread.png";
import beverages from "./cake.png";
import desserts from "./pastry.png";

export default function Menu() {
  return (
    <section className={styles.menuSection}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.heading}>From Our Cafe</h2>
          <p className={styles.subtext}>
          Explore the drinks and bites served daily at Surge cafés. From espresso classics to signature creations and  fresh desserts, every item is crafted with the same care as our coffee.
          </p>
        </div>

       
   </div>

      <div className={styles.menuGrid}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={breakfast}
              alt="Breakfast"
              width={382}
              height={507}
              className={styles.image}
            />
          </div>
          <div className={styles.cardTitle}>Breakfast</div>
        </div>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={breads}
              alt="Breads"
              width={382}
              height={507}
              className={styles.image}
            />
          </div>
          <div className={styles.cardTitle}>Breads</div>
        </div>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={beverages}
              alt="Beverages"
              width={382}
              height={507}
              className={styles.image}
            />
          </div>
          <div className={styles.cardTitle}>Beverages</div>
        </div>

        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src={desserts}
              alt="Desserts"
              width={382}
              height={507}
              className={styles.image}
            />
          </div>
          <div className={styles.cardTitle}>Pastries</div>
        </div>
      </div>
    </section>
  );
}