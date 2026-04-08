
"use client";
import { useState } from "react"; 
import Image from "next/image";
import styles from './Reward.module.css'; 
import coinsBanner from './coins.png'; 

const Rewards = () => {
 
  const [openIndex, setOpenIndex] = useState(0);

  const handleToggle = (index, e) => {
    e.preventDefault(); 
  
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqData = [
    {
      q: "What are Surge Coins and how do they work?",
      a: "Surge Coins are reward points you earn on orders, subscriptions, and workshop bookings. On every purchase, you earn 100 Coins worth 10% of the order value (e.g. AED 1,000 = 100 coins) and can be used for discounts on eligible purchases."
    },
    {
      q: "How do I earn Surge Coins?",
      a: "Surge Beans are reward points you earn on orders, subscriptions, and workshop bookings, on every purchase, you earn WM Beans worth 10% of the order value (e.g. AED 1,000 = 100 Beans) and can be used for discounts on eligible purchases."
    },
    {
      q: "Where can I use my Surge Coins?",
      a: "Surge Beans are reward points you earn on orders, subscriptions, and workshop bookings, on every purchase, you earn WM Beans worth 10% of the order value (e.g. AED 1,000 = 100 Beans) and can be used for discounts on eligible purchases."
    },
    {
      q: "Can I pay the full amount using coins?",
      a: "Surge Beans are reward points you earn on orders, subscriptions, and workshop bookings, on every purchase, you earn WM Beans worth 10% of the order value (e.g. AED 1,000 = 100 Beans) and can be used for discounts on eligible purchases."
    },
    {
      q: "How do coin expiry and tracking work?",
      a: "Surge Beans are reward points you earn on orders, subscriptions, and workshop bookings, on every purchase, you earn WM Beans worth 10% of the order value (e.g. AED 1,000 = 100 Beans) and can be used for discounts on eligible purchases."
    }
  ];

  return (
    <section className={styles.rewardsContainer}>
      <div className={styles.rewardsBanner}>
        <Image 
          src={coinsBanner} 
          alt="Surge Rewards Banner"
          width={700} 
          height={95}  
          className={styles.bannerImg}
          priority
        />
        <div className={styles.bannerContent}>
          <p>Surge Coins are valid for 12 months from the date they’re earned.</p> 
        </div>
      </div>

      <div className={styles.mainWorks}>
        <h3 className={styles.rewardsTitle}>How it Works</h3>
        <div className={styles.stepsGrid}>
          <div className={styles.stepItem}>
            <div className={styles.stepIcon}>
              <svg width="51" height="48" viewBox="0 0 51 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 24C0 10.7452 10.7452 0 24 0H27C40.2548 0 51 10.7452 51 24C51 37.2548 40.2548 48 27 48H24C10.7452 48 0 37.2548 0 24Z" fill="#F5F5F5"/>
                <path d="M13.6016 12.1562H15.9765L19.1352 26.9046C19.251 27.4447 19.5516 27.9276 19.9851 28.27C20.4185 28.6125 20.9578 28.7931 21.5101 28.7808H33.1235C33.6641 28.7799 34.1881 28.5947 34.6091 28.2558C35.0301 27.9168 35.3229 27.4444 35.4391 26.9165L37.3984 18.0936H17.2471M21.8545 34.6588C21.8545 35.3146 21.3228 35.8463 20.667 35.8463C20.0112 35.8463 19.4795 35.3146 19.4795 34.6588C19.4795 34.003 20.0112 33.4713 20.667 33.4713C21.3228 33.4713 21.8545 34.003 21.8545 34.6588ZM34.9166 34.6588C34.9166 35.3146 34.385 35.8463 33.7292 35.8463C33.0733 35.8463 32.5417 35.3146 32.5417 34.6588C32.5417 34.003 33.0733 33.4713 33.7292 33.4713C34.385 33.4713 34.9166 34.003 34.9166 34.6588Z" stroke="#C4754E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.stepTextGroup}>
              <h4>Order & Pay</h4>
              <p>Use our app to order ahead or scan your card at the register.</p>
            </div>
          </div>

          <div className={styles.stepItem}>
            <div className={styles.stepIcon}>
              <svg width="52" height="50" viewBox="0 0 52 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="52" height="50" rx="25" fill="#F5F5F5"/>
                <path d="M34.5143 22.7287C35.8348 23.221 37.0098 24.0383 37.9307 25.105C38.8516 26.1718 39.4886 27.4535 39.7829 28.8316C40.0772 30.2098 40.0192 31.6399 39.6143 32.9898C39.2094 34.3396 38.4707 35.5655 37.4665 36.5542C36.4623 37.5429 35.225 38.2624 33.869 38.6461C32.513 39.0299 31.0822 39.0656 29.7087 38.7498C28.3353 38.4341 27.0637 37.7771 26.0115 36.8397C24.9593 35.9023 24.1604 34.7146 23.6888 33.3867M19.0233 16.6245H20.4202V22.2119M32.5867 27.6317L33.5645 28.6234L29.6254 32.5625M28.8012 19.4182C28.8012 24.0469 25.0489 27.7993 20.4202 27.7993C15.7914 27.7993 12.0391 24.0469 12.0391 19.4182C12.0391 14.7894 15.7914 11.0371 20.4202 11.0371C25.0489 11.0371 28.8012 14.7894 28.8012 19.4182Z" stroke="#C4754E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.stepTextGroup}>
              <h4>Earn Beans</h4>
              <p>Collect 10 Beans for every $1 spent on drinks, food, or merch.</p>
            </div>
          </div>

    <div className={styles.stepItem}>
            <div className={styles.stepIcon}>
              <svg width="51" height="49" viewBox="0 0 51 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 24.5C0 10.969 10.969 0 24.5 0H26.5C40.031 0 51 10.969 51 24.5C51 38.031 40.031 49 26.5 49H24.5C10.969 49 0 38.031 0 24.5Z" fill="#F5F5F5"/>
                <path d="M25.5 19.1671V36.5M25.5 19.1671C25.0177 17.1797 24.1873 15.4806 23.117 14.2914C22.0467 13.1022 20.7862 12.4782 19.5 12.5006C18.6159 12.5006 17.7681 12.8518 17.143 13.4769C16.5179 14.102 16.1667 14.9498 16.1667 15.8338C16.1667 16.7179 16.5179 17.5657 17.143 18.1908C17.7681 18.8159 18.6159 19.1671 19.5 19.1671M25.5 19.1671C25.9823 17.1797 26.8127 15.4806 27.883 14.2914C28.9533 13.1022 30.2138 12.4782 31.5 12.5006C32.3841 12.5006 33.2319 12.8518 33.857 13.4769C34.4821 14.102 34.8333 14.9498 34.8333 15.8338C34.8333 16.7179 34.4821 17.5657 33.857 18.1908C33.2319 18.8159 32.3841 19.1671 31.5 19.1671M34.8333 24.5003V33.8334C34.8333 34.5406 34.5524 35.2189 34.0523 35.719C33.5522 36.2191 32.8739 36.5 32.1667 36.5H18.8333C18.1261 36.5 17.4478 36.2191 16.9477 35.719C16.4476 35.2189 16.1667 34.5406 16.1667 33.8334V24.5003M14.8333 19.1671H36.1667C36.903 19.1671 37.5 19.764 37.5 20.5004V23.167C37.5 23.9034 36.903 24.5003 36.1667 24.5003H14.8333C14.097 24.5003 13.5 23.9034 13.5 23.167V20.5004C13.5 19.764 14.097 19.1671 14.8333 19.1671Z" stroke="#C4754E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className={styles.stepTextGroup}>
              <h4>Redeem Favorites</h4>
              <p>Cash in your Beans for free espresso, pastries, or bags of coffee.</p>
            </div>
          </div>
        </div>
      </div>

  <div className={styles.historySection}>
        <h3 className={styles.rewardsTitle}>Transaction History</h3>
        <div className={styles.tableResponsive}>
          <table className={styles.transactionTable}>
            <thead>
              <tr>
                <th>Details</th>
                <th>Type</th>
                <th>Date</th>
                <th>Expiry Date</th>
                <th>Beans</th>
              </tr>
            </thead>
<tbody>
  {[...Array(8)].map((_, index) => {
   
    const collectedIndices = [0, 3, 4, 6, 7];
    const isCollected = collectedIndices.includes(index);
    
    return (
      <tr key={index}>
        <td className={styles.orderId}>Order Id: <br /> 2864297643</td>
        <td>
          <span className={isCollected ? styles.badgeCollected : styles.badgeRedeemed}>
            {isCollected ? 'Collected' : 'Redeemed'}
          </span>
        </td>
        <td className={styles.dateTime}>Dec 17, 2025 <br /> 10:42 AM</td>
        <td className={styles.dateTime}>Dec 17, 2026 <br /> 10:42 AM</td>
        <td className={isCollected ? styles.coinsPlus : styles.coinsMinus}>
          {isCollected ? '+25' : '-25'}
        </td>
      </tr>
    );
  })}
</tbody>
          </table>
        </div>
      </div>

      <div className={styles.faqSection}>
        <h3 className={styles.rewardsTitle}>FREQUENTLY ASKED QUESTIONS</h3>
        <div className={styles.faqList}>
          {faqData.map((item, i) => (
            <details 
              key={i} 
              className={styles.faqItem} 
           
              open={openIndex === i}
              onClick={(e) => handleToggle(i, e)}
            >
              <summary>
                <span className={styles.faqNumber}>{`0${i + 1}`}</span>
                <span className={styles.faqQuestionText}>{item.q}</span>
              </summary>
              <div className={styles.faqContent}>
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Rewards;