import { useState, useMemo } from 'react';
import { ArrowLeft, Plus, Trash2, Save, X, UserPlus } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import type { Invoice, InvoiceItem, Customer, BusinessInfo } from '@/types';
import { toast } from 'sonner';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

interface CreateInvoiceProps {
  customers: Customer[];
  businessInfo: BusinessInfo;
  onSave: (invoice: Invoice) => void;
  onAddCustomer: (customer: Customer) => void;
  onCancel: () => void;
}

export function CreateInvoice({ customers, onSave, onAddCustomer, onCancel }: CreateInvoiceProps) {
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0, total: 0 }
  ]);
  const [notes, setNotes] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('Payment due within 14 days');
  const [dueDate, setDueDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 14);
    return date.toISOString().split('T')[0];
  });
  const [taxRate, setTaxRate] = useState(0);

  const [newCustomerName, setNewCustomerName] = useState('');
  const [newCustomerPhone, setNewCustomerPhone] = useState('');
  const [newCustomerEmail, setNewCustomerEmail] = useState('');
  const [newCustomerAddress, setNewCustomerAddress] = useState('');
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  const selectedCustomer = useMemo(() => {
    return customers.find(c => c.id === selectedCustomerId);
  }, [customers, selectedCustomerId]);

  const subtotal = useMemo(() => {
    return items.reduce((sum, item) => sum + item.total, 0);
  }, [items]);

  const tax = useMemo(() => {
    return subtotal * (taxRate / 100);
  }, [subtotal, taxRate]);

  const total = useMemo(() => {
    return subtotal + tax;
  }, [subtotal, tax]);

  const generateInvoiceNumber = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `INV-${year}-${random}`;
  };

  const handleAddItem = () => {
    setItems(prev => [
      ...prev,
      { id: crypto.randomUUID(), description: '', quantity: 1, unitPrice: 0, total: 0 }
    ]);
  };

  const handleRemoveItem = (id: string) => {
    if (items.length > 1) {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item;

      const updated = { ...item, [field]: value };

      if (field === 'quantity' || field === 'unitPrice') {
        updated.total = updated.quantity * updated.unitPrice;
      }

      return updated;
    }));
  };

  const handleAddCustomer = () => {
    if (!newCustomerName.trim()) {
      toast.error('Customer name is required');
      return;
    }

    const newCustomer: Customer = {
      id: crypto.randomUUID(),
      name: newCustomerName,
      phone: newCustomerPhone,
      email: newCustomerEmail,
      address: newCustomerAddress,
      createdAt: new Date().toISOString(),
    };

    onAddCustomer(newCustomer);
    setSelectedCustomerId(newCustomer.id);
    setIsAddCustomerOpen(false);

    setNewCustomerName('');
    setNewCustomerPhone('');
    setNewCustomerEmail('');
    setNewCustomerAddress('');

    toast.success('Customer added successfully');
  };

  const handleSave = () => {
    if (!selectedCustomer) {
      toast.error('Please select a customer');
      return;
    }

    const validItems = items.filter(item => item.description.trim() && item.quantity > 0);
    if (validItems.length === 0) {
      toast.error('Please add at least one valid item');
      return;
    }

    const invoice: Invoice = {
      id: crypto.randomUUID(),
      invoiceNumber: generateInvoiceNumber(),
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      customerPhone: selectedCustomer.phone,
      customerEmail: selectedCustomer.email,
      customerAddress: selectedCustomer.address,
      items: validItems,
      subtotal,
      tax,
      taxRate,
      total,
      notes,
      paymentTerms,
      issueDate: new Date().toISOString(),
      dueDate,
      status: 'unpaid',
      createdAt: new Date().toISOString(),
    };

    onSave(invoice);

    // Google Analytics Event
    if (window.gtag) {
      window.gtag('event', 'invoice_created', {
        value: total,
        currency: 'NGN'
      });
    }

    toast.success('Invoice created successfully!');
    onCancel();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onCancel}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h2 className="text-xl font-bold text-gray-900">Create Invoice</h2>
          <p className="text-sm text-gray-500">Create a new invoice in 30 seconds</p>
        </div>
      </div>

      {/* UI continues exactly the same as your original */}
    </div>
  );
}