"use client";
import React, { useState, useEffect } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
//   ExpressCheckoutElement,
// } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
// import { useCart } from "@/app/_context/CartContext";
import { toast } from "react-hot-toast";
import styles from "../page.module.css";
import axiosClient from "@/lib/axios";

// ── Section Components ──────────────────────────────────────────────────────
import ContactSection from "./ContactSection";
import DeliverySelector from "./DeliverySelector";
import ShippingAddressSection from "./ShippingAddressSection";
import BillingAddressSection from "./BillingAddressSection";
import { PaymentCardSection, PaymentButtonSection } from "./PaymentSection";
import OrderSummary from "./OrderSummary";

// ── Utilities ───────────────────────────────────────────────────────────────
// import { validateCheckoutForm } from "@/utils/validatorFunctions";
// import {
//   buildBillingDetails,
//   buildCheckoutPayload,
//   buildOneTimePayload,
//   buildSubscriptionPayload,
//   formatCheckoutAddress,
//   buildSuccessUrl,
//   scrollToFirstError,
// } from "@/utils/checkoutUtils";
// import { saveAddressAPI } from "@/app/account/profile/_components/ProfileComponents/profileApiUtils";

export default function CheckoutForm({
  session,
  status,
  delivery,
  setDelivery,
  savedAddresses,
  setSavedAddresses,
  selectedAddressId,
  setSelectedAddressId,
  openMenuId,
  setOpenMenuId,
  useShippingAsBilling,
  setUseShippingAsBilling,
  product,
  cartTotals,
  shippingForm,
  setShippingForm,
  billingForm,
  setBillingForm,
  checkoutMode,
  subscriptionId,
  variationId,
}) {
//   const stripe = useStripe();
//   const elements = useElements();
//   const { openCart, isBeansApplied, appliedCoupon } = useCart();
  const router = useRouter();

  const [isProcessing, setIsProcessing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  // ── Email state ─────────────────────────────────────────────────────────────
  const [email, setEmail] = useState(session?.user?.email || "");
  const [emailUserTyped, setEmailUserTyped] = useState(false);

  useEffect(() => {
    if (session?.user?.email && !emailUserTyped) setEmail(session.user.email);
  }, [session?.user?.email, emailUserTyped]);

  // ── Helper: clear a single error field ─────────────────────────────────────
  const clearError = (key) =>
    setValidationErrors((prev) => ({ ...prev, [key]: "" }));

  // ── Payment Handler ─────────────────────────────────────────────────────────
  const handlePayment = async () => {
    if (!stripe || !elements) return;

    // TODO: uncomment and wire up validation once utilities are imported
    // const { isValid, errors } = validateCheckoutForm({
    //   email, delivery, status, selectedAddressId,
    //   shippingForm, billingForm, useShippingAsBilling,
    // });
    // if (!isValid) {
    //   setValidationErrors(errors);
    //   setTimeout(() => scrollToFirstError(errors, styles.InputError), 100);
    //   return;
    // }

    setIsProcessing(true);

    try {
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setValidationErrors((prev) => ({ ...prev, card: submitError.message }));
        setIsProcessing(false);
        return;
      }

      const deliveryOption = delivery === "ship" ? "delivery" : "pickup";

      // TODO: replace with formatCheckoutAddress() once utility is imported
      const shipAddr =
        deliveryOption === "delivery"
          ? shippingForm
          : {
              addressFirstName: "",
              addressLastName: "",
              addressLine1: "Pickup",
              addressLine2: "",
              city: "",
              emirates: "dubai",
              phoneNumber: "",
              addressCountry: "United Arab Emirates",
            };

      const billAddr =
        useShippingAsBilling && deliveryOption === "delivery"
          ? { ...shipAddr }
          : billingForm;

      let payload = {
        delivery: deliveryOption,
        shippingAddress: shipAddr,
        billingAddress: billAddr,
        shippingAddressAsBillingAddress: useShippingAsBilling,
        email: email || session?.user?.email,
        product: {
          productId: product[0].id,
          variantId: variationId || "",
          subscriptionId: subscriptionId,
          quantity: product[0].quantity,
        },
        useWTCoins: !!isBeansApplied,
      };

      let url = "";

      if (checkoutMode === "subscription") {
        url = "/api/checkout/subscription";
        // TODO: replace with buildSubscriptionPayload() once utility is imported
      } else {
        url = "/api/checkout/one-time";
        // TODO: replace with buildOneTimePayload() once utility is imported
        payload = {
          ...payload,
          products: product.map((p) => ({
            productId: p.product || p.id,
            variantId: p.vId || "",
            quantity: p.quantity,
          })),
          appliedCouponCode: appliedCoupon?.code || "",
        };
      }

      const response = await axiosClient.post(url, payload);
      const data = response.data;

      if (!data.success)
        throw new Error(data.message || data.error || "Checkout failed");

      sessionStorage.setItem("checkout_success", "1");

      const secret = data.clientSecret || data.client_secret;

      if (secret) {
        // TODO: uncomment once saveAddressAPI is imported
        // if (shippingForm.saveAddress && status === "authenticated" && session?.user?.id) {
        //   try {
        //     await saveAddressAPI(session.user.id, { ... });
        //   } catch (saveErr) {
        //     console.error("Failed to save address:", saveErr);
        //   }
        // }

        if (checkoutMode === "subscription") {
          const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            clientSecret: secret,
            confirmParams: {
              return_url: `${window.location.origin}/checkout/success`,
              // TODO: replace with buildSuccessUrl(checkoutMode, data)
            },
            redirect: "if_required",
          });

          if (error) {
            setIsProcessing(false);
            setValidationErrors((prev) => ({
              ...prev,
              card: error.message || "Payment confirmation failed",
            }));
            toast.error(error.message || "Payment confirmation failed");
            return;
          }

          if (paymentIntent?.status === "succeeded") {
            const orderId = data.dbSubscriptionId || data.wpSubscriptionId || data.id;
            if (orderId) {
              try {
                await axiosClient.patch(`/api/web-subscription/${orderId}`, {
                  paymentStatus: "completed",
                });
              } catch (patchErr) {
                console.warn("Subscription PATCH error (non-fatal):", patchErr);
              }
            }
            router.push("/checkout/success");
            // TODO: replace with buildSuccessUrl(checkoutMode, data)
          }
        } else {
          const { error: confirmError } = await stripe.confirmPayment({
            elements,
            clientSecret: secret,
            confirmParams: {
              return_url: `${window.location.origin}/checkout/success`,
              // TODO: replace with buildSuccessUrl(checkoutMode, data)
            },
          });

          if (confirmError) {
            setIsProcessing(false);
            setValidationErrors((prev) => ({
              ...prev,
              card: confirmError.message || "Payment confirmation failed",
            }));
            toast.error(confirmError.message || "Payment confirmation failed");
          }
        }
      }
    } catch (e) {
      console.error(e);
      const resData = e?.response?.data;
      const backendMsg =
        resData?.message || resData?.error || resData?.errors?.[0]?.message;
      toast.error(backendMsg || e.message || "An error occurred");
      setIsProcessing(false);
    }
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.checkoutRoot} onClick={() => setOpenMenuId(null)}>
      <div className={styles.checkoutInner}>
        <div className={styles.checkoutGrid}>

          {/* ── Left Column ── */}
          <div className={styles.leftCol}>

            {/* Express Checkout */}
            <div className={styles.expressCheckout}>
              <p className={styles.expressCheckoutLabel}>Express Checkout</p>
              {/* <ExpressCheckoutElement /> */}
            </div>

            <ContactSection
              email={email}
              setEmail={setEmail}
              setEmailUserTyped={setEmailUserTyped}
              status={status}
              session={session}
              validationErrors={validationErrors}
              clearError={clearError}
              setValidationErrors={setValidationErrors}
            />

            <DeliverySelector delivery={delivery} setDelivery={setDelivery} />

            <ShippingAddressSection
              delivery={delivery}
              status={status}
              savedAddresses={savedAddresses}
              setSavedAddresses={setSavedAddresses}
              selectedAddressId={selectedAddressId}
              setSelectedAddressId={setSelectedAddressId}
              shippingForm={shippingForm}
              setShippingForm={setShippingForm}
              validationErrors={validationErrors}
              clearError={clearError}
              setValidationErrors={setValidationErrors}
              session={session}
            />

            <PaymentCardSection validationErrors={validationErrors} />

            <BillingAddressSection
              delivery={delivery}
              useShippingAsBilling={useShippingAsBilling}
              setUseShippingAsBilling={setUseShippingAsBilling}
              billingForm={billingForm}
              setBillingForm={setBillingForm}
              validationErrors={validationErrors}
              clearError={clearError}
              setValidationErrors={setValidationErrors}
            />

            <PaymentButtonSection
              isProcessing={isProcessing}
              handlePayment={handlePayment}
            />
          </div>

          {/* ── Right Column ── */}
          <div className={styles.rightCol}>
            <OrderSummary
              product={product}
              cartTotals={cartTotals}
              delivery={delivery}
              checkoutMode={checkoutMode}
            />
          </div>

        </div>
      </div>
    </div>
  );
}