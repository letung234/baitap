"use strict";

var _main = require("./main.js");

/* eslint-disable no-undef */
var editRowIndex = -1;
(0, _main.insertRow)('incomeTable', 'salaryportiontn', 'sumtn', 'addRowButtontn', editRowIndex);
(0, _main.insertRow)('deductionTable', 'salaryportionkt', 'sumkt', 'addRowButtonkt', editRowIndex);
var formCreate = document.querySelector('#formCreate');

if (formCreate) {
  (0, _main.Validator)({
    form: '#formCreate',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [_main.Validator.isRequired('#ten', 'Vui lòng nhập tên cơ cấu lương của bạn'), _main.Validator.maxLength('#ten', 255, 'Tên cơ cấu lương không được vượt quá 255 ký tự'), _main.Validator.isRequired('#id_cong_ty', 'Vui lòng chọn công ty của bạn'), _main.Validator.isRequired('#status', 'Vui lòng chọn trạng thái'), _main.Validator.minLength('#chu_ky_phat_luong', 1, 'Vui lòng nhập chu kỳ phát lương'), _main.Validator.maxLength('#chu_ky_phat_luong', 255, 'Chu kỳ phát lương không được vượt quá 255 ký tự'), _main.Validator.isRequired('#don_vi_tien_te', 'Vui lòng nhập đơn vị tiền tệ của bạn'), _main.Validator.maxLength('#don_vi_tien_te', 10, 'Đơn vị tiền tệ không được vượt quá 10 ký tự'), _main.Validator.isRequired('#hinh_thuc_chi_tra_id_hinh_thuc', 'Vui lòng chọn hình thức chi trả'), _main.Validator.isRequired('#hinh_thuc_chi_tra_id_tai_khoan', 'Vui lòng chọn tài khoản chi trả')],
    onSubmit: function onSubmit(data) {
      var income, deduction, response, errorResponse, errorMessage, result;
      return regeneratorRuntime.async(function onSubmit$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              // Lấy dữ liệu từ bảng
              income = (0, _main.getTableData)('incomeTable');
              deduction = (0, _main.getTableData)('deductionTable');
              data.thu_nhap = income;
              data.khau_tru = deduction;
              console.log(data); // Gọi API để lấy dữ liệu lọc

              _context.prev = 5;
              _context.next = 8;
              return regeneratorRuntime.awrap(fetch("/api/salaryStructure/create", {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }));

            case 8:
              response = _context.sent;

              if (response.status === 401) {
                window.location.href = '/users/login';
              }

              if (response.ok) {
                _context.next = 17;
                break;
              }

              _context.next = 13;
              return regeneratorRuntime.awrap(response.json());

            case 13:
              errorResponse = _context.sent;
              errorMessage = errorResponse.message || 'Lỗi khi gọi API';
              (0, _main.updateErrorMessages)(errorResponse.errors || {});
              throw new Error(errorMessage);

            case 17:
              _context.next = 19;
              return regeneratorRuntime.awrap(response.json());

            case 19:
              result = _context.sent;
              (0, _main.toast)({
                message: result.message,
                type: 'success',
                title: 'Thành Công!!'
              });
              _context.next = 26;
              break;

            case 23:
              _context.prev = 23;
              _context.t0 = _context["catch"](5);
              (0, _main.toast)({
                type: 'error',
                title: 'lỗi',
                message: _context.t0.message
              });

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[5, 23]]);
    }
  });
}

var formEdit = document.querySelector('#formEdit');

