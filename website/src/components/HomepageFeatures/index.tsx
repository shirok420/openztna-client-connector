import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  image: string;
  description: React.ReactNode;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Free & Open Source',
    image: 'img/openztna-logo.png',
    description: (
      <>
        OpenZTNA Client Connector is completely free and open source, 
        providing a transparent and customizable solution for secure
        access to enterprise resources.
      </>
    ),
  },
  {
    title: 'Zero Trust Security',
    image: 'img/openztna-logo.png',
    description: (
      <>
        Built on the principle of "never trust, always verify," the client 
        provides secure application-level access with continuous authentication 
        and device posture assessment.
      </>
    ),
  },
  {
    title: 'Enterprise Ready',
    image: 'img/openztna-logo.png',
    description: (
      <>
        Designed for enterprise environments with support for OAuth2/OIDC, 
        integration with security tools, and deployment options for Windows, 
        macOS, and Linux.
      </>
    ),
  },
];

function Feature({title, image, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <img className={styles.featureImg} src={image} alt={title} />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): React.ReactElement {
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
