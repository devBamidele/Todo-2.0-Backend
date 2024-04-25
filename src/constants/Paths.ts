/**
 * Express router paths go here.
 */


export default {

  Task: {
    Base: '/tasks',
    GetAll: '/',
    Get: '/:id',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/tasks/:id',
  },

  Auth: {
    Base: '/auth',
    Login: '/login',
    SignUp: '/register'
  }
} as const;