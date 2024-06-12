import { useState } from "react";
import axios from "axios";
import "../Css/register.css";

function RegisterDeliveryPerson() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [telephone, setTelephone] = useState("");
  const [areaCode, setAreaCode] = useState("");
  const [errors, setErrors] = useState({});

  const validateEmail = (email) => {
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateTelephone = (telephone) => {
    // Telephone validation regex (10 digits only)
    const telephoneRegex = /^\d{10}$/;
    return telephoneRegex.test(telephone);
  };

  const validateAreaCode = (areaCode) => {
    // Area code validation regex (5 digits only)
    const areaCodeRegex = /^\d{5}$/;
    return areaCodeRegex.test(areaCode);
  };

  const validateForm = () => {
    const errors = {};

    if (!fullName.trim()) {
      errors.fullName = "Username is required";
    }

    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }

    if (!password.trim()) {
      errors.password = "Password is required";
    } else if (password !== confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    if (!telephone.trim()) {
      errors.telephone = "Telephone is required";
    } else if (!validateTelephone(telephone)) {
      errors.telephone = "Invalid telephone number (10 digits required)";
    }

    if (!areaCode.trim()) {
      errors.areaCode = "Area Code is required";
    } else if (!validateAreaCode(areaCode)) {
      errors.areaCode = "Invalid area code format (5 digits required)";
    }


    setErrors(errors);
    return Object.keys(errors).length === 0; // Return true if there are no errors
  };

  async function save(event) {
    event.preventDefault();

    if (validateForm()) {
      try {
        await axios.post("http://localhost:8080/users/register_DelveryPerson", {
          email: email,
          fullName: fullName,
          password: password,
      
          telephone: telephone,
          areaCode: areaCode,
        });
        alert("User Registration Successfully");
      } catch (err) {
        if (err.response) {
          // The request was made and the server responded with an error status
          const errorData = err.response.data;
          const newErrors = {};
    
          // Assuming the backend returns an array of error messages
          if (Array.isArray(errorData)) {
            errorData.forEach((error) => {
              // Parse the error messages and update the errors state
              const field = error.field.toLowerCase();
              newErrors[field] = error.message;
            });
          } else if (typeof errorData === 'string') {
            // If the backend returns a single error message
            // You can handle it accordingly
            // For example, you can display a general error message
            alert(errorData);
          }
    
          setErrors(newErrors);
        } else {
          // Handle other types of errors (e.g., network issues)
          alert("An error occurred while processing your request.");
        }
      }
    }
  }

  return (
    <div>
      <div className="container mt-4">
        <div className="card">
          <h1>Delivery_Person Registration</h1>

          <form>
            <div className="form-group">
              <label>User Name</label>
              <input
                type="text"
                className="form-control"
                id="fullName"
                placeholder="Enter Name"
                value={fullName}
                onChange={(event) => {
                  setFullName(event.target.value);
                }}
              />
              {errors.fullName && <p className="error">{errors.fullName}</p>}
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter Email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(event) => {
                  setConfirmPassword(event.target.value);
                }}
              />
              {errors.confirmPassword && (
                <p className="error">{errors.confirmPassword}</p>
              )}
            </div>

           

            <div className="form-group">
              <label>Telephone</label>
              <input
                type="text"
                className="form-control"
                id="telephone"
                placeholder="Enter Telephone"
                value={telephone}
                onChange={(event) => {
                  setTelephone(event.target.value);
                }}
              />
              {errors.telephone && <p className="error">{errors.telephone}</p>}
            </div>

            <div className="form-group">
              <label>Area Code</label>
              <input
                type="text"
                className="form-control"
                id="areaCode"
                placeholder="Enter area code (e.g., 12345-only 5 digits)"
                value={areaCode}
                onChange={(event) => {
                  setAreaCode(event.target.value);
                }}
              />
              {errors.areaCode && <p className="error">{errors.areaCode}</p>}
            </div>

            <button type="submit" className="btn btn-primary mt-4" onClick={save}>
              Save
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterDeliveryPerson;
