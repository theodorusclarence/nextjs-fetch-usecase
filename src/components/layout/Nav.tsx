import Link from 'next/link';

import UnstyledLink from '@/components/links/UnstyledLink';

const links = [
  { href: '/ssg', label: 'SSG' },
  { href: '/csr', label: 'CSR' },
];

export default function Nav() {
  return (
    <nav className='fixed inset-x-0 top-0 bg-gray-100'>
      <ul className='flex items-center justify-between py-4 layout'>
        <li>
          <Link href='/'>
            <a className='font-bold text-black'>Home</a>
          </Link>
        </li>
        <ul className='flex items-center justify-between space-x-4'>
          {links.map(({ href, label }) => (
            <li key={`${href}${label}`}>
              <UnstyledLink
                href={href}
                className='text-black hover:text-gray-700'
              >
                {label}
              </UnstyledLink>
            </li>
          ))}
        </ul>
      </ul>
    </nav>
  );
}
