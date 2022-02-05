const { sanitizeEntity } = require("strapi-utils");

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async find(ctx) {
    const { page } = ctx.params;
    const currentPage = parseInt(page);
    const [entity, total] = await Promise.all([
      strapi.services.article.find({
        _sort: "updatedAt:ASC",
        _start: (currentPage * 10).toString() || "1",
        _limit: "10",
      }),
      strapi.services.article.count(),
    ]);
    const countTotalPage = total === "0" ? 1 : Math.ceil(parseInt(total) / 10);
    const countPrevPage =
      currentPage === 1 ? "1" : (currentPage - 1).toString();
    const countNextPage =
      page === countTotalPage ? countTotalPage : (currentPage + 1).toString();
    return {
      prevPage: countPrevPage,
      currentPage: page,
      nextPage: countNextPage,
      totalPage: countTotalPage.toString(),
      total,
      data: sanitizeEntity(entity, { model: strapi.models.article }),
    };
  },

  async findOne(ctx) {
    const { slug } = ctx.params;

    const entity = await strapi.services.article.findOne({ slug });
    return sanitizeEntity(entity, { model: strapi.models.article });
  },
};
