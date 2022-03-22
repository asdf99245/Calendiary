const { Diary } = require('../database/models');
const { Op } = require('sequelize');

module.exports = {
  diaries: async (req, res) => {
    const user_id = req.decoded.id;
    try {
      const results = await Diary.findAll({
        where: {
          user_id,
        },
      });
      res.status(200).send(results);
    } catch (err) {
      throw err;
    }
  },
  diary: async (req, res) => {
    const { date, text } = req.body;
    const user_id = req.decoded.id;
    try {
      await Diary.create({ date, text, user_id });
      res.json({
        success: true,
        code: 201,
        message: '일기가 성공적으로 작성되었습니다.',
      });
    } catch (err) {
      throw err;
    }
  },
};