if (formEdit) {
  (0, _main.Validator)({
    form: '#formEdit',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [_main.Validator.isRequired('#ten', 'Vui lòng nhập tên cơ cấu lương của bạn'), _main.Validator.maxLength('#ten', 255, 'Tên cơ cấu lương không được vượt quá 255 ký tự'), _main.Validator.isRequired('#id_cong_ty', 'Vui lòng chọn công ty của bạn'), _main.Validator.isRequired('#status', 'Vui lòng chọn trạng thái'), _main.Validator.minLength('#chu_ky_phat_luong', 1, 'Vui lòng nhập chu kỳ phát lương'), _main.Validator.maxLength('#chu_ky_phat_luong', 255, 'Chu kỳ phát lương không được vượt quá 255 ký tự'), _main.Validator.isRequired('#don_vi_tien_te', 'Vui lòng nhập đơn vị tiền tệ của bạn'), _main.Validator.maxLength('#don_vi_tien_te', 10, 'Đơn vị tiền tệ không được vượt quá 10 ký tự'), _main.Validator.isRequired('#hinh_thuc_chi_tra_id_hinh_thuc', 'Vui lòng chọn hình thức chi trả'), _main.Validator.isRequired('#hinh_thuc_chi_tra_id_tai_khoan', 'Vui lòng chọn tài khoản chi trả')],
    onSubmit: function onSubmit(data) {
      var income, deduction, url, segments, Id, response, errorResponse, errorMessage, result;
      return regeneratorRuntime.async(function onSubmit$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              // Lấy dữ liệu từ bảng
              income = (0, _main.getTableData)('incomeTable');
              deduction = (0, _main.getTableData)('deductionTable');
              data.thu_nhap = income;
              data.khau_tru = deduction;
              console.log(data); // Gọi API để lấy dữ liệu lọc

              _context2.prev = 5;
              url = window.location.pathname;
              segments = url.split('/');
              Id = segments[segments.length - 1];
              _context2.next = 11;
              return regeneratorRuntime.awrap(fetch("/api/salaryStructure/edit/".concat(Id), {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              }));

            case 11:
              response = _context2.sent;

              if (response.status === 401) {
                window.location.href = '/users/login';
              }

              if (response.ok) {
                _context2.next = 21;
                break;
              }

              _context2.next = 16;
              return regeneratorRuntime.awrap(response.json());

            case 16:
              errorResponse = _context2.sent;
              console.log(errorResponse);
              errorMessage = errorResponse.message || 'Lỗi khi gọi API';
              (0, _main.updateErrorMessages)(errorResponse.errors || {});
              throw new Error(errorMessage);

            case 21:
              _context2.next = 23;
              return regeneratorRuntime.awrap(response.json());

            case 23:
              result = _context2.sent;
              (0, _main.toast)({
                message: result.message,
                type: 'success',
                title: 'Thành Công!!'
              });
              _context2.next = 30;
              break;

            case 27:
              _context2.prev = 27;
              _context2.t0 = _context2["catch"](5);
              (0, _main.toast)({
                type: 'error',
                title: 'lỗi',
                message: _context2.t0.message
              });

            case 30:
            case "end":
              return _context2.stop();
          }
        }
      }, null, null, [[5, 27]]);
    }
  });
}

(0, _main.tbody)('/salaryStructure/edit/');
var totalItemsElement = document.querySelector('#countProducts');
var limitElement = document.querySelector('#limit'); // Các Biến Toàn Cục

var totalItems = totalItemsElement ? parseInt(totalItemsElement.getAttribute('countProducts'), 10) || 0 : 0;
var itemsPerPage = limitElement ? parseInt(limitElement.getAttribute('limit'), 10) || 7 : 7;
var currentPage = 1;
var totalPages = Math.ceil(totalItems / itemsPerPage);
var ispages = -1;
(0, _main.Filter)({
  name: '#filterbyname',
  salaryType: '#filterbysalarytype'
}, ApiFilterSalaryStructure, currentPage);

if (document.getElementById('pagination')) {
  (0, _main.displayPagination)({
    name: '#filterbyname',
    salaryType: '#filterbysalarytype'
  }, ApiFilterSalaryStructure, currentPage, totalPages);
}

(0, _main.filterSelect)({
  name: '#filterbyname',
  salaryType: '#filterbysalarytype'
}, ApiFilterSalaryStructure, currentPage);

function ApiFilterSalaryStructure(data) {
  var response, errorResponse, errorMessage, result;
  return regeneratorRuntime.async(function ApiFilterSalaryStructure$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap(fetch('/api/salaryStructure/filter', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          }));

        case 3:
          response = _context3.sent;

          if (response.ok) {
            _context3.next = 11;
            break;
          }

          _context3.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          errorResponse = _context3.sent;
          errorMessage = errorResponse.message || 'Lỗi khi gọi API';
          console.log('lỗi ', errorResponse);
          throw new Error(errorMessage);

        case 11:
          _context3.next = 13;
          return regeneratorRuntime.awrap(response.json());

        case 13:
          result = _context3.sent;
          console.log(result);
          document.querySelector('#totalitems').innerHTML = "T\u1ED5ng b\u1EA3n ghi l\xE0 ".concat(result.totalDocuments); // Rerender lại giao diện với dữ liệu mới

          rerenderUI(result.data); // Phân trang lại

          currentPage = result.currentPage;
          totalPages = result.totalPages;
          (0, _main.displayPagination)({
            name: '#filterbyname',
            salaryType: '#filterbysalarytype'
          }, ApiFilterSalaryStructure, currentPage, totalPages);
          _context3.next = 26;
          break;

        case 22:
          _context3.prev = 22;
          _context3.t0 = _context3["catch"](0);
          console.log(_context3.t0);
          (0, _main.toast)({
            message: _context3.t0.message
          });

        case 26:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 22]]);
}

