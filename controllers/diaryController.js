const { Diary } = require('../database/models');
const { Op } = require('sequelize');
const db = require('../database/models');
const fs = require('fs');

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
      if (req.file) {
        const imgurl = req.file.path;
        await Diary.create({ date, title, imgurl, text, user_id });
      } else {
        await Diary.create({ date, title, text, user_id });
      }
      res.json({
        success: true,
        status: 201,
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
      const results = await Diary.findOne({
        attributes: ['imgurl'],
        where: {
          id,
          user_id,
        },
      });
      const imgurl = results.imgurl;
      if (fs.existsSync(imgurl)) {
        fs.unlinkSync(imgurl);
        console.log('Image deleted');
      }

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
