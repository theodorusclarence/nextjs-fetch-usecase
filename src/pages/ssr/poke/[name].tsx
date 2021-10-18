import axios from 'axios';
import { GetServerSideProps } from 'next';
import * as React from 'react';

import JsonPreview from '@/components/JsonPreview';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { PokemonDetail } from '@/types/pokemon';

export default function PokemonPage({
  pokemonDetail,
  date,
}: {
  pokemonDetail: PokemonDetail;
  date: string;
}) {
  const pokemonName = pokemonDetail.forms[0].name;

  return (
    <Layout>
      <Seo templateTitle={pokemonName} />

      <main>
        <section className='bg-gray-100'>
          <div className='min-h-screen py-20 layout'>
            <h1>Pokemon Single Page Using SSR: {pokemonName}</h1>
            <CustomLink className='mt-4' href='/ssr'>
              ← Back to SSR Demo
            </CustomLink>

            <p className='mt-4 underline'>
              Data Fetched before each visit: {new Date(date).toLocaleString()}
            </p>

            <div className='mt-4'>
              <JsonPreview varName='pokemonDetail' data={pokemonDetail} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // Context.params is the route we are visiting
  console.log(context.params);
  const pokemonName = context.params?.name;

  // Get detailed info from each
  const res = await axios.get<PokemonDetail>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  // Get only the data we want
  const { abilities, forms, types, weight } = res.data;

  const date = new Date().toISOString();

  const pokemonDetail = {
    abilities,
    forms,
    types,
    weight,
  };

  return {
    props: { pokemonDetail, date },
  };
};
