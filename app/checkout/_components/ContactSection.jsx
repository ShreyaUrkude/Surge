"use client";
import styles from "../page.module.css";

export default function ContactSection({
  email,
  setEmail,
  setEmailUserTyped,
  status,
  session,
  validationErrors,
  clearError,
  setValidationErrors,
}) {
  return (
    <div className={styles.Two}>
      <div className={styles.TwoOne}>
        <h3>CONTACT</h3>
        {status !== "authenticated" && (
          <p style={{ cursor: "pointer" }}>Sign In</p>
        )}
      </div>

      <div className={styles.TwoTwo}>
        <div>
          <input
            className={`${styles.Input} ${validationErrors?.email ? styles.InputError : ""}`}
            placeholder="Email address"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailUserTyped?.(true);
              clearError?.("email");
            }}
            onBlur={() => {
              if (!email) {
                setValidationErrors?.((prev) => ({ ...prev, email: "Email is required" }));
              }
            }}
            readOnly={!!session?.user?.email}
          />
          {validationErrors?.email && (
            <span className={styles.ErrorMessage}>
              {validationErrors.email}
            </span>
          )}
        </div>

        <label className={styles.CheckBox}>
          <input type="checkbox" />
          <p>Email me with news and offers.</p>
        </label>
      </div>
    </div>
  );
}