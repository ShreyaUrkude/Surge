/*
"use client";
import { usePathname } from "next/navigation"; 
import styles from "./Breadcrumbs.module.css";

const Breadcrumbs = ({ activeLabel = "Profile" }) => {
  const pathname = usePathname();

 
  const isPlaced = pathname.includes("/orders/placed");

  return (
    <div className={styles.main}>
      <div className={styles.MainConatiner}>
        <div className={styles.Top}>
          <div className={styles.MainParentName}>
            <p>Home</p>
          </div>
          <div className={styles.Arrow}>
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.946167 12.8717L0 11.9255L5.48967 6.43583L0 0.946167L0.946167 0L7.382 6.43583L0.946167 12.8717Z" fill="#6E736A" />
            </svg>
          </div>
          <div className={styles.ParentName}>
            <p>Account</p> 
          </div>
          <div className={styles.Arrow}>
            <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.946166 12.8717L0 11.9255L5.48967 6.43583L0 0.946167L0.946166 0L7.382 6.43583L0.946166 12.8717Z" fill="#6E736A" />
            </svg>
          </div>

          
          {isPlaced ? (
            <>
              <div className={styles.ParentName}>
                <p>Order</p>
              </div>
              <div className={styles.Arrow}>
                <svg width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.946166 12.8717L0 11.9255L5.48967 6.43583L0 0.946167L0.946166 0L7.382 6.43583L0.946166 12.8717Z" fill="#6E736A" />
                </svg>
              </div>
             <div className={styles.ActiveName}>
      <div className={styles.MediaOnlyArrow}>
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p>Order Placed</p> 
    </div>
              
            </>
          ) : (
            <div className={styles.ActiveName}>
              <div className={styles.MediaOnlyArrow}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 12H4M4 12L10 18M4 12L10 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p>{activeLabel}</p> 
             
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Breadcrumbs; */