import React from 'react';
import PropTypes from 'prop-types';
import Header from '../Header';
import Footer from '../Footer';
import { Container, Content } from './styled';

const Layout = props => (
  <Container>
    <Header large={props.large} />
    <Content>{props.children}</Content>
    <Footer />
  </Container>
);

Layout.propTypes = {
  children: PropTypes.any,
  large: PropTypes.bool,
};

export default Layout;
