import { Settings, Receipt, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  businessName: string;
  onSettings: () => void;
  onLogout: () => void;
}

export function Header({ businessName, onSettings, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white border-b shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <Receipt className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-emerald-800 text-sm leading-tight">InvoicePro NG</h1>
            <p className="text-xs text-gray-500 truncate max-w-[120px]">{businessName}</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onSettings}
          className="text-gray-600 hover:text-emerald-700"
        >
          <Settings className="w-5 h-5" />
        </Button>
        <Button
            variant="ghost"
            size="icon"
            onClick={onLogout}
            className="text-gray-600 hover:text-red-500"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </Button>
      </div>
    </header>
  );
}
