
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { TabList } from "../tabs/TabList";

interface MobileNavProps {
  setActiveTab: (value: string) => void;
}

export const MobileNav = ({ setActiveTab }: MobileNavProps) => {
  const [open, setOpen] = useState(false);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] p-0">
        <div className="flex h-full flex-col py-6">
          <TabList setActiveTab={handleTabChange} orientation="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
