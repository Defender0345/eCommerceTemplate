import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const SearchBox = () => {
   const history = useHistory();
   const [keyword, setKeyword] = useState('');

   const submitHandler = (e) => {
      e.preventDefault();
      if (keyword.trim()) {
         history.push(`/search/${keyword}`);
      } else {
         history.push('/');
      }
   };

   return (
      <Form onSubmit={submitHandler} className='d-flex'>
         <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search...'
         ></Form.Control>
         <Button type='submit' variant='outline-success' className='p-2 mx-2'>
            Search
         </Button>
      </Form>
   );
};

export default SearchBox;
