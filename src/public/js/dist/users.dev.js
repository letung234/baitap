"use strict";

var _main = require("./main.js");

/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function _callee() {
  var formCreate, formEdit, formLogin;
  return regeneratorRuntime.async(function _callee$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          formCreate = document.querySelector('#create_user');

          if (formCreate) {
            (0, _main.Validator)({
              form: '#create_user',
              formGroupSelector: '.form-group',
              errorSelector: '.form-message',
              rules: [_main.Validator.isRequired('#name', 'Vui lòng nhập tên tài khoản của bạn'), _main.Validator.maxLength('#name', 255), _main.Validator.isRequired('#email', 'Vui lòng nhập email của bạn'), _main.Validator.isEmail('#email'), _main.Validator.isRequired('#role_id', 'Vui lòng chọn role của bạn'), _main.Validator.isRequired('#password', 'Vui lòng nhập mật khẩu tài khoản của bạn'), _main.Validator.isPassword('#password')],
              onSubmit: function onSubmit(data) {
                var payload, response, errorResponse, result;
                return regeneratorRuntime.async(function onSubmit$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        payload = {
                          name: data.name,
                          email: data.email,
                          role_id: data.role_id,
                          password: data.password,
                          is_active: data.is_active.includes('on')
                        };
                        _context.prev = 1;
                        _context.next = 4;
                        return regeneratorRuntime.awrap(fetch('/api/users/create', {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(payload)
                        }));

                      case 4:
                        response = _context.sent;

                        if (response.status === 401) {
                          window.location.href = '/users/login';
                        }

                        if (response.ok) {
                          _context.next = 13;
                          break;
                        }

                        _context.next = 9;
                        return regeneratorRuntime.awrap(response.json());

                      case 9:
                        errorResponse = _context.sent;
                        console.log(errorResponse);
                        (0, _main.updateErrorMessages)(errorResponse.errors || {});
                        throw new Error(errorResponse.message);

                      case 13:
                        _context.next = 15;
                        return regeneratorRuntime.awrap(response.json());

                      case 15:
                        result = _context.sent;
                        (0, _main.toast)({
                          message: result.message,
                          type: 'success',
                          title: 'Thành Công!!'
                        });
                        _context.next = 22;
                        break;

                      case 19:
                        _context.prev = 19;
                        _context.t0 = _context["catch"](1);
                        (0, _main.toast)({
                          type: 'error',
                          title: 'lỗi',
                          message: _context.t0.message
                        });

                      case 22:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, null, null, [[1, 19]]);
              }
            });
          }

          formEdit = document.querySelector('#edit_user');

          if (formEdit) {
            (0, _main.Validator)({
              form: '#edit_user',
              formGroupSelector: '.form-group',
              errorSelector: '.form-message',
              rules: [_main.Validator.isRequired('#name', 'Vui lòng nhập tên tài khoản của bạn'), _main.Validator.maxLength('#name', 255), _main.Validator.isRequired('#email', 'Vui lòng nhập email của bạn'), _main.Validator.isEmail('#email'), _main.Validator.isRequired('#role_id', 'Vui lòng chọn role của bạn')],
              onSubmit: function onSubmit(data) {
                var payload, url, segments, Id, response, errorResponse, result;
                return regeneratorRuntime.async(function onSubmit$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        payload = {
                          name: data.name,
                          email: data.email,
                          role_id: data.role_id,
                          is_active: data.is_active.includes('on')
                        };
                        _context2.prev = 1;
                        url = window.location.pathname;
                        segments = url.split('/');
                        Id = segments[segments.length - 1];
                        _context2.next = 7;
                        return regeneratorRuntime.awrap(fetch("/api/users/edit/".concat(Id), {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(payload)
                        }));

                      case 7:
                        response = _context2.sent;

                        if (response.status === 401) {
                          window.location.href = '/users/login';
                        }

                        if (response.ok) {
                          _context2.next = 15;
                          break;
                        }

                        _context2.next = 12;
                        return regeneratorRuntime.awrap(response.json());

                      case 12:
                        errorResponse = _context2.sent;
                        (0, _main.updateErrorMessages)(errorResponse.errors || {});
                        throw new Error(errorResponse.message);

                      case 15:
                        _context2.next = 17;
                        return regeneratorRuntime.awrap(response.json());

                      case 17:
                        result = _context2.sent;
                        (0, _main.toast)({
                          message: result.message,
                          type: 'success',
                          title: 'Thành Công!!'
                        });
                        _context2.next = 24;
                        break;

                      case 21:
                        _context2.prev = 21;
                        _context2.t0 = _context2["catch"](1);
                        (0, _main.toast)({
                          type: 'error',
                          title: 'lỗi',
                          message: _context2.t0.message
                        });

                      case 24:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, null, null, [[1, 21]]);
              }
            });
          }

          formLogin = document.querySelector('#form-login');

          if (formLogin) {
            (0, _main.Validator)({
              form: '#form-login',
              formGroupSelector: '.form-group',
              errorSelector: '.form-message',
              rules: [_main.Validator.isRequired('#email', 'Vui lòng nhập tên tài khoản của bạn'), _main.Validator.isEmail('#email'), _main.Validator.isPassword('#password')],
              onSubmit: function onSubmit(data) {
                var payload, response, errorResponse, result;
                return regeneratorRuntime.async(function onSubmit$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        payload = {
                          email: data.email,
                          password: data.password
                        };
                        _context3.prev = 1;
                        _context3.next = 4;
                        return regeneratorRuntime.awrap(fetch("/api/users/login", {
                          method: 'POST',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(payload)
                        }));

                      case 4:
                        response = _context3.sent;

                        if (response.status === 401) {
                          window.location.href = '/users/login';
                        }

                        if (response.ok) {
                          _context3.next = 12;
                          break;
                        }

                        _context3.next = 9;
                        return regeneratorRuntime.awrap(response.json());

                      case 9:
                        errorResponse = _context3.sent;
                        (0, _main.updateErrorMessages)(errorResponse.errors);
                        throw new Error(errorResponse.message);

                      case 12:
                        _context3.next = 14;
                        return regeneratorRuntime.awrap(response.json());

                      case 14:
                        result = _context3.sent;
                        (0, _main.toast)({
                          message: result.message,
                          type: 'success',
                          title: 'Thành Công!!'
                        });
                        _context3.next = 18;
                        return regeneratorRuntime.awrap(new Promise(function (resolve) {
                          return setTimeout(resolve, 700);
                        }));

                      case 18:
                        window.location.href = '/';
                        _context3.next = 24;
                        break;

                      case 21:
                        _context3.prev = 21;
                        _context3.t0 = _context3["catch"](1);
                        (0, _main.toast)({
                          type: 'error',
                          title: 'lỗi',
                          message: _context3.t0.message
                        });

                      case 24:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, null, null, [[1, 21]]);
              }
            });
          }

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
});
var deleteButtons = document.querySelectorAll('[data-delete]');
console.log(deleteButtons);

