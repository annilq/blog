"use client";

import { Button, Dropdown, Menu, MenuButton, MenuItem } from "@mui/joy";
import { LogInIcon, LogOutIcon, UserRound } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function SignIn() {
  const session = useSession();

  /*
   * 这几个控件此前都是「只有图标、没有名字」：读屏会播报成「按钮」「按钮」，
   * 用户只能靠图标外形去猜。图标一律 aria-hidden（它是装饰），名字由两种方式之一提供：
   * 有空间的地方给可见文字（菜单项），没空间的地方给 aria-label（顶栏图标）。
   */
  if (session.data?.user) {
    return (
      <Dropdown>
        <MenuButton variant="plain" aria-label="账户菜单">
          <UserRound aria-hidden="true" />
        </MenuButton>
        <Menu>
          <MenuItem onClick={() => signOut()}>
            <LogOutIcon aria-hidden="true" />
            退出登录
          </MenuItem>
        </Menu>
      </Dropdown>
    );
  }
  return (
    <div className="space-y-1">
      <Button onClick={() => signIn("github")} variant="plain" aria-label="使用 GitHub 登录">
        <LogInIcon aria-hidden="true" />
      </Button>
    </div>
  );
}
