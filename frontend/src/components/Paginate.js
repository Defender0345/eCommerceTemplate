import React from 'react';
import { useLocation } from 'react-router-dom';
import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, page, isAdmin = false, keyword = '' }) => {
   const location = useLocation();
   const path = location.pathname;
   const baseURL =
      path.split('/page/')[0] === '/' ? '' : path.split('/page/')[0];

   return (
      pages > 1 && (
         <Pagination>
            {[...Array(pages).keys()].map((p) => (
               <LinkContainer
                  // key={x + 1}
                  // to={
                  //    !isAdmin
                  //    ? keyword
                  //    ? `/search/${keyword}/page/${x + 1}`
                  //       : `/page/${x + 1}`
                  //    : `/admin/productlist/${x + 1}`
                  // }
                  key={p}
                  to={`${baseURL}/page/${p + 1}`}
               >
                  <Pagination.Item active={p + 1 === page}>
                     {p + 1}
                  </Pagination.Item>
                  {/* <Pagination.Item active={x + 1 === page}>
                     {x + 1}
                  </Pagination.Item> */}
               </LinkContainer>
            ))}
         </Pagination>
      )
   );
};

export default Paginate;
