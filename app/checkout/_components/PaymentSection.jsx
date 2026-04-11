"use client";
import { useState, useEffect } from "react";
import styles from "../page.module.css";

// --- Policy Content ---
const POLICIES = {
    refund: {
        title: "CANCELLATION & REFUND POLICY",
        content: (
            <>
                <p>We aim to provide high-quality products and reliable service. This policy outlines the terms related to order cancellations, refunds, and product issues.</p>
                <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "20px 0" }} />
                <b>1. ORDER CANCELLATION</b>
                <p>Customers may request cancellation before the order has been processed or dispatched.</p>
                <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "20px 0" }} />
                <b>2. REFUND ELIGIBILITY</b>
                <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                    <li style={{ marginBottom: "5px" }}>The order was cancelled before processing</li>
                    <li style={{ marginBottom: "5px" }}>The product received was incorrect</li>
                    <li style={{ marginBottom: "5px" }}>The product arrived damaged or defective</li>
                </ul>
            </>
        ),
    },
    privacy: {
        title: "PRIVACY POLICY",
        content: (
            <>
                <p>This Privacy Policy helps you understand how we use and protect the personal information you share with us.</p>
                <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "20px 0" }} />
                <b>1. WHAT INFORMATION WE COLLECT</b>
                <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                    <li style={{ marginBottom: "5px" }}>Name</li>
                    <li style={{ marginBottom: "5px" }}>Email address</li>
                    <li style={{ marginBottom: "5px" }}>Phone number</li>
                    <li style={{ marginBottom: "5px" }}>Delivery address</li>
                </ul>
            </>
        ),
    },
    shipping: {
        title: "SHIPPING",
        content: (
            <>
                <p>We provide delivery services for products ordered through our website.</p>
                <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "20px 0" }} />
                <b>1. DELIVERY AREAS</b>
                <p>Delivery services are available within our serviceable regions.</p>
                <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "20px 0" }} />
                <b>2. DELIVERY TIME</b>
                <p>Typical delivery time ranges from 1 to 5 business days.</p>
            </>
        ),
    },
    terms: {
        title: "TERMS OF SERVICE",
        content: (
            <>
                <p>By accessing or using this website, you agree to comply with the following Terms and Conditions.</p>
                <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "20px 0" }} />
                <b>1. ORDERS AND ACCEPTANCE</b>
                <p>Orders are confirmed only after payment is successfully processed.</p>
                <hr style={{ border: 0, borderTop: "1px solid #eee", margin: "20px 0" }} />
                <b>2. GOVERNING LAW</b>
                <p>These Terms are governed by the laws of your jurisdiction.</p>
            </>
        ),
    },
    contact: {
        title: "CONTACT",
        content: (
            <>
                <p style={{ fontSize: "15px", lineHeight: "1.8", color: "#444", marginBottom: "30px" }}>
                    For orders or any enquiries, our team typically responds within a few hours.
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    <div>
                        <span style={{ display: "block", fontSize: "15px", fontWeight: "bold", color: "#000" }}>Email</span>
                        <a href="mailto:hello@yourbrand.com" style={{ fontSize: "15px", color: "#1a1a1a", textDecoration: "none" }}>
                            hello@yourbrand.com
                        </a>
                    </div>
                </div>
            </>
        ),
    },
};

// --- Modal ---
function PolicyModal({ policy, onClose }) {
    if (!policy) return null;

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <>
            <div onClick={onClose} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.4)", zIndex: 999 }} />
            <div data-lenis-prevent style={{
                position: "fixed",
                top: "50%", left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "#faf9f6",
                padding: "32px",
                width: "min(520px, 90vw)",
                maxHeight: "75vh",
                overflowY: "auto",
                zIndex: 1000,
                boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                    <h2 style={{ margin: 0, fontSize: "24px", fontWeight: 700, color: "#1a1a1a" }}>
                        {policy.title}
                    </h2>
                    <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "#555", padding: "4px 8px" }} aria-label="Close">
                        ✕
                    </button>
                </div>
                <div style={{ fontSize: "15px", fontWeight: 400, lineHeight: "1.8", color: "#444" }}>
                    {policy.content}
                </div>
            </div>
        </>
    );
}

// --- Payment Card Section ---
export function PaymentCardSection({ validationErrors = {} }) {
    return (
        <div className={styles.Five}>
            <h3>PAYMENT</h3>
            <p>All transactions are secure and encrypted.</p>
            <div className={styles.PaymentContainer}>
                <div className={styles.PaymentBody}>
                    <div className={styles.StripeInput}>
                        {/* PaymentElement will go here once Stripe is set up */}
                    </div>
                    {validationErrors.card && (
                        <span className={styles.ErrorMessage}>{validationErrors.card}</span>
                    )}
                </div>
            </div>
        </div>
    );
}

// --- Payment Button + Policy Links ---
export function PaymentButtonSection({ isProcessing, handlePayment }) {
    const [activePolicy, setActivePolicy] = useState(null);

    return (
        <div className={styles.Six}>
            <button
                className={styles.Pay}
                onClick={handlePayment}
                disabled={isProcessing}
            >
                {isProcessing ? "Processing..." : "Pay Now"}
            </button>

            <div className={styles.PageLinks}>
                <p onClick={() => setActivePolicy(POLICIES.refund)} style={{ cursor: "pointer" }}>Cancellation & Refund Policy</p>
                <p onClick={() => setActivePolicy(POLICIES.shipping)} style={{ cursor: "pointer" }}>Shipping</p>
                <p onClick={() => setActivePolicy(POLICIES.privacy)} style={{ cursor: "pointer" }}>Privacy Policy</p>
                <p onClick={() => setActivePolicy(POLICIES.terms)} style={{ cursor: "pointer" }}>Terms of Service</p>
                <p onClick={() => setActivePolicy(POLICIES.contact)} style={{ cursor: "pointer" }}>Contact</p>
            </div>

            <PolicyModal policy={activePolicy} onClose={() => setActivePolicy(null)} />
        </div>
    );
}

export default function PaymentSection({ validationErrors, isProcessing, handlePayment }) {
    return (
        <>
            <PaymentCardSection validationErrors={validationErrors} />
            <PaymentButtonSection isProcessing={isProcessing} handlePayment={handlePayment} />
        </>
    );
}