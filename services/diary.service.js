const diaryRepository = require('../repositories/diary.repository');

module.exports = {
  getDiariesBetweenDate: async function (user, from, to) {
    return await diaryRepository.getDiariesBetweenDate(user, from, to);
  },
  createDiary: async function (data) {
    const diary = await diaryRepository.createOne(data);

    return diary;
  },
  deleteDiary: async function (filter) {
    await diaryRepository.deleteOneByFilter(filter);
  },
  updateDiary: async function (value, filter) {
    await diaryRepository.updateOneByFilter(value, filter);
  },
};
