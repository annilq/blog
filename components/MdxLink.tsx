import Link from "next/link";
import Icon from "./Icon";

export default function MdxLink(props: any) {
  const { href, children, ...rest } = props;
  const isInternalLink = href && (href.startsWith('/'));

  if (isInternalLink) {
    return (
      <Link href={href}>
        {children}
      </Link>
    );
  }

  return (
    // rel="noopener noreferrer" 是必须的：target="_blank" 打开的外链可以通过
    // window.opener 反向操作原页面（tabnabbing），现代浏览器虽已默认 noopener，
    // 但显式声明不依赖浏览器默认值，也更明确。
    <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
      <span className="inline-flex gap-1">
        {children}
        {/*
         * 图标是纯装饰，可访问名应由链接文字承担。
         *
         * 注：实测过 lucide-react 0.363.0 的 createLucideIcon —— 它**不渲染 <title>**，
         * 也不自己加 aria-hidden（整份 dist 里 "title" 只出现在 LucideSubtitles 这类导出名中）。
         * 所以「可访问名会被读成 Next.js link graphic」这个说法在本版本不成立；
         * 这里加 aria-hidden 是补上它本该有的默认值，而不是在修一个已被证实的错误。
         */}
        <Icon.Link className="w-3" aria-hidden="true" />
      </span>
    </a>);
};