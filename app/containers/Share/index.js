/*
 * Share
 *
 * Share golfer purchase with social networks
 *
 */
import React from 'react';
import { Helmet } from 'react-helmet';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  RedditShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  TelegramIcon,
  WhatsappIcon,
  LinkedinIcon,
  RedditIcon,
  EmailIcon,
} from 'react-share';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ClubCard from 'components/Golfers/ClubCard';
import Layout from '../Layout';
import { Container, TagLine, TextBlock, ShareFlexView } from './styled';

const quoteText = 'I just purchased a Founder Golfer in Blocklete Games™!';

const Share = props => (
  <Layout>
    <Helmet>
      <title>Share Golfer Purchase</title>
      <meta
        name="Blocklete Games™ Share Golfer Purchase"
        content="Share golfer purchase with social networks."
      />
    </Helmet>
    <Container>
      <TextBlock>
        <TagLine style={{ marginTop: '50px' }}>Thanks for purchasing!</TagLine>
        <TagLine style={{ marginTop: '20px' }}>
          Show off your golfer to your favorite social networks!
        </TagLine>
      </TextBlock>

      <ShareFlexView>
        <div>{props.golfer && <ClubCard golfer={props.golfer} />}</div>

        <FacebookShareButton
          url="https://www.blockletegames.com"
          quote={quoteText}
          style={{ cursor: 'pointer' }}
        >
          <FacebookIcon size={60} round={false} />
        </FacebookShareButton>

        <TwitterShareButton
          url="https://www.blockletegames.com"
          title={quoteText}
          style={{ cursor: 'pointer' }}
        >
          <TwitterIcon size={60} round={false} />
        </TwitterShareButton>

        <TelegramShareButton
          url="https://www.blockletegames.com"
          title={quoteText}
          style={{ cursor: 'pointer' }}
        >
          <TelegramIcon size={60} round={false} />
        </TelegramShareButton>

        <WhatsappShareButton
          url="https://www.blockletegames.com"
          title={quoteText}
          style={{ cursor: 'pointer' }}
        >
          <WhatsappIcon size={60} round={false} />
        </WhatsappShareButton>

        <LinkedinShareButton
          url="https://www.blockletegames.com"
          title={quoteText}
          style={{ cursor: 'pointer' }}
        >
          <LinkedinIcon size={60} round={false} />
        </LinkedinShareButton>

        <RedditShareButton
          url="https://www.blockletegames.com"
          title={quoteText}
          style={{ cursor: 'pointer' }}
        >
          <RedditIcon size={60} round={false} />
        </RedditShareButton>

        <EmailShareButton
          url="https://www.blockletegames.com"
          subject={quoteText}
          style={{ cursor: 'pointer' }}
        >
          <EmailIcon size={60} round={false} />
        </EmailShareButton>
      </ShareFlexView>
    </Container>
  </Layout>
);

Share.propTypes = {
  golfer: PropTypes.object,
};

function mapStateToProps(store, props) {
  const theGolfer = store.availableGolfers.availableGolfers.find(
    golfer => +golfer.tokenid === +props.match.params.id,
  );

  return {
    golfer: theGolfer,
  };
}

export default connect(mapStateToProps)(Share);
