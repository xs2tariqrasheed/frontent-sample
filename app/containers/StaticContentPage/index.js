/*
 * Privacy
 *
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Layout from '../Layout';
import { Wrapper, ItasContentWrapper } from './styled';

function StaticContentPage({ title, content }) {
  return (
    <Layout>
      <Helmet>
        <title>{title}</title>
        <meta
          name="Blocklete Games™ Terms of Service"
          content="Warner Media Terms of Service"
        />
      </Helmet>
      <Wrapper>
        <ItasContentWrapper>
          <div className="static-container" dangerouslySetInnerHTML={content} />
        </ItasContentWrapper>
      </Wrapper>
    </Layout>
  );
}

StaticContentPage.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.any.isRequired,
};

export default StaticContentPage;
