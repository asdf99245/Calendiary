const diaryService = require('../services/diary.service');
const diaryAttachService = require('../services/diary_attach.service');
const STATUS_CODE = require('../utils/statusCode');

module.exports = {
  diaries: async (req, res, next) => {
    const user = req.decoded.id;
    const { from, to } = req.query;
    try {
      const diaries = await diaryService.getDiariesBetweenDate(user, from, to);
      res.status(STATUS_CODE.OK).send(diaries);
    } catch (err) {
      next(err);
    }
  },
  diary: async (req, res, next) => {
    const { diary_date, diary_title, diary_text } = req.body;
    const diary_writer = req.decoded.id;
    try {
      const diary = await diaryService.createDiary({
        diary_date,
        diary_title,
        diary_text,
        diary_writer,
      });
      const diary_id = diary.diary_id;
      if (req.file) {
        await diaryAttachService.uploadImage(diary_id, req.file);
      }
      res.status(STATUS_CODE.CREATED).json({
        message: '일기가 성공적으로 작성되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  },
  delete: async (req, res, next) => {
    const id = req.params.id;
    const diary_writer = req.decoded.id;
    try {
      const file = await diaryAttachService.findOneByDiaryId(id);
      if (file) {
        await diaryAttachService.deleteImage(id, file);
      }
      await diaryService.deleteDiary({ diary_id: id, diary_writer });
      res.status(STATUS_CODE.OK).json({
        message: '성공적으로 삭제되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    const { diary_title, diary_text, isDeleteImg } = req.body;
    const id = req.params.id;
    const diary_writer = req.decoded.id;
    try {
      await diaryService.updateDiary(
        { diary_title, diary_text },
        { diary_id: id, diary_writer }
      );

      if (isDeleteImg) {
        const file = await diaryAttachService.findOneByDiaryId(id);
        if (file) {
          await diaryAttachService.deleteImage(id, file);
        }
      }

      if (req.file) {
        await diaryAttachService.deleteImage(id, req.file);
        await diaryAttachService.uploadImage(id, req.file);
      }
      res.status(STATUS_CODE.CREATED).json({
        message: '성공적으로 수정되었습니다.',
      });
    } catch (err) {
      next(err);
    }
  },
};
