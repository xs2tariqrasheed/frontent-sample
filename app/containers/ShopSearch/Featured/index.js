import React, {useEffect, useState} from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import FeaturedShopCard from '../../../components/FeaturedShopCard';

const Featured = (props) => {
    const placeholderData = [
        {
            title: 'TheShaqShop',
            createdDate: 'Aug 8, 2021',
            members: 30,
            revShare: '0.1%',
        },
        {
            title: 'TheAmandaShop',
            createdDate: 'June 8, 2020',
            members: 20,
            revShare: '0.23%',
        },
        {
            title: 'TheDavidShop',
            createdDate: 'Jan 19, 2019',
            members: 10,
            revShare: '0.14%',
        },
        {
            title: 'TheJoeShop',
            createdDate: 'Feb 23, 2018',
            members: 100,
            revShare: '0.2%',
        }
    ]
    return (
        <div className='w-full pt-5 pb-5'>
            <div className='w-full flex justify-between lg:mx-3'>
                {props.width < 1024 ? (
                    <h2 className='text-white font-black text-2xl'>Featured Shops</h2>
                ) : (
                    <h3 className='text-white font-black'>Featured ProShops</h3>
                )}
                <div className='flex items-center'>
                    <p className='text-white m-0 xs:font-thin md:font-normal'>View All</p>
                    <AiOutlineRight className='text-white m-1 font-bold'/>
                </div>
            </div>
            <div className='mt-3 w-full xs:flex lg:flex justify-between xs:flex-wrap lg:flex-nowrap'>
                {placeholderData.map((shop) => (
                    <FeaturedShopCard shop={shop}/>
                ))}
            </div>
        </div>
    )
}

export default Featured;

