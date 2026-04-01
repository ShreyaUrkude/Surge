import Image from 'next/image';
import Link from 'next/link';
import { coffeeData } from '../Bettercoffee/Bettercoffee';
import styles from './Blogdetails.module.css';

export default function BlogDetail({ slug }) {
 
  const blog = coffeeData.find((item) => item.slug === slug);

  if (!blog) {
    return (
      <div className={styles.container}>
        <h2>Blog Post Not Found</h2>
        <Link href="/blogs" className={styles.backLink}>
          Return to Blog Overview
        </Link>
      </div>
    );
  }

  return (
    <main className={styles.container}>
      <div className={styles.splitLayout}>
     
        <div className={styles.leftImage}>
          <Image 
            src={blog.img} 
            alt={blog.title} 
            fill 
            style={{ objectFit: 'cover' }} 
            priority 
            sizes="(max-width: 1100px) 100vw, 50vw" 
          />
        </div>

        <div className={styles.rightContent}>
          <h1 className={styles.title}>{blog.title}</h1>
          
          <p className={styles.description}>
            {blog.desc}
          </p>
          
          <section className={styles.deepDive}>
           <h3 className={styles.deepDiveTitle}>
               Deep Dive: {slug}
            </h3>
            <p className={styles.infoText}>
              {blog.info || "Our roasting process is a delicate balance of science and intuition. We monitor the 'first crack' with precision, ensuring the internal temperature reaches exactly the right profile to caramelize natural sugars without losing the delicate floral notes unique to this origin. By extending the development time in the drum, we've managed to lower the acidity while amplifying the creamy mouthfeel that defines this particular blend."}
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}