"use client";
import React from 'react';
import styles from './page.module.css';
import Image from "next/image";
import orderImage from './order.png'; 
import { useRouter } from 'next/navigation';

const Icons = {
  Package: () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
      <rect width="35" height="35" rx="17.5" fill="#40A65A"/>
      <path d="M17.5017 27C16.1877 27 14.9527 26.7507 13.7965 26.252C12.6403 25.7533 11.6347 25.0766 10.7795 24.2218C9.92433 23.3669 9.24725 22.3617 8.74825 21.206C8.1791 20.0503 8 18.8156 8 17.5017C8 16.1877 8.24942 14.9527 8.74825 13.7965C9.24692 12.6403 9.92375 11.6347 10.7787 10.7795C11.6337 9.92433 12.6392 9.24725 13.795 8.74825C14.9508 8.24942 16.1858 8 17.5 8C18.5533 8 19.55 8.15833 20.49 8.475C21.43 8.79167 22.2923 9.23333 23.077 9.8L21.9923 10.9098C21.3461 10.4648 20.6462 10.1186 19.8925 9.87125C19.1388 9.62375 18.3413 9.5 17.5 9.5C15.2833 9.5 13.3958 10.2792 11.8375 11.8375C10.2792 13.3958 9.5 15.2833 9.5 17.5C9.5 19.7167 10.2792 21.6042 11.8375 23.1625C13.3958 24.7208 15.2833 25.5 17.5 25.5C19.7167 25.5 21.6042 24.7208 23.1625 23.1625C24.7208 21.6042 25.5 19.7167 25.5 17.5C25.5 17.1487 25.4769 16.8013 25.4307 16.4578C25.3846 16.1143 25.3153 15.7802 25.223 15.4557L26.4345 14.2348C26.6178 14.7488 26.7579 15.2776 26.8547 15.8212C26.9516 16.3647 27 16.9243 27 17.5C27 18.8142 26.7507 20.0492 26.252 21.205C25.7533 22.3608 25.0766 23.3663 24.2218 24.2213C23.3669 25.0763 22.3617 25.7531 21.206 26.2518C20.0503 26.7506 18.8156 27 17.5017 27ZM16.0808 21.7538L12.177 17.85L13.2308 16.7963L16.0808 19.6463L25.9462 9.7655L27 10.8193L16.0808 21.7538Z" fill="white"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
      <path d="M0.944049 12.8429L0 11.8988L5.47738 6.42143L0 0.94405L0.944049 0L7.36548 6.42143L0.944049 12.8429Z" fill="#6E736A"/>
    </svg>
  )
};

const Delievered = ({ order }) => {
  const router = useRouter();


  const formatDate = (dateString, fallback) => {
    if (!dateString) return fallback;
    try {
      const date = new Date(dateString.split('T')[0]);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(date).replace(',', ''); 
    } catch  {
      return fallback;
    }
  };

  const cleanOrderDate = formatDate(order?.date_created, "Dec 17 2025");
  const cleanDeliveryDate = formatDate(order?.deliveryDate, "Dec 28 2025");

  const realItems = order?.line_items || [];
  const placeholder = {
    name: 'Indonesia Meriah Anaerobic Natural',
    image: { src: orderImage },
    meta_data: [{ key: 'pa_weight', value: '1kg' }]
  };

  const previewItems = [...realItems, placeholder, placeholder].slice(0, 2);
  const totalCount = Math.max(realItems.length, 3);
  const remainingCount = totalCount - 2;

  const handleDetailsClick = (e) => {
    e.stopPropagation(); 
    const orderId = order?.id?.toString().replace('#', '') || "2864297643";
    
    router.push(
      `/account/orders/${orderId}?status=completed&date=${cleanOrderDate}&delivery=${cleanDeliveryDate}`
    );
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.statusInfo}>
          <Icons.Package />
          <div className={styles.statusText}>
            <h3>Delivered</h3> 
            <p>Successfully on {cleanDeliveryDate}</p>
          </div>
        </div>
        <div className={styles.orderMeta}>
          <p>Order Date: <span>{cleanOrderDate}</span></p>
          <p>Order ID: <span>#{order?.id || "2864297643"}</span></p>
        </div>
      </div>

      <div className={styles.itemsBox}>
        <div className={styles.itemsHeader}>
          <span className={styles.itemCounter}>{totalCount} Items</span>
          <span 
            className={styles.detailsBtn} 
            onClick={handleDetailsClick}
            style={{ cursor: 'pointer' }}
          >
            Order details <Icons.ChevronRight />
          </span>
        </div>

        <div className={styles.productList}>
          {previewItems.map((item, index) => (
            <div key={index} className={styles.productRow}>
              <div className={styles.imageWrapper}>
                <Image 
                  src={item.image?.src || orderImage} 
                  alt={item.name} 
                  width={45} 
                  height={45} 
                  className={styles.productImage} 
                />
              </div>
              <div className={styles.productInfo}>
                <h4>{item.name}</h4>
                <p>{item.meta_data?.find(m => m.key === "pa_weight")?.value || '1kg'}</p>
              </div>
            </div>
          ))}

          <div 
            className={styles.moreWrapper} 
            onClick={handleDetailsClick} 
            style={{ cursor: 'pointer', marginTop: '10px' }}
          >
            <p className={styles.moreText}>
              + {remainingCount} more
            </p>
          </div>
        </div>
           <div className={styles.mobileFooterContainer}>
          <div className={styles.mobileMetaRow}>
            <p>Order Date:</p>
            <span>{formatDate(order?.date_created, "Dec 17, 2025")}</span>
          </div>
          <div className={styles.mobileMetaRow}>
            <p>Order ID:</p>
            <span className={styles.orderIdValue}>#{order?.id || "2864297643"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Delievered;