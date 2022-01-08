const { sanitizeEntity } = require("strapi-utils");

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve a record.
   *
   * @return {Object}
   */

  async findAll() {
    const { contact, homepage, project, skill } = strapi.models;

    const contactEntity = await strapi.services.contact.find();
    const homepageEntity = await strapi.services.homepage.find();
    const projectEntity = await strapi.services.project.find();
    const skillEntity = await strapi.services.skill.find();
    const res = {
      homepage: sanitizeEntity(homepageEntity, { model: homepage }),
      contact: sanitizeEntity(contactEntity, { model: contact }),
      project: sanitizeEntity(projectEntity, { model: project }),
      skill: sanitizeEntity(skillEntity, { model: skill }),
    };
    return res;
  },
};
