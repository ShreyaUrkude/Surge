import styles from './Choosesurge.module.css'
import Image from "next/image";
import surgeImg from "./juice.png";
import surge2Img from "./juice2.png";
import surge3Img from "./juice3.png";
import surge4Img from "./juice4.png";
export default function Choosesurge() {
   return(
    <div className={styles.main}>
        <div className={styles.top}>
        <h1 className={styles.text}>why choose surge</h1>
        </div>

        <div className={styles.bottom}>
            <div className={styles.cardcontainer}>
                <div className={styles.card}>
                       <Image
                  src={surgeImg}
                  alt="surge"
                  width={340}
                  height={366}
                  className={styles.product}
                  priority
                />
             <h2 className={styles.heading}>
                Specialty Coffee, Done Right
             </h2>
             <p className={styles.description}> Premium beans, crafted to meet global specialty standards. </p>
                </div>


                <div className={styles.card}>
                       <Image
                  src={surge2Img}
                  alt="surge"
                  width={340}
                  height={366}
                  className={styles.product}
                  priority
                />
             <h2 className={styles.heading}>
               Proudly Emirati-Owned
             </h2>
             <p className={styles.description}> A Dubai-rooted brand built on authenticity and local values. </p>
                </div>


                <div className={styles.card}>
                       <Image
                  src={surge3Img}
                  alt="surge"
                  width={340}
                  height={366}
                  className={styles.product}
                  priority
                />
             <h2 className={styles.heading}>
               Quality You Can Taste
             </h2>
             <p className={styles.description}> Premium beans, crafted to meet global specialty standards.</p>
                </div>
                <div className={styles.card}>
                       <Image
                  src={surge4Img}
                  alt="surge"
                  width={340}
                  height={366}
                  className={styles.product}
                  priority
                />
             <h2 className={styles.heading}>
               Spaces Built for Community
             </h2>
             <p className={styles.description}> Welcoming cafés that feel familiar—made for coffee and connection </p>
                </div>
            </div>
        </div>
    </div>
   )
}