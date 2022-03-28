import React from 'react';
import { FormattedMessage } from 'react-intl';
const roadmapDesktop = 'https://www.blockletegames.com/images/RoadmapDesktop.png';
const roadmapMobile = 'https://www.blockletegames.com/images/RoadmapMobile.png';
import { Container } from './styled';
import messages from './messages';

export default function Roadmap() {
  return (
    <Container>
      <section className="container mx-auto px-5 pt-12 pb-24">
        <FormattedMessage {...messages.sectionTitle}>
          {txt => (
            <h1 className="w-64 text-blueberry callout-underline mb-12 text-4xl tracking-wide font-heavy uppercase">
              {txt}
            </h1>
          )}
        </FormattedMessage>
        <img
          className="sm:hidden w-full"
          src={roadmapMobile}
          alt="Golfer Marketplace on sale now!"
        />
        <img
          className="hidden sm:block"
          src={roadmapDesktop}
          alt="Golfer Marketplace on sale now!"
        />
      </section>
    </Container>
  );
}
