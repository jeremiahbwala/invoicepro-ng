import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import type { Invoice, Customer, BusinessInfo } from "@/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

import Home from "@/pages/Home";
import Auth from "@/pages/Auth";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Feedback from "@/pages/Feedback";

import { Dashboard } from "@/sections/Dashboard";
import { InvoiceList } from "@/sections/InvoiceList";
import { CreateInvoice } from "@/sections/CreateInvoice";
import { CustomerList } from "@/sections/CustomerList";
import { Settings } from "@/sections/Settings";

import { BottomNav } from "@/components/BottomNav";
import { Header } from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";
import { usePWAInstall } from "@/hooks/usePWAInstall";

function App() {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useLocalStorage<Invoice[]>("invoicepro_invoices", []);
  const [customers, setCustomers] = useLocalStorage<Customer[]>("invoicepro_customers", []);
  const [businessInfo, setBusinessInfo] = useLocalStorage<BusinessInfo>("invoicepro_business", {
    name: "My Business",
    address: "",
    phone: "",
    email: "",
  });

  const isLoggedIn = !!localStorage.getItem("invoicepro_session");

  const { isInstallable, installApp } = usePWAInstall();

  // ================= ACTIONS =================
  const addInvoice = (invoice: Invoice) => {
    setInvoices((prev) => [invoice, ...prev]);
  };

  const deleteInvoice = (id: string) => {
    setInvoices((prev) => prev.filter((inv) => inv.id !== id));
  };

  const markAsPaid = (id: string) => {
    setInvoices((prev) =>
      prev.map((inv) =>
        inv.id === id
          ? { ...inv, status: "paid" as const, paidAt: new Date().toISOString() }
          : inv
      )
    );
  };

  const addCustomer = (customer: Customer) => {
    setCustomers((prev) => [customer, ...prev]);
  };

  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers((prev) =>
      prev.map((cust) => (cust.id === updatedCustomer.id ? updatedCustomer : cust))
    );
  };

  const deleteCustomer = (id: string) => {
    setCustomers((prev) => prev.filter((cust) => cust.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem("invoicepro_session");
    navigate("/");
  };

  // ================= UI =================
  return (
    <div className="min-h-screen bg-gray-50 relative">
      
      {/* Header */}
      {isLoggedIn && (
        <Header
          businessName={businessInfo.name}
          onSettings={() => navigate("/settings")}
          onLogout={handleLogout}
        />
      )}

      <main className="pb-20 md:pb-0">
        <Routes>

          {/* Public */}
          <Route path="/" element={<Home onGetStarted={() => navigate("/auth")} onLogin={() => navigate("/auth")} onAbout={() => navigate("/about")} onContact={() => navigate("/contact")} onFeedback={() => navigate("/feedback")} />} />
          <Route path="/auth" element={<Auth onAuthSuccess={() => navigate("/dashboard")} onBack={() => navigate("/")} />} />
          <Route path="/about" element={<About onGetStarted={() => navigate("/auth")} />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/feedback" element={<Feedback />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              isLoggedIn ? (
                <Dashboard
                  invoices={invoices}
                  onCreateInvoice={() => navigate("/create-invoice")}
                  onViewInvoices={() => navigate("/invoices")}
                  onViewCustomers={() => navigate("/customers")}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/invoices"
            element={
              isLoggedIn ? (
                <InvoiceList
                  invoices={invoices}
                  customers={customers}
                  businessInfo={businessInfo}
                  onMarkAsPaid={markAsPaid}
                  onDelete={deleteInvoice}
                  onCreateNew={() => navigate("/create-invoice")}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/create-invoice"
            element={
              isLoggedIn ? (
                <CreateInvoice
                  customers={customers}
                  businessInfo={businessInfo}
                  onSave={(inv) => {
                    addInvoice(inv);
                    navigate("/invoices");
                  }}
                  onAddCustomer={addCustomer}
                  onCancel={() => navigate("/invoices")}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/customers"
            element={
              isLoggedIn ? (
                <CustomerList
                  customers={customers}
                  invoices={invoices}
                  onAdd={addCustomer}
                  onUpdate={updateCustomer}
                  onDelete={deleteCustomer}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

          <Route
            path="/settings"
            element={
              isLoggedIn ? (
                <Settings
                  businessInfo={businessInfo}
                  onUpdate={setBusinessInfo}
                />
              ) : (
                <Navigate to="/" />
              )
            }
          />

        </Routes>
      </main>

      {/* Install Button */}
      {isInstallable && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
          <button
            onClick={installApp}
            className="px-4 py-2 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700 transition font-bold text-sm"
          >
            Install InvoicePro NG
          </button>
        </div>
      )}

      {/* Bottom Nav */}
      {isLoggedIn && (
        <BottomNav
          currentView={"dashboard"} // we’ll improve this next
          onNavigate={(view) => navigate(`/${view}`)}
        />
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default App;