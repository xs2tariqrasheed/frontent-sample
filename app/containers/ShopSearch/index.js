import React, { useEffect, useState } from 'react';
import Layout from '../Layout';
import { Wrapper, InnerWrapper } from './styled';
import logo from '../../images/proshop-header.png';
import Search from '../../components/Search';
import Featured from './Featured';
import Available from './Available';

const ShopSearch = () => {
    function getWindowDimensions() {
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height,
        };
      }
    
      function useWindowDimensions() {
        const [windowDimensions, setWindowDimensions] = useState(
          getWindowDimensions(),
        );
    
        useEffect(() => {
          function handleResize() {
            setWindowDimensions(getWindowDimensions());
          }
    
          window.addEventListener('resize', handleResize);
          return () => window.removeEventListener('resize', handleResize);
        }, []);
    
        return windowDimensions;
      }
      const { height, width } = useWindowDimensions();

    return (
        <Wrapper>
            <Layout>
                <InnerWrapper>
                    <div className='flex justify-center pt-20 w-full'>
                        <div className='flex-col mx-auto text-center xs:w-3/4 lg:w-1/3'>
                            <img className='mx-auto' src={logo}/>
                            <Search className='mx-auto mt-3 w-full rounded-2xl p-0.5 py-1'/>
                        </div>
                    </div>
                    <div className='inner-container mx-auto'>
                        <Featured width={width}/>
                        {width > 1024 && (<Available width={width}/>)}
                    </div>
                    {width < 1024 && (<Available width={width}/>)}
                </InnerWrapper>
            </Layout>
        </Wrapper>
    )
}

export default ShopSearch;
