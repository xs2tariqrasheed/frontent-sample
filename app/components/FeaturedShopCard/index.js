import React from 'react';
import { Container, ViewShop } from './styled';
import headerImg from '../../images/featuredCard.png';

const FeaturedShopCard = (props) => {
    return (

        <Container className='xs:w-40 lg:w-1/4 lg:mx-3 xs:my-1 lg:my-0 lg:px-0 border-2 border-ps-lavender flex-col relative rounded-xl'>
        <img src={headerImg} className='rounded-tl-xl rounded-tr-xl w-full'/>
        <div className='pt-3 flex-col mx-auto w-full items-center'>
            <p className='xs:text-lg lg:text-2xl text-white font-semibold text-center m-0'>{props.shop.title}</p>
            <p className='xs:text-xs lg:text-sm text-light-grey font-light text-center m-0'>{`Created ${props.shop.createdDate}`}</p>
            <div className='flex w-full mt-3'>
                <div className='flex-col border-r-2 border-ps-lavender w-1/2 text-center'>
                    <p className='text-white font-light xs:text-lg m-0 text-center'>{props.shop.members}</p>
                    <p className='text-ps-lavender xs:font-medium lg:font-bold m-0 xs:text-sm lg:text-md text-center'>MEMBERS</p>
                </div>
                <div className='flex-col w-1/2 text-center ml-1 whitespace-nowrap'>
                    <p className='text-white font-light xs:text-lg m-0 text-center'>{props.shop.revShare}</p>
                    <p className='text-green-400 xs:font-medium lg:font-bold m-0 xs:text-sm lg:text-md text-center'>REV SHARE</p>
                </div>
            </div>
            <div className='w-full flex justify-center mt-3 mb-3'>
                <ViewShop className='font-black text-center xs:text-xs lg:text-md rounded-3xl w-4/5 xs:py-1 lg:py-2'>View Shop</ViewShop>
            </div>
        </div>
        </Container>     
    )
}

export default FeaturedShopCard;