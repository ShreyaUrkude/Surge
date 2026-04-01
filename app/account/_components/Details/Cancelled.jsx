"use client";


import styles from "./page.module.css";

export default function StatusCancelled({ orderId, date, deliveredOn }) {
  return (
    <div className={styles.orderHeader}>
      <div className={styles.orderSection}>
        <div className={styles.iconWrapper}>
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="-0.0703125" width="35" height="35" rx="17.5" fill="#EA2424"/>
<path d="M13.8297 22.1538L17.4297 18.5538L21.0297 22.1538L22.0834 21.1L18.4834 17.5L22.0834 13.9L21.0297 12.8462L17.4297 16.4462L13.8297 12.8462L12.7759 13.9L16.3759 17.5L12.7759 21.1L13.8297 22.1538ZM17.4314 27C16.1174 27 14.8824 26.7507 13.7262 26.252C12.57 25.7533 11.5644 25.0766 10.7092 24.2218C9.85402 23.3669 9.17694 22.3617 8.67794 21.206C8.1791 20.0503 7.92969 18.8156 7.92969 17.5017C7.92969 16.1877 8.17902 14.9527 8.67769 13.7965C9.17635 12.6403 9.8531 11.6347 10.7079 10.7795C11.5628 9.92433 12.568 9.24725 13.7237 8.74825C14.8794 8.24942 16.1141 8 17.4279 8C18.7419 8 19.977 8.24933 21.1332 8.748C22.2894 9.24667 23.295 9.92342 24.1502 10.7783C25.0054 11.6331 25.6824 12.6383 26.1814 13.794C26.6803 14.9497 26.9297 16.1844 26.9297 17.4983C26.9297 18.8123 26.6804 20.0473 26.1817 21.2035C25.683 22.3597 25.0063 23.3653 24.1514 24.2205C23.2966 25.0757 22.2914 25.7528 21.1357 26.2518C19.98 26.7506 18.7453 27 17.4314 27ZM17.4297 25.5C19.663 25.5 21.5547 24.725 23.1047 23.175C24.6547 21.625 25.4297 19.7333 25.4297 17.5C25.4297 15.2667 24.6547 13.375 23.1047 11.825C21.5547 10.275 19.663 9.5 17.4297 9.5C15.1964 9.5 13.3047 10.275 11.7547 11.825C10.2047 13.375 9.42969 15.2667 9.42969 17.5C9.42969 19.7333 10.2047 21.625 11.7547 23.175C13.3047 24.725 15.1964 25.5 17.4297 25.5Z" fill="white"/>
</svg>

        </div>
        <div className={styles.orderText}>
          <h2 className={styles.orderStatus} style={{ color: "#EA2424" }}>
            Order Cancelled
          </h2>
          <p className={styles.deliveryDate} style={{ color: "#EA2424" }}>
            Cancelled on {deliveredOn || date}
          </p>
        </div>
      </div>
      <div className={styles.metaSection}>
        <p className={styles.metaItem}>Order Date: <span>{date}</span></p>
        <p className={styles.metaItem}>Order ID: <span>#{orderId}</span></p>
      </div>
    </div>
  );
}