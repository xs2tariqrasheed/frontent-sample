import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import Pack from 'components/Pack';
import makeSelectPacksPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import Layout from '../Layout';
import { retrievePacks } from './actions';
import { Container } from './styled';

const PacksPage = props => {
  const {
    // loadingPacks,
    // packErrorText,
    packs,
  } = props.packsPage;
  const { onFetchPacks } = props;

  useInjectReducer({ key: 'packsPage', reducer });
  useInjectSaga({ key: 'packsPage', saga });

  useEffect(() => {
    onFetchPacks();
  }, []);

  return (
    <Layout>
      <Container>
        {packs && packs.map(pack => <Pack key={pack.id} pack={pack} />)}
      </Container>
    </Layout>
  );
};

PacksPage.propTypes = {
  packsPage: PropTypes.object,
  onFetchPacks: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  packsPage: makeSelectPacksPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onFetchPacks: () => {
      dispatch(retrievePacks());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(PacksPage);
