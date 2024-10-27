module.exports = {
  routes: [
    {
     method: 'POST',
     path: '/cart/:id',
     handler: 'cart.addToCart',
     config: {
       policies: [],
       middlewares: [],
     },
    },
    {
      method: 'GET',
      path: '/cart',
      handler: 'cart.getCart',
      config: {
        policies: [],
        middlewares: [],
      },
     },
     {
      method: 'DELETE',
      path: '/cart/:id',
      handler: 'cart.deleteFromCart',
      config: {
        policies: [],
        middlewares: [],
      },
     },
  ],
};
