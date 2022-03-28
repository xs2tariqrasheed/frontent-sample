import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pagination } from 'react-bootstrap';
import { RiOpenSourceFill } from 'react-icons/ri';
import { PaginationWrapper } from './styled';

const Paginate = ({
    itemsPerPage, 
    totalItems, 
    currentPage, 
    setCurrentPage, 
    pageNumberLimit,
    maxPageNumberLimit,
    setMaxPageNumberLimit,
    minPageNumberLimit,
    setMinPageNumberLimit
}) => {
    const pageNumbers = [];
    const last = Math.ceil(totalItems / itemsPerPage); 
    const isFirstRender = useRef(true);

    for(let i = 1; i <= last; i ++) {
        pageNumbers.push(i);
    }

    useEffect(() => {
        if(isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        if (currentPage + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
        }
        if((currentPage - 1) % pageNumberLimit == 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
        }
        
    }, [currentPage])

    return (
        <>
            <PaginationWrapper className='flex justify-center pt-10'>
                <Pagination className=''>
                    {pageNumbers &&
                        pageNumbers.map(n => {
                            let toReturn = [];
                            if(n === 1) {
                                toReturn.push (
                                    <Pagination.Prev
                                        key={"prevpage"} 
                                        onClick={
                                            currentPage === 1 
                                            ? () => {}
                                            : () => {
                                                setCurrentPage(currentPage - 1);
                                            }
                                        }
                                        disabled={currentPage === 1}
                                    />
                                )
                            }

                            if(minPageNumberLimit >= 1 && n === 2) {
                                toReturn.push(
                                    <Pagination.Ellipsis key={n} className='mx-2'/>
                                )
                            }
                            
                            if(n < maxPageNumberLimit + 1 && n > minPageNumberLimit) {
                                toReturn.push (
                                    <Pagination.Item 
                                        active={n === currentPage} 
                                        key={n}
                                        onClick={
                                            currentPage === n
                                            ? () => {}
                                            : () => {
                                                setCurrentPage(n);
                                            }
                                        }
                                        className='mx-2'
                                    >
                                        {n}
                                    </Pagination.Item> 
                                )
                            }

                            if(pageNumbers.length > maxPageNumberLimit && n === pageNumbers.length - 1) {
                                toReturn.push(
                                    <Pagination.Ellipsis key={n} className='mx-2'/>
                                )
                            }
    
                            if(n === pageNumbers.length) {
                                toReturn.push (
                                    <Pagination.Next 
                                        key={"nextpage"}
                                        onClick={
                                            currentPage === n
                                            ? () => {}
                                            : () => {
                                                setCurrentPage(currentPage + 1);
                                            }
                                        }
                                        disabled={currentPage === n}
                                    />
                                )
                            }
                            return toReturn;
                        })
                    }
                </Pagination>
            </PaginationWrapper>
    </>
  )
}

export default Paginate;