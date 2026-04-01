"use client";
import React from 'react';
import styles from './page.module.css';
import Image from "next/image";
import orderImage from './order.png'; 
import { useRouter } from 'next/navigation';

const Icons = {
  Package: () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
      <rect width="35" height="35" rx="17.5" fill="#C4754E"/>
      <path d="M11.4328 25C10.6634 25 10.0103 24.728 9.47328 24.1841C8.93631 23.6402 8.66783 22.9799 8.66783 22.203H7V11.8008C7 11.2976 7.17247 10.8716 7.51742 10.523C7.86237 10.1743 8.2837 10 8.78141 10H22.2004V13.7931H24.8159L28 18.1036V22.203H26.2186C26.2186 22.9799 25.9493 23.6402 25.4107 24.1841C24.8722 24.728 24.2184 25 23.4491 25C22.6799 25 22.0267 24.728 21.4896 24.1841C20.9526 23.6402 20.6841 22.9799 20.6841 22.203H14.202C14.202 22.982 13.9328 23.6429 13.3944 24.1856C12.8559 24.7285 12.2021 25 11.4328 25ZM11.4351 23.5058C11.7964 23.5058 12.1015 23.3799 12.3504 23.1282C12.5993 22.8767 12.7237 22.5683 12.7237 22.203C12.7237 21.8378 12.5993 21.5293 12.3504 21.2776C12.1015 21.0261 11.7964 20.9003 11.4351 20.9003C11.0737 20.9003 10.7685 21.0261 10.5195 21.2776C10.2706 21.5293 10.1462 21.8378 10.1462 22.203C10.1462 22.5683 10.2706 22.8767 10.5195 23.1282C10.7685 23.3799 11.0737 23.5058 11.4351 23.5058ZM8.47835 20.7088H9.19092C9.40068 20.3397 9.70358 20.0303 10.0996 19.7806C10.4958 19.5309 10.941 19.406 11.4351 19.406C11.9163 19.406 12.3582 19.5293 12.7606 19.7759C13.1631 20.0224 13.4692 20.3334 13.679 20.7088H20.7221V11.4942H8.78141C8.70569 11.4942 8.63621 11.5262 8.57297 11.5901C8.50989 11.6539 8.47835 11.7241 8.47835 11.8008V20.7088ZM23.4514 23.5058C23.8127 23.5058 24.1178 23.3799 24.3667 23.1282C24.6157 22.8767 24.7402 22.5683 24.7402 22.203C24.7402 21.8378 24.6157 21.5293 24.3667 21.2776C24.1178 21.0261 23.8127 20.9003 23.4514 20.9003C23.09 20.9003 22.7848 21.0261 22.5358 21.2776C22.2869 21.5293 22.1625 21.8378 22.1625 22.203C22.1625 22.5683 22.2869 22.8767 22.5358 23.1282C22.7848 23.3799 23.09 23.5058 23.4514 23.5058ZM22.2004 18.7164H26.6165L24.0577 15.2874H22.2004V18.7164Z" fill="white"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none">
      <path d="M0.944049 12.8429L0 11.8988L5.47738 6.42143L0 0.94405L0.944049 0L7.36548 6.42143L0.944049 12.8429Z" fill="#6E736A"/>
    </svg>
  )
};

const InProgressCard = ({ order }) => {
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
  const totalDisplayCount = Math.max(realItems.length, 3);
  const remainingCount = totalDisplayCount - 2;

  const handleDetailsClick = () => {
    const orderId = order?.id?.toString().replace('#', '') || '2864297643';
   
    router.push(`/account/orders/${orderId}?status=inprogress&date=${cleanOrderDate}&delivery=${cleanDeliveryDate}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <div className={styles.statusInfo}>
          <Icons.Package />
          <div className={styles.statusText}>
            <h3>In Progress</h3> 
            <p>Delivered by {cleanDeliveryDate}</p>
          </div>
        </div>
        <div className={styles.orderMeta}>
          <p>Order Date: <span>{cleanOrderDate}</span></p>
          <p>Order ID: <span>#{order?.id || "2864297643"}</span></p>
        </div>
      </div>

      <div className={styles.itemsBox}>
        <div className={styles.itemsHeader}>
          <span className={styles.itemCounter}>{totalDisplayCount} Items</span>
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
                <p>{item.meta_data?.find(m => m.key === 'pa_weight')?.value || '1kg'}</p>
              </div>
            </div>
          ))}

          <div 
            className={styles.moreWrapper} 
            onClick={handleDetailsClick}
            style={{ cursor: 'pointer', marginTop: '8px' }}
          >
            <p className={styles.moreText}>+ {remainingCount} more</p>
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

export default InProgressCard;