const { Diary } = require('../database/models');
const { Op } = require('sequelize');
const db = require('../database/models');

module.exports = {
  diaries: async (req, res) => {
    const user_id = req.decoded.id;
    try {
      const results = await Diary.findAll({
        attributes: ['id', 'date', 'title', 'text', 'imgurl'],
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
    const { date, title, text } = req.body;
    const user_id = req.decoded.id;
    try {
      await Diary.create({ date, title, text, user_id });
      res.json({
        success: true,
        code: 201,
        message: '일기가 성공적으로 작성되었습니다.',
      });
    } catch (err) {
      throw err;
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    const user_id = req.decoded.id;
    try {
      await Diary.destroy({ where: { id, user_id } });
      res.json({
        success: true,
        status: 200,
        message: '성공적으로 삭제되었습니다.',
      });
    } catch (err) {
      throw err;
    }
  },
};
