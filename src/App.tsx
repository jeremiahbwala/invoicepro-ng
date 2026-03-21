import { useState } from 'react';
import type { View, Invoice, Customer, BusinessInfo } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import Home from '@/pages/Home';
import Auth from '@/pages/Auth';
import { Dashboard } from '@/sections/Dashboard';
import { InvoiceList } from '@/sections/InvoiceList';
import { CreateInvoice } from '@/sections/CreateInvoice';
import { CustomerList } from '@/sections/CustomerList';
import { Settings } from '@/sections/Settings';
import { BottomNav } from '@/components/BottomNav';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';
import { usePWAInstall } from '@/hooks/usePWAInstall';

function App() {
  const [currentView, setCurrentView] = useState<View>(
    localStorage.getItem('invoicepro_session') ? 'dashboard' : 'landing'
  );
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('invoicepro_invoices', []);
  const [customers, setCustomers] = useLocalStorage<Customer[]>('invoicepro_customers', []);
  const [businessInfo, setBusinessInfo] = useLocalStorage<BusinessInfo>('invoicepro_business', {
    name: 'My Business',
    address: '',
    phone: '',
    email: '',
  });

  const { isInstallable, installApp } = usePWAInstall(); // Typed PWA hook

  const addInvoice = (invoice: Invoice) => {
    setInvoices(prev => [invoice, ...prev]);
  };

  const deleteInvoice = (id: string) => {
    setInvoices(prev => prev.filter(inv => inv.id !== id));
  };

  const markAsPaid = (id: string) => {
    setInvoices(prev => prev.map(inv => 
      inv.id === id 
        ? { ...inv, status: 'paid' as const, paidAt: new Date().toISOString() }
        : inv
    ));
  };

  const addCustomer = (customer: Customer) => {
    setCustomers(prev => [customer, ...prev]);
  };

  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers(prev => prev.map(cust => cust.id === updatedCustomer.id ? updatedCustomer : cust));
  };

  const deleteCustomer = (id: string) => {
    setCustomers(prev => prev.filter(cust => cust.id !== id));
  };

  const handleLogout = () => {
    localStorage.removeItem('invoicepro_session');
    setCurrentView('landing');
  };

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return (
          <Home
            onGetStarted={() => setCurrentView('auth')}
            onLogin={() => setCurrentView('auth')}
          />
        );

      case 'auth':
        return (
          <Auth
            onAuthSuccess={() => setCurrentView('dashboard')}
            onBack={() => setCurrentView('landing')}
          />
        );

      case 'dashboard':
        return (
          <Dashboard
            invoices={invoices}
            onCreateInvoice={() => setCurrentView('create-invoice')}
            onViewInvoices={() => setCurrentView('invoices')}
            onViewCustomers={() => setCurrentView('customers')}
          />
        );

      case 'invoices':
        return (
          <InvoiceList
            invoices={invoices}
            customers={customers}
            businessInfo={businessInfo}
            onMarkAsPaid={markAsPaid}
            onDelete={deleteInvoice}
            onCreateNew={() => setCurrentView('create-invoice')}
          />
        );

      case 'create-invoice':
        return (
          <CreateInvoice
            customers={customers}
            businessInfo={businessInfo}
            onSave={addInvoice}
            onAddCustomer={addCustomer}
            onCancel={() => setCurrentView('invoices')}
          />
        );

      case 'customers':
        return (
          <CustomerList
            customers={customers}
            invoices={invoices}
            onAdd={addCustomer}
            onUpdate={updateCustomer}
            onDelete={deleteCustomer}
          />
        );

      case 'settings':
        return (
          <Settings
            businessInfo={businessInfo}
            onUpdate={setBusinessInfo}
          />
        );

      default:
        return (
          <Dashboard
            invoices={invoices}
            onCreateInvoice={() => setCurrentView('create-invoice')}
            onViewInvoices={() => setCurrentView('invoices')}
            onViewCustomers={() => setCurrentView('customers')}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {currentView !== 'landing' && (
        <Header
          businessName={businessInfo.name}
          onSettings={() => setCurrentView('settings')}
          onLogout={handleLogout}
        />
      )}

      <main className="pb-20 md:pb-0">
        {renderView()}
      </main>

     {/* PWA Install Button */}
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
      {currentView !== 'landing' && (
        <BottomNav currentView={currentView} onNavigate={setCurrentView} />
      )}

      <Toaster position="top-center" />
    </div>
  );
}

export default App;