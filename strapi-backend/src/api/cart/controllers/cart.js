'use strict';
const unparsed = require('koa-body/unparsed.js');
/**
 * A set of functions called "actions" for `cart`
 */

module.exports = {
  addToCart: async (ctx) => {
    const id = ctx.state.auth.credentials.id
    const productId = ctx.params.id
    var entity = await strapi.db.query('plugin::users-permissions.user').findOne({where:{id},populate:['cart']});
    entity.cart.push(productId)
    entity = await strapi.db.query('plugin::users-permissions.user').update({
      where:{id},
      data:{
        cart:entity.cart
      },
      populate:['cart']
    })
    return entity
  },
  getCart: async (ctx)=>{
    const id = ctx.state.auth.credentials.id
    const entity = await strapi.db.query('plugin::users-permissions.user').findOne({where:{id},populate:['cart']});
    return entity.cart 
  },
  deleteFromCart: async (ctx)=>{
    const id = ctx.state.auth.credentials.id
    const productId = ctx.params.id;
    var entity = await strapi.db.query('plugin::users-permissions.user').findOne({where:{id},populate:['cart']});
    entity.cart = entity.cart.filter(el=>el.id != productId)
    entity = await strapi.db.query('plugin::users-permissions.user').update({
      where:{id},
      data:{
        cart:entity.cart
      },
      populate:['cart']
    })
    return entity
  }
};
