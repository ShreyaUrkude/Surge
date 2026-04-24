"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";
import styles from "./Allmenu.module.css";
import breakfast from "./breakfast.png";
import breads from "./bread.png";
import beverages from "./cake.png";
import desserts from "./pastry.png";
import axiosClient from "@/lib/axios";
import { useState, useEffect } from "react";
import { formatImageUrl } from "@/lib/imageUtils";

export default function Menu() {
  const searchParams = useSearchParams();
  const shopId = searchParams.get("shop");

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCafeCategories = async () => {
      try {
        const response = await axiosClient.get("/api/app-categories");

        if (response.status !== 200) {
          throw new Error("Failed to fetch shops");
        }

        const data = response.data;

        console.log(data);

        if (data && data.docs) {
          setCategories(data.docs);
        }
      } catch (error) {
        console.error("Error fetching shops:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCafeCategories();
  }, []);

  return (
    <section className={styles.menuSection}>
      <div className={styles.sectionHeader}>
        <div>
          <h2 className={styles.heading}>
            From Our Cafe {shopId ? `(${shopId})` : ""}
          </h2>
          <p className={styles.subtext}>
            Explore the drinks and bites served daily at Surge cafés. From
            espresso classics to signature creations and fresh desserts, every
            item is crafted with the same care as our coffee.
          </p>
        </div>
      </div>

      <div className={styles.menuGrid}>
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          categories.map((category) => {
            // Mapping logic for static images
            let categoryImage = desserts;
            const slug = category.slug.toLowerCase();

            if (slug.includes("bakery") || slug.includes("bread")) {
              categoryImage = breads;
            } else if (slug.includes("beverage")) {
              categoryImage = beverages;
            } else if (slug.includes("breakfast")) {
              categoryImage = breakfast;
            }

            console.log(categories);

            return (
              <div key={category.id} className={styles.card}>
                <div className={styles.imageWrapper}>
                  <Image
                    src={formatImageUrl(category.image.url) || categoryImage}
                    alt={category.title}
                    width={382}
                    height={507}
                    className={styles.image}
                  />
                </div>
                <div className={styles.cardTitle}>{category.title}</div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
