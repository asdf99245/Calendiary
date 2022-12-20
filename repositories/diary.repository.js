const { Diary, Diary_attach } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
  getDiariesBetweenDate: async function (user, from, to) {
    const diaries = await Diary.findAll({
      include: {
        model: Diary_attach,
        attributes: ['file_path'],
      },
      attributes: ['diary_id', 'diary_date', 'diary_title', 'diary_text'],
      where: {
        diary_writer: user,
        diary_date: {
          [Op.between]: [from, to],
        },
      },
    });

    return diaries;
  },
  createOne: async function (data) {
    return await Diary.create(data);
  },
  deleteOneByFilter: async function (filter) {
    await Diary.destroy({ where: filter });
  },
  updateOneByFilter: async function (value, filter) {
    await Diary.update(value, { where: filter });
  },
};
