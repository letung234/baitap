"use strict";

var _main = require("./main.js");

/* eslint-disable no-undef */
(0, _main.tbody)('/salary/edit/');
var totalItemsElement = document.querySelector('#countProducts');
var limitElement = document.querySelector('#limit'); // Các Biến Toàn Cục

var totalItems = totalItemsElement ? parseInt(totalItemsElement.getAttribute('countProducts'), 10) || 0 : 0;
var itemsPerPage = limitElement ? parseInt(limitElement.getAttribute('limit'), 10) || 7 : 7;
var currentPage = 1;
var totalPages = Math.ceil(totalItems / itemsPerPage);
var editRowIndex = -1; // Biến lưu chỉ số hàng đang sửa

var ispages = -1;
(0, _main.Filter)({
  name: '#filterbyname',
  salaryType: '#filterbysalarytype'
}, ApiLocPhanLuong, currentPage);

if (document.getElementById('pagination')) {
  (0, _main.displayPagination)({
    name: '#filterbyname',
    salaryType: '#filterbysalarytype'
  }, ApiLocPhanLuong, currentPage, totalPages);
}

(0, _main.filterSelect)({
  name: '#filterbyname',
  salaryType: '#filterbysalarytype'
}, ApiLocPhanLuong, currentPage);

function ApiLocPhanLuong(data) {
  var response, errorResponse, result;
  return regeneratorRuntime.async(function ApiLocPhanLuong$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('/api/salary/filter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }));

        case 3:
          response = _context.sent;

          if (response.status === 401) {
            window.location.href = '/users/login';
          }

          if (response.ok) {
            _context.next = 11;
            break;
          }

          _context.next = 8;
          return regeneratorRuntime.awrap(response.json());

        case 8:
          errorResponse = _context.sent;
          (0, _main.updateErrorMessages)(errorResponse.errors);
          throw new Error(errorResponse.message);

        case 11:
          _context.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          result = _context.sent;
          console.log(result);
          document.querySelector('#totalitems').innerHTML = "T\u1ED5ng b\u1EA3n ghi l\xE0 ".concat(result.totalDocuments); // Rerender lại giao diện với dữ liệu mới

          rerenderUI(result.data); // Phân trang lại

          currentPage = result.currentPage;
          totalPages = result.totalPages;
          (0, _main.displayPagination)({
            name: '#filterbyname',
            salaryType: '#filterbysalarytype'
          }, ApiLocPhanLuong, currentPage, totalPages); // Lưu dữ liệu vào localStorage (nếu cần)

          localStorage.setItem('data', JSON.stringify(data));
          _context.next = 27;
          break;

        case 23:
          _context.prev = 23;
          _context.t0 = _context["catch"](0);
          console.log(_context.t0);
          (0, _main.toast)({
            message: _context.t0.message
          });

        case 27:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 23]]);
}

