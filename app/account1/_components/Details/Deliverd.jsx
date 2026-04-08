"use client";
import styles from "./page.module.css";

export default function StatusDelivered({ orderId, date, deliveredOn }) {
  return (
    <div className={styles.orderHeader}>
      <div className={styles.orderSection}>
        <div className={styles.iconWrapper}>
         <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="35" height="35" rx="17.5" fill="#40A65A"/>
<path d="M17.5017 27C16.1877 27 14.9527 26.7507 13.7965 26.252C12.6403 25.7533 11.6347 25.0766 10.7795 24.2218C9.92433 23.3669 9.24725 22.3617 8.74825 21.206C8.24942 20.0503 8 18.8156 8 17.5017C8 16.1877 8.24942 14.9527 8.74825 13.7965C9.24692 12.6403 9.92375 11.6347 10.7787 10.7795C11.6337 9.92433 12.6392 9.24725 13.795 8.74825C14.9508 8.24942 16.1858 8 17.5 8C18.5533 8 19.55 8.15833 20.49 8.475C21.43 8.79167 22.2923 9.23333 23.077 9.8L21.9923 10.9098C21.3461 10.4648 20.6462 10.1186 19.8925 9.87125C19.1388 9.62375 18.3413 9.5 17.5 9.5C15.2833 9.5 13.3958 10.2792 11.8375 11.8375C10.2792 13.3958 9.5 15.2833 9.5 17.5C9.5 19.7167 10.2792 21.6042 11.8375 23.1625C13.3958 24.7208 15.2833 25.5 17.5 25.5C19.7167 25.5 21.6042 24.7208 23.1625 23.1625C24.7208 21.6042 25.5 19.7167 25.5 17.5C25.5 17.1487 25.4769 16.8013 25.4307 16.4578C25.3846 16.1143 25.3153 15.7802 25.223 15.4557L26.4345 14.2348C26.6178 14.7488 26.7579 15.2776 26.8547 15.8212C26.9516 16.3647 27 16.9243 27 17.5C27 18.8142 26.7507 20.0492 26.252 21.205C25.7533 22.3608 25.0766 23.3663 24.2218 24.2213C23.3669 25.0763 22.3617 25.7531 21.206 26.2518C20.0503 26.7506 18.8156 27 17.5017 27ZM16.0808 21.7538L12.177 17.85L13.2308 16.7963L16.0808 19.6463L25.9462 9.7655L27 10.8193L16.0808 21.7538Z" fill="white"/>
</svg>

        </div>
        <div className={styles.orderText}>
          <h2 className={styles.orderStatus} style={{ color: "#414343" }}>Order Delivered</h2>
          <p className={styles.deliveryDate}>Delivered on {deliveredOn || date}</p>
        </div>
      </div>
      <div className={styles.metaSection}>
        <p className={styles.metaItem}>Order Date: <span>{date}</span></p>
        <p className={styles.metaItem}>Order ID: <span>#{orderId}</span></p>
      </div>
    </div>
  );
}