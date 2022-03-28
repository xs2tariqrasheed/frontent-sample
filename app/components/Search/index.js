import React, {useEffect, useState} from 'react';
import { Input, SearchContainer } from './styled';
import { BsSearch } from 'react-icons/bs';

const Search = (props) => {
    const [value, setValue] = useState('');

    return (
        <SearchContainer>
            <BsSearch style={{position: "absolute"}} className='ml-2 mt-3' color='#0c066a'/>
            <Input
                className={`${props.className} customInput`} 
                type='search' 
                placeholder='Search for a ProShop' 
                onChange={() => setValue(e.target.value)}
                style={{paddingLeft: '30px', fontWeight: '500'}}
            />
        </SearchContainer>
    )
}

export default Search;