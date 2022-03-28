import React from 'react';

const GearStyle = props => {
  return (
    <div className={`flex ${props.gearCard ? 'w-11/12' : 'w-full mb-3'}`}>
      <div
        className={`
                    w-1/2 
                    ${props.gearCard ? 'mr-0.5' : 'mx-0.5'}
                    border-2 
                    border-green-500 
                    rounded-2xl 
                    text-green-500 
                    font-black
                    text-xs
                    my-auto
                    text-center
                `}
      >
        {props.style}
      </div>
      {/* <div 
                className={`
                w-1/3 
                mx-0.5 
                border-2 
                border-green-500 
                rounded-2xl 
                text-green-500 
                font-black
                text-xs
                my-auto
                text-center
            `}
            >
                {props.descriptors.classTwo}
            </div>
            <div 
                className={`
                w-1/3 
                mx-0.5 
                border-2 
                border-green-500 
                rounded-2xl 
                text-green-500 
                font-black
                text-xs
                my-auto
                text-center
            `}
            >
                {props.descriptors.classThree}
            </div> */}
    </div>
  );
};

export default GearStyle;
