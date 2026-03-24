import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Manny Roy Consulting — Docs, systems, and a friendly AI assistant
        </Heading>
        <p className="hero__subtitle">
          Clear documentation and reproducible tooling for a Ghost-backed site, a
          DocsGPT-powered assistant, and a custom theme. Pick a path below to get
          started.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/how-to-use-these-docs">
            Which path is for me?
          </Link>
        </div>
      </div>
    </header>
  );
}

function HomepageIntro() {
  return (
    <section className="container padding-vert--lg">
      <div className="row">
        <div className="col col--8 col--offset-2">
          <h2>Docs organized for three audiences</h2>
          <p>
            We tell the story of the <strong>custom Ghost theme and site</strong>{' '}
            in a way that’s easy to follow for different roles: developers building
            and extending, operators running reliably, and readers understanding
            outcomes and safeguards.
          </p>
          <h3>Start here</h3>
          <ul>
            <li>
              <strong>Developer</strong> — Build & extend (recommended start: Quick
              start — Developer)
            </li>
            <li>
              <strong>Operator</strong> — Run & maintain (recommended start: Quick
              start — Operator)
            </li>
            <li>
              <strong>Reader</strong> — What it does (recommended start: What it
              does)
            </li>
          </ul>
          <p>Use the button above to pick the right path in seconds.</p>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={siteConfig.title}
      description={siteConfig.tagline}>
      <HomepageHeader />
      <main>
        <HomepageIntro />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
