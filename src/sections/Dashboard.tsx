import { FileText, Users, TrendingUp, Clock, CheckCircle, AlertCircle, Plus, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { Invoice, DashboardStats } from '@/types';
import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface DashboardProps {
  invoices: Invoice[];
  onCreateInvoice: () => void;
  onViewInvoices: () => void;
  onViewCustomers: () => void;
  onViewInvoicesByStatus?: (status: string) => void;
}

export function Dashboard({ invoices, onCreateInvoice, onViewInvoices, onViewCustomers, onViewInvoicesByStatus }: DashboardProps) {
  const stats = useMemo<DashboardStats>(() => {
    const totalInvoices = invoices.length;
    const totalRevenue = invoices
      .filter(inv => inv.status === 'paid')
      .reduce((sum, inv) => sum + inv.total, 0);
    const unpaidCount = invoices.filter(inv => inv.status === 'unpaid').length;
    const pendingAmount = invoices
      .filter(inv => inv.status === 'unpaid' || inv.status === 'overdue')
      .reduce((sum, inv) => sum + inv.total, 0);
    const paidCount = invoices.filter(inv => inv.status === 'paid').length;
    const overdueCount = invoices.filter(inv => inv.status === 'overdue').length;

    return { totalInvoices, totalRevenue, unpaidCount, pendingAmount, paidCount, overdueCount };
  }, [invoices]);

  const recentInvoices = useMemo(() => invoices.slice(0, 5), [invoices]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', minimumFractionDigits: 0 }).format(amount);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-100 text-emerald-700';
      case 'unpaid': return 'bg-amber-100 text-amber-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
          <p className="text-sm text-gray-500">Here's how your business is doing</p>
        </div>
        {/* ✅ FIX 1: Visible on ALL screen sizes now */}
        <Button onClick={onCreateInvoice} className="bg-emerald-600 hover:bg-emerald-700">
          <Plus className="w-4 h-4 mr-2" />
          New Invoice
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-xs">Total Revenue</p>
                <p className="text-xl font-bold">{formatCurrency(stats.totalRevenue)}</p>
                <p className="text-emerald-100 text-xs mt-1">{stats.paidCount} paid invoice(s)</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewInvoices}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Total Invoices</p>
                <p className="text-xl font-bold text-gray-900">{stats.totalInvoices}</p>
                <p className="text-gray-400 text-xs mt-1">Tap to view all</p>
              </div>
              <FileText className="w-8 h-8 text-emerald-600" />
            </div>
          </CardContent>
        </Card>

        {/* ✅ FIX 2: Stat cards clickable to filter */}
        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onViewInvoicesByStatus?.('unpaid')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Pending</p>
                <p className="text-xl font-bold text-amber-600">{formatCurrency(stats.pendingAmount)}</p>
                <p className="text-gray-400 text-xs mt-1">Tap to view</p>
              </div>
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card
          className="cursor-pointer hover:shadow-md transition-shadow"
          onClick={() => onViewInvoicesByStatus?.('unpaid')}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-xs">Unpaid</p>
                <p className="text-xl font-bold text-red-600">{stats.unpaidCount}</p>
                <p className="text-gray-400 text-xs mt-1">Tap to view</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status Summary — clickable chips */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        <button
          onClick={() => onViewInvoicesByStatus?.('paid')}
          className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full whitespace-nowrap hover:bg-emerald-100 transition-colors"
        >
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          <span className="text-sm font-medium text-emerald-700">{stats.paidCount} Paid</span>
        </button>
        <button
          onClick={() => onViewInvoicesByStatus?.('unpaid')}
          className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-full whitespace-nowrap hover:bg-amber-100 transition-colors"
        >
          <Clock className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-medium text-amber-700">{stats.unpaidCount} Unpaid</span>
        </button>
        {stats.overdueCount > 0 && (
          <button
            onClick={() => onViewInvoicesByStatus?.('overdue')}
            className="flex items-center gap-2 bg-red-50 px-4 py-2 rounded-full whitespace-nowrap hover:bg-red-100 transition-colors"
          >
            <AlertCircle className="w-4 h-4 text-red-600" />
            <span className="text-sm font-medium text-red-700">{stats.overdueCount} Overdue</span>
          </button>
        )}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <Button variant="outline" onClick={onCreateInvoice} className="h-auto py-4 flex flex-col items-center gap-2 border-emerald-200 hover:bg-emerald-50">
          <Plus className="w-6 h-6 text-emerald-600" />
          <span className="text-sm">Create Invoice</span>
        </Button>
        <Button variant="outline" onClick={onViewInvoices} className="h-auto py-4 flex flex-col items-center gap-2 border-gray-200 hover:bg-gray-50">
          <Eye className="w-6 h-6 text-gray-600" />
          <span className="text-sm">View Invoices</span>
        </Button>
        <Button variant="outline" onClick={onViewCustomers} className="h-auto py-4 flex flex-col items-center gap-2 border-gray-200 hover:bg-gray-50">
          <Users className="w-6 h-6 text-gray-600" />
          <span className="text-sm">Customers</span>
        </Button>
      </div>

      {/* Recent Invoices */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">Recent Invoices</h3>
          <Button variant="ghost" size="sm" onClick={onViewInvoices} className="text-emerald-600">
            View All
          </Button>
        </div>

        {recentInvoices.length === 0 ? (
          <Card className="p-8 text-center">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-2">No invoices yet</p>
            <p className="text-gray-400 text-sm mb-4">Create your first invoice to start tracking payments</p>
            <Button onClick={onCreateInvoice} className="bg-emerald-600 hover:bg-emerald-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Your First Invoice
            </Button>
          </Card>
        ) : (
          <div className="space-y-2">
            {recentInvoices.map((invoice) => (
              <Card key={invoice.id} className="cursor-pointer hover:shadow-md transition-shadow" onClick={onViewInvoices}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-gray-900">{invoice.invoiceNumber}</p>
                        <span className={cn('text-xs px-2 py-0.5 rounded-full capitalize', getStatusColor(invoice.status))}>
                          {invoice.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{invoice.customerName}</p>
                      <p className="text-xs text-gray-400">{formatDate(invoice.issueDate)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(invoice.total)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}