function rerenderUI(data) {
  console.log(data);
  var tableBody = document.querySelector('tbody');

  if (data.length > 0) {
    // Xóa dữ liệu cũ trong bảng
    tableBody.innerHTML = ''; // Tạo bảng mới với dữ liệu trả về

    data.forEach(function (item) {
      console.log('item', item);
      var row = "\n    <tr class=\"w-full cursor-pointer\" id=\"".concat(item._id, "\">\n      <td class=\"px-1 py-5 border-b border-gray-200 bg-white text-sm\">\n        <input type=\"checkbox\" class=\"outline-none border-none\" name='id' value=\"").concat(item._id, "\">\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm md:hidden\" colspan=\"3\">\n        <div class=\"flex justify-between\">\n          <p class=\"text-gray-900\">").concat(item.ten, "</p>\n          <span class=\"relative inline-block px-3 py-1\">\n            <span class=\"inline-block w-3 h-3 rounded-full ").concat(item.is_active ? 'bg-blue-500' : 'bg-gray-400', "\"></span>\n          </span>\n        </div>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell\">\n        <p class=\"text-gray-900\">").concat(item.ten, "</p>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell\">\n        <span class=\"relative inline-block px-3 py-1 font-semibold text-").concat(item.is_active ? 'blue' : 'gray', "-900 leading-tight\">\n          <span aria-hidden class=\"absolute inset-0 bg-").concat(item.is_active ? 'blue' : 'gray', "-200 opacity-50 rounded-full\"></span>\n          <span class=\"relative\">").concat(item.is_active ? 'Đã bật' : 'Vô hiệu', "</span>\n        </span>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell\">\n        <p class=\"text-gray-900\">").concat(item.ten.split(' ').map(function (word) {
        return word[0];
      }).join(''), "</p>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell\">\n        <p class=\"text-gray-900\">").concat(item.mo_ta || '', "</p>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm text-right hidden md:table-cell\">\n        <p class=\"text-gray-900\">").concat(new Date(item.ngay_tao).toLocaleDateString('vi-VN'), "</p>\n      </td>\n    </tr>\n  ");
      tableBody.insertAdjacentHTML('beforeend', row);
    });
  } else {
    tableBody.innerHTML = (0, _main.StringData)('/api/salary/create');
  }

  var checkboxMulti = document.querySelector('[checkbox-multi]');
  var inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  var inputsID = checkboxMulti.querySelectorAll("input[name='id']");
  console.log(inputsID);
  inputsID.forEach(function (input) {
    input.addEventListener('click', function () {
      var countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;
      inputCheckAll.checked = countChecked === inputsID.length; // Cập nhật hành động khi có sự thay đổi

      (0, _main.updateAction)({
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      }, ApiLocPhanLuong, '/api/salary/delete-items', '/salary/create', _main.handlefilter, currentPage);
    });
  });
}

(0, _main.checkboxMulti)({
  name: '#filterbyname',
  salaryType: '#filterbysalarytype'
}, ApiLocPhanLuong, '/api/salary/delete-items', '/salary/create', _main.handlefilter, currentPage); // Xử lý khi nhấn nút "Áp dụng bộ lọc"

var applyBtn = document.getElementById('applyBtn');

