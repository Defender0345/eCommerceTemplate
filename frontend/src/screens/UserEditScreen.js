import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Form, Button, Col, Row, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
// import FormContainer from '../components/FormContainer';
import { getUserDetails, updateUser } from '../actions/userActions';
import { listUsersOrders } from '../actions/orderActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import Meta from '../components/Meta';

const UserEditScreen = ({ match }) => {
   const userId = match.params.id;

   const [name, setName] = useState('');
   const [email, setEmail] = useState('');
   const [isAdmin, setIsAdmin] = useState(false);

   const dispatch = useDispatch();
   const history = useHistory();

   const userDetails = useSelector((state) => state.userDetails);
   const { loading, error, user } = userDetails;

   const orderListUsers = useSelector((state) => state.orderListUsers);
   const {
      loading: loadingOrders,
      error: errorOrders,
      orders,
   } = orderListUsers;

   const userUpdate = useSelector((state) => state.userUpdate);
   const {
      loading: loadingUpdate,
      error: errorUpdate,
      success: successUpdate,
   } = userUpdate;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   useEffect(() => {
      //  Check if logged in user is an admin
      if (userInfo && userInfo.isAdmin) {
         // Check if the user was updated successfully
         if (successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });
            history.push('/admin/userlist');
         } else {
            if (!user || user._id !== userId) {
               dispatch(getUserDetails(userId));
               dispatch(listUsersOrders(userId));
            } else {
               setName(user.name);
               setEmail(user.email);
               setIsAdmin(user.isAdmin);
            }
         }
      } else {
         history.push('/login');
      }
   }, [userId, dispatch, user, history, userInfo, successUpdate]);

   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updateUser({ _id: userId, name, email, isAdmin }));
   };

   return (
      <>
         <Meta title={`MyShop | Edit ${name}`} />
         <Link to='/admin/userlist' className='btn btn-light my-3'>
            Go Back
         </Link>
         <Row>
            <Col md={3}>
               <h1>Edit User</h1>
               {loadingUpdate && <Loader />}
               {errorUpdate && (
                  <Message variant='danger'>{errorUpdate}</Message>
               )}
               {loading ? (
                  <Loader />
               ) : error ? (
                  <Message variant='danger'>{error}</Message>
               ) : (
                  <Form onSubmit={submitHandler}>
                     <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                           type='name'
                           placeholder='Enter name'
                           value={name}
                           onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='email'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                           type='email'
                           placeholder='Enter email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                     </Form.Group>

                     <Form.Group controlId='isadmin' className='mt-3'>
                        <Form.Check
                           type='checkbox'
                           label='Is Admin'
                           checked={isAdmin}
                           onChange={(e) => setIsAdmin(e.target.checked)}
                        ></Form.Check>
                     </Form.Group>

                     <Button type='submit' variant='primary' className='my-3'>
                        Update
                     </Button>
                  </Form>
               )}
            </Col>
         </Row>
         <Col>
            <Row>
               <h2>{name}'s Orders</h2>
               {loadingOrders ? (
                  <Loader />
               ) : errorOrders ? (
                  <Message variant='danger'>{errorOrders}</Message>
               ) : (
                  <>
                     <Table
                        striped
                        bordered
                        hover
                        responsive
                        className='table-sm'
                     >
                        <thead>
                           <tr>
                              <th>ORDER ID</th>
                              <th>DATE</th>
                              <th>TOTAL</th>
                              <th>PAID</th>
                              <th>DELIVERED</th>
                              <th></th>
                           </tr>
                        </thead>
                        <tbody>
                           {orders.map((order) => (
                              <tr key={order._id}>
                                 <td>{order._id}</td>
                                 <td>{order.createdAt.substring(0, 10)}</td>
                                 <td>R{order.totalPrice}</td>
                                 <td>
                                    {order.isPaid ? (
                                       order.paidAt.substring(0, 10)
                                    ) : (
                                       <i
                                          className='fas fa-times'
                                          style={{ color: 'red' }}
                                       ></i>
                                    )}
                                 </td>
                                 <td>
                                    {order.isDelivered ? (
                                       order.deliveredAt.substring(0, 10)
                                    ) : (
                                       <i
                                          className='fas fa-times'
                                          style={{ color: 'red' }}
                                       ></i>
                                    )}
                                 </td>
                                 <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                       <Button
                                          variant='light'
                                          className='btn-sm'
                                       >
                                          Details
                                       </Button>
                                    </LinkContainer>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </>
               )}
            </Row>
         </Col>
      </>
   );
};

export default UserEditScreen;
