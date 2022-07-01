const { Diary, Diary_attach } = require('../database/models');
const { Op } = require('sequelize');
const db = require('../database/models');
const fs = require('fs');

module.exports = {
  diaries: async (req, res) => {
    const user_id = req.decoded.id;
    const { from, to } = req.query;
    try {
      const results = await Diary.findAll({
        include: {
          model: Diary_attach,
          attributes: ['file_path'],
        },
        attributes: ['diary_id', 'diary_date', 'diary_title', 'diary_text'],
        where: {
          user_id,
          diary_date: {
            [Op.between]: [from, to],
          },
        },
      });

      res.status(200).send(results);
    } catch (err) {
      throw err;
    }
  },
  diary: async (req, res) => {
    const { diary_date, diary_title, diary_text } = req.body;
    const user_id = req.decoded.id;
    try {
      const result = await Diary.create({
        diary_date,
        diary_title,
        diary_text,
        user_id,
      });
      const diary_id = result.diary_id;
      if (req.file) {
        const { originalname, filename, path, size } = req.file;
        await Diary_attach.create({
          file_name: filename,
          file_origin_name: originalname,
          file_path: path,
          file_size: size,
          diary_id,
        });
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
      const results = await Diary_attach.findOne({
        attributes: ['file_path'],
        where: {
          diary_id: id,
        },
      });
      if (results) {
        const path = results.file_path;
        if (fs.existsSync(path)) {
          fs.unlinkSync(path);
          console.log('Image deleted');
        }
      }

      await Diary.destroy({ where: { diary_id: id, user_id } });
      res.json({
        success: true,
        status: 200,
        message: '성공적으로 삭제되었습니다.',
      });
    } catch (err) {
      throw err;
    }
  },
  update: async (req, res) => {
    const { diary_title, diary_text, isDeleteImg } = req.body;
    const id = req.params.id;
    const user_id = req.decoded.id;
    try {
      await Diary.update(
        { diary_title, diary_text },
        {
          where: { diary_id: id, user_id },
        }
      );
      console.log(isDeleteImg);
      if (isDeleteImg) {
        await Diary_attach.destroy({ where: { diary_id: id } });
      }

      if (req.file) {
        const { originalname, filename, path, size } = req.file;
        await Diary_attach.destroy({ where: { diary_id: id } });
        await Diary_attach.create({
          file_name: filename,
          file_origin_name: originalname,
          file_path: path,
          file_size: size,
          diary_id: id,
        });
      }
      res.json({
        success: true,
        status: 201,
        message: '성공적으로 수정되었습니다.',
      });
    } catch (err) {
      throw err;
    }
  },
};
