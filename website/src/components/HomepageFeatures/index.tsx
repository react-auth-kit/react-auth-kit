import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easyToUse.svg').default,
    description: (
      <>
         Implementation of Token based authentication made easy by 
         lightweight JavaScript library for React JS.
      </>
    ),
  },
  {
    title: 'Focus on What Matters',
    Svg: require('@site/static/img/target.svg').default,
    description: (
      <>
        React Auth kit lets you focus on your Authentication, and we&apos;ll do the chores. Go
        ahead and add react-auth-kit to your project by using <code>npm</code>.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/reactPower.svg').default,
    description: (
      <>
        Extend or customize your website layout by reusing React. This kit can be used as higher-order-component.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
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
