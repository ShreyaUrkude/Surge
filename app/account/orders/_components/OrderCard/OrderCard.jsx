"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import styles from "./OrderCard.module.css";
import { formatImageUrl } from "@/lib/imageUtils";
import { getStatusConfig, formatDate } from "@/app/account/orders/_components/GetStatus";
import { useRouter } from 'next/navigation';
import axiosClient from "@/lib/axios";
import toast from "react-hot-toast";
import CancelOrderPopup from "@/app/account/orders/_components/CancelOrderPopup/CancelOrderPopup";

const OrderCard = ({ order }) => {
  if (!order) return null;
  const router = useRouter();

  // Initializing state with props
  const [currentStatus, setCurrentStatus] = useState(order.deliveryStatus || order.status);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  useEffect(() => {
    if (order) {
      setCurrentStatus(order.deliveryStatus || order.status);
    }
  }, [order.deliveryStatus, order.status]); 

  const handleCancelConfirm = async (reason) => {
    try {
      const response = await axiosClient.get(
        `/api/web-orders/${order.id}/cancel?reason=${encodeURIComponent(reason)}`
      );

      if (response.data.success) {
        toast.success("Order cancelled successfully");
        
       
        setCurrentStatus('cancelled'); 
        setIsPopupOpen(false);
        
        // Server data refresh
        router.refresh(); 
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to cancel order");
    }
  };

  const config = getStatusConfig(currentStatus, order);

  const items = order.docs || order.items || [];
  const visibleItems = items.slice(0, 2);
  const remainingCount = Math.max(0, items.length - 2);

  return (
    <div className={styles.orderCard}>
      <div className={styles.cardHeader}>
        <div className={styles.statusGroup}>
          <div className={styles.iconWrapper}>{config.icon}</div>
          <div className={styles.statusTexts}>
            <h3 style={{ color: config.color }}>{config.label}</h3>
            <p className={styles.statusDate}>
               {currentStatus === 'cancelled' 
                 ? (order.cancelledOn ? `On ${formatDate(order.cancelledOn)}` : `On ${formatDate(new Date())}`)
                 : config.date}
            </p>
            {currentStatus === 'cancelled' && (
              <p className={styles.refundText}>
                Refund initiated. It may take 7-8 working days.
              </p>
            )}
          </div>
        </div>
        <div className={styles.metaGroup}>
          <p>Order Date: <span>{formatDate(order.createdAt)}</span></p>
          <p>Order ID: <span>#{order.id}</span></p>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.itemsBox}>
        <div className={styles.itemsBoxHeader}>
          <span>{items.length} {items.length === 1 ? 'Item' : 'Items'}</span>
          <div className={styles.detailsLink} onClick={() => router.push(`/account/orders/${order.id}`)}>
            Order details &gt;
          </div>
        </div>

        <div className={styles.productList}>
          {visibleItems.map((item, idx) => (
            <div key={idx} className={styles.productRow}>
              <div className={styles.imageContainer}>
                <Image
                  src={formatImageUrl(item.product?.productImage?.url) || "/order.png"}
                  alt="product"
                  fill
                  className={styles.productImage}
                />
              </div>
              <div className={styles.productDetails}>
                <h4>{item.product?.name}</h4>
                <p>Qty: {item.quantity}</p>
              </div>
            </div>
          ))}
          {remainingCount > 0 && <p className={styles.moreText}>+ {remainingCount} more</p>}
        </div>
      </div>

      <div className={styles.cardFooter}>
     
        {currentStatus !== 'cancelled' && config.showCancel && (
          <button className={styles.cancelButton} onClick={() => setIsPopupOpen(true)}>
            Cancel Order
          </button>
        )}
      </div>

      {isPopupOpen && (
        <CancelOrderPopup 
          orderId={order.id} 
          onClose={() => setIsPopupOpen(false)} 
          onConfirm={handleCancelConfirm} 
        />
      )}
    </div>
  );
};

export default OrderCard;