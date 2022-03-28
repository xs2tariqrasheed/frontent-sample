/*
 * Privacy
 *
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../Layout';
import { Wrapper, ItasContentWrapper } from './styled';

const __html = require('./ItasPrivacePolicy.html'); // eslint-disable-line
const privacyDoc = { __html }; // eslint-disable-line

export default function Privacy() {
  return (
    <Layout>
      <Helmet>
        <title>Privacy Statement</title>
        <meta
          name="Blocklete Games™ Privacy Statement"
          content="Warner Media Privacy Statement"
        />
      </Helmet>
      <Wrapper>
        <ItasContentWrapper>
          <div dangerouslySetInnerHTML={privacyDoc} />
        </ItasContentWrapper>
      </Wrapper>
    </Layout>
  );
}
