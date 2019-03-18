'use strict';

/**
 * Realty.js controller
 *
 * @description: A set of functions called "actions" for managing `Realty`.
 */

module.exports = {

  /**
   * Retrieve realty records.
   *
   * @return {Object|Array}
   */

  find: async (ctx) => {
    if (ctx.query._q) {
      return strapi.services.realty.search(ctx.query);
    } else {
      return strapi.services.realty.fetchAll(ctx.query);
    }
  },

  /**
   * Retrieve a realty record.
   *
   * @return {Object}
   */

  findOne: async (ctx) => {
    return strapi.services.realty.fetch(ctx.params);
  },

  /**
   * Count realty records.
   *
   * @return {Number}
   */

  count: async (ctx) => {
    return strapi.services.realty.count(ctx.query);
  },

  /**
   * Create a/an realty record.
   *
   * @return {Object}
   */

  create: async (ctx) => {
    return strapi.services.realty.add(ctx.request.body);
  },

  /**
   * Update a/an realty record.
   *
   * @return {Object}
   */

  update: async (ctx, next) => {
    return strapi.services.realty.edit(ctx.params, ctx.request.body) ;
  },

  /**
   * Destroy a/an realty record.
   *
   * @return {Object}
   */

  destroy: async (ctx, next) => {
    return strapi.services.realty.remove(ctx.params);
  }
};
