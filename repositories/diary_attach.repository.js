const { Diary_attach } = require('../database/models');

module.exports = {
  createOne: async function (diary_id, file) {
    if (process.env.NODE_ENV === 'production') {
      await Diary_attach.create({
        file_name: file.key,
        file_origin_name: file.originalname,
        file_path: file.location,
        file_size: file.size,
        diary_id,
      });
    } else if (process.env.NODE_ENV === 'development') {
      await Diary_attach.create({
        file_name: file.filename,
        file_origin_name: file.originalname,
        file_path: `${process.env.SERVER_URL}/${file.path}`,
        file_size: file.size,
        diary_id,
      });
    }
  },
  findOneByFilter: async function (filter) {
    return await Diary_attach.findOne({
      where: filter,
    });
  },
  deleteOneByFilter: async function (filter) {
    await Diary_attach.destroy({ where: filter });
  },
};
