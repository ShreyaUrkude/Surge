"use client";
import { useSearchParams, usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect, use } from "react";
import styles from "./page.module.css";
import getImg from './orders.png';

/** * CORRECTED IMPORTS
 * We use ../../ to jump from [id] -> orders -> account
 */
import StatusPlaced from "../../_components/Details/Placed";
import StatusCancelled from "../../_components/Details/Cancelled";
import StatusInProgress from "../../_components/Details/Progress";
import StatusDelivered from "../../_components/Details/Deliverd";

export default function OrderDetails({ params }) {
  // Next.js 15 requires unwrapping params
  const resolvedParams = use(params);
  const urlId = resolvedParams.id;

  const searchParams = useSearchParams();
  const pathname = usePathname();
  
  const [rating, setRating] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [currentStatusKey, setCurrentStatusKey] = useState("placed");
  const [orderDate, setOrderDate] = useState("Dec 17, 2025");

  useEffect(() => {
    const statusParam = searchParams.get("status")?.toLowerCase();

    if (statusParam) {
      // Map 'completed' to 'delivered' component logic
      const validStatus = statusParam === "completed" ? "delivered" : statusParam;
      setCurrentStatusKey(validStatus);
      
      // Clean the URL status param after reading it
      window.history.replaceState(null, "", pathname);
    }
  }, [searchParams, pathname]);

  // Mapping the status keys to your imported components
  const StatusComponents = {
    placed: StatusPlaced,
    cancelled: StatusCancelled,
    inprogress: StatusInProgress,
    delivered: StatusDelivered,
  };

  const SelectedStatus = StatusComponents[currentStatusKey] || StatusPlaced;

  return (
    <div className={styles.orderContainer}>
      
      {/* 1. DYNAMIC STATUS HEADER */}
      <SelectedStatus 
        orderId={urlId} 
        date={orderDate} 
        deliveryDate="Dec 28, 2025" 
        deliveredOn={orderDate}
      />
      
      {/* 2. PRODUCT SECTION */}
      <div className={styles.productsection}>
        {[1, 2, 3, 4].map((item) => (
          <div key={item} className={styles.box}>
            <div className={styles.imageWrapper}>
              <Image src={getImg} alt="Product" width={84} height={84} className={styles.productImage} priority />
            </div>
            <div className={styles.productDetails}>
              <p className={styles.productName}>Indonesia Meriah Anaerobic Natural</p>
              <div className={styles.productMeta}>
                <p className={styles.weight}><span>1</span>kg</p>
                <span className={styles.separator}>|</span>
                <p className={styles.qty}>Qty: <span>1</span></p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. RATING BAR (Shows only if delivered) */}
      {currentStatusKey === "delivered" && (
        <div className={styles.ratingBar}>
          <span className={styles.ratingText}>Rate This Order</span>
          <div className={styles.stars}>
            {[1, 2, 3, 4, 5].map((s) => (
              <span key={s} onClick={() => setRating(s)} style={{ cursor: 'pointer' }}>
                <svg width="18" height="16" viewBox="0 0 24 24">
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" 
                        fill={s <= rating ? "white" : "none"} stroke="white" strokeWidth="1.5" />
                </svg>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 4. DELIVERY DETAILS */}
       <div className={styles.deliverySection}>
        <h3 className={styles.sectionTitle}>Delivery Details</h3>
        <div className={styles.deliveryInfoCard}>
          <div className={styles.addressRow}>
            <div className={styles.brownIcon}>
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_address" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="35">
            <rect width="35" height="35" rx="17.5" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_address)">
            <rect width="35" height="35" rx="17.5" fill="#C4754E"/>
            <path d="M10.9572 23.5321C11.8379 22.6677 12.8614 21.9867 14.0275 21.4893C15.1937 20.9918 16.4536 20.7431 17.8073 20.7431C19.1611 20.7431 20.421 20.9918 21.5872 21.4893C22.7533 21.9867 23.7768 22.6677 24.6575 23.5321V10.9572H10.9572V23.5321ZM17.8073 18.7859C18.7533 18.7859 19.5607 18.4516 20.2294 17.7829C20.8981 17.1142 21.2324 16.3068 21.2324 15.3609C21.2324 14.4149 20.8981 13.6075 20.2294 12.9388C19.5607 12.2701 18.7533 11.9358 17.8073 11.9358C16.8614 11.9358 16.054 12.2701 15.3853 12.9388C14.7166 13.6075 14.3823 14.4149 14.3823 15.3609C14.3823 16.3068 14.7166 17.1142 15.3853 17.7829C16.054 18.4516 16.8614 18.7859 17.8073 18.7859ZM10.9572 26.6147C10.419 26.6147 9.95821 26.423 9.57492 26.0398C9.19164 25.6565 9 25.1957 9 24.6575V10.9572C9 10.419 9.19164 9.95821 9.57492 9.57492C9.95821 9.19164 10.419 9 10.9572 9H24.6575C25.1957 9 25.6565 9.19164 26.0398 9.57492C26.423 9.95821 26.6147 10.419 26.6147 10.9572V24.6575C26.6147 25.1957 26.423 25.6565 26.0398 26.0398C25.6565 26.423 25.1957 26.6147 24.6575 26.6147H10.9572ZM12.6453 24.6575H22.9694C22.2518 24.0214 21.4404 23.5362 20.5352 23.2018C19.63 22.8675 18.7207 22.7003 17.8073 22.7003C16.894 22.7003 15.9766 22.8675 15.055 23.2018C14.1335 23.5362 13.3303 24.0214 12.6453 24.6575ZM17.8073 16.8287C17.3996 16.8287 17.053 16.686 16.7676 16.4006C16.4822 16.1152 16.3394 15.7686 16.3394 15.3609C16.3394 14.9531 16.4822 14.6065 16.7676 14.3211C17.053 14.0357 17.3996 13.893 17.8073 13.893C18.2151 13.893 18.5617 14.0357 18.8471 14.3211C19.1325 14.6065 19.2752 14.9531 19.2752 15.3609C19.2752 15.7686 19.1325 16.1152 18.8471 16.4006C18.5617 16.686 18.2151 16.8287 17.8073 16.8287Z" fill="white"/>
          </g>
        </svg>
            </div>
     <div className={styles.addressText}>
              <p>Ahmed Al-Mansouri</p> <br/>
             Office 1502, Jumeirah Business Centre 1<br />
              Jumeirah Lakes Towers (JLT), Cluster G Dubai<br/>
              450123
            </div>
          </div>
          <div className={styles.separatorLine}></div>
          <div className={styles.phoneRow}>
            <div className={styles.brownIcon}>
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_phone" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="35" height="35">
            <rect width="35" height="35" rx="17.5" fill="#D9D9D9"/>
          </mask>
          <g mask="url(#mask0_phone)">
            <rect width="35" height="35" rx="17.5" fill="#C4754E"/>
            <mask id="mask1_phone" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="5" y="5" width="25" height="25">
              <rect x="5.8125" y="5.80859" width="24" height="24" fill="#D9D9D9"/>
            </mask>
            <g mask="url(#mask1_phone)">
              <path d="M26.205 27.4045C24.0653 27.4045 21.9514 26.938 19.8631 26.0051C17.7748 25.0722 15.8748 23.75 14.1631 22.0382C12.4514 20.3265 11.1291 18.4265 10.1962 16.3382C9.26332 14.25 8.79688 12.136 8.79688 9.99635C8.79688 9.68824 8.89958 9.43148 9.10498 9.22608C9.31039 9.02067 9.56715 8.91797 9.87525 8.91797H14.0347C14.2744 8.91797 14.4883 8.99928 14.6766 9.16189C14.8649 9.3245 14.9762 9.51707 15.0104 9.73959L15.678 13.3342C15.7122 13.6081 15.7036 13.8391 15.6523 14.0274C15.6009 14.2157 15.5068 14.3783 15.3698 14.5153L12.8793 17.0315C13.2216 17.6648 13.6282 18.2768 14.0989 18.8673C14.5696 19.4578 15.0874 20.027 15.6523 20.5747C16.1829 21.1054 16.7392 21.5975 17.3212 22.0511C17.9032 22.5047 18.5194 22.9198 19.1698 23.2963L21.5834 20.8828C21.7374 20.7288 21.9385 20.6132 22.1867 20.5362C22.4349 20.4592 22.6789 20.4378 22.9185 20.472L26.4617 21.1909C26.7014 21.2594 26.8982 21.3835 27.0523 21.5632C27.2063 21.743 27.2834 21.9441 27.2834 22.1666V26.3261C27.2834 26.6342 27.1807 26.8909 26.9753 27.0963C26.7698 27.3018 26.5131 27.4045 26.205 27.4045ZM11.9036 15.0801L13.5982 13.3855L13.1617 10.972H10.8766C10.9622 11.6738 11.082 12.3671 11.2361 13.0518C11.3901 13.7364 11.6126 14.4126 11.9036 15.0801ZM21.0955 24.272C21.7631 24.563 22.4435 24.7941 23.1367 24.9653C23.83 25.1364 24.5275 25.2477 25.2293 25.299V23.0396L22.8158 22.5518L21.0955 24.272Z" fill="white"/>
            </g>
          </g>
        </svg>
            </div>
            <p>+971 50 123 4567</p>
          </div>
        </div>
      </div>

      {/* 5. PRICE SECTION */}
      <div className={styles.priceSection}>
        <h3 className={styles.sectionTitle}>Order Price</h3>
        <div className={styles.priceCard}>
          <div 
            className={styles.priceHeader} 
            onClick={() => setIsExpanded(!isExpanded)} 
            style={{ cursor: 'pointer' }}
          >
            <div className={styles.amountInfo}>
              <p className={styles.totalAmount}>AED 1520</p>
              <p className={styles.savingsText}>You saved AED 80!</p>
            </div>
            <div className={`${styles.chevron} ${isExpanded ? styles.rotate : ''}`}>
<svg width="18" height="10" viewBox="0 0 18 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.57356 9.89746L17.1453 -0.000319481H0.00183201L8.57356 9.89746Z" fill="#414343"/>
</svg>

            </div>
          </div>

          {isExpanded && (
 <div className={styles.expandedDetails}>
              <div className={styles.detailRow}><p>Subtotal</p><span>AED 1560</span></div>
              <div className={styles.detailRow}><p>Discount</p><span>-AED 60</span></div>
              <div className={styles.detailRow}><p className={styles.beansUsed}>Beans Used</p><span className={styles.beansUsed}>-AED 10</span></div>
              <div className={styles.detailRow}><p>Shipping</p><span>AED 10</span></div>
              <div className={styles.divider}></div>
              <div className={`${styles.detailRow} ${styles.totalRow}`}><p>Total</p><span>AED 1550</span></div>
            </div>
          )}

          <div className={styles.divider}></div>
          <div className={styles.paymentRow}>
            <p>Payment method</p>
            <div className={styles.cardInfo}><svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.005 0H1.01976C0.749302 0 0.489923 0.113461 0.298681 0.315424C0.107439 0.517386 0 0.791305 0 1.07692V10.9231C0 11.2087 0.107439 11.4826 0.298681 11.6846C0.489923 11.8865 0.749302 12 1.01976 12H15.005C15.2755 12 15.5349 11.8865 15.7261 11.6846C15.9173 11.4826 16.0248 11.2087 16.0248 10.9231V1.07692C16.0248 0.791305 15.9173 0.517386 15.7261 0.315424C15.5349 0.113461 15.2755 0 15.005 0ZM1.01976 0.923077H15.005C15.0437 0.923077 15.0807 0.939286 15.108 0.968137C15.1354 0.996989 15.1507 1.03612 15.1507 1.07692V3.07692H0.874079V1.07692C0.874079 1.03612 0.889428 0.996989 0.916748 0.968137C0.944068 0.939286 0.981123 0.923077 1.01976 0.923077ZM15.005 11.0769H1.01976C0.981123 11.0769 0.944068 11.0607 0.916748 11.0319C0.889428 11.003 0.874079 10.9639 0.874079 10.9231V4H15.1507V10.9231C15.1507 10.9639 15.1354 11.003 15.108 11.0319C15.0807 11.0607 15.0437 11.0769 15.005 11.0769ZM13.6939 9.07692C13.6939 9.19933 13.6479 9.31673 13.5659 9.40328C13.4839 9.48984 13.3728 9.53846 13.2569 9.53846H10.926C10.8101 9.53846 10.6989 9.48984 10.617 9.40328C10.535 9.31673 10.489 9.19933 10.489 9.07692C10.489 8.95452 10.535 8.83712 10.617 8.75057C10.6989 8.66401 10.8101 8.61539 10.926 8.61539H13.2569C13.3728 8.61539 13.4839 8.66401 13.5659 8.75057C13.6479 8.83712 13.6939 8.95452 13.6939 9.07692ZM9.03215 9.07692C9.03215 9.19933 8.98611 9.31673 8.90415 9.40328C8.82219 9.48984 8.71102 9.53846 8.59511 9.53846H7.42967C7.31376 9.53846 7.2026 9.48984 7.12064 9.40328C7.03868 9.31673 6.99263 9.19933 6.99263 9.07692C6.99263 8.95452 7.03868 8.83712 7.12064 8.75057C7.2026 8.66401 7.31376 8.61539 7.42967 8.61539H8.59511C8.71102 8.61539 8.82219 8.66401 8.90415 8.75057C8.98611 8.83712 9.03215 8.95452 9.03215 9.07692Z" fill="#414343"/>
    </svg>
              <span>Visa 64xxxxxxxxx</span>
            </div>
          </div>
        </div>
      </div>




      {/* 6. INVOICE SECTION */}
      <div className={styles.invoiceSection}>
        {currentStatusKey === "cancelled" ? (
           <p>This order was cancelled. No invoice available.</p>
        ) : (
          <>
            <p>Get invoice for your shipment</p>
            <button className={styles.downloadBtn}>Download Invoice</button>
          </>
        )}
      </div>
    </div>
  );
}