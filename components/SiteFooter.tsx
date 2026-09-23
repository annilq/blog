/* Hallmark · component: SiteFooter · genre: editorial · theme: project tokens preserved (light/breezy) */
import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

const links = [
  { href: "/", title: "主页" },
  { href: "/post", title: "文章" },
  { href: "/thoughts", title: "碎碎念" },
  { href: "/book", title: "书籍" },
  { href: "/profile", title: "关于" },
];

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-rule/10">
      <div className="mx-auto max-w-content px-4 py-8 flex flex-col gap-3">
        <nav
          aria-label="页脚导航"
          className="flex flex-wrap gap-x-4 gap-y-2 text-meta text-muted"
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="transition-colors hover:text-foreground"
            >
              {l.title}
            </Link>
          ))}
        </nav>
        <p className="m-0 text-caption text-muted">
          © {year} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
