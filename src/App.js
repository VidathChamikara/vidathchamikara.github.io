import { Routes, Route } from "react-router-dom";

import Login from "./Components/Login";
import RegisterCustomer from "./Components/RegisterCustomer";
import RegisterInventoryKeeper from "./Components/RegisterInventoryKeeper";
import RegisterDeliveryPerson from "./Components/RegisterDeliveryPerson";
import InventoryManagerPage from "./Pages/InventoryManagerPage";
import DeliveryPersonPage from "./Pages/DeliveryPersonPage";
import CustomerPage from "./Pages/CustomerPage";
import Home from "./Pages/home";
import OrderForm from "./Components/OrderForm";


function App() {
  return (
    <div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register/customer" element={<RegisterCustomer />} />
        <Route path="/register/inventory_manager" element={<RegisterInventoryKeeper />} />
        <Route path="/register/delivery_person" element={<RegisterDeliveryPerson />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/deliveryPerson" element={<DeliveryPersonPage />} />
        <Route path="/inventoryManager" element={<InventoryManagerPage />} />
        <Route path="/orderForm" element={<OrderForm />} />
      </Routes>


    </div>
  );
}
export default App;