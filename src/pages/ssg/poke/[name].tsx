import axios from 'axios';
import { GetStaticPaths, GetStaticProps } from 'next';
import * as React from 'react';

import JsonPreview from '@/components/JsonPreview';
import Layout from '@/components/layout/Layout';
import CustomLink from '@/components/links/CustomLink';
import Seo from '@/components/Seo';

import { PokemonData, PokemonDetail } from '@/types/pokemon';

export default function PokemonPage({
  pokemonDetail,
}: {
  pokemonDetail: PokemonDetail;
}) {
  const pokemonName = pokemonDetail.forms[0].name;

  return (
    <Layout>
      <Seo templateTitle={pokemonName} />

      <main>
        <section className='bg-gray-100'>
          <div className='min-h-screen py-20 layout'>
            <h1>Pokemon Single Page: {pokemonName}</h1>
            <CustomLink className='mt-2' href='/ssg'>
              ← Back to Get Static Props Demo
            </CustomLink>

            <div className='mt-4'>
              <JsonPreview varName='pokemonDetail' data={pokemonDetail} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Get all of the paths using the same API as before
  // This will be run on build

  const res = await axios.get<PokemonData>(
    'https://pokeapi.co/api/v2/pokemon?limit=10'
  );

  const pokemonParams = res.data.results.map((datum) => ({
    params: { name: datum.name },
  }));

  return {
    paths: pokemonParams,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  // Context.params is the route we are visiting
  console.log(context.params);
  const pokemonName = context.params?.name;

  // Get detailed info from each
  const res = await axios.get<PokemonDetail>(
    `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
  );

  // Get only the data we want
  const { abilities, forms, types, weight } = res.data;

  const pokemonDetail = {
    abilities,
    forms,
    types,
    weight,
  };

  return {
    props: { pokemonDetail },
  };
};
