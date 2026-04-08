"use client";
import React, { useState } from 'react';
import styles from './page.module.css';
import Image from "next/image";
import orderImage from './order.png'; 
import { useRouter } from 'next/navigation';

const Icons = {
  Package: () => (
    <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
      <rect width="35" height="35" rx="17.5" fill="#C4754E"/>
      <path d="M16.7464 25.1077V17.9329L10.4646 14.2953V21.2962C10.4646 21.3476 10.4775 21.3959 10.5033 21.4412C10.5291 21.4862 10.5678 21.5248 10.6192 21.557L16.7464 25.1077ZM18.254 25.1077L24.3812 21.557C24.4326 21.5248 24.4713 21.4862 24.4971 21.4412C24.5228 21.3959 24.5357 21.3476 24.5357 21.2962V14.2953L18.254 17.9329V25.1077ZM16.5919 26.7525L9.86562 22.8809C9.57951 22.7161 9.35655 22.4958 9.19674 22.2201C9.03693 21.9442 8.95703 21.6413 8.95703 21.3115V13.6885C8.95703 13.3587 9.03693 13.0558 9.19674 12.7799C9.35655 12.5042 9.57951 12.2839 9.86562 12.1191L16.5919 8.2475C16.8778 8.0825 17.1806 8 17.5002 8C17.8198 8 18.1226 8.0825 18.4085 8.2475L25.1348 12.1191C25.4209 12.2839 25.6438 12.5042 25.8037 12.7799C25.9635 13.0558 26.0434 13.3587 26.0434 13.6885V21.3115C26.0434 21.6413 25.9635 21.9442 25.8037 22.2201C25.6438 22.4958 25.4209 22.7161 25.1348 22.8809L18.4085 26.7525C18.1226 26.9175 17.8198 27 17.5002 27C17.1806 27 16.8778 26.9175 16.5919 26.7525ZM21.3755 14.3843L23.7066 13.0468L17.6547 9.54631C17.6033 9.51415 17.5518 9.49807 17.5002 9.49807C17.4486 9.49807 17.3971 9.51415 17.3457 9.54631L15.1634 10.8027L21.3755 14.3843ZM17.5002 16.6341L19.837 15.281L13.6306 11.6937L11.2938 13.0468L17.5002 16.6341Z" fill="white"/>
    </svg>
  ),
  ChevronRight: () => (
    <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.944049 12.8429L0 11.8988L5.47738 6.42143L0 0.94405L0.944049 0L7.36548 6.42143L0.944049 12.8429Z" fill="#6E736A"/>
    </svg>
  )
};

const OrderPlacedCard = ({ order }) => {
  const router = useRouter();
  
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState("");

  const cancellationReasons = [
    "Changed my mind",
    "Ordered by mistake",
    "Delivery time is too long",
    "Found a better alternative"
  ];

  const formatDate = (dateString, fallback) => {
    if (!dateString) return fallback;
    try {
      const date = new Date(dateString.split('T')[0]);
      return new Intl.DateTimeFormat('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
      }).format(date).replace(',', ''); 
    } catch { return fallback; }
  };

  const handleDetailsClick = () => {
    const orderId = order?.id?.toString().replace('#', '') || "2864297643";
    router.push(`/account/orders/${orderId}`);
  };

  const realItems = order?.line_items || [];
  const defaultPlaceholder = {
    name: 'Indonesia Meriah Anaerobic Natural',
    image: { src: orderImage },
    meta_data: [{ key: 'pa_weight', value: '1kg' }]
  };

  const previewItems = [...realItems, defaultPlaceholder, defaultPlaceholder].slice(0, 2);
  const totalDisplayCount = Math.max(realItems.length, 3);
  const remainingCount = totalDisplayCount - 2;

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.statusInfo}>
            <Icons.Package />
            <div className={styles.statusText}>
              <h3 className={styles.placed}>Order Placed</h3>
              <p>Delivering by {formatDate(order?.deliveryDate, "Dec 28 2025")}</p>
            </div>
          </div>
          <div className={styles.orderMeta}>
            <p>Order Date: <span>{formatDate(order?.date_created, "Dec 17 2025")}</span></p>
            <p>Order ID: <span>#{order?.id || "2864297643"}</span></p>
          </div>
        </div>

        <div className={styles.itemsBox}>
          <div className={styles.itemsHeader}>
            <span className={styles.itemCounter}>{totalDisplayCount} Items</span>
            <span className={styles.detailsBtn} onClick={handleDetailsClick} style={{ cursor: 'pointer' }}>
              Order details <Icons.ChevronRight />
            </span>
          </div>

          <div className={styles.productList}>
            {previewItems.map((item, index) => (
              <div key={index} className={styles.productRow}>
                <div className={styles.imageWrapper}>
                  <Image src={item.image?.src || orderImage} alt={item.name} width={50} height={50} className={styles.productImage} />
                </div>
                <div className={styles.productInfo}>
                  <h4>{item.name}</h4>
                  <p>{item.meta_data?.find(m => m.key === 'pa_weight')?.value || '1kg'}</p>
                </div>
              </div>
            ))}
            <div className={styles.moreWrapper} onClick={handleDetailsClick} style={{ cursor: 'pointer', marginTop: '10px' }}>
              <p className={styles.moreText}>+ {remainingCount} more</p>
            </div>
          </div>
        </div>
{/* MOBILE ONLY INFO: Yeh card ke border ke andar hi rahega */}
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
        
        <div className={styles.actionArea}>
          <button className={styles.cancelBtn} onClick={() => setIsModalOpen(true)}>
            Cancel Order
          </button>
        </div>
      </div>
      

   
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Cancel order</h2>
            <p className={styles.modalSubText}>
              Please let us know why you re cancelling this order. This helps us <br/>improve your experience.
            </p>
            
            <p className={styles.reasonHeader}>Select cancellation reason:</p>
            <div className={styles.reasonList}>
              {cancellationReasons.map((reason) => (
                <label key={reason} className={styles.radioLabel}>
                  <input 
                    type="radio" 
                    name="cancelReason" 
                    value={reason} 
                    checked={selectedReason === reason}
                    onChange={(e) => setSelectedReason(e.target.value)}
                  />
                  <span className={styles.customRadio}></span>
                  {reason}
                </label>
              ))}
            </div>

            <hr className={styles.modalDivider} />
            
            <p className={styles.disclaimerText}>
              Cancellation requests are reviewed before approval. Once <br/>approved, your refund will be initiated in 7-14 days.
            </p>

            <div className={styles.modalButtons}>
              <button className={styles.keepOrderBtn} onClick={() => setIsModalOpen(false)}>
                Keep Order
              </button>
              <button 
                className={styles.confirmCancelBtn} 
                disabled={!selectedReason}
                onClick={() => {
                  console.log("Cancelled for:", selectedReason);
                  setIsModalOpen(false);
                }}
              >
                Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderPlacedCard;