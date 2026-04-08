"use client";

import styles from "./page.module.css";

export default function StatusPlaced({ orderId, date, deliveryDate = "Dec 28, 2025" }) {
  return (
    <div className={styles.orderHeader}>
      <div className={styles.orderSection}>
        <div className={styles.iconWrapper}>
          <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
            <rect width="35" height="35" rx="17.5" fill="#C4754E"/>
            <path d="M16.7464 25.1077V17.9329L10.4646 14.2953V21.2962C10.4646 21.3476 10.4775 21.3959 10.5033 21.4412C10.5291 21.4862 10.5678 21.5248 10.6192 21.557L16.7464 25.1077ZM18.254 25.1077L24.3812 21.557C24.4326 21.5248 24.4713 21.4862 24.4971 21.4412C24.5228 21.3959 24.5357 21.3476 24.5357 21.2962V14.2953L18.254 17.9329V25.1077ZM16.5919 26.7525L9.86562 22.8809C9.57951 22.7161 9.35655 22.4958 9.19674 22.2201C9.03693 21.9442 8.95703 21.6413 8.95703 21.3115V13.6885C8.95703 13.3587 9.03693 13.0558 9.19674 12.7799C9.35655 12.5042 9.57951 12.2839 9.86562 12.1191L16.5919 8.2475C16.8778 8.0825 17.1806 8 17.5002 8C17.8198 8 18.1226 8.0825 18.4085 8.2475L25.1348 12.1191C25.4209 12.2839 25.6438 12.5042 25.8037 12.7799C25.9635 13.0558 26.0434 13.3587 26.0434 13.6885V21.3115C26.0434 21.6413 25.9635 21.9442 25.8037 22.2201C25.6438 22.4958 25.4209 22.7161 25.1348 22.8809L18.4085 26.7525C18.1226 26.9175 17.8198 27 17.5002 27C17.1806 27 16.8778 26.9175 16.5919 26.7525ZM21.3755 14.3843L23.7066 13.0468L17.6547 9.54631C17.6033 9.51415 17.5518 9.49807 17.5002 9.49807C17.4486 9.49807 17.3971 9.51415 17.3457 9.54631L15.1634 10.8027L21.3755 14.3843ZM17.5002 16.6341L19.837 15.281L13.6306 11.6937L11.2938 13.0468L17.5002 16.6341Z" fill="white"/>
          </svg>
        </div>
        <div className={styles.orderText}>
          <h2 className={styles.orderStatus} style={{ color: "#414343" }}>Order Placed</h2>
          <p className={styles.deliveryDate} style={{ color: "#C4754E" }}>Delivering by {deliveryDate}</p>
        </div>
      </div>
      <div className={styles.metaSection}>
        <p className={styles.metaItem}>Order Date: <span>{date}</span></p>
        <p className={styles.metaItem}>Order ID: <span>#{orderId}</span></p>
      </div>
    </div>
  );
}