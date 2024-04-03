import { Drawer, IconButton } from "@mui/joy";
import { useEffect, useState } from "react";

import Icon from "./Icon";
import Navigation from "./Navigation";
import { usePathname } from 'next/navigation'

const NavigationDrawer = () => {

  const [open, setOpen] = useState(false);
  const pathname = usePathname()
  
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const toggleDrawer = (inOpen: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }

    setOpen(inOpen);
  };

  return (
    <div className="flex gap-2">
      <IconButton onClick={toggleDrawer(true)}>
        <Icon.Menu className="w-5 h-auto" />
      </IconButton>
      <Drawer anchor="left" size="sm" open={open} onClose={toggleDrawer(false)}>
        <div className="w-full h-full overflow-auto px-4">
          <Navigation />
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationDrawer;
