"use strict";

/* eslint-disable no-undef */
function initTinyMCE() {
  return regeneratorRuntime.async(function initTinyMCE$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", new Promise(function (resolve, reject) {
            tinymce.init({
              selector: 'textarea',
              // Chọn các textarea cần sử dụng TinyMCE
              plugins: 'image code',
              // Các plugin cần thiết
              image_title: true,
              // Cho phép thêm tiêu đề cho hình ảnh
              automatic_uploads: true,
              // Tự động tải lên hình ảnh
              file_picker_types: 'image',
              // Loại tệp được chọn là hình ảnh
              images_upload_handler: function images_upload_handler(blobInfo) {
                var formData, response, data, imageId;
                return regeneratorRuntime.async(function images_upload_handler$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        // Tạo FormData để gửi tệp
                        formData = new FormData();
                        formData.append('image', blobInfo.blob(), blobInfo.filename()); // Gửi tệp hình ảnh đến máy chủ

                        _context.next = 5;
                        return regeneratorRuntime.awrap(fetch('/api/upload/images', {
                          method: 'POST',
                          body: formData
                        }));

                      case 5:
                        response = _context.sent;

                        if (!response.ok) {
                          _context.next = 15;
                          break;
                        }

                        _context.next = 9;
                        return regeneratorRuntime.awrap(response.json());

                      case 9:
                        data = _context.sent;
                        imageId = data.public_id;
                        blobInfo.imageId = imageId;
                        return _context.abrupt("return", data.location);

                      case 15:
                        throw new Error('Network response was not ok.');

                      case 16:
                        _context.next = 22;
                        break;

                      case 18:
                        _context.prev = 18;
                        _context.t0 = _context["catch"](0);
                        console.error('Error uploading image:', _context.t0);
                        return _context.abrupt("return", '');

                      case 22:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, null, null, [[0, 18]]);
              },
              setup: function setup(editor) {
                // Thực hiện các hành động cần thiết khi người dùng thay đổi node
                editor.on('NodeChange', function (e) {// Có thể xử lý thêm các sự kiện thay đổi node nếu cần
                }); // Thêm một nút xóa ảnh vào thanh công cụ

                editor.ui.registry.addButton('deleteImage', {
                  text: 'Delete Image',
                  onAction: function onAction() {
                    var selectedNode, imgSrc, imageId, response;
                    return regeneratorRuntime.async(function onAction$(_context2) {
                      while (1) {
                        switch (_context2.prev = _context2.next) {
                          case 0:
                            selectedNode = editor.selection.getNode();

                            if (!(selectedNode.nodeName === 'IMG')) {
                              _context2.next = 15;
                              break;
                            }

                            // Lấy ID ảnh từ metadata
                            imgSrc = selectedNode.getAttribute('src');

                            if (!imgSrc) {
                              _context2.next = 15;
                              break;
                            }

                            imageId = encodeURIComponent(imgSrc.split('/').slice(-2, -1)[0] + '/' + imgSrc.split('/').pop().split('.')[0]);

                            if (!imageId) {
                              _context2.next = 15;
                              break;
                            }

                            _context2.next = 8;
                            return regeneratorRuntime.awrap(fetch("/api/upload/delete-images/".concat(imageId), {
                              method: 'DELETE'
                            }));

                          case 8:
                            response = _context2.sent;

                            if (!response.ok) {
                              _context2.next = 14;
                              break;
                            }

                            editor.selection.getNode().remove();
                            editor.selection.setCursorLocation();
                            _context2.next = 15;
                            break;

                          case 14:
                            throw new Error('Failed to delete image.');

                          case 15:
                          case "end":
                            return _context2.stop();
                        }
                      }
                    });
                  }
                });
              },
              toolbar: 'deleteImage',
              // Thêm nút xóa ảnh vào thanh công cụ
              init_instance_callback: function init_instance_callback(editor) {
                resolve(editor); // Giải quyết Promise sau khi khởi tạo hoàn tất
              },
              error_callback: function error_callback(error) {
                reject(error); // Từ chối Promise nếu có lỗi
              }
            });
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
} // Gọi hàm initTinyMCE và xử lý bất đồng bộ


initTinyMCE().then(function (editor) {// Các thao tác khác sau khi TinyMCE đã khởi tạo xong
})["catch"](function (error) {
  console.error('Failed to initialize TinyMCE:', error);
});