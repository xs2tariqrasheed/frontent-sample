/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import Layout from '../Layout';
import { MainContainer, Headline, Subheadline } from './styled';
import shipMobile from './shipMobile.svg';

export default function NotFound() {
  return (
    <Layout large>
      <MainContainer className="bg-green-golf-green">
        <div className="md:container flex flex-col justify-between md:block mx-auto pt-10 md:px-32 text-white">
          <Headline>404</Headline>
          <Subheadline>Oops! Page not found.</Subheadline>
          <img
            className="md:hidden mt-10 block mx-auto"
            src={shipMobile}
            alt="ufo"
          />
        </div>
      </MainContainer>
    </Layout>
  );
}