function rerenderUI(data) {
  console.log(data);
  var tableBody = document.querySelector('tbody');

  if (data.length > 0) {
    // Xóa dữ liệu cũ trong bảng
    tableBody.innerHTML = ''; // Tạo bảng mới với dữ liệu trả về

    data.forEach(function (item) {
      console.log('item', item);
      var row = "\n    <tr class=\"w-full cursor-pointer\" id=\"".concat(item._id, "\">\n      <td class=\"px-1 py-5 border-b border-gray-200 bg-white text-sm\">\n        <input type=\"checkbox\" class=\"outline-none border-none\" name='id' value=\"").concat(item._id, "\">\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm md:hidden\" colspan=\"3\">\n        <div class=\"flex justify-between\">\n          <p class=\"text-gray-900\">").concat(item.ten, "</p>\n          <span class=\"relative inline-block px-3 py-1\">\n            <span class=\"inline-block w-3 h-3 rounded-full ").concat(item.status ? 'bg-blue-500' : 'bg-gray-400', "\"></span>\n          </span>\n        </div>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell\">\n        <p class=\"text-gray-900\">").concat(item.ten, "</p>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell\">\n        <span class=\"relative inline-block px-3 py-1 font-semibold text-").concat(item.status ? 'blue' : 'gray', "-900 leading-tight\">\n          <span aria-hidden class=\"absolute inset-0 bg-").concat(item.status ? 'blue' : 'gray', "-200 opacity-50 rounded-full\"></span>\n          <span class=\"relative\">").concat(item.status ? 'Có' : 'Không', "</span>\n        </span>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell\">\n        <p class=\"text-gray-900\">").concat(item.chu_ky_phat_luong, "</p>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell\">\n        <p class=\"text-gray-900\">").concat(item.don_vi_tien_te, "</p>\n      </td>\n      <td class=\"px-5 py-5 border-b border-gray-200 bg-white text-sm text-right hidden md:table-cell\">\n        <p class=\"text-gray-900\"> ").concat(new Date(item.updated_at).toLocaleDateString('vi-VN'), " </p>\n      </td>\n    </tr>\n  ");
      tableBody.insertAdjacentHTML('beforeend', row);
    });
  } else {
    tableBody.innerHTML = (0, _main.StringData)('/api/salaryStructure/create');
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
      }, ApiFilterSalaryStructure, '/api/salaryStructure/delete-items', '/salaryStructure/create', _main.handlefilter, currentPage);
    });
  });
}

(0, _main.checkboxMulti)({
  name: '#filterbyname',
  salaryType: '#filterbysalarytype'
}, ApiFilterSalaryStructure, '/api/salaryStructure/delete-items', '/salaryStructure/create', _main.handlefilter, currentPage); // Xử lý khi nhấn nút "Áp dụng bộ lọc"

var applyBtn = document.getElementById('applyBtn');

if (applyBtn) {
  applyBtn.addEventListener('click', function _callee() {
    return regeneratorRuntime.async(function _callee$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return regeneratorRuntime.awrap((0, _main.handlefilter)({
              name: '#filterbyname',
              salaryType: '#filterbysalarytype'
            }, ApiFilterSalaryStructure, currentPage));

          case 2:
          case "end":
            return _context4.stop();
        }
      }
    });
  });
}

var filterDiv = document.getElementById('toggleincrease_or_decrease');

if (filterDiv) {
  filterDiv.querySelector('svg').addEventListener('click', function _callee2() {
    return regeneratorRuntime.async(function _callee2$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return regeneratorRuntime.awrap((0, _main.handlefilter)({
              name: '#filterbyname',
              salaryType: '#filterbysalarytype'
            }, ApiFilterSalaryStructure, currentPage));

          case 2:
          case "end":
            return _context5.stop();
        }
      }
    });
  });
}

var filterSl = document.getElementById('filterSelect');

if (filterSl) {
  filterSl.addEventListener('change', function _callee3() {
    return regeneratorRuntime.async(function _callee3$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return regeneratorRuntime.awrap((0, _main.handlefilter)({
              name: '#filterbyname',
              salaryType: '#filterbysalarytype'
            }, ApiFilterSalaryStructure, currentPage));

          case 2:
          case "end":
            return _context6.stop();
        }
      }
    });
  });
}

var filterbysalarytype = document.querySelector('#filterbysalarytype');

if (filterbysalarytype) {
  filterbysalarytype.addEventListener('click', function _callee4() {
    return regeneratorRuntime.async(function _callee4$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.next = 2;
            return regeneratorRuntime.awrap((0, _main.handlefilter)({
              name: '#filterbyname',
              salaryType: '#filterbysalarytype'
            }, ApiFilterSalaryStructure, currentPage));

          case 2:
          case "end":
            return _context7.stop();
        }
      }
    });
  });
}

var filterbyname = document.querySelector('#filterbyname');

if (filterbyname) {
  var debounceTimeout;
  filterbyname.addEventListener('input', function _callee6() {
    return regeneratorRuntime.async(function _callee6$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(function _callee5() {
              return regeneratorRuntime.async(function _callee5$(_context8) {
                while (1) {
                  switch (_context8.prev = _context8.next) {
                    case 0:
                      _context8.next = 2;
                      return regeneratorRuntime.awrap((0, _main.handlefilter)({
                        name: '#filterbyname',
                        salaryType: '#filterbysalarytype'
                      }, ApiFilterSalaryStructure, currentPage));

                    case 2:
                    case "end":
                      return _context8.stop();
                  }
                }
              });
            }, 700);

          case 2:
          case "end":
            return _context9.stop();
        }
      }
    });
  });
}