"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";


import Delivered from "../_components/OrderComponents/Delievered/page";
import Placed from "../_components/OrderComponents/Placed/page";
import Cancelled from "../_components/OrderComponents/Cancelled/page";
import InProgress from "../_components/OrderComponents/in-progress/page";


const MOCK_DATA = [
  {
    id: "2864297643",
    status: "on-hold", 
    date_created: "2025-12-17T10:00:00",
    line_items: [{ name: "Indonesia Meriah Anaerobic Natural", image: { src: "/order.png" }, meta_data: [{ key: "pa_weight", value: "1kg" }] }]
  },
  {
    id: "2864297644",
    status: "completed", 
    date_created: "2025-12-15T14:30:00",
    line_items: [{ name: "Colombia Huila Supremo", image: { src: "/order.png" }, meta_data: [{ key: "pa_weight", value: "1kg" }] }]
  },
  {
    id: "2864297645",
    status: "processing", 
    date_created: "2025-12-12T09:00:00",
    line_items: [{ name: "Ethiopia Yirgacheffe", image: { src: "/order.png" }, meta_data: [{ key: "pa_weight", value: "250g" }] }]
  },
  {
    id: "2864297646",
    status: "cancelled", 
    date_created: "2025-12-10T16:45:00",
    line_items: [{ name: "Brazil Santos No.2", image: { src: "/order.png" }, meta_data: [{ key: "pa_weight", value: "500g" }] }]
  },
  {
    id: "2864297647",
    status: "pending", 
    date_created: "2025-12-08T11:20:00",
    line_items: [{ name: "Kenya AA Plus", image: { src: "/order.png" }, meta_data: [{ key: "pa_weight", value: "1kg" }] }]
  }
];

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setOrders(MOCK_DATA);
    setLoading(false);
  }, []);

  const renderOrderComponent = (order) => {
    const status = order.status?.toLowerCase();
    if (status === "completed") return <Delivered order={order} />;
    if (status === "cancelled" || status === "refunded") return <Cancelled order={order} />;
    if (status === "processing") return <InProgress order={order} />;
    return <Placed order={order} />; 
  };

  const filteredOrders = orders.filter((o) => 
    o.id.includes(searchTerm) || 
    o.line_items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className={styles.pageWrapper}>
    
      <div className={styles.headerOutside}>
        <h1 className={styles.mainTitle}>All Orders</h1>
        <div className={styles.controls}>
          <div className={styles.searchBar}>
            <input 
              type="text" 
              placeholder="Search In Orders" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className={styles.filterBtn}>
         
            <svg width="18" height="18" viewBox="0 0 15 15" fill="none">
              <path d="M6.65149 15C6.40016 15 6.18991 14.9153 6.02074 14.746C5.85141 14.5768 5.76674 14.3666 5.76674 14.1152V8.327L0.168743 1.2155C-0.0235907 0.959 -0.0515075 0.692333 0.0849925 0.4155C0.221659 0.1385 0.452159 0 0.776493 0H13.757C14.0813 0 14.3118 0.1385 14.4485 0.4155C14.585 0.692333 14.5571 0.959 14.3647 1.2155L8.76674 8.327V14.1152C8.76674 14.3666 8.68208 14.5768 8.51274 14.746C8.34358 14.9153 8.13333 15 7.88199 15H6.65149ZM7.26674 7.8L12.2167 1.5H2.31674L7.26674 7.8Z" fill="#6E736A" />
            </svg>
          </button>
        </div>
      </div>

   
      <div className={styles.contentBody}>
        {loading ? (
          <p className={styles.statusMsg}>Loading...</p>
        ) : filteredOrders.length > 0 ? (
          <div className={styles.orderList}>
            {filteredOrders.map((order) => (
              <div key={order.id} className={styles.componentWrapper}>
                {renderOrderComponent(order)}
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noOrdersMsg}>
             <h2>No Orders Found</h2>
             <p>Aapke search ke mutabik koi order nahi mila.</p>
          </div>
        )}
      </div>
    </div>
  );
}