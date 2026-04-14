import Image from 'next/image';
import styles from './Image.module.css';
import image from './tree.png';
export default function Section() {
  return (

    <div className={styles.mainWrapper}>
      <section className={styles.container}>
        <Image 
          src={image} 
          alt="Sustainability"
          fill
          priority
          className={styles.bgImage}
        />
        <div className={styles.overlay} />

        <div className={styles.content}>

          <h2 className={styles.title}>Sustainability & Traceability</h2>
          <p className={styles.description}>
            Selective hand-picking, small-lot processing, and transparent premiums 
            support long-term soil health and producer livelihoods. Each bag is 
            traceable to plot and process date, ensuring the clarity you taste is 
            matched by clarity in sourcing.
          </p>
        </div>
      </section>
    </div>
  );
}