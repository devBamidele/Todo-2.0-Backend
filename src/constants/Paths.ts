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
    Delete: '/delete/:id',
    Load: '/load'
  },

  Auth: {
    Base: '/auth',
    Login: '/login',
    Validate: '/validate-token',
    SignUp: '/register',
    Refresh: '/refresh'
  }
} as const;