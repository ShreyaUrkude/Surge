"use client";
import Image from "next/image";
import { useState } from "react";
import styles from "../page.module.css";
// import placeholderImage from "../1.png";

const dummyProducts = [
  { id: 1, name: "Ethiopian Yirgacheffe", tagline: "Light Roast", image: null, price: 85, quantity: 2, vId: "1", variantName: "250" },
  { id: 2, name: "Colombia Supremo", tagline: "Medium Roast", image: null, price: 95, quantity: 1, vId: "2", variantName: "500" },
];

const dummyCartTotals = {
  subtotal: 265,
  discount: 0,
  beansDiscount: 0,
  shipping: 0,
  tax: 13.25,
  taxPercent: 5,
  total: 278.25,
};

export default function OrderSummary({
  product = dummyProducts,
  cartTotals = dummyCartTotals,
  delivery = "ship",
  checkoutMode = "one-time",
}) {
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");

  return (
    <div className={styles.Right}>
      <div className={styles.RightOne}>
        <h3>ORDER SUMMARY</h3>
        <p>({product.length} items)</p>
      </div>

      {/* Item List */}
      <div className={styles.RightTwo} data-lenis-prevent style={{ overflowY: "auto" }}>
        {product.map((item, idx) => {
          const isSubscription = checkoutMode === "subscription";
          return (
            <div
              className={`${styles.SummaryItem} ${isSubscription ? styles.SubSummaryItem : ""}`}
              key={item.id || idx}
            >
              <div className={styles.ItemImage}>
                <Image
                  src={item.image || placeholderImage}
                  alt={item.title || item.name}
                  width={80}
                  height={80}
                />
              </div>
              <div className={styles.ItemInfo}>
                <div className={styles.ItemMainRow}>
                  <div className={styles.ItemName}>
                    {item.name} {item.tagline}
                  </div>
                  {isSubscription && (
                    <div className={styles.ItemPrice}>
                      AED {(parseFloat(item.price?.final_price || item.price) || 0).toFixed(0)}
                    </div>
                  )}
                </div>
                {isSubscription ? (
                  <>
                    <div className={styles.ItemSubRow}>
                      {item?.vId && <span>{item?.variantName}g</span>}
                      {item?.vId && <span>&nbsp;|&nbsp;</span>}
                      <span>{item.quantity}x Bag amount</span>
                    </div>
                    {item?.frequency && (
                      <div className={styles.ItemFrequencyRow}>{item.frequency}</div>
                    )}
                  </>
                ) : (
                  <>
                    {item?.vId && <span>{item?.variantName}g</span>}
                    {item?.frequency && (
                      <div className={styles.ItemFrequency} style={{ fontSize: "12px", color: "#6e736a" }}>
                        {item.frequency}
                      </div>
                    )}
                  </>
                )}
              </div>
              {!isSubscription && (
                <>
                  <div className={styles.ItemQty}>×{item.quantity}</div>
                  <div className={styles.ItemPrice}>
                    AED {(parseFloat(item.price?.final_price || item.price) || 0).toFixed(0)}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>

      {/* Coupons and Rewards */}
      <div className={styles.CouponSection}>
        <div className={styles.CouponHeader}>
          <h3>COUPONS AND REWARDS</h3>
        </div>

        {checkoutMode !== "subscription" && (
          !appliedCoupon ? (
            <div className={styles.CouponInputGroup}>
              <input
                type="text"
                placeholder="Discount code or coupon"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button onClick={() => {}}>Apply</button>
            </div>
          ) : (
            <div className={styles.AppliedCouponGroup}>
              <p className={styles.AppliedText}>{appliedCoupon.code} applied!</p>
              <div className={styles.AppliedRight}>
                <div className={styles.SavingsBadge}>
                  You saved AED {Number(appliedCoupon.discount || 0).toFixed(0)}
                </div>
                <button className={styles.RemoveCouponBtn} onClick={() => setAppliedCoupon(null)}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.4 14L0 12.6L5.6 7L0 1.4L1.4 0L7 5.6L12.6 0L14 1.4L8.4 7L14 12.6L12.6 14L7 8.4L1.4 14Z" fill="#2F362A" />
                  </svg>
                </button>
              </div>
            </div>
          )
        )}

        {/* Rewards / Beans */}
        <div className={`${styles.RewardsSection} ${checkoutMode === "subscription" ? styles.SubRewardsSection : ""}`}>
          <label className={styles.CheckboxContainer}>
            <input type="checkbox" disabled />
            <span className={styles.Checkmark}></span>
            <div className={styles.RewardsInfo}>
              <p className={styles.RewardsLabel}>Use Beans</p>
              <p className={styles.RewardsBalance}>Total Beans: 0</p>
            </div>
          </label>
        </div>
      </div>

      {/* Totals */}
      <div className={styles.RightThree}>
        {couponError && <p className={styles.CheckoutCouponError}>{couponError}</p>}

        <div className={styles.Subtotal}>
          <p>Subtotal</p>
          <h5>AED {Number(cartTotals.subtotal || 0).toFixed(2)}</h5>
        </div>

        {cartTotals.discount > 0 && (
          <div className={styles.Subtotal}>
            <p>Discount</p>
            <h5 style={{ color: "green" }}>- AED {Number(cartTotals.discount || 0).toFixed(2)}</h5>
          </div>
        )}

        {cartTotals.beansDiscount > 0 && (
          <div className={styles.Subtotal}>
            <p>Beans Discount</p>
            <h5 style={{ color: "green" }}>- AED {Number(cartTotals.beansDiscount || 0).toFixed(2)}</h5>
          </div>
        )}

        <div className={styles.Shipping}>
          <p>Shipping</p>
          <h5>
            {cartTotals.shipping === 0
              ? delivery === "pickup"
                ? "Free (Pickup)"
                : checkoutMode === "subscription"
                  ? "Free"
                  : "Calculated at next step"
              : `AED ${Number(cartTotals.shipping || 0).toFixed(2)}`}
          </h5>
        </div>

        <div className={styles.EstimatedTax}>
          <p>Estimated Taxes ({cartTotals.taxPercent || 0}%)</p>
          <h5>AED {Number(cartTotals.tax || 0).toFixed(2)}</h5>
        </div>

        <div className={styles.Total}>
          <p>Total</p>
          <h5>AED {Number(cartTotals.total || 0).toFixed(2)}</h5>
        </div>

        <div className={styles.EarningBadge}>
          <p>Login to earn beans on this order</p>
        </div>
      </div>
    </div>
  );
}