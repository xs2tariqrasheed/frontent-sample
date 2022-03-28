/*
 * About
 *
 * This is the About block on the front page.
 *
 */
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Container } from './styled';
import NewsCard from '../../../components/NewsCard';
import messages from './messages';
const founders = 'https://www.blockletegames.com/images/founders.png';
const article1 = 'https://www.blockletegames.com/images/article1.png';
const deep = 'https://www.blockletegames.com/images/deep-dive.png';

export default function News() {
  return (
    <Container>
      <section className="container mx-auto px-5 pt-12 pb-24">
        <FormattedMessage {...messages.sectionTitle}>
          {txt => (
            <h1 className="text-blueberry callout-underline mb-12 text-4xl tracking-wide font-heavy uppercase">
              {txt}
            </h1>
          )}
        </FormattedMessage>
        <div className="sm:grid grid-cols-3 grid-flow-col gap-6">
          <NewsCard
            picture={article1}
            link="https://nonfungible.com/blog/arena-golf-how-to-choose-your-golfers"
            label={messages.updates.oneLabel}
            title={messages.updates.oneTitle}
            message={messages.updates.oneMessage}
          />
          <NewsCard
            picture={deep}
            link="https://medium.com/in-the-arena-sports/a-deep-dive-into-the-world-of-arena-golf-36d3282df48a"
            label={messages.updates.twoLabel}
            title={messages.updates.twoTitle}
            message={messages.updates.twoMessage}
          />
          <NewsCard
            picture={founders}
            link="https://medium.com/in-the-arena-sports/arena-golfs-first-tournament-announcement-cc67e14e42bb"
            label={messages.updates.threeLabel}
            title={messages.updates.threeTitle}
            message={messages.updates.threeMessage}
          />
        </div>
      </section>
    </Container>
  );
}
