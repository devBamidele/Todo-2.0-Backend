/**
 * Express router paths go here.
 */


export default {

  Task: {
    Base: '/tasks',
    GetAll: '/all',
    Get: '/:id',
    Add: '/add',
    Update: '/update',
    Delete: '/:id',
  },

  Auth: {
    Base: '/auth',
    Login: '/login',
    SignUp: '/register',
    refresh: '/refresh'
  }
} as const;