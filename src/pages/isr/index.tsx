import axios from 'axios';
import { pick } from 'lodash';
import { GetStaticProps } from 'next';
import Image from 'next/image';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import ButtonLink from '@/components/links/ButtonLink';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { StarGazers } from '@/types/github';

export default function ISRPage({ stargazers }: { stargazers: StarGazers[] }) {
  return (
    <Layout>
      <Seo templateTitle='ISR' />

      <main>
        <section className='bg-gray-100'>
          <div className='min-h-screen py-20 layout'>
            <h1>Repo Stargazers (using ISR)</h1>
            <p className='mt-2 text-gray-700'>
              Try to star this repo (yes this is intentional to bump up my stars
              😂). <strong>Kindly keep it starred</strong> if you like this blog
              post and demo!
            </p>
            <ButtonLink
              className='mt-2'
              href='https://github.com/theodorusclarence/theodorusclarence.com/stargazers'
            >
              Star this repo
            </ButtonLink>
            <p className='mt-2 text-gray-700'>
              Bear in mind it took about 10 seconds from the Github API to take
              changes. Refresh <strong>twice</strong> after 10 second to see
              changes.
            </p>

            <div className='mt-8'>
              <h2>Stargazers: {stargazers.length}</h2>
              <ul className='flex flex-wrap gap-2 mt-4'>
                {stargazers.map(({ login, avatar_url, html_url }) => (
                  <li key={login} className='flex items-center gap-2'>
                    <figure className='w-6 overflow-hidden rounded-full'>
                      <Image
                        src={avatar_url}
                        alt={`${login}'s avatar`}
                        width='400'
                        height='400'
                        layout='responsive'
                      />
                    </figure>
                    <CustomLink href={html_url}>{login}</CustomLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get<StarGazers[]>(
    'https://api.github.com/repos/theodorusclarence/theodorusclarence.com/stargazers?page=1&per_page=100'
  );
  const res2 = await axios.get<StarGazers[]>(
    'https://api.github.com/repos/theodorusclarence/theodorusclarence.com/stargazers?page=2&per_page=100'
  );

  const stargazers = [...res.data, ...res2.data].map((datum) =>
    pick(datum, ['login', 'html_url', 'avatar_url'])
  );

  return {
    props: { stargazers },
    revalidate: 1,
  };
};
