import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';
import AdminMenu from './Components/LoginComponent/AdminMenu';
import ManagerMenu from './Components/LoginComponent/ManagerMenu';
import VendorMenu from './Components/LoginComponent/VendorMenu';
import SKUEntry from './Components/SKUComponent/SKUEntry';
import SKUReport from './Components/SKUComponent/SKUReport';
import ProductEntry from './Components/ProductComponent/ProductEntry';
import ProductReport from './Components/ProductComponent/ProductReport';
import ProductPriceEdit from './Components/ProductComponent/ProductPriceEdit';
import TransactionEntry from './Components/TransactionComponent/TransactionEntry';
import TransactionList from './Components/TransactionComponent/TransactionList';
import SKUEdit from './Components/SKUComponent/SKUEdit';
import ProductStockEdit from './Components/ProductComponent/ProductStockEdit';
import ProductPieAnalysis from './Components/AnalysisComponent/ProductPieAnalysis';
import ShowUserDetails from "./Components/LoginComponent/ShowUserDetails";
import SingleProductDemand from "./Components/AnalysisComponent/SingleProductDemand";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>

          {/* LOGIN */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterUser />} />

          {/* DASHBOARD */}
          <Route path="/admin-menu" element={<AdminMenu />} />
          <Route path="/manager-menu" element={<ManagerMenu />} />
          <Route path="/vendor-menu" element={<VendorMenu />} />

          {/* SKU */}
          <Route path="/sku-entry" element={<SKUEntry />} />
          <Route path="/sku-list" element={<SKUReport />} />
          <Route path="/update-sku/:skuno" element={<SKUEdit />} />

          {/* PRODUCT */}
          <Route path="/product-entry" element={<ProductEntry />} />
          <Route path="/product-list" element={<ProductReport />} />
          <Route path="/edit-price/:pid" element={<ProductPriceEdit />} />
          <Route path="/edit-stock/:pid/:no" element={<ProductStockEdit />} />

          {/* TRANSACTION */}
          <Route path="/add-transaction" element={<TransactionEntry />} />

          {/* ✅ FIXED ROUTE */}
          <Route path="/transactions/:pid" element={<TransactionList />} />

          {/* ANALYSIS */}
          <Route path="/product-pie" element={<ProductPieAnalysis />} />

          <Route path="/user-list" element={<ShowUserDetails />} />

          <Route path="/product-demand" element={<SingleProductDemand />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;