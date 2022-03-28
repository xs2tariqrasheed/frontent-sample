import React from 'react';
import profilePlaceholder from '../../images/exampleProfileImg.png';
import { ViewShop } from '../FeaturedShopCard/styled';
import { AiOutlineRight } from 'react-icons/ai';

const AvailableShopCard = (props) => {
    let oddRow = props.shop.id % 2 !== 0;
    return (
        <div className='xs:mx-0 lg:mx-3 flex justify-between xs:p-3  items-center' style={props.width < 1024 && oddRow === true ? {backgroundColor: '#1e197c'} : {}}>
            <div className='flex xs:justify-left lg:justify-between'>
                <img src={profilePlaceholder} className='xs:w-10 xs:h-10 lg:w-20 lg:h-16 xs:mr-1 lg:mr-3 xs:mt-auto lg:mt-0'/>
                <div className='flex-col my-auto'>
                    <p className='text-white font-black xs:text-xl lg:text-lg m-0'>{props.shop.title}</p>
                    <p className='xs:text-xs lg:text-sm xs:whitespace-nowrap text-light-grey font-light text-center m-0'>{`Created ${props.shop.date}`}</p>
                </div>
            </div>
            <div className='justify-between w-1/2 xs:hidden lg:flex'>
                <div className='flex-col border-r-2 border-ps-lavender w-1/4 text-center'>
                    <p className='text-white font-light xs:text-lg lg:text-2xl m-0 text-center'>{props.shop.members}</p>
                    <p className='text-ps-lavender tracking-wider xs:font-medium lg:font-semibold m-0 xs:text-sm lg:text-md text-center'>MEMBERS</p>
                </div>
                <div className='flex-col border-r-2 border-ps-lavender w-1/4 text-center'>
                    <p className='text-white font-light xs:text-lg lg:text-2xl m-0 text-center'>{props.shop.revShare}</p>
                    <p className='text-green-400 tracking-wider xs:font-medium lg:font-semibold m-0 xs:text-sm lg:text-md text-center'>REV SHARE</p>
                </div>
                <div className='flex-col border-r-2 border-ps-lavender w-1/4 text-center'>
                    <p className='text-white font-light xs:text-lg lg:text-2xl m-0 text-center'>{props.shop.medals}</p>
                    <p className='text-dark-orange tracking-wider xs:font-medium lg:font-semibold m-0 xs:text-sm lg:text-md text-center'>MEDALS</p>
                </div>
                <div className='flex-col w-1/4 text-center'>
                    <p className='text-white font-light xs:text-lg lg:text-2xl m-0 text-center'>{props.shop.sales}</p>
                    <p className='text-dark-fuschia tracking-wider xs:font-medium lg:font-semibold m-0 xs:text-sm lg:text-md text-center'>TOTAL SALES</p>
                </div>
            </div>
            <div className='flex-col xs:block lg:hidden'>
                <div className='flex justify-center items-center mb-auto'>
                    <p className='text-white font-light text-sm mx-1 mb-0'>{props.shop.members}</p>
                    <p className='text-ps-lavender text-sm m-0 font-light'>Members</p>
                </div>
                <div className='flex justify-center items-center mt-auto'>
                    <p className='text-white font-light text-sm mx-1 mb-0'>{props.shop.revShare}</p>
                    <p className='text-green-400 text-sm m-0 text-center font-light'>Rev Share</p>
                </div>
            </div>
            <ViewShop  className='xs:hidden lg:block font-black text-center xs:text-xs lg:text-lg rounded-3xl w-1/6 xs:py-1 lg:py-1'>View Shop</ViewShop>
            <AiOutlineRight className='xs:block lg:hidden text-white'/>
        </div>
    )
}

export default AvailableShopCard;