/* eslint-disable no-undef */
import {
  toast,
  Validator,
  confirmButton,
  updateErrorMessages
} from './main.mjs'
document.addEventListener('DOMContentLoaded', async function () {
  const formCreate = document.querySelector('#create_role')
  if (formCreate) {
    Validator({
      form: '#create_role',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [Validator.isRequired('#title', 'Vui lòng nhập tên phân lương của bạn')],
      onSubmit: async function (data) {
        try {
          const loader = document.getElementById('loader')
          loader.classList.remove('hidden')
          const response = await fetch('/api/role/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          if (response.status === 401) {
            window.location.href = '/users/login'
          }

          if (!response.ok) {
            // Cố gắng lấy thông báo lỗi từ phản hồi của server
            const errorResponse = await response.json()
            updateErrorMessages(errorResponse.errors || {})
            throw new Error(errorResponse.message)
          }
          const result = await response.json()
          toast({
            message: result.message,
            type: 'success',
            title: 'Thành Công!!'
          })
        } catch (error) {
          toast({
            type: 'error',
            title: 'lỗi',
            message: error.message
          })
        } finally {
          // Ẩn loader khi API hoàn tất
          loader.classList.add('hidden')
        }
      }
    })
  }
  const formUpdate = document.querySelector('#edit_role')
  if (formUpdate) {
    Validator({
      form: '#edit_role',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [Validator.isRequired('#title', 'Vui lòng nhập tên phân lương của bạn')],
      onSubmit: async function (data) {
        const url = window.location.pathname
        const segments = url.split('/')
        const Id = segments[segments.length - 1]
        try {
          const loader = document.getElementById('loader')
          loader.classList.remove('hidden')
          const response = await fetch(`/api/role/edit/${Id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
          })
          if (response.status === 401) {
            window.location.href = '/users/login'
          }
          if (!response.ok) {
            // Cố gắng lấy thông báo lỗi từ phản hồi của server
            const errorResponse = await response.json()
            updateErrorMessages(errorResponse.errors || {})
            throw new Error(errorResponse.message)
          }
          const result = await response.json()
          toast({
            message: result.message,
            type: 'success',
            title: 'Thành Công!!'
          })
        } catch (error) {
          toast({
            type: 'error',
            title: 'lỗi',
            message: error.message
          })
        } finally {
          // Ẩn loader khi API hoàn tất
          loader.classList.add('hidden')
        }
      }
    })
  }
})
const deleteButtons = document.querySelectorAll('#data-role-delete-data-id')
console.log(deleteButtons)

if (deleteButtons) {
  deleteButtons.forEach((deleteButton) => {
    deleteButton.addEventListener('click', async function (e) {
      const isConfirm = await confirmButton('Bạn có chắc có muốn xóa không ?').then((result) => result)
      if (isConfirm !== 1) return

      try {
        const loader = document.getElementById('loader')
        loader.classList.remove('hidden')
        const response = await fetch(`/api/role/delete/${deleteButton.getAttribute('value')}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.status === 401) {
          window.location.href = '/users/login'
        }
        if (!response.ok) {
          const errorResponse = await response.json()
          console.log(errorResponse)
          throw new Error(errorResponse.message || 'Có lỗi xảy ra')
        }

        const result = await response.json()
        toast({
          message: result.message,
          type: 'success',
          title: 'Xóa Thành Công!!'
        })

        deleteButton.closest('tr').remove()
      } catch (e) {
        toast({
          type: 'error',
          title: 'Lỗi',
          message: e.message || 'Không thể xóa vai trò'
        })
      } finally {
        // Ẩn loader khi API hoàn tất
        loader.classList.add('hidden')
      }
    })
  })
}
// Permissions
const tablePermission = document.querySelector('#table-permissions')
console.log(tablePermission)
if (tablePermission) {
  const buttonSubmit = document.querySelector('#button-submit')
  console.log(buttonSubmit)
  buttonSubmit.addEventListener('click', async (e) => {
    e.preventDefault()
    let permissions = []
    const rows = tablePermission.querySelectorAll('[data-name]')

    rows.forEach((row) => {
      const name = row.getAttribute('data-name')
      const inputs = row.querySelectorAll('input')
      if (name == 'id') {
        inputs.forEach((input) => {
          const id = input.value
          permissions.push({
            id: id,
            permissions: []
          })
        })
      } else {
        inputs.forEach((input, index) => {
          const checked = input.checked
          if (checked) {
            permissions[index].permissions.push(name)
          }
        })
      }
    })

    console.log(permissions)
    if (permissions.length > 0) {
      try {
        const loader = document.getElementById('loader')
        loader.classList.remove('hidden')
        const response = await fetch('/api/role/permissions', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            permissions
          })
        })
        if (response.status === 401) {
          window.location.href = '/users/login'
        }

        if (!response.ok) {
          const errorResponse = await response.json()
          console.log(errorResponse)
          throw new Error(errorResponse.message || 'Có lỗi xảy ra khi cập nhật phân quyền')
        }

        const result = await response.json()
        toast({
          message: result.message || 'Cập nhật phân quyền thành công!',
          type: 'success',
          title: 'Thành Công!'
        })
      } catch (e) {
        toast({
          type: 'error',
          title: 'Lỗi',
          message: e.message || 'Không thể cập nhật phân quyền'
        })
      } finally {
        // Ẩn loader khi API hoàn tất
        loader.classList.add('hidden')
      }
    }
  })
}
// End Permissions

// Permissions Data Default
const dataRecords = document.querySelector('[data-records]')
if (dataRecords) {
  const records = JSON.parse(dataRecords.getAttribute('data-records'))
  const tablePermission = document.querySelector('#table-permissions')
  records.forEach((record, index) => {
    const permissions = record.permission
    permissions.forEach((permission) => {
      const row = tablePermission.querySelector(`[data-name="${permission}"]`)
      const input = row.querySelectorAll('input')[index]

      input.checked = true
    })
  })
}
// End Permission Data Default
window.addEventListener('pageshow', async (event) => {
  if (event.persisted) {
    const f = document.querySelector('#role_view')
    if (f) {
      location.reload()
    }
  }
})