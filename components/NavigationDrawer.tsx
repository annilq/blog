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
      {/* 图标按钮必须自报家门：没有 aria-label 时，读屏把这个汉堡播报成「未命名按钮」——
          一个说不出自己是干什么的控件。aria-expanded 让「抽屉是开还是关」可被听到。 */}
      <IconButton
        onClick={toggleDrawer(true)}
        aria-label="打开导航菜单"
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Icon.Menu className="w-5 h-auto" aria-hidden="true" />
      </IconButton>
      <Drawer anchor="left" size="sm" open={open} onClose={toggleDrawer(false)}>
        <div className="flex h-full w-full flex-col">
          {/* 抽屉此前没有关闭按钮：手机上唯一的出口是点遮罩，而这个遮罩在滑动手势里不算好按。
              给一个明确的出口 —— 也是键盘用户唯一能退出抽屉的方式（Esc 之外）。
              book.tsx 的 ModalClose 是同一个做法，这里不用 ModalClose 是因为它依赖 Modal 的 context。 */}
          <div className="flex items-center justify-between px-4 pt-3 pb-1">
            <span className="text-meta text-muted">导航</span>
            <IconButton
              onClick={toggleDrawer(false)}
              aria-label="关闭导航菜单"
              size="sm"
              variant="plain"
              color="neutral"
            >
              <Icon.X className="w-4 h-auto" aria-hidden="true" />
            </IconButton>
          </div>
          <div className="w-full flex-1 overflow-auto px-4">
            {/* 抽屉里必须是竖排：Navigation 不再按视口猜布局，由这里声明。 */}
            <Navigation variant="column" />
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default NavigationDrawer;
