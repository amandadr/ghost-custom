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
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
        <div className={styles.buttons}>
          <Link
            className="button button--primary button--lg"
            to="/docs/intro">
            Welcome
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
          <h2>What this site is for</h2>
          <p>
            These docs describe the <strong>custom Ghost theme and site</strong>{' '}
            for Manny Roy Consulting: how it’s built, how it’s run, and how to
            work with it. They’re the single place for architecture decisions,
            performance approach, operations runbooks, and the AI assistant
            design.
          </p>
          <h3>What you’ll find</h3>
          <ul>
            <li>
              <strong>Architecture</strong> — Theme system, stack, and structure
            </li>
            <li>
              <strong>Performance</strong> — Strategy, metrics, and asset approach
            </li>
            <li>
              <strong>Operations</strong> — Deployment, observability, and rollback
            </li>
            <li>
              <strong>AI assistant</strong> — Design, scope, and safeguards
            </li>
            <li>
              <strong>Reference</strong> — Roadmap and future improvements
            </li>
          </ul>
          <p>
            Use the <strong>Welcome</strong> link above or the button below to
            open the introduction and start browsing.
          </p>
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
