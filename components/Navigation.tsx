import { useTranslate } from "@/utils/i18n";
import Icon from "./Icon";
import { cn } from "@/utils/utils";
import ActiveLink from "./ActiveLink";
import useResponsiveWidth from "@/hooks/useResponsiveWidth";

interface NavLinkItem {
  id: string;
  path: string;
  title: string;
  icon: React.ReactNode;
}

const Navigation = () => {

  const t = useTranslate();
  const { sm } = useResponsiveWidth();

  const homeNavLink: NavLinkItem = {
    id: "header-home",
    path: "/",
    title: t("common.home"),
    icon: <Icon.Home className="w-6 h-auto opacity-70" />,
  };

  const profileNavLink: NavLinkItem = {
    id: "header-profile",
    path: "/profile",
    title: t("common.profile"),
    icon: <Icon.User2 className="w-6 h-auto opacity-70" />,
  };

  const navLinks: NavLinkItem[] = [homeNavLink, profileNavLink]

  return (
    <header
      className={cn(
        "py-4 z-30 hide-scrollbar sticky w-full",
      )}
    >
      <div className={cn("flex justify-start items-start ", sm ? "space-x-2" : "space-y-2 flex-col")}>
        {navLinks.map((navLink) => (
          <ActiveLink
            className={cn(
              "rounded-2xl flex flex-row items-center text-lg")}
            activeClassName="bg-white drop-shadow-sm dark:bg-zinc-800 dark:border-zinc-700"
            key={navLink.id}
            href={navLink.path}
          >
            <span>{navLink.title}</span>
          </ActiveLink>
        ))}
      </div>
    </header >
  );
};

export default Navigation;
