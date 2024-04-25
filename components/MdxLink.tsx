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
    <a href={href} target="_blank" {...rest} >
      <span className="inline-flex gap-1">
        {children}
        <Icon.Link className="w-3" />
      </span>
    </a>);
};