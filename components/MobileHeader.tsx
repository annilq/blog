import Link from "next/link";
import useWindowScroll from "react-use/lib/useWindowScroll";
// import { useGlobalStore } from "@/store/module";
import NavigationDrawer from "./NavigationDrawer";
import { cn } from "@/utils/utils";
import { SITE_NAME } from "@/lib/site";

interface Props {
  className?: string;
  children?: React.ReactNode;
}

const MobileHeader = (props: Props) => {
  // const globalStore = useGlobalStore();
  // const { systemStatus } = globalStore.state;
  const { className, children } = props;

  const { y: offsetTop } = useWindowScroll();

  return (
    <div
      className={cn(
        // 半透明 + 背景模糊：正文从头部下面穿过时必须看得见内容，否则这层玻璃没有意义。
        // 旧写法用的是「背景不透明度」那一套类 —— 旧 token 没有 alpha 占位，生成不出任何东西，
        // 头部其实是全不透明；现在 token 带了 <alpha-value>，改用斜杠写法直接生效。
        // （这里刻意不写那个旧类名：Tailwind 会连注释一起扫，注释里的类名会真的进 CSS。）
        "sticky top-0 pt-3 pb-2 sm:pt-2 sm:mb-1 bg-background/80 backdrop-blur-lg flex md:hidden flex-row justify-between items-center w-full h-auto flex-nowrap shrink-0 z-10",
        offsetTop > 0 && "shadow-md",
        className,
      )}
    >
      <div className="flex flex-row justify-start items-center mr-2 shrink-0 overflow-hidden">
        <NavigationDrawer />
        {/* 站名是回首页的链接。原来是一段硬编码的字面量 + cursor-pointer，没有任何 handler ——
            一个看起来能点、点了什么都不发生的标题。
            必须显式给 text-foreground：`a` 的全局色是强调蓝，站名跟着变蓝就成了一个"蓝色按钮"，
            而不是品牌。 */}
        <Link
          href="/"
          className="font-semibold text-title-3 leading-10 mr-1 text-ellipsis shrink-0 overflow-hidden text-foreground"
        >
          {SITE_NAME}
        </Link>
      </div>
      {/* 右侧工具位：窄屏上主题开关、GitHub 与登录只能落在这里（桌面那一排在 <768px 全部隐藏）。 */}
      <div className="flex flex-row justify-end items-center gap-1">{children}</div>
    </div>
  );
};

export default MobileHeader;
