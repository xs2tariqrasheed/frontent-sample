/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, {useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import Layout from '../Layout';
import FlowMigration from './FlowMigration';
import PostLaunch from './PostLaunch';
// import Hero from './HeroBlock';
// import LearnMore from './LearnMore';
// import NewsletterSection from '../NewsletterSection';

const HomePage = () =>  {
  const [pageView, setPageView] = useState(false)

  useEffect(() => {
    if(pageView === false) {
      window.dataLayer.push({
        event: 'page view',
        page_name: 'home',
        section: 'home'
      })
      setPageView(true)
      console.log(window.dataLayer)
    }
  }, [])
  
  return (
    <Layout large>
      <Helmet>
        <title>Homepage</title>
        <meta name="Blocklete Games™" content="Blocklete Games™" />
      </Helmet>
      <PostLaunch />
      {/* <FlowMigration /> */}
      {/* <Hero />
      <LearnMore />
      <NewsletterSection /> */}
    </Layout>
  )
}
  
;

export default HomePage;
