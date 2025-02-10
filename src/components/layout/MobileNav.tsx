
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { TabList } from "../tabs/TabList";

interface MobileNavProps {
  setActiveTab: (value: string) => void;
}

export const MobileNav = ({ setActiveTab }: MobileNavProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-screen sm:w-[300px] pt-12">
        <div className="grid gap-2">
          <TabList setActiveTab={setActiveTab} orientation="vertical" />
        </div>
      </SheetContent>
    </Sheet>
  );
};
