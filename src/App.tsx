import { useState } from 'react';
import type { View, Invoice, Customer, BusinessInfo } from '@/types';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Dashboard } from '@/sections/Dashboard';
import { InvoiceList } from '@/sections/InvoiceList';
import { CreateInvoice } from '@/sections/CreateInvoice';
import { CustomerList } from '@/sections/CustomerList';
import { Settings } from '@/sections/Settings';
import { BottomNav } from '@/components/BottomNav';
import { Header } from '@/components/Header';
import { Toaster } from '@/components/ui/sonner';

function App() {
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [invoices, setInvoices] = useLocalStorage<Invoice[]>('invoicepro_invoices', []);
  const [customers, setCustomers] = useLocalStorage<Customer[]>('invoicepro_customers', []);
  const [businessInfo, setBusinessInfo] = useLocalStorage<BusinessInfo>('invoicepro_business', {
    name: 'My Business',
    address: '',
    phone: '',
    email: '',
  });

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

  const renderView = () => {
    switch (currentView) {
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
        return <Dashboard invoices={invoices} onCreateInvoice={() => setCurrentView('create-invoice')} onViewInvoices={() => setCurrentView('invoices')} onViewCustomers={() => setCurrentView('customers')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        businessName={businessInfo.name} 
        onSettings={() => setCurrentView('settings')}
      />
      <main className="pb-20 md:pb-0">
        {renderView()}
      </main>
      <BottomNav currentView={currentView} onNavigate={setCurrentView} />
      <Toaster position="top-center" />
    </div>
  );
}

export default App;
