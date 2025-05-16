import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useInfo from "../../../Hooks/useInfo";
import "./PaymentCard.css";

const PaymentCard = ({ closeModal, price, coinNumber }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [role, , refetch] = useInfo();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (price && price > 0) {
      getClientSecret({ price });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);

  const getClientSecret = async (price) => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        price,
      });
      setClientSecret(data.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);
    if (!card) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setProcessing(false);
      return;
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }

    const { error: confirmError, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
            name: user?.displayName,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
      setProcessing(false);
      return;
    }

    if (paymentIntent.status === "succeeded") {
      toast.success("Payment successful!");

      const purchaseInfo = {
        coinNumber,
        price,
        transactionId: paymentIntent.id,
        date: new Date().toLocaleDateString(),
        email: user?.email,
      };

      try {
        const { data } = await axiosSecure.post("/purchase-coin", purchaseInfo);
        if (data.insertedId) {
          const newCoin = role?.coin + coinNumber;
          const update = await axiosSecure.patch(`/user/${user?.email}`, {
            newCoin,
          });

          if (update.data.modifiedCount) {
            toast.success(
              "Coin purchase successful. Coins added to your profile."
            );
            refetch();
            closeModal();
            navigate("/dashBoard/payment-history");
          }
        }
      } catch (err) {
        console.error(err);
        toast.error(err.message);
        closeModal();
      }
    }
    setProcessing(false);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex justify-between gap-5 mt-4">
          <button
            className="bg-lime-400 p-3 rounded-lg"
            type="submit"
            disabled={!stripe || !clientSecret || processing}
          >
            Pay ${price}
          </button>
          <button
            className="bg-orange-500 p-3 rounded-lg"
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </form>
      {cardError && <p className="text-red-600 mt-2">{cardError}</p>}
      <p className="mt-2">
        For information, try this link{" "}
        <a
          className="btn btn-link"
          href="https://docs.stripe.com/testing"
          target="_blank"
          rel="noreferrer"
        >
          click here
        </a>
      </p>
    </>
  );
};

PaymentCard.propTypes = {
  closeModal: PropTypes.func.isRequired,
  price: PropTypes.number.isRequired,
  coinNumber: PropTypes.number.isRequired,
};

export default PaymentCard;
