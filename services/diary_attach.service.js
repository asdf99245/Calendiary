const diaryAttachRepository = require('../repositories/diary_attach.repository');
const s3 = require('../utils/s3');
const fs = require('fs');

module.exports = {
  uploadImage: async function (diary_id, file) {
    await diaryAttachRepository.createOne(diary_id, file);
  },
  uploadImages: async function (diary_id, files) {
    await diaryAttachRepository.createMany(diary_id, files);
  },
  findOneByDiaryId: async function (diary_id) {
    return await diaryAttachRepository.findOneByFilter({ diary_id });
  },
  deleteImage: async function (diary_id, file) {
    if (process.env.NODE_ENV === 'development') {
      const path = file.file_path.split(process.env.SERVER_URL)[1];
      if (fs.existsSync(path)) {
        fs.unlinkSync(path);
      }
    } else if (process.env.NODE_ENV === 'production') {
      s3.deleteObject(
        {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: file.file_name,
        },
        function (err, data) {
          if (err) throw err;
          else console.log(data);
        }
      );
    }

    await diaryAttachRepository.deleteOneByFilter({ diary_id });
  },
};
