"use strict";

var _main = require("./main.js");

/* eslint-disable no-undef */
document.addEventListener('DOMContentLoaded', function _callee() {
  var formCreate, formUpdate;
  return regeneratorRuntime.async(function _callee$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          formCreate = document.querySelector('#create_role');

          if (formCreate) {
            (0, _main.Validator)({
              form: '#create_role',
              formGroupSelector: '.form-group',
              errorSelector: '.form-message',
              rules: [_main.Validator.isRequired('#title', 'Vui lòng nhập tên phân lương của bạn')],
              onSubmit: function onSubmit(data) {
                var response, errorResponse, result;
                return regeneratorRuntime.async(function onSubmit$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return regeneratorRuntime.awrap(fetch('/api/role/create', {
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
                        (0, _main.updateErrorMessages)(errorResponse.errors || {});
                        throw new Error(errorResponse.message);

                      case 11:
                        _context.next = 13;
                        return regeneratorRuntime.awrap(response.json());

                      case 13:
                        result = _context.sent;
                        (0, _main.toast)({
                          message: result.message,
                          type: 'success',
                          title: 'Thành Công!!'
                        });
                        _context.next = 20;
                        break;

                      case 17:
                        _context.prev = 17;
                        _context.t0 = _context["catch"](0);
                        (0, _main.toast)({
                          type: 'error',
                          title: 'lỗi',
                          message: _context.t0.message
                        });

                      case 20:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, null, null, [[0, 17]]);
              }
            });
          }

          formUpdate = document.querySelector('#edit_role');

          if (formUpdate) {
            (0, _main.Validator)({
              form: '#edit_role',
              formGroupSelector: '.form-group',
              errorSelector: '.form-message',
              rules: [_main.Validator.isRequired('#title', 'Vui lòng nhập tên phân lương của bạn')],
              onSubmit: function onSubmit(data) {
                var url, segments, Id, response, errorResponse, result;
                return regeneratorRuntime.async(function onSubmit$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        url = window.location.pathname;
                        segments = url.split('/');
                        Id = segments[segments.length - 1];
                        _context2.prev = 3;
                        _context2.next = 6;
                        return regeneratorRuntime.awrap(fetch("/api/role/edit/".concat(Id), {
                          method: 'PATCH',
                          headers: {
                            'Content-Type': 'application/json'
                          },
                          body: JSON.stringify(data)
                        }));

                      case 6:
                        response = _context2.sent;

                        if (response.status === 401) {
                          window.location.href = '/users/login';
                        }

                        if (response.ok) {
                          _context2.next = 14;
                          break;
                        }

                        _context2.next = 11;
                        return regeneratorRuntime.awrap(response.json());

                      case 11:
                        errorResponse = _context2.sent;
                        (0, _main.updateErrorMessages)(errorResponse.errors || {});
                        throw new Error(errorResponse.message);

                      case 14:
                        _context2.next = 16;
                        return regeneratorRuntime.awrap(response.json());

                      case 16:
                        result = _context2.sent;
                        (0, _main.toast)({
                          message: result.message,
                          type: 'success',
                          title: 'Thành Công!!'
                        });
                        _context2.next = 23;
                        break;

                      case 20:
                        _context2.prev = 20;
                        _context2.t0 = _context2["catch"](3);
                        (0, _main.toast)({
                          type: 'error',
                          title: 'lỗi',
                          message: _context2.t0.message
                        });

                      case 23:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, null, null, [[3, 20]]);
              }
            });
          }

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var deleteButtons = document.querySelectorAll('#data-role-delete-data-id');
console.log(deleteButtons);

if (deleteButtons) {
  deleteButtons.forEach(function (deleteButton) {
    deleteButton.addEventListener('click', function _callee2(e) {
      var isConfirm, response, errorResponse, result;
      return regeneratorRuntime.async(function _callee2$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap((0, _main.confirmButton)('Bạn có chắc có muốn xóa không ?').then(function (result) {
                return result;
              }));

            case 2:
              isConfirm = _context4.sent;

              if (!(isConfirm !== 1)) {
                _context4.next = 5;
                break;
              }

              return _context4.abrupt("return");

            case 5:
              _context4.prev = 5;
              _context4.next = 8;
              return regeneratorRuntime.awrap(fetch("/api/role/delete/".concat(deleteButton.getAttribute('value')), {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json'
                }
              }));

            case 8:
              response = _context4.sent;

              if (response.status === 401) {
                window.location.href = '/users/login';
              }

              if (response.ok) {
                _context4.next = 16;
                break;
              }

              _context4.next = 13;
              return regeneratorRuntime.awrap(response.json());

            case 13:
              errorResponse = _context4.sent;
              console.log(errorResponse);
              throw new Error(errorResponse.message || 'Có lỗi xảy ra');

            case 16:
              _context4.next = 18;
              return regeneratorRuntime.awrap(response.json());

            case 18:
              result = _context4.sent;
              (0, _main.toast)({
                message: result.message,
                type: 'success',
                title: 'Xóa Thành Công!!'
              });
              deleteButton.closest('tr').remove();
              _context4.next = 26;
              break;

            case 23:
              _context4.prev = 23;
              _context4.t0 = _context4["catch"](5);
              (0, _main.toast)({
                type: 'error',
                title: 'Lỗi',
                message: _context4.t0.message || 'Không thể xóa vai trò'
              });

            case 26:
            case "end":
              return _context4.stop();
          }
        }
      }, null, null, [[5, 23]]);
    });
  });
} // Permissions


var tablePermission = document.querySelector('#table-permissions');
console.log(tablePermission);

if (tablePermission) {
  var buttonSubmit = document.querySelector('#button-submit');
  console.log(buttonSubmit);
  buttonSubmit.addEventListener('click', function _callee3(e) {
    var permissions, rows, response, errorResponse, result;
    return regeneratorRuntime.async(function _callee3$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            e.preventDefault();
            permissions = [];
            rows = tablePermission.querySelectorAll('[data-name]');
            rows.forEach(function (row) {
              var name = row.getAttribute('data-name');
              var inputs = row.querySelectorAll('input');

              if (name == 'id') {
                inputs.forEach(function (input) {
                  var id = input.value;
                  permissions.push({
                    id: id,
                    permissions: []
                  });
                });
              } else {
                inputs.forEach(function (input, index) {
                  var checked = input.checked;

                  if (checked) {
                    permissions[index].permissions.push(name);
                  }
                });
              }
            });
            console.log(permissions);

            if (!(permissions.length > 0)) {
              _context5.next = 26;
              break;
            }

            _context5.prev = 6;
            _context5.next = 9;
            return regeneratorRuntime.awrap(fetch('/api/role/permissions', {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                permissions: permissions
              })
            }));

          case 9:
            response = _context5.sent;

            if (response.status === 401) {
              window.location.href = '/users/login';
            }

            if (response.ok) {
              _context5.next = 17;
              break;
            }

            _context5.next = 14;
            return regeneratorRuntime.awrap(response.json());

          case 14:
            errorResponse = _context5.sent;
            console.log(errorResponse);
            throw new Error(errorResponse.message || 'Có lỗi xảy ra khi cập nhật phân quyền');

          case 17:
            _context5.next = 19;
            return regeneratorRuntime.awrap(response.json());

          case 19:
            result = _context5.sent;
            (0, _main.toast)({
              message: result.message || 'Cập nhật phân quyền thành công!',
              type: 'success',
              title: 'Thành Công!'
            });
            _context5.next = 26;
            break;

          case 23:
            _context5.prev = 23;
            _context5.t0 = _context5["catch"](6);
            (0, _main.toast)({
              type: 'error',
              title: 'Lỗi',
              message: _context5.t0.message || 'Không thể cập nhật phân quyền'
            });

          case 26:
          case "end":
            return _context5.stop();
        }
      }
    }, null, null, [[6, 23]]);
  });
} // End Permissions
// Permissions Data Default


var dataRecords = document.querySelector('[data-records]');

if (dataRecords) {
  var records = JSON.parse(dataRecords.getAttribute('data-records'));

  var _tablePermission = document.querySelector('#table-permissions');

  records.forEach(function (record, index) {
    var permissions = record.permission;
    permissions.forEach(function (permission) {
      var row = _tablePermission.querySelector("[data-name=\"".concat(permission, "\"]"));

      var input = row.querySelectorAll('input')[index];
      input.checked = true;
    });
  });
} // End Permission Data Default