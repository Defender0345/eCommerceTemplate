import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { deleteOrder, listOrders } from '../actions/orderActions';
import Meta from '../components/Meta';

const OrderListScreen = ({ match }) => {
   const pageNumber = match.params.pageNumber || 1;

   const dispatch = useDispatch();
   const history = useHistory();

   const orderList = useSelector((state) => state.orderList);
   const { loading, error, orders, page, pages } = orderList;

   const orderDelete = useSelector((state) => state.orderDelete);
   const { loading: loadingDelete, error: errorDelete } = orderDelete;

   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;

   useEffect(() => {
      if (!userInfo && !userInfo.isAdmin) {
         history.push('/login');
      } else {
         dispatch(listOrders('', pageNumber));
      }
   }, [dispatch, history, userInfo, pageNumber]);

   const deleteHandler = (id) => {
      if (window.confirm('Are you sure')) {
         dispatch(deleteOrder(id));
         dispatch(listOrders('', pageNumber));
      }
   };

   return (
      <>
         <Meta title='MyShop | Orders List' />
         <h1>Orders</h1>
         {loadingDelete && <Loader />}
         {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
         {loading ? (
            <Loader />
         ) : error ? (
            <Message variant='danger'>{error}</Message>
         ) : (
            <>
               <Table striped bordered hover responsive className='table-sm'>
                  <thead>
                     <tr>
                        <th>ID</th>
                        <th>USER</th>
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
                           <td>{order.user && order.user.name}</td>
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
                                 <Button variant='light' className='btn-sm'>
                                    Details
                                 </Button>
                              </LinkContainer>
                              <Button
                                 variant='danger'
                                 className='btn-sm'
                                 onClick={() => deleteHandler(order._id)}
                              >
                                 <i className='fas fa-trash'></i>
                              </Button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </Table>
               <Paginate pages={pages} page={page} isAdmin={true} />
            </>
         )}
      </>
   );
};

export default OrderListScreen;
