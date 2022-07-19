import bcrypt from 'bcryptjs';

const users = [
   {
      name: 'Admin',
      email: 'admin@example.com',
      password: bcrypt.hashSync('123456', 10),
      isAdmin: true,
   },
   {
      name: 'Dylan',
      email: 'dylan@example.com',
      password: bcrypt.hashSync('123456', 10),
   },
   {
      name: 'Novak',
      email: 'novak@example.com',
      password: bcrypt.hashSync('123456', 10),
   },
   {
      name: 'Stark',
      email: 'stark@example.com',
      password: bcrypt.hashSync('123456', 10),
   },
   {
      name: 'Francois',
      email: 'francois@example.com',
      password: bcrypt.hashSync('123456', 10),
   },
];

export default users;
