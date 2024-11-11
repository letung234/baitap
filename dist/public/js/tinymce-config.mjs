/* eslint-disable no-dupe-keys */
/* eslint-disable no-undef */
async function initTinyMCE() {
  return new Promise((resolve, reject) => {
    tinymce.init({
      selector: 'textarea', // Chọn các textarea cần sử dụng TinyMCE
      plugins: 'image code link lists media table', // Các plugin cần thiết
      toolbar:
        'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | code', // Thanh công cụ
      menubar: true, // Hiển thị menubar để truy cập thêm các tính năng

      image_title: true, // Cho phép thêm tiêu đề cho hình ảnh
      automatic_uploads: true, // Tự động tải lên hình ảnh khi chèn từ máy tính
      file_picker_types: 'image', // Chỉ cho phép chọn tệp là hình ảnh

      images_upload_handler: async function (blobInfo) {
        try {
          // Tạo FormData để gửi tệp
          const formData = new FormData()
          formData.append('image', blobInfo.blob(), blobInfo.filename())

          // Gửi tệp hình ảnh đến máy chủ
          const response = await fetch('/api/upload/images', {
            method: 'POST',
            body: formData
          })

          if (response.ok) {
            const data = await response.json()

            const imageId = data.public_id
            blobInfo.imageId = imageId
            return data.location
          } else {
            throw new Error('Network response was not ok.')
          }
        } catch (error) {
          console.error('Error uploading image:', error)
          return '' // trả về chuỗi rỗng nếu gặp lỗi
        }
      },
      setup: function (editor) {
        editor.on('keydown', async function (e) {
          if (e.key === 'Backspace') {
            const selectedNode = editor.selection.getNode()
            if (selectedNode.nodeName === 'IMG') {
              // Lấy ID ảnh từ metadata
              const imgSrc = selectedNode.getAttribute('src')
              if (imgSrc) {
                const imageId = encodeURIComponent(
                  imgSrc.split('/').slice(-2, -1)[0] + '/' + imgSrc.split('/').pop().split('.')[0]
                )

                if (imageId) {
                  // Gọi API của Cloudinary để xóa ảnh

                  const response = await fetch(`/api/upload/delete-images/${imageId}`, {
                    method: 'DELETE'
                  })
                  if (response.ok) {
                    editor.selection.getNode().remove()
                    editor.selection.setCursorLocation()
                  } else {
                    throw new Error('Failed to delete image.')
                  }
                }
              }
            }
          }
        });
      },
      
      toolbar: 'deleteImage', // Thêm nút xóa ảnh vào thanh công cụ
      init_instance_callback: function (editor) {
        resolve(editor) // Giải quyết Promise sau khi khởi tạo hoàn tất
      },
      error_callback: function (error) {
        reject(error) // Từ chối Promise nếu có lỗi
      },
      mobile: {
        theme: 'silver', // Đảm bảo giao diện đơn giản cho di động
        toolbar_mode: 'sliding', // Để thanh công cụ cuộn nếu không đủ chỗ
        toolbar: 'undo redo | bold italic | bullist numlist | link image code', // Toolbar đơn giản hơn
        menubar: false // Ẩn menubar trên di động để tiết kiệm không gian
      }
    })
  })
}

// Gọi hàm initTinyMCE và xử lý bất đồng bộ
initTinyMCE()
  .then((editor) => {
    // Các thao tác khác sau khi TinyMCE đã khởi tạo xong
  })
  .catch((error) => {
    console.error('Failed to initialize TinyMCE:', error)
  })
