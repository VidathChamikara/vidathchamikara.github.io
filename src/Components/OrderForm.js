import { useState } from "react";
import axios from "axios";
import "../Css/register.css";

function OrderForm() {
  const [userId, setUserId] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [contact, setContact] = useState("");
  const [errors, setErrors] = useState({});

  const validateContact = (contact) => {
    // Contact validation regex (10 digits only)
    const contactRegex = /^\d{10}$/;
    return contactRegex.test(contact);
  };

  const validateForm = () => {
    const errors = {};

    if (!userId.trim()) {
      errors.userId = "User ID is required";
    }

    if (!deliveryAddress.trim()) {
      errors.deliveryAddress = "Delivery Address is required";
    }

    if (!contact.trim()) {
      errors.contact = "Contact is required";
    } else if (!validateContact(contact)) {
      errors.contact = "Invalid contact number (10 digits required)";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  async function createOrder(event) {
    event.preventDefault();

    try {
      if (validateForm()) {
        await axios.post("http://localhost:8080/orders/create", {
          userId: userId,
          deliveryAddress: deliveryAddress,
          contact: contact,
        });
        alert("Order created successfully");
      }
    } catch (err) {
      if (err.response) {
        const errorData = err.response.data;
        const newErrors = {};

        if (Array.isArray(errorData)) {
          errorData.forEach((error) => {
            const field = error.field.toLowerCase();
            newErrors[field] = error.message;
          });
        } else if (typeof errorData === 'string') {
          alert(errorData);
        }

        setErrors(newErrors);
      } else {
        alert("An error occurred while processing your request.");
      }
    }
  }

  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <h1>Order Creation</h1>

          <form>
            <div className="form-group">
              <label>User ID</label>
              <input
                type="text"
                className="form-control"
                id="userId"
                placeholder="Enter User ID"
                value={userId}
                onChange={(event) => {
                  setUserId(event.target.value);
                }}
              />
              {errors.userId && <p className="error">{errors.userId}</p>}
            </div>

            <div className="form-group">
              <label>Delivery Address</label>
              <input
                type="text"
                className="form-control"
                id="deliveryAddress"
                placeholder="Enter Delivery Address"
                value={deliveryAddress}
                onChange={(event) => {
                  setDeliveryAddress(event.target.value);
                }}
              />
              {errors.deliveryAddress && <p className="error">{errors.deliveryAddress}</p>}
            </div>

            <div className="form-group">
              <label>Contact</label>
              <input
                type="text"
                className="form-control"
                id="contact"
                placeholder="Enter Contact"
                value={contact}
                onChange={(event) => {
                  setContact(event.target.value);
                }}
              />
              {errors.contact && <p className="error">{errors.contact}</p>}
            </div>

            <button type="submit" onClick={createOrder}>
              Create Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OrderForm;
