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

    const [contactEntity, homepageEntity, projectEntity, skillEntity] =
      await Promise.all([
        strapi.services.contact.find(),
        strapi.services.homepage.find(),
        strapi.services.project.find(),
        strapi.services.skill.find(),
      ]);
    const res = {
      homepage: sanitizeEntity(homepageEntity, { model: homepage }),
      contacts: sanitizeEntity(contactEntity, { model: contact }),
      projects: sanitizeEntity(projectEntity, { model: project }),
      skills: sanitizeEntity(skillEntity, { model: skill }),
    };
    return res;
  },
};
