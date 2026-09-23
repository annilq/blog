import ActiveLink from "./ActiveLink";
import ThemeToggle from "./ThemeToggle";
import SignIn from "./SignIn";
import GitHubLink from "./GitHubLink";

interface NavLinkItem {
  id: string;
  path: string;
  title: string;
}

const navLinks: NavLinkItem[] = [
  {
    id: "header-home",
    path: "/",
    title: "主页",
  },
  // 「碎碎念」排在「文章」之前：它是本站的门（先看人在想什么，再看成文的东西），
  // 位置本身就是入口强度 —— 内容一行没动，只挪了顺序。
  {
    id: "header-thoughts",
    path: "/thoughts",
    title: "碎碎念",
  },
  {
    id: "header-post",
    path: "/post",
    title: "文章",
  },
  {
    id: "header-book",
    path: "/book",
    title: "书籍",
  },
  {
    id: "header-profile",
    path: "/profile",
    title: "关于",
  },
];

interface Props {
  /*
   * 布局由调用方声明，不再由视口宽度推断。
   *
   * 原来这里读 useResponsiveWidth().sm 来决定横排还是竖排，于是抽屉（NavigationDrawer，
   * 在任何宽度都能被打开）在 640–767px 区间里拿到的是横排 —— 一个 4 项横排塞进 400px 宽的抽屉。
   * 视口宽度不是「我在哪个容器里」，布局该由父子关系决定：SiteHeader 用 row，抽屉用 column。
   */
  variant?: "row" | "column";
}

const Navigation = ({ variant = "row" }: Props) => {
  const isRow = variant === "row";

  return (
    <header className="flex py-4 z-30 sticky w-full font-semibold text-base">
      {/*
       * <nav> 而不是 <div>：这是读屏用户的「导航」地标。此前全仓 0 个 nav、0 个 role，
       * 这一组链接在语义上只是「页面上的一些链接」，跳不到、列不出。
       * 外层仍是 <header>（banner 地标），布局类继续落在这个元素上 —— 横排/竖排由 variant 声明。
       * 顺手删掉一个从未定义过的滚动条类：旧 globals.css 里没有对应规则，它一直没生效。
       */}
      <nav
        aria-label="站点导航"
        className={isRow ? "flex-1 flex justify-start items-start space-x-4" : "flex flex-col space-y-2"}
      >
        {navLinks.map((navLink) => (
          <ActiveLink
            key={navLink.id}
            href={navLink.path}
            // 未选中降到 muted（浅 6.6:1 / 深 8.5:1，仍是 AA），选中回到 foreground 并加一条 2px 下划线。
            // 原来这里是 activeClassName="drop-shadow"：一个 1px 的投影，旁边还是 font-semibold，
            // 等于当前页不可见 —— H1「系统状态可见性」和「靠识别而不是记忆」都栽在这一行上。
            className="flex flex-row items-center text-muted transition-colors hover:text-foreground"
            activeClassName="text-foreground underline decoration-link decoration-2 underline-offset-4"
          >
            {navLink.title}
          </ActiveLink>
        ))}
      </nav>
      {/* 右侧工具位只在横排出现；窄屏由 MobileHeader 的 children 承接，见 SiteHeader。 */}
      {isRow && (
        <div className="flex gap-2 items-center">
          <GitHubLink />
          <ThemeToggle />
          <SignIn />
        </div>
      )}
    </header>
  );
};

export default Navigation;
