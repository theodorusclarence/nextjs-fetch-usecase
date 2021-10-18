import axios from 'axios';
import pick from 'lodash.pick';
import * as React from 'react';

import { simulateGet } from '@/lib/helper';

import JsonPreview from '@/components/JsonPreview';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

import { GithubRepo } from '@/types/github';

export default function CSRPage() {
  //#region  //*=========== Fetch Data ===========
  const [repo, setRepo] = React.useState<GithubRepo>();

  React.useEffect(() => {
    simulateGet(2000)
      .then(() =>
        axios.get<GithubRepo>(
          'https://api.github.com/repos/theodorusclarence/theodorusclarence.com'
        )
      )
      .then((res) => {
        const repoData: GithubRepo = pick(res.data, [
          'description',
          'forks',
          'full_name',
          'open_issues_count',
        ]);
        setRepo(repoData);
      });
  }, []);

  //#endregion  //*======== Fetch Data ===========

  return (
    <Layout>
      <Seo templateTitle='CSR' />

      <main>
        <section className='bg-gray-100'>
          <div className='min-h-screen py-20 layout'>
            <h1>CSR (useEffect)</h1>
            <p className='mt-2 text-gray-700'>Dashboard example</p>

            <div className='mt-4'>
              <JsonPreview varName='repo' data={repo} />
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
