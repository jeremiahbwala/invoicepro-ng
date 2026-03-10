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
  
  // New customer dialog
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
    
    // Reset form
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

      {/* Customer Selection */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Customer</Label>
            <Dialog open={isAddCustomerOpen} onOpenChange={setIsAddCustomerOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-emerald-600">
                  <UserPlus className="w-4 h-4 mr-1" />
                  Add New
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Customer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <Label>Name *</Label>
                    <Input
                      value={newCustomerName}
                      onChange={(e) => setNewCustomerName(e.target.value)}
                      placeholder="Customer name"
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={newCustomerPhone}
                      onChange={(e) => setNewCustomerPhone(e.target.value)}
                      placeholder="+234 80X XXX XXXX"
                    />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input
                      type="email"
                      value={newCustomerEmail}
                      onChange={(e) => setNewCustomerEmail(e.target.value)}
                      placeholder="customer@email.com"
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Textarea
                      value={newCustomerAddress}
                      onChange={(e) => setNewCustomerAddress(e.target.value)}
                      placeholder="Customer address"
                    />
                  </div>
                  <Button onClick={handleAddCustomer} className="w-full bg-emerald-600 hover:bg-emerald-700">
                    Add Customer
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          <Select value={selectedCustomerId} onValueChange={setSelectedCustomerId}>
            <SelectTrigger>
              <SelectValue placeholder="Select a customer" />
            </SelectTrigger>
            <SelectContent>
              {customers.map((customer) => (
                <SelectItem key={customer.id} value={customer.id}>
                  {customer.name} {customer.phone && `- ${customer.phone}`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {selectedCustomer && (
            <div className="bg-gray-50 p-3 rounded-lg text-sm space-y-1">
              <p className="font-medium">{selectedCustomer.name}</p>
              {selectedCustomer.phone && <p className="text-gray-600">{selectedCustomer.phone}</p>}
              {selectedCustomer.email && <p className="text-gray-600">{selectedCustomer.email}</p>}
              {selectedCustomer.address && <p className="text-gray-600">{selectedCustomer.address}</p>}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Invoice Details */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-sm font-medium">Due Date</Label>
              <Input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>
            <div>
              <Label className="text-sm font-medium">Tax Rate (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={taxRate}
                onChange={(e) => setTaxRate(Number(e.target.value))}
              />
            </div>
          </div>
          
          <div>
            <Label className="text-sm font-medium">Payment Terms</Label>
            <Input
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              placeholder="e.g., Payment due within 14 days"
            />
          </div>
        </CardContent>
      </Card>

      {/* Items */}
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-sm font-medium">Items</Label>
            <Button variant="ghost" size="sm" onClick={handleAddItem} className="text-emerald-600">
              <Plus className="w-4 h-4 mr-1" />
              Add Item
            </Button>
          </div>

          <div className="space-y-3">
            {items.map((item) => (
              <div key={item.id} className="grid grid-cols-12 gap-2 items-start">
                <div className="col-span-5">
                  <Input
                    placeholder="Item description"
                    value={item.description}
                    onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <Input
                    type="number"
                    min="1"
                    placeholder="Qty"
                    value={item.quantity || ''}
                    onChange={(e) => handleItemChange(item.id, 'quantity', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-3">
                  <Input
                    type="number"
                    min="0"
                    placeholder="Unit price"
                    value={item.unitPrice || ''}
                    onChange={(e) => handleItemChange(item.id, 'unitPrice', Number(e.target.value))}
                  />
                </div>
                <div className="col-span-1 text-right">
                  <p className="text-sm font-medium pt-2">{formatCurrency(item.total)}</p>
                </div>
                <div className="col-span-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveItem(item.id)}
                    disabled={items.length === 1}
                    className="text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Notes */}
      <Card>
        <CardContent className="p-4">
          <Label className="text-sm font-medium">Notes</Label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Additional notes or terms..."
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Summary */}
      <Card className="bg-gray-50">
        <CardContent className="p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax ({taxRate}%)</span>
            <span className="font-medium">{formatCurrency(tax)}</span>
          </div>
          <div className="border-t pt-2 flex justify-between">
            <span className="font-semibold">Total</span>
            <span className="font-bold text-lg text-emerald-600">{formatCurrency(total)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-3">
        <Button variant="outline" onClick={onCancel} className="flex-1">
          <X className="w-4 h-4 mr-2" />
          Cancel
        </Button>
        <Button onClick={handleSave} className="flex-1 bg-emerald-600 hover:bg-emerald-700">
          <Save className="w-4 h-4 mr-2" />
          Save Invoice
        </Button>
      </div>
    </div>
  );
}
