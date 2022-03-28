/*
 * FlowMigration
 *
 * This is the FlowMigration block on the front page.
 *
 */
import React from 'react';
import { Container } from './styled';

export default function LearnMore() {
  return (
    <Container className="text-white">
      <article className="maxWidth75 text-center mx-auto md:pb-8 md:py-20 xs:px-0">
        <div className="grid grid-flow-row xl:grid-cols-2 lg:grid-cols-1">
          <h1 className="text-6xl md:pt-60 font-black inline-block lg:col-start-1 xl:col-start-2">
            We are on the <br /> Flow Blockchain!
          </h1>
        </div>
        <div className="grid grid-flow-row xl:grid-cols-4 lg:grid-cols-1 md:mt-12 md:mb-40">
          <div className="text-center xl:col-start-3 lg:col-start-1">
            <p className="sm:mt-6 xs:mt-0 xs:mb-2 text-lg">New to the game?</p>
            <a className="button" href="/signup-us">
              <div className="inner-circle" />
              <div className="inner-shadow" />
              <p className="button-text">Create An Account</p>
            </a>
            <p className="xs:mt-4 text-sm">Create an account to buy golfers</p>
          </div>
          <div className="text-center">
            <p className="xs:mt-6 xs:mb-2 text-lg">Already have golfers?</p>
            <a className="button" href="/signinmigrate">
              <div className="inner-circle" />
              <div className="inner-shadow" />
              <p className="button-text">Migrate Golfers</p>
            </a>
            <p className="xs:my-4 text-sm">
              Sign in with your credentials, we'll take it from there
            </p>
          </div>
        </div>
        <div className="sm:grid grid-rows-2 grid-flow-col gap-4">
          <section className="row-span-2 md:row-span-2" />
        </div>
      </article>
    </Container>
  );
}
