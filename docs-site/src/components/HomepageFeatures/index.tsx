import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  to: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Developer — Build & extend',
    to: '/docs/quick-start/quick-start-developer',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Dive into the architecture, theme code, and Botty integration. Includes
        recommended deep-dives, local dev commands, and runnable snippets.
      </>
    ),
  },
  {
    title: 'Operator — Run & maintain',
    to: '/docs/quick-start/quick-start-operator',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        Deploy, monitor, and troubleshoot the theme and assistant. Includes
        deployment checklists, rollback guidance, runbooks, and reliability
        practices.
      </>
    ),
  },
  {
    title: 'Reader — What it does',
    to: '/docs/what-it-does',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Plain-language overview of the system, outcomes, and privacy/data
        handling. A quick tour for stakeholders and potential clients.
      </>
    ),
  },
];

function Feature({title, to, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <Link to={to} className={styles.featureLink}>
        <div className="text--center">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="text--center padding-horiz--md">
          <Heading as="h3">{title}</Heading>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={clsx(styles.features, 'mrc-section-surface')}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
