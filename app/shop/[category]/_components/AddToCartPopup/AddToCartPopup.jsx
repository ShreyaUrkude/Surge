"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./AddToCartPopup.module.css";
import { useCart } from "@/app/_context/CartContext";
import { formatImageUrl } from "@/lib/imageUtils";

function CustomSelect({ label, placeholder, options, value, onChange }) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false);
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={styles.field}>
            <label className={styles.fieldLabel}>{label}</label>
            <div className={styles.customSelect} ref={ref}>
                <button
                    type="button"
                    className={`${styles.selectTrigger} ${open ? styles.open : ""} ${value ? styles.hasValue : ""}`}
                    onClick={() => setOpen((o) => !o)}
                >
                    <span>{value || placeholder}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.chev}>
                        <path d="M6 9l6 6 6-6" />
                    </svg>
                </button>
                {open && (
                    <div className={styles.selectMenu}>
                        {options.map((option) => (
                            <div
                                key={option}
                                className={`${styles.selectOption} ${value === option ? styles.selected : ""}`}
                                onClick={() => { onChange(option); setOpen(false); }}
                            >
                                {option}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default function ProductPopup({ product, onClose }) {
    const { addToCart } = useCart();

    // Weight — comes from variants[]
    const variants = product?.variants || [];
    const [selectedVariant, setSelectedVariant] = useState(variants[0] || null);

    // Roast profile — product.roastProfile (array of strings) or []
    const roastOptions = product?.roastProfile || [];
    const [selectedRoast, setSelectedRoast] = useState(roastOptions[0] || "");

    // Grind option — product.grindOption (array of strings) or []
    const grindOptions = product?.grindOption || [];
    const [selectedGrind, setSelectedGrind] = useState(grindOptions[0] || "");

    // Highlights
    const highlights = product?.productHighlights || [];

    const [quantity, setQuantity] = useState(1);
    const [loading, setLoading] = useState(false);

    const price = product?.salePrice
        ? `AED ${product.salePrice}`
        : product?.regularPrice
            ? `AED ${product.regularPrice}`
            : "";

    const handleAddToCart = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const imageUrl = formatImageUrl(product.productImage);
            await addToCart(product.id, quantity, selectedVariant?.id || "", {
                productId: product.id,
                name: product.name,
                description: product.description,
                image: imageUrl,
                tagline: product.tagline,
                quantity,
                variationId: selectedVariant?.id || "",
                roastProfile: selectedRoast,
                grindOption: selectedGrind,
            });
            onClose();
        } catch (err) {
            console.error("Add to cart error", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
                {/* Header */}
                <div className={styles.popupHeader}>
                    <div>
                        <h3 className={styles.popupTitle}>{product?.name}</h3>
                        <p className={styles.popupPrice}>{price}</p>
                    </div>
                    <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Close">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Selects row */}
                <div className={styles.row}>
                    {/* Weight — from variants */}
                    {variants.length > 0 && (
                        <CustomSelect
                            label="Weight"
                            placeholder="Select Weight"
                            options={variants.map((v) => `${v.variantName}g`)}
                            value={selectedVariant ? `${selectedVariant.variantName}g` : ""}
                            onChange={(val) =>
                                setSelectedVariant(
                                    variants.find((v) => `${v.variantName}g` === val)
                                )
                            }
                        />
                    )}

                    {/* Roast Profile */}
                    {roastOptions.length > 0 && (
                        <CustomSelect
                            label="Roast Profile"
                            placeholder="Select Roast"
                            options={roastOptions}
                            value={selectedRoast}
                            onChange={setSelectedRoast}
                        />
                    )}

                    {/* Grind Option */}
                    {grindOptions.length > 0 && (
                        <CustomSelect
                            label="Grind Option"
                            placeholder="Select Grind"
                            options={grindOptions}
                            value={selectedGrind}
                            onChange={setSelectedGrind}
                        />
                    )}

                    {/* Quantity — static stepper */}
                    <div className={styles.field}>
                        <label className={styles.fieldLabel}>Quantity</label>
                        <div className={styles.qtyControl}>
                            <button
                                type="button"
                                className={styles.qtyBtn}
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                aria-label="Decrease"
                            >−</button>
                            <div className={styles.qtyValue}>{String(quantity).padStart(2, "0")}</div>
                            <button
                                type="button"
                                className={styles.qtyBtn}
                                onClick={() => setQuantity((q) => Math.min(99, q + 1))}
                                aria-label="Increase"
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* Product Highlights */}
                {/* Product Highlights */}
                {highlights.length > 0 && (
                    <div className={styles.highlights}>
                        {highlights.map((section) => (
                            <details key={section.id} className={styles.highlightDropdown}>
                                <summary className={styles.highlightSummary}>
                                    {section.sectionTitle}
                                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.chev}>
                                        <path d="M6 9l6 6 6-6" />
                                    </svg>
                                </summary>
                                <ul className={styles.highlightList}>
                                    {(section.items || []).map((item) => (
                                        <li key={item.id} className={styles.highlightItem}>
                                            {item.point}
                                        </li>
                                    ))}
                                </ul>
                            </details>
                        ))}
                    </div>
                )}

                {/* CTA */}
                <button
                    type="button"
                    className={styles.addBtn}
                    onClick={handleAddToCart}
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add to Cart"}
                </button>
            </div>
        </div>
    );
}