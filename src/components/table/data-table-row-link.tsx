import Link from 'next/link';

export default function DataTableRowLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="relative block w-fit after:absolute after:block after:h-[1px] after:w-full after:origin-left after:scale-x-0 after:bg-current after:transition after:duration-300 after:content-[''] after:hover:scale-x-100"
    >
      {title}
    </Link>
  );
}
