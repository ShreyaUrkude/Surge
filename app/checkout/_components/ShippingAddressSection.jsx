"use client";
import { useState, useEffect, useRef } from "react";
import styles from "../page.module.css";

const UAE_STATES = [
  { value: "abu-dhabi", label: "Abu Dhabi" },
  { value: "dubai", label: "Dubai" },
  { value: "sharjah", label: "Sharjah" },
  { value: "ajman", label: "Ajman" },
  { value: "umm-al-quwain", label: "Umm Al Quwain" },
  { value: "ras-al-khaimah", label: "Ras Al Khaimah" },
  { value: "fujairah", label: "Fujairah" },
];

export default function ShippingAddressSection({
  delivery = "ship",
  status = "unauthenticated",
  savedAddresses = [],
  setSavedAddresses,
  selectedAddressId,
  setSelectedAddressId,
  shippingForm = {},
  setShippingForm,
  validationErrors = {},
  clearError,
  setValidationErrors,
}) {
  const [openMenuId, setOpenMenuId] = useState(null);
  const [isEmirateOpen, setIsEmirateOpen] = useState(false);
  const menuRef = useRef(null);
  const emirateRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpenMenuId(null);
      if (emirateRef.current && !emirateRef.current.contains(e.target)) setIsEmirateOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const showInlineForm =
    delivery === "ship" &&
    (status !== "authenticated" || (status === "authenticated" && savedAddresses.length === 0));

  return (
    <div className={styles.Four}>

      {/* ── Shipping ── */}
      {delivery === "ship" && (
        <>
          <div className={styles.Three}>
            <h3>SHIP TO</h3>
          </div>

          {/* Saved Addresses */}
          {status === "authenticated" && savedAddresses.length > 0 && (
            <>
              <div className={styles.AddressList}>
                {savedAddresses.map((addr) => (
                  <div
                    key={addr.id}
                    className={`${styles.AddressCard} ${selectedAddressId === addr.id ? styles.Selected : ""}`}
                    onClick={() => setSelectedAddressId(addr.id)}
                  >
                    <span className={styles.Radio}>
                      {selectedAddressId === addr.id && <span className={styles.RadioInner} />}
                    </span>

                    <div className={styles.AddressContent}>
                      <p className={styles.AddrLabel}>{addr.label || "Others"}</p>
                      <p className={styles.AddrName}>
                        {`${addr.addressFirstName || ""} ${addr.addressLastName || ""}`.trim()}
                      </p>
                      <hr className={styles.AddrDivider} />
                      <p className={styles.AddrName}>
                        {addr.street && <>{addr.street}, </>}
                        {addr.apartment && <>{addr.apartment}, </>}
                        {[addr.city, addr.emirates, addr.country || "United Arab Emirates"].filter(Boolean).join(", ")}
                      </p>
                      <hr className={styles.AddrDivider} />
                      <p className={styles.AddrName}>Phone number: {addr.phoneNumber}</p>
                    </div>

                    <div
                      ref={openMenuId === addr.id ? menuRef : null}
                      className={styles.MenuContainer}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span
                        className={styles.MenuIcon}
                        onClick={() => setOpenMenuId(openMenuId === addr.id ? null : addr.id)}
                      >
                        <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M1.5 14.5385C1.0875 14.5385 0.734417 14.3916 0.44075 14.0978C0.146917 13.8041 0 13.451 0 13.0385C0 12.626 0.146917 12.2728 0.44075 11.979C0.734417 11.6853 1.0875 11.5385 1.5 11.5385C1.9125 11.5385 2.26558 11.6853 2.55925 11.979C2.85308 12.2728 3 12.626 3 13.0385C3 13.451 2.85308 13.8041 2.55925 14.0978C2.26558 14.3916 1.9125 14.5385 1.5 14.5385ZM1.5 8.76925C1.0875 8.76925 0.734417 8.62233 0.44075 8.3285C0.146917 8.03483 0 7.68175 0 7.26925C0 6.85675 0.146917 6.50367 0.44075 6.21C0.734417 5.91617 1.0875 5.76925 1.5 5.76925C1.9125 5.76925 2.26558 5.91617 2.55925 6.21C2.85308 6.50367 3 6.85675 3 7.26925C3 7.68175 2.85308 8.03483 2.55925 8.3285C2.26558 8.62233 1.9125 8.76925 1.5 8.76925ZM1.5 3C1.0875 3 0.734417 2.85317 0.44075 2.5595C0.146917 2.26567 0 1.9125 0 1.5C0 1.0875 0.146917 0.734417 0.44075 0.44075C0.734417 0.146917 1.0875 0 1.5 0C1.9125 0 2.26558 0.146917 2.55925 0.44075C2.85308 0.734417 3 1.0875 3 1.5C3 1.9125 2.85308 2.26567 2.55925 2.5595C2.26558 2.85317 1.9125 3 1.5 3Z" fill="#6E736A" />
                        </svg>
                      </span>
                      {openMenuId === addr.id && (
                        <div className={styles.MenuDropdown}>
                          <button className={styles.MenuItem} onClick={() => setOpenMenuId(null)}>Edit Address</button>
                          <button className={styles.MenuItem} onClick={() => setOpenMenuId(null)}>Delete Address</button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button className={styles.AddNewAddress} onClick={() => {}}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 0V12M0 6H12" stroke="#6E736A" strokeWidth="1.5" />
                </svg>
                <p>Use a different address</p>
              </button>
            </>
          )}

          {/* Inline Form */}
          {showInlineForm && (
            <div>
              <input className={styles.Input} value="United Arab Emirates" readOnly />

              <div className={styles.Row}>
                <div style={{ flex: 1 }}>
                  <input
                    className={`${styles.Input} ${validationErrors.shippingFirstName ? styles.InputError : ""}`}
                    placeholder="First Name"
                    value={shippingForm.firstName || ""}
                    onChange={(e) => { setShippingForm({ ...shippingForm, firstName: e.target.value }); clearError?.("shippingFirstName"); }}
                  />
                  {validationErrors.shippingFirstName && <span className={styles.ErrorMessage}>{validationErrors.shippingFirstName}</span>}
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    className={`${styles.Input} ${validationErrors.shippingLastName ? styles.InputError : ""}`}
                    placeholder="Last Name"
                    value={shippingForm.lastName || ""}
                    onChange={(e) => { setShippingForm({ ...shippingForm, lastName: e.target.value }); clearError?.("shippingLastName"); }}
                  />
                  {validationErrors.shippingLastName && <span className={styles.ErrorMessage}>{validationErrors.shippingLastName}</span>}
                </div>
              </div>

              <div>
                <input
                  className={`${styles.Input} ${validationErrors.shippingAddress ? styles.InputError : ""}`}
                  placeholder="House number, Street name"
                  value={shippingForm.address || ""}
                  onChange={(e) => { setShippingForm({ ...shippingForm, address: e.target.value }); clearError?.("shippingAddress"); }}
                />
                {validationErrors.shippingAddress && <span className={styles.ErrorMessage}>{validationErrors.shippingAddress}</span>}
              </div>

              <input
                className={styles.Input}
                placeholder="Apartment, suite, etc. (optional)"
                value={shippingForm.apartment || ""}
                onChange={(e) => setShippingForm({ ...shippingForm, apartment: e.target.value })}
              />

              <div className={styles.Row}>
                <div style={{ flex: 1 }}>
                  <input
                    className={`${styles.Input} ${validationErrors.shippingCity ? styles.InputError : ""}`}
                    placeholder="City"
                    value={shippingForm.city || ""}
                    onChange={(e) => { setShippingForm({ ...shippingForm, city: e.target.value }); clearError?.("shippingCity"); }}
                  />
                  {validationErrors.shippingCity && <span className={styles.ErrorMessage}>{validationErrors.shippingCity}</span>}
                </div>

                <div className={styles.SelectContainer} ref={emirateRef} style={{ flex: 1 }}>
                  <div className={styles.CustomSelectTrigger} onClick={() => setIsEmirateOpen(!isEmirateOpen)}>
                    <span style={{ textTransform: "capitalize" }}>
                      {UAE_STATES.find((s) => s.value === (shippingForm.emirates || "dubai"))?.label || "Select Emirate"}
                    </span>
                    <span className={`${styles.Arrow} ${isEmirateOpen ? styles.Rotate : ""}`}>▼</span>
                  </div>
                  {isEmirateOpen && (
                    <div className={styles.CustomOptionsList}>
                      {UAE_STATES.map((opt) => (
                        <div
                          key={opt.value}
                          className={styles.OptionItem}
                          onClick={() => { setShippingForm({ ...shippingForm, emirates: opt.value }); setIsEmirateOpen(false); }}
                        >
                          {opt.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <div className={`${styles.PhoneWrapper} ${validationErrors.shippingPhone ? styles.InputError : ""}`}>
                  <span className={styles.PhonePrefix}>+971</span>
                  <input
                    className={styles.PhoneInput}
                    placeholder="Phone"
                    value={shippingForm.phone || ""}
                    inputMode="numeric"
                    onChange={(e) => { setShippingForm({ ...shippingForm, phone: e.target.value.replace(/\D/g, "") }); clearError?.("shippingPhone"); }}
                  />
                </div>
                {validationErrors.shippingPhone && <span className={styles.ErrorMessage}>{validationErrors.shippingPhone}</span>}
              </div>

              {status === "authenticated" && (
                <label className={styles.CheckBox}>
                  <input
                    type="checkbox"
                    checked={shippingForm.saveAddress || false}
                    onChange={(e) => setShippingForm({ ...shippingForm, saveAddress: e.target.checked })}
                  />
                  <p>Save this for next time.</p>
                </label>
              )}
            </div>
          )}
        </>
      )}

      {/* ── Pickup ── */}
      {delivery === "pickup" && (
        <div className={styles.PickupList}>
          <p>Pickup Locations Near You</p>
          <div className={styles.PickupCard}>
            <input type="radio" style={{ accentColor: "#6c7a5f" }} checked readOnly />
            <div>
              <h5>Our Store - Main Branch</h5>
              <p>Your store address here</p>
              <span>10:00 AM – 7:00 PM</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}