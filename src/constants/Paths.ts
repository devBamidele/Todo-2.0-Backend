/**
 * Express router paths go here.
 */


export default {

  Task: {
    Base: '/tasks',
    GetAll: '/all',
    Get: '/:id',
    Add: '/add',
    Update: '/update/:id',
    Delete: '/:id',
  },

  Auth: {
    Base: '/auth',
    Login: '/login',
    SignUp: '/register'
  }
} as const;