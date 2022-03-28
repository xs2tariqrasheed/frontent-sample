import styled from 'styled-components';

export const PaginationWrapper = styled.div`
  .page-item:first-child .page-link {
    border-radius: 5px;
  }
  .page-item:last-child .page-link {
    border-radius: 5px;
  }
  .page-link {
    border-radius: 5px;
    border: 2px solid #d8d8d8;
    color: #7b7b7b;
  }
  .page-item.active .page-link {
    background-color: #3a338f;
    border-color: #3a338f;
    color: white;
  }
  margin: 0 auto 0 auto;
  
`