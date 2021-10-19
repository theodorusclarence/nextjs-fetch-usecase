import axios from 'axios';
import { GetStaticProps } from 'next';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { Pokemon, PokemonData } from '@/types/pokemon';

export default function SSRPage({ pokemons }: { pokemons: Pokemon[] }) {
  return (
    <Layout>
      <Seo templateTitle='SSR' />

      <main>
        <section className='bg-gray-100'>
          <div className='min-h-screen py-20 layout'>
            <h1>Get Server Side Props</h1>
            <code className='mt-2 text-gray-800'>
              https://pokeapi.co/api/v2/pokemon?limit=100
            </code>

            <div className='mt-4'>
              <h3>Page List (this list is still fetched using SSG)</h3>
              <p>But the pokemon detail page is using SSR.</p>
              <nav className='flex flex-col items-start gap-2 mt-4'>
                {pokemons.map((poke) => (
                  <CustomLink key={poke.name} href={`/ssr/poke/${poke.name}`}>
                    {poke.name}
                  </CustomLink>
                ))}
              </nav>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await axios.get<PokemonData>(
    'https://pokeapi.co/api/v2/pokemon?limit=100'
  );

  return {
    props: { pokemons: res.data.results },
  };
};
