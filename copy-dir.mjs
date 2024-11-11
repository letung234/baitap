import fs from 'fs-extra';

const listFolderCopy = [{
    sourceDirectory: 'src/views',
    targetDirectory: 'dist/views'
  },
  {
    sourceDirectory: 'src/public',
    targetDirectory: 'dist/public'
  }
];

listFolderCopy.forEach((item) => {
  fs.copy(item.sourceDirectory, item.targetDirectory)
    .then(() => {
      console.log(`Sao chép thành công thư mục ${item.sourceDirectory} vào ${item.targetDirectory}`);
    })
    .catch((err) => {
      console.error(`Lỗi sao chép thư mục ${item.sourceDirectory}:`, err);
    });
});
