const { Diary, Diary_attach } = require('../database/models');
const { Op } = require('sequelize');
const fs = require('fs');
const s3 = require('../utils/s3');

module.exports = {
  diaries: async (req, res) => {
    const diary_writer = req.decoded.id;
    const { from, to } = req.query;
    try {
      const results = await Diary.findAll({
        include: {
          model: Diary_attach,
          attributes: ['file_path'],
        },
        attributes: ['diary_id', 'diary_date', 'diary_title', 'diary_text'],
        where: {
          diary_writer,
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
    const diary_writer = req.decoded.id;
    try {
      const result = await Diary.create({
        diary_date,
        diary_title,
        diary_text,
        diary_writer,
      });
      const diary_id = result.diary_id;
      if (req.file) {
        if (process.env.NODE_ENV === 'development') {
          const { originalname, filename, path, size } = req.file;
          await Diary_attach.create({
            file_name: filename,
            file_origin_name: originalname,
            file_path: `http://localhost:5000/${path}`,
            file_size: size,
            diary_id,
          });
        } else if (process.env.NODE_ENV === 'production') {
          const { originalname, key, location, size } = req.file;
          await Diary_attach.create({
            file_name: key,
            file_origin_name: originalname,
            file_path: location,
            file_size: size,
            diary_id,
          });
        }
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
    const diary_writer = req.decoded.id;
    try {
      const results = await Diary_attach.findOne({
        attributes: ['file_path', 'file_name'],
        where: {
          diary_id: id,
        },
      });
      if (results) {
        if (process.env.NODE_ENV === 'development') {
          const path = results.file_path.split('http://localhost:5000/')[1];
          if (fs.existsSync(path)) {
            fs.unlinkSync(path);
            console.log('Image deleted');
          }
        } else if (process.env.NODE_ENV === 'production') {
          s3.deleteObject(
            {
              Bucket: process.env.AWS_BUCKET_NAME,
              Key: results.file_name,
            },
            function (err, data) {
              if (err) throw err;
              else console.log(data);
            }
          );
        }
      }

      await Diary.destroy({ where: { diary_id: id, diary_writer } });
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
    const diary_writer = req.decoded.id;
    try {
      await Diary.update(
        { diary_title, diary_text },
        {
          where: { diary_id: id, diary_writer },
        }
      );

      if (isDeleteImg) {
        const results = await Diary_attach.findOne({
          attributes: ['file_path', 'file_name'],
          where: {
            diary_id: id,
          },
        });
        if (results) {
          if (process.env.NODE_ENV === 'development') {
            const path = results.file_path.split('http://localhost:5000/')[1];
            if (fs.existsSync(path)) {
              fs.unlinkSync(path);
              console.log('Image deleted');
            }
          } else if (process.env.NODE_ENV === 'production') {
            s3.deleteObject(
              {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: results.file_name,
              },
              function (err, data) {
                if (err) throw err;
                else console.log(data);
              }
            );
          }
          await Diary_attach.destroy({ where: { diary_id: id } });
        }
      }

      if (req.file) {
        const results = await Diary_attach.findOne({
          attributes: ['file_path', 'file_name'],
          where: {
            diary_id: id,
          },
        });
        if (results) {
          if (process.env.NODE_ENV === 'development') {
            const path = results.file_path.split('http://localhost:5000/')[1];
            if (fs.existsSync(path)) {
              fs.unlinkSync(path);
              console.log('Image deleted');
            }
          } else if (process.env.NODE_ENV === 'production') {
            s3.deleteObject(
              {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: results.file_name,
              },
              function (err, data) {
                if (err) throw err;
                else console.log(data);
              }
            );
          }
          await Diary_attach.destroy({ where: { diary_id: id } });
        }

        if (process.env.NODE_ENV === 'development') {
          const { originalname, filename, path, size } = req.file;
          await Diary_attach.create({
            file_name: filename,
            file_origin_name: originalname,
            file_path: `http://localhost:5000/${path}`,
            file_size: size,
            diary_id: id,
          });
        } else if (process.env.NODE_ENV === 'production') {
          const { originalname, key, location, size } = req.file;
          await Diary_attach.create({
            file_name: key,
            file_origin_name: originalname,
            file_path: location,
            file_size: size,
            diary_id: id,
          });
        }
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
