import Link from 'next/link';

const pages = [
  { href: '/', title: 'Home' },
  { href: '/hogwarts', title: 'Hogwarts' }
];

export function Nav() {
  return <nav>
    <ul>
      {pages.map(({ href, title }) =>
        <li key={href}>
          <Link href={href}>{title}</Link>
        </li>)}
    </ul>
  </nav>
}