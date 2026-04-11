"use client";
import styles from "../page.module.css";
import { useState, useRef, useEffect } from "react";
// import { validateRequired, validateUAEPhone } from "@/utils/validatorFunctions";

// Emirate options — replace with your own list if different
const UAE_STATES = [
    { label: "Abu Dhabi", value: "abu_dhabi" },
    { label: "Dubai", value: "dubai" },
    { label: "Sharjah", value: "sharjah" },
    { label: "Ajman", value: "ajman" },
    { label: "Umm Al Quwain", value: "umm_al_quwain" },
    { label: "Ras Al Khaimah", value: "ras_al_khaimah" },
    { label: "Fujairah", value: "fujairah" },
];

function FloatingInput({ type = "text", placeholder, value, onChange, onBlur, hasError }) {
    return (
        <div className={`${styles.floatingField} ${hasError ? styles.floatingFieldError : ""}`}>
            <input
                type={type}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder=" "
            />
            <label>{placeholder}</label>
        </div>
    );
}

export default function BillingAddressSection({
    delivery,
    useShippingAsBilling,
    setUseShippingAsBilling,
    billingForm,
    setBillingForm,
    validationErrors = {},
    clearError = () => { },
    setValidationErrors = () => { },
}) {
    const [isEmirateOpen, setIsEmirateOpen] = useState(false);
    const emirateRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emirateRef.current && !emirateRef.current.contains(event.target)) {
                setIsEmirateOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const showForm = !useShippingAsBilling || delivery === "pickup";

    return (
        <div className={styles.section}>

            {/* ── "Same as shipping" toggle ── */}
            {delivery !== "pickup" && (
                <div className={styles.checkRow}>
                    <input
                        type="checkbox"
                        id="useShipping"
                        checked={useShippingAsBilling}
                        onChange={(e) => setUseShippingAsBilling(e.target.checked)}
                    />
                    <label htmlFor="useShipping">Use shipping address as billing address</label>
                </div>
            )}

            {/* ── Billing Form ── */}
            {showForm && (
                <>
                    <h2 className={styles.sectionTitle}>Billing Address</h2>

                    {/* Country — read only */}
                    <div className={styles.floatingField}>
                        <input type="text" value="United Arab Emirates" readOnly placeholder=" " />
                        <label>Country / Region</label>
                    </div>

                    {/* First / Last Name */}
                    <div className={styles.fieldRow}>
                        <div>
                            <FloatingInput
                                placeholder="First Name"
                                value={billingForm.firstName}
                                onChange={(e) => {
                                    setBillingForm({ ...billingForm, firstName: e.target.value });
                                    clearError("billingFirstName");
                                }}
                                // onBlur={() => {
                                //   const e = validateRequired(billingForm.firstName, "First name");
                                //   if (e) setValidationErrors((p) => ({ ...p, billingFirstName: e }));
                                // }}
                                hasError={!!validationErrors.billingFirstName}
                            />
                            {validationErrors.billingFirstName && (
                                <span className={styles.errorMessage}>{validationErrors.billingFirstName}</span>
                            )}
                        </div>
                        <div>
                            <FloatingInput
                                placeholder="Last Name"
                                value={billingForm.lastName}
                                onChange={(e) => {
                                    setBillingForm({ ...billingForm, lastName: e.target.value });
                                    clearError("billingLastName");
                                }}
                                // onBlur={() => {
                                //   const e = validateRequired(billingForm.lastName, "Last name");
                                //   if (e) setValidationErrors((p) => ({ ...p, billingLastName: e }));
                                // }}
                                hasError={!!validationErrors.billingLastName}
                            />
                            {validationErrors.billingLastName && (
                                <span className={styles.errorMessage}>{validationErrors.billingLastName}</span>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <FloatingInput
                        placeholder="House Number, Street Name"
                        value={billingForm.address}
                        onChange={(e) => {
                            setBillingForm({ ...billingForm, address: e.target.value });
                            clearError("billingAddress");
                        }}
                        // onBlur={() => {
                        //   const e = validateRequired(billingForm.address, "Address");
                        //   if (e) setValidationErrors((p) => ({ ...p, billingAddress: e }));
                        // }}
                        hasError={!!validationErrors.billingAddress}
                    />
                    {validationErrors.billingAddress && (
                        <span className={styles.errorMessage}>{validationErrors.billingAddress}</span>
                    )}

                    {/* Apartment — optional */}
                    <div className={styles.fieldOptional}>
                        <FloatingInput
                            placeholder="Apartment, Suite etc."
                            value={billingForm.apartment}
                            onChange={(e) => setBillingForm({ ...billingForm, apartment: e.target.value })}
                        />
                        <span className={styles.optionalTag}>(Optional)</span>
                    </div>

                    {/* City / Emirate */}
                    <div className={styles.fieldRow}>
                        <div>
                            <FloatingInput
                                placeholder="City"
                                value={billingForm.city}
                                onChange={(e) => {
                                    setBillingForm({ ...billingForm, city: e.target.value });
                                    clearError("billingCity");
                                }}
                                // onBlur={() => {
                                //   const e = validateRequired(billingForm.city, "City");
                                //   if (e) setValidationErrors((p) => ({ ...p, billingCity: e }));
                                // }}
                                hasError={!!validationErrors.billingCity}
                            />
                            {validationErrors.billingCity && (
                                <span className={styles.errorMessage}>{validationErrors.billingCity}</span>
                            )}
                        </div>

                        {/* Emirate dropdown */}
                        <div className={styles.selectWrap} ref={emirateRef} style={{ position: "relative" }}>
                            <div
                                className={styles.customSelectTrigger}
                                onClick={() => setIsEmirateOpen(!isEmirateOpen)}
                            >
                                <span>
                                    {UAE_STATES.find((s) => s.value === (billingForm.emirates || "dubai"))?.label || "Select Emirate"}
                                </span>
                                <span className={styles.selectArrow}>▼</span>
                            </div>

                            {isEmirateOpen && (
                                <div className={styles.emirateDropdown}>
                                    {UAE_STATES.map((opt) => (
                                        <div
                                            key={opt.value}
                                            className={styles.emirateOption}
                                            onClick={() => {
                                                setBillingForm({ ...billingForm, emirates: opt.value });
                                                setIsEmirateOpen(false);
                                                clearError("billingEmirates");
                                            }}
                                        >
                                            {opt.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className={`${styles.numberInput} ${validationErrors.billingPhone ? styles.floatingFieldError : ""}`}>
                        <div className={styles.flagCode}>
                            <span>+971</span>
                        </div>
                        <input
                            className={styles.phoneField}
                            placeholder="Phone Number"
                            value={billingForm.phone}
                            inputMode="numeric"
                            onChange={(e) => {
                                const numeric = e.target.value.replace(/\D/g, "");
                                setBillingForm({ ...billingForm, phone: numeric });
                                clearError("billingPhone");
                            }}
                        // onBlur={() => {
                        //   const e = validateUAEPhone(billingForm.phone);
                        //   if (e) setValidationErrors((p) => ({ ...p, billingPhone: e }));
                        // }}
                        />
                    </div>
                    {validationErrors.billingPhone && (
                        <span className={styles.errorMessage}>{validationErrors.billingPhone}</span>
                    )}
                </>
            )}
        </div>
    );
}