if (deleteButtons) {
  deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener('click', function _callee2(e) {
      var isConfirm, response, errorResponse, result;
      return regeneratorRuntime.async(function _callee2$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap((0, _main.confirmButton)('Bạn có chắc có muốn xóa không ?').then(function (result) {
                return result;
              }));

            case 2:
              isConfirm = _context5.sent;

              if (!(isConfirm !== 1)) {
                _context5.next = 5;
                break;
              }

              return _context5.abrupt("return");

            case 5:
              _context5.prev = 5;
              _context5.next = 8;
              return regeneratorRuntime.awrap(fetch("/api/users/delete/".concat(deleteButton.getAttribute('data-delete')), {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              }));

            case 8:
              response = _context5.sent;

              if (response.status === 401) {
                window.location.href = '/users/login';
              }

              if (response.ok) {
                _context5.next = 16;
                break;
              }

              _context5.next = 13;
              return regeneratorRuntime.awrap(response.json());

            case 13:
              errorResponse = _context5.sent;
              console.log(errorResponse);
              throw new Error(errorResponse.message || 'Có lỗi xảy ra');

            case 16:
              _context5.next = 18;
              return regeneratorRuntime.awrap(response.json());

            case 18:
              result = _context5.sent;
              (0, _main.toast)({
                message: result.message,
                type: 'success',
                title: 'Xóa Thành Công!!'
              });
              deleteButton.closest('tr').remove();
              _context5.next = 26;
              break;

            case 23:
              _context5.prev = 23;
              _context5.t0 = _context5["catch"](5);
              (0, _main.toast)({
                type: 'error',
                title: 'Lỗi',
                message: _context5.t0.message || 'Không thể xóa vai trò'
              });

            case 26:
            case "end":
              return _context5.stop();
          }
        }
      }, null, null, [[5, 23]]);
    });
  });
}