if (applyBtn) {
  applyBtn.addEventListener('click', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return regeneratorRuntime.awrap((0, _main.handlefilter)({
              name: '#filterbyname',
              salaryType: '#filterbysalarytype'
            }, ApiLocPhanLuong, currentPage));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
}

var filterDiv = document.getElementById('toggleincrease_or_decrease');

if (filterDiv) {
  filterDiv.querySelector('svg').addEventListener('click', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return regeneratorRuntime.awrap((0, _main.handlefilter)({
              name: '#filterbyname',
              salaryType: '#filterbysalarytype'
            }, ApiLocPhanLuong, currentPage));

          case 2:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
}

var filterSl = document.getElementById('filterSelect');

if (filterSl) {
  filterSl.addEventListener('change', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap((0, _main.handlefilter)({
              name: '#filterbyname',
              salaryType: '#filterbysalarytype'
            }, ApiLocPhanLuong, currentPage));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
}

var filterbysalarytype = document.querySelector('#filterbysalarytype');

if (filterbysalarytype) {
  filterbysalarytype.addEventListener('click', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap((0, _main.handlefilter)({
              name: '#filterbyname',
              salaryType: '#filterbysalarytype'
            }, ApiLocPhanLuong, currentPage));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
}

var filterbyname = document.querySelector('#filterbyname');

if (filterbyname) {
  var debounceTimeout;
  filterbyname.addEventListener('input', function _callee6() {
    return regeneratorRuntime.async(function _callee6$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(function _callee5() {
              return regeneratorRuntime.async(function _callee5$(_context6) {
                while (1) {
                  switch (_context6.prev = _context6.next) {
                    case 0:
                      _context6.next = 2;
                      return regeneratorRuntime.awrap((0, _main.handlefilter)({
                        name: '#filterbyname',
                        salaryType: '#filterbysalarytype'
                      }, ApiLocPhanLuong, currentPage));

                    case 2:
                    case "end":
                      return _context6.stop();
                  }
                }
              });
            }, 700);

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
} // Phân Lương


var addRowBtn = document.getElementById('addRowButton');

if (addRowBtn) {
  addRowBtn.addEventListener('click', function () {
    // Lấy giá trị từ các trường input
    var companySelect = document.getElementById('company');
    var accountSelect = document.getElementById('account');
    var companyId = companySelect.value; // Lấy ID công ty

    var accountId = accountSelect.value; // Lấy ID tài khoản

    var companyName = companySelect.options[companySelect.selectedIndex].text; // Lấy tên công ty

    var accountName = accountSelect.options[accountSelect.selectedIndex].text; // Lấy tên tài khoản
    // Kiểm tra nếu các trường không rỗng

    if (companyId && accountId) {
      var table = document.getElementById('accountTable').getElementsByTagName('tbody')[0]; // Nếu đang sửa, cập nhật hàng

      if (editRowIndex >= 0) {
        var row = table.rows[editRowIndex];
        row.cells[1].textContent = companyName; // Cập nhật công ty

        row.cells[2].textContent = accountName; // Cập nhật tài khoản

        row.cells[1].setAttribute('data-id', companyId); // Cập nhật ID công ty

        row.cells[2].setAttribute('data-id', accountId); // Cập nhật ID tài khoản

        document.getElementById('addRowButton').textContent = 'Thêm Hàng'; // Đặt lại văn bản nút

        editRowIndex = -1; // Đặt lại chỉ số sửa
      } else {
        // Tạo một hàng mới cho bảng
        var newRow = table.insertRow(); // Thêm các ô vào hàng mới

        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        var cell3 = newRow.insertCell(2);
        var cell4 = newRow.insertCell(3); // Ô cho nút xóa
        // add class

        cell1.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');
        cell2.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');
        cell3.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2');
        cell4.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2'); // Điền dữ liệu vào các ô

        cell1.textContent = table.rows.length; // Số thứ tự tự động

        cell2.textContent = companyName; // Hiển thị tên công ty

        cell3.textContent = accountName; // Hiển thị tên tài khoản

        cell2.setAttribute('data-id', companyId); // Lưu ID công ty

        cell3.setAttribute('data-id', accountId); // Lưu ID tài khoản
        // Tạo nút xóa

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Xóa';
        deleteButton.className = 'text-red-500 hover:text-red-700';
        cell4.appendChild(deleteButton);
      } // Xóa giá trị trong các trường input sau khi thêm


      companySelect.value = '';
      accountSelect.value = '';
    } else {
      (0, _main.toast)({
        type: 'error',
        message: 'Vui lòng điền đầy đủ thông tin!',
        title: 'Cảnh Báo!!!'
      });
    }
  });
}

function getTableData() {
  var table = document.getElementById('accountTable').getElementsByTagName('tbody')[0];
  var data = []; // Lặp qua tất cả các hàng trong bảng

  for (var i = 0; i < table.rows.length; i++) {
    var row = table.rows[i];
    var rowData = {
      companyId: row.cells[1].getAttribute('data-id'),
      // Lấy ID công ty
      accountId: row.cells[2].getAttribute('data-id') // Lấy ID tài khoản

    };
    data.push(rowData); // Thêm dữ liệu của hàng vào mảng data
  }

  return data;
}

var accountTable = document.getElementById('accountTable');

if (accountTable) {
  accountTable.addEventListener('click', function (event) {
    var target = event.target; // Kiểm tra xem người dùng có nhấp vào ô thứ 3 (chứa nút xóa) không

    if (target.tagName === 'BUTTON' && target.closest('td').cellIndex == 3) {
      var row = target.closest('tr'); // Lấy hàng cha chứa nút bấm

      var rowIndex = parseInt(row.cells[0].textContent) - 1; // Lấy chỉ số hàng dựa trên textContent của ô đầu tiên (cell[0])

      var table = accountTable.getElementsByTagName('tbody')[0]; // Xóa hàng theo chỉ số

      table.deleteRow(rowIndex); // Cập nhật lại số thứ tự (STT) cho các hàng còn lại

      updateRowIndices();
    }
  });
} // Thêm sự kiện click cho các hàng trong bảng


accountTable = document.getElementById('accountTable');

if (accountTable) {
  document.getElementById('accountTable').addEventListener('click', function (event) {
    var target = event.target;

    if (target.tagName === 'TD' && target.cellIndex < 3) {
      var row = target.closest('tr');
      console.log(row);
      editRowIndex = row.rowIndex - 1; // Lưu chỉ số hàng đang sửa

      document.getElementById('company').value = row.cells[1].getAttribute('data-id'); // Tải ID công ty vào ô nhập

      document.getElementById('account').value = row.cells[2].getAttribute('data-id'); // Tải ID tài khoản vào ô nhập

      document.getElementById('addRowButton').textContent = 'Sửa'; // Thay đổi văn bản nút thành "Sửa"
    }
  });
} // Hàm cập nhật số thứ tự


function updateRowIndices() {
  var table = document.getElementById('accountTable').getElementsByTagName('tbody')[0];

  for (var i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[0].textContent = i + 1; // Cập nhật STT
  }
}

document.addEventListener('DOMContentLoaded', function _callee7() {
  var formCreate, formEdit;
  return regeneratorRuntime.async(function _callee7$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          formCreate = document.querySelector('#form-1');

          if (formCreate) {
            (0, _main.Validator)({
              form: '#form-1',
              formGroupSelector: '.form-group',
              errorSelector: '.form-message',
              rules: [_main.Validator.isRequired('#ten', 'Vui lòng nhập tên phân lương của bạn'), _main.Validator.maxLength('#ten', 255), _main.Validator.isRequired('#loai', 'Vui lòng nhập chọn loại lương của bạn')],
              onSubmit: function onSubmit(data) {
                var accounts, transformedData, response, errorResponse, result;
                return regeneratorRuntime.async(function onSubmit$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        // Lấy dữ liệu từ bảng
                        accounts = getTableData();
                        console.log(data); // Chuyển đổi dữ liệu

                        transformedData = {
                          ten: data.ten,
                          // Có thể chỉnh sửa giá trị này nếu cần
                          loai: parseInt(data.loai),
                          // Chuyển đổi loai sang số
                          mo_ta: data.mo_ta,
                          // Mô tả cố định
                          is_active: data.is_active.includes('on'),
                          // Chuyển đổi trạng thái thành boolean
                          tai_khoan_ke_toan: accounts.map(function (account) {
                            return {
                              id_congty: account.companyId,
                              // Chuyển đổi companyId thành ObjectId
                              id_ke_toan: account.accountId // Chuyển đổi accountId thành ObjectId

                            };
                          })
                        };
                        _context8.prev = 3;
                        _context8.next = 6;
                        return regeneratorRuntime.awrap(fetch('/api/salary', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(transformedData)
                        }));

                      case 6:
                        response = _context8.sent;

                        if (response.status === 401) {
                          window.location.href = '/users/login';
                        }

                        if (response.ok) {
                          _context8.next = 14;
                          break;
                        }

                        _context8.next = 11;
                        return regeneratorRuntime.awrap(response.json());

                      case 11:
                        errorResponse = _context8.sent;
                        (0, _main.updateErrorMessages)(errorResponse.errors || {});
                        throw new Error(errorResponse.message);

                      case 14:
                        _context8.next = 16;
                        return regeneratorRuntime.awrap(response.json());

                      case 16:
                        result = _context8.sent;
                        (0, _main.toast)({
                          message: result.message,
                          type: 'success',
                          title: 'Thành Công!!'
                        });
                        _context8.next = 23;
                        break;

                      case 20:
                        _context8.prev = 20;
                        _context8.t0 = _context8["catch"](3);
                        (0, _main.toast)({
                          type: 'error',
                          title: 'lỗi',
                          message: _context8.t0.message
                        });

                      case 23:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, null, null, [[3, 20]]);
              }
            });
          }

          formEdit = document.querySelector('#form-2');

          if (formEdit) {
            (0, _main.Validator)({
              form: '#form-2',
              formGroupSelector: '.form-group',
              errorSelector: '.form-message',
              rules: [_main.Validator.isRequired('#ten', 'Vui lòng nhập tên phân lương của bạn'), _main.Validator.maxLength('#ten', 255), _main.Validator.isRequired('#loai', 'Vui lòng nhập chọn loại lương của bạn')],
              onSubmit: function onSubmit(data) {
                var accounts, transformedData, url, segments, salaryId, response, errorResponse, result;
                return regeneratorRuntime.async(function onSubmit$(_context9) {
                  while (1) {
                    switch (_context9.prev = _context9.next) {
                      case 0:
                        // Lấy dữ liệu từ bảng
                        accounts = getTableData();
                        console.log(data); // Chuyển đổi dữ liệu

                        transformedData = {
                          ten: data.ten,
                          // Có thể chỉnh sửa giá trị này nếu cần
                          loai: parseInt(data.loai),
                          // Chuyển đổi loai sang số
                          mo_ta: data.mo_ta,
                          // Mô tả cố định
                          is_active: data.is_active.includes('on'),
                          // Chuyển đổi trạng thái thành boolean
                          tai_khoan_ke_toan: accounts.map(function (account) {
                            return {
                              id_congty: account.companyId,
                              // Chuyển đổi companyId thành ObjectId
                              id_ke_toan: account.accountId // Chuyển đổi accountId thành ObjectId

                            };
                          })
                        };
                        _context9.prev = 3;
                        url = window.location.pathname;
                        segments = url.split('/');
                        salaryId = segments[segments.length - 1];
                        console.log(salaryId);
                        _context9.next = 10;
                        return regeneratorRuntime.awrap(fetch("/api/salary/edit/".concat(salaryId), {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(transformedData)
                        }));

                      case 10:
                        response = _context9.sent;

                        if (response.status === 401) {
                          window.location.href = '/users/login';
                        }

                        if (response.ok) {
                          _context9.next = 18;
                          break;
                        }

                        _context9.next = 15;
                        return regeneratorRuntime.awrap(response.json());

                      case 15:
                        errorResponse = _context9.sent;
                        (0, _main.updateErrorMessages)(errorResponse.errors || {});
                        throw new Error(errorResponse.message);

                      case 18:
                        _context9.next = 20;
                        return regeneratorRuntime.awrap(response.json());

                      case 20:
                        result = _context9.sent;
                        (0, _main.toast)({
                          message: result.message,
                          type: 'success',
                          title: 'Thành Công!!'
                        });
                        _context9.next = 27;
                        break;

                      case 24:
                        _context9.prev = 24;
                        _context9.t0 = _context9["catch"](3);
                        (0, _main.toast)({
                          type: 'error',
                          title: 'lỗi',
                          message: _context9.t0.message
                        });

                      case 27:
                      case "end":
                        return _context9.stop();
                    }
                  }
                }, null, null, [[3, 24]]);
              }
            });
          }

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
});
var form = document.querySelector('#form-1');
var action = document.querySelector('[action]'); // Hàm handleSubmit để xử lý sự kiện

function handleSubmit(e, form) {
  e.preventDefault(); // Ngăn chặn hành vi mặc định

  form.dispatchEvent(new Event('submit')); // Gửi sự kiện submit để thực hiện validation trước
}

console.log(form);
console.log(action); // Đảm bảo sự kiện chỉ được gán một lần

if (form && action) {
  action.removeEventListener('click', function (e) {
    return handleSubmit(e, form);
  }); // Xóa sự kiện cũ (nếu có)

  action.addEventListener('click', function (e) {
    return handleSubmit(e, form);
  }); // Gán sự kiện mới
}

var formedit = document.querySelector('#form-2');
console.log(formedit);

if (formedit && action) {
  action.removeEventListener('click', function (e) {
    return handleSubmit(e, formedit);
  });
  action.addEventListener('click', function (e) {
    return handleSubmit(e, formedit);
  });
}