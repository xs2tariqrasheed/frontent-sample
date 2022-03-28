import React, {useEffect, useState} from 'react';
import { AiOutlineRight } from 'react-icons/ai';
import { Container } from './styled';
import AvailableShopCard from '../../../components/AvailableShopCard/index';

const Available = (props) => {
    const placeholderData = [
        {
            title: 'shopname',
            date: 'Aug 8, 2021',
            members: '30',
            revShare: '0.1%',
            medals: '3750',
            sales: '388',
            id: 1
        },
        {
            title: 'shopname',
            date: 'Aug 8, 2021',
            members: '30',
            revShare: '0.1%',
            medals: '3750',
            sales: '388',
            id: 2
        },
        {
            title: 'shopname',
            date: 'Aug 8, 2021',
            members: '30',
            revShare: '0.1%',
            medals: '3750',
            sales: '388',
            id: 3
        },
        {
            title: 'shopname',
            date: 'Aug 8, 2021',
            members: '30',
            revShare: '0.1%',
            medals: '3750',
            sales: '388',
            id: 4
        },
        {
            title: 'shopname',
            date: 'Aug 8, 2021',
            members: '30',
            revShare: '0.1%',
            medals: '3750',
            sales: '388',
            id: 5
        },
        {
            title: 'shopname',
            date: 'Aug 8, 2021',
            members: '30',
            revShare: '0.1%',
            medals: '3750',
            sales: '388',
            id: 6
        }
    ]

    return (
        <div className='w-full xs:pb-10 lg:pb-40'>
            <div className='w-full flex justify-between'>
                {props.width < 1024 ? (
                        <h3 className='text-white font-black'>Available Shops</h3>
                    ) : (
                        <h3 className='text-white font-black'>Available ProShops</h3>
                )}
                <div className='flex items-center'>
                    <p className='text-white m-0 xs:font-light md:font-normal'>View All</p>
                    <AiOutlineRight className='text-white m-1 font-bold'/>
                </div>
            </div>
            <Container className='w-full lg:border-2 lg:border-ps-lavender lg:rounded-xl xs:flex-col lg:flex-col justify-between xs:flex-wrap lg:flex-nowrap' backgroundColor={props.width > 1024 ? '#282287' : '#0c0669'}>
                {placeholderData.map((shop) => (
                    <>
                        <AvailableShopCard shop={shop} width={props.width}/>
                        {props.width > 1024 && (<hr className='bg-ps-lavender mx-3 '/>)}
                    </>
                ))}
            </Container>
        </div>
    )
}

export default Available;