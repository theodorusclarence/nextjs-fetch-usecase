import * as React from 'react';

import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

export default function IndexPage() {
  return (
    <Layout>
      <Seo />

      <main>
        <section className='bg-gray-100'>
          <div className='flex flex-col items-center min-h-screen py-20 layout'>
            <h1>Next.js Fetch Method Use Cases</h1>
            <p className='mt-2 text-gray-700'>
              Thorough explanation of how to choose between CSR, SSG, SSR, or
              ISR
            </p>
            <div className='flex flex-col items-center mt-4 space-y-2'>
              <CustomLink href='https://github.com/theodorusclarence/nextjs-fetch-usecase'>
                See the repository
              </CustomLink>
              <CustomLink href='https://github.com/theodorusclarence/nextjs-fetch-usecase'>
                See the blog post for full explanation
              </CustomLink>
            </div>

            <nav className='mt-8'>
              <h2>Page Demo List:</h2>
              <ul className='flex flex-col items-start mt-2 space-y-2'>
                <li>
                  <CustomLink href='/ssg'>
                    SSG (getStaticProps + getStaticPaths)
                  </CustomLink>
                </li>
                <li>
                  <CustomLink href='/csr'>CSR (useEffect)</CustomLink>
                </li>
              </ul>
            </nav>
          </div>
        </section>
      </main>
    </Layout>
  );
}
