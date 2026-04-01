import Image from 'next/image';
import styles from './Stories.module.css';

import story1 from './story1.png';
import story2 from './story2.png';
import story3 from './story3.png';

const AboutSection = () => {
  return (
    <section className={styles.sectionContainer}>
      <div className={styles.layoutWrapper}>
        
     
        <div className={styles.textStack}>
          <h2 className={styles.title}>Built in Dubai, Brewed with Purpose</h2>
          <p className={styles.description}>
            Surge is an Emirati-owned specialty coffee brand driven by quality,
            authenticity, and community. Since 2016, we ve been crafting coffee
            experiences inspired by global standards and elevated by local
            values—bringing culture and creativity into every cup.
          </p>
          <button className={styles.button}>Explore About Us</button>
        </div>

  <div className={styles.imageFlexContainer}>
          <Image 
            src={story1} 
            alt="Brewing coffee" 
            className={`${styles.imgSmall} ${styles.gray}`} 
          />
          <Image 
            src={story2} 
            alt="Avocado toast" 
            className={styles.imgTall} 
          />
          <Image 
            src={story3} 
            alt="Squeezing lemon" 
            className={`${styles.imgSmall} ${styles.gray}`} 
          />
        </div>

      </div>
    </section>
  );
};

export default AboutSection;