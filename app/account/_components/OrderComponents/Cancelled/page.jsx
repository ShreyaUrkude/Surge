"use client";
import React from 'react';
import styles from './page.module.css';
import Image from "next/image";
import orderImage from './order.png'; 
import { useRouter } from 'next/navigation';

const Icons = {
  Package: () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="-0.0703125" width="35" height="35" rx="17.5" fill="#EA2424"/>
      <path d="M13.8297 22.1538L17.4297 18.5538L21.0297 22.1538L22.0834 21.1L18.4834 17.5L22.0834 13.9L21.0297 12.8462L17.4297 16.4462L13.8297 12.8462L12.7759 13.9L16.3759 17.5L12.7759 21.1L13.8297 22.1538ZM17.4314 27C16.1174 27 14.8824 26.7507 13.7262 26.252C12.57 25.7533 11.5644 25.0766 10.7092 24.2218C9.85402 23.3669 9.17694 22.3617 8.67794 21.206C8.1791 20.0503 7.92969 18.8156 7.92969 17.5017C7.92969 16.1877 8.17902 14.9527 8.67769 13.7965C9.17635 12.6403 9.8531 11.6347 10.7079 10.7795C11.5628 9.92433 12.568 9.24725 13.7237 8.74825C14.8794 8.24942 16.1141 8 17.4279 8C18.7419 8 19.977 8.24933 21.1332 8.748C22.2894 9.24667 23.295 9.92342 24.1502 10.7783C25.0054 11.6331 25.6824 12.6383 26.1814 13.794C26.6803 14.9497 26.9297 16.1844 26.9297 17.4983C26.9297 18.8123 26.6804 20.0492 26.1817 21.2035C25.683 22.3597 25.0063 23.3653 24.1514 24.2205C23.2966 25.0757 22.2914 25.7528 21.1357 26.2518C19.98 26.7506 18.7453 27 17.4314 27ZM17.4297 25.5C19.663 25.5 21.5547 24.725 23.1047 23.175C24.6547 21.625 25.4297 19.7333 25.4297 17.5C25.4297 15.2667 24.6547 13.375 23.1047 11.825C21.5547 10.275 19.663 9.5 17.4297 9.5C15.1964 9.5 13.3047 10.275 11.7547 11.825C10.2047 13.375 9.42969 15.2667 9.42969 17.5C9.42969 19.7333 10.2047 21.625 11.7547 23.175C13.3047 24.725 15.1964 25.5 17.4297 25.5Z" fill="white"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.944049 12.8429L0 11.8988L5.47738 6.42143L0 0.94405L0.944049 0L7.36548 6.42143L0.944049 12.8429Z" fill="#6E736A"/>
    </svg>
  )
};

const CancelledCard = ({ order }) => {
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
  const cleanCancellationDate = formatDate(order?.deliveryDate, "Dec 28 2025");

  const realItems = order?.line_items || [];
  const placeholder = {
    name: 'Indonesia Meriah Anaerobic Natural',
    image: { src: orderImage },
    meta_data: [{ key: 'pa_weight', value: '1kg' }]
  };

  const previewItems = [...realItems, placeholder, placeholder].slice(0, 2);
  const totalCount = Math.max(realItems.length, 3);
  const remainingCount = totalCount - 2;

  const handleDetailsClick = () => {
    const orderId = order?.id?.toString().replace('#', '') || '2864297643';
   
    router.push(`/account/orders/${orderId}?status=cancelled&date=${cleanOrderDate}&delivery=${cleanCancellationDate}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.statusInfo}>
          <Icons.Package />
          <div className={styles.statusText}>
            <h3 style={{ color: '#EA2424' }}>Cancelled</h3> 
            <p>On {cleanCancellationDate}</p>
            <p className={styles.subInfo}>
              Payment refunded. It may take a few days <br/>to reflect in your bank.
            </p>
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
                  width={50} 
                  height={50} 
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
            style={{ cursor: 'pointer', marginTop: '8px' }}
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

export default CancelledCard;