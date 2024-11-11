/* eslint-disable no-undef */
import {
  Filter,
  toast,
  StringData,
  filterSelect,
  handlefilter,
  updateAction,
  checkboxMulti,
  displayPagination,
  Validator,
  tbody,
  updateErrorMessages
} from './main.mjs'
tbody('/salary/edit/')
const totalItemsElement = document.querySelector('#countProducts')
const limitElement = document.querySelector('#limit')
// Các Biến Toàn Cục
const totalItems = totalItemsElement ? parseInt(totalItemsElement.getAttribute('countProducts'), 10) || 0 : 0
const itemsPerPage = limitElement ? parseInt(limitElement.getAttribute('limit'), 10) || 7 : 7
let currentPage = 1
let totalPages = Math.ceil(totalItems / itemsPerPage)
let editRowIndex = -1 // Biến lưu chỉ số hàng đang sửa
let ispages = -1
Filter({
    name: '#filterbyname',
    salaryType: '#filterbysalarytype'
  },
  ApiLocPhanLuong,
  currentPage
)
if (document.getElementById('pagination')) {
  displayPagination({
      name: '#filterbyname',
      salaryType: '#filterbysalarytype'
    },
    ApiLocPhanLuong,
    currentPage,
    totalPages
  )
}
filterSelect({
    name: '#filterbyname',
    salaryType: '#filterbysalarytype'
  },
  ApiLocPhanLuong,
  currentPage
)
async function ApiLocPhanLuong(data) {
  try {
    const loader = document.getElementById('loader')
    loader.classList.remove('hidden')
    const response = await fetch('/api/salary/filter', {
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
      updateErrorMessages(errorResponse.errors)
      throw new Error(errorResponse.message)
    }

    const result = await response.json()
    console.log(result)
    document.querySelector('#totalitems').innerHTML = `Tổng bản ghi là ${result.totalDocuments}`
    // Rerender lại giao diện với dữ liệu mới
    rerenderUI(result.data)
    // Phân trang lại
    currentPage = result.currentPage
    totalPages = result.totalPages
    displayPagination({
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiLocPhanLuong,
      currentPage,
      totalPages
    )

    // Lưu dữ liệu vào localStorage (nếu cần)
    localStorage.setItem('data', JSON.stringify(data))
  } catch (error) {
    console.log(error)
    toast({
      message: error.message
    })
  } finally {
    // Ẩn loader khi API hoàn tất
    loader.classList.add('hidden')
  }
}

function rerenderUI(data) {
  console.log(data)
  const tableBody = document.querySelector('tbody')
  if (data.length > 0) {
    // Xóa dữ liệu cũ trong bảng
    tableBody.innerHTML = ''
    // Tạo bảng mới với dữ liệu trả về
    data.forEach((item) => {
      console.log('item', item)
      const row = `
    <tr class="w-full cursor-pointer" id="${item._id}">
      <td class="px-1 py-5 border-b border-gray-200 bg-white text-sm">
        <input type="checkbox" class="outline-none border-none" name='id' value="${item._id}">
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm md:hidden" colspan="3">
        <div class="flex justify-between">
          <p class="text-gray-900">${item.ten}</p>
          <span class="relative inline-block px-3 py-1">
            <span class="inline-block w-3 h-3 rounded-full ${item.is_active ? 'bg-blue-500' : 'bg-gray-400'}"></span>
          </span>
        </div>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
        <p class="text-gray-900">${item.ten}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
        <span class="relative inline-block px-3 py-1 font-semibold text-${
          item.is_active ? 'blue' : 'gray'
        }-900 leading-tight">
          <span aria-hidden class="absolute inset-0 bg-${
            item.is_active ? 'blue' : 'gray'
          }-200 opacity-50 rounded-full"></span>
          <span class="relative">${item.is_active ? 'Đã bật' : 'Vô hiệu'}</span>
        </span>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
        <p class="text-gray-900">${item.ten
          .split(' ')
          .map((word) => word[0])
          .join('')}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
        <p class="text-gray-900">${item.mo_ta || ''}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right hidden md:table-cell">
        <p class="text-gray-900">${new Date(item.ngay_tao).toLocaleDateString('vi-VN')}</p>
      </td>
    </tr>
  `

      tableBody.insertAdjacentHTML('beforeend', row)
    })
  } else {
    tableBody.innerHTML = StringData('/salary/create')
  }
  const checkboxMulti = document.querySelector('[checkbox-multi]')
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
  const inputsID = checkboxMulti.querySelectorAll("input[name='id']")
  console.log(inputsID)
  inputsID.forEach((input) => {
    input.addEventListener('click', () => {
      const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
      inputCheckAll.checked = countChecked === inputsID.length
      // Cập nhật hành động khi có sự thay đổi
      updateAction({
          name: '#filterbyname',
          salaryType: '#filterbysalarytype'
        },
        ApiLocPhanLuong,
        '/api/salary/delete-items',
        '/salary/create',
        handlefilter,
        currentPage
      )
    })
  })
}
checkboxMulti({
    name: '#filterbyname',
    salaryType: '#filterbysalarytype'
  },
  ApiLocPhanLuong,
  '/api/salary/delete-items',
  '/salary/create',
  handlefilter,
  currentPage
)
// Xử lý khi nhấn nút "Áp dụng bộ lọc"
const applyBtn = document.getElementById('applyBtn')
if (applyBtn) {
  applyBtn.addEventListener('click', async function () {
    await handlefilter({
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiLocPhanLuong,
      currentPage
    )
  })
}
const filterDiv = document.getElementById('toggleincrease_or_decrease')
if (filterDiv) {
  filterDiv.querySelector('svg').addEventListener('click', async function () {
    await handlefilter({
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiLocPhanLuong,
      currentPage
    )
  })
}
const filterSl = document.getElementById('filterSelect')
if (filterSl) {
  filterSl.addEventListener('change', async function () {
    await handlefilter({
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiLocPhanLuong,
      currentPage
    )
  })
}

const filterbysalarytype = document.querySelector('#filterbysalarytype')
if (filterbysalarytype) {
  filterbysalarytype.addEventListener('click', async function () {
    await handlefilter({
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiLocPhanLuong,
      currentPage
    )
  })
}
const filterbyname = document.querySelector('#filterbyname')
if (filterbyname) {
  let debounceTimeout
  filterbyname.addEventListener('input', async function () {
    clearTimeout(debounceTimeout)

    debounceTimeout = setTimeout(async () => {
      await handlefilter({
          name: '#filterbyname',
          salaryType: '#filterbysalarytype'
        },
        ApiLocPhanLuong,
        currentPage
      )
    }, 700)
  })
}

// Phân Lương

const addRowBtn = document.getElementById('addRowButton')
if (addRowBtn) {
  addRowBtn.addEventListener('click', function () {
    // Lấy giá trị từ các trường input
    const companySelect = document.getElementById('company')
    const accountSelect = document.getElementById('account')
    const companyId = companySelect.value // Lấy ID công ty
    const accountId = accountSelect.value // Lấy ID tài khoản
    const companyName = companySelect.options[companySelect.selectedIndex].text // Lấy tên công ty
    const accountName = accountSelect.options[accountSelect.selectedIndex].text // Lấy tên tài khoản

    // Kiểm tra nếu các trường không rỗng
    if (companyId && accountId) {
      const table = document.getElementById('accountTable').getElementsByTagName('tbody')[0]

      // Nếu đang sửa, cập nhật hàng
      if (editRowIndex >= 0) {
        const row = table.rows[editRowIndex]
        row.cells[1].textContent = companyName // Cập nhật công ty
        row.cells[2].textContent = accountName // Cập nhật tài khoản
        row.cells[1].setAttribute('data-id', companyId) // Cập nhật ID công ty
        row.cells[2].setAttribute('data-id', accountId) // Cập nhật ID tài khoản
        document.getElementById('addRowButton').textContent = 'Thêm Hàng' // Đặt lại văn bản nút
        editRowIndex = -1 // Đặt lại chỉ số sửa
      } else {
        // Tạo một hàng mới cho bảng
        const newRow = table.insertRow()

        // Thêm các ô vào hàng mới
        const cell1 = newRow.insertCell(0)
        const cell2 = newRow.insertCell(1)
        const cell3 = newRow.insertCell(2)
        const cell4 = newRow.insertCell(3) // Ô cho nút xóa
        // add class
        cell1.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2')
        cell2.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2')
        cell3.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2')
        cell4.classList.add('border-b', 'border-gray-300', 'px-4', 'py-2')
        // Điền dữ liệu vào các ô
        cell1.textContent = table.rows.length // Số thứ tự tự động
        cell2.textContent = companyName // Hiển thị tên công ty
        cell3.textContent = accountName // Hiển thị tên tài khoản
        cell2.setAttribute('data-id', companyId) // Lưu ID công ty
        cell3.setAttribute('data-id', accountId) // Lưu ID tài khoản

        // Tạo nút xóa
        const deleteButton = document.createElement('button')
        deleteButton.textContent = 'Xóa'
        deleteButton.className = 'text-red-500 hover:text-red-700'
        cell4.appendChild(deleteButton)
      }

      // Xóa giá trị trong các trường input sau khi thêm
      companySelect.value = ''
      accountSelect.value = ''
    } else {
      toast({
        type: 'error',
        message: 'Vui lòng điền đầy đủ thông tin!',
        title: 'Cảnh Báo!!!'
      })
    }
  })
}

function getTableData() {
  const table = document.getElementById('accountTable').getElementsByTagName('tbody')[0]
  const data = []

  // Lặp qua tất cả các hàng trong bảng
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i]
    const rowData = {
      companyId: row.cells[1].getAttribute('data-id'), // Lấy ID công ty
      accountId: row.cells[2].getAttribute('data-id') // Lấy ID tài khoản
    }

    data.push(rowData) // Thêm dữ liệu của hàng vào mảng data
  }

  return data
}
let accountTable = document.getElementById('accountTable')
if (accountTable) {
  accountTable.addEventListener('click', function (event) {
    const target = event.target

    // Kiểm tra xem người dùng có nhấp vào ô thứ 3 (chứa nút xóa) không
    if (target.tagName === 'BUTTON' && target.closest('td').cellIndex == 3) {
      const row = target.closest('tr') // Lấy hàng cha chứa nút bấm
      const rowIndex = parseInt(row.cells[0].textContent) - 1 // Lấy chỉ số hàng dựa trên textContent của ô đầu tiên (cell[0])

      const table = accountTable.getElementsByTagName('tbody')[0]
      // Xóa hàng theo chỉ số
      table.deleteRow(rowIndex)

      // Cập nhật lại số thứ tự (STT) cho các hàng còn lại
      updateRowIndices()
    }
  })
}
// Thêm sự kiện click cho các hàng trong bảng
accountTable = document.getElementById('accountTable')
if (accountTable) {
  document.getElementById('accountTable').addEventListener('click', function (event) {
    const target = event.target
    if (target.tagName === 'TD' && target.cellIndex < 3) {
      const row = target.closest('tr')
      console.log(row)
      editRowIndex = row.rowIndex - 1 // Lưu chỉ số hàng đang sửa
      document.getElementById('company').value = row.cells[1].getAttribute('data-id') // Tải ID công ty vào ô nhập
      document.getElementById('account').value = row.cells[2].getAttribute('data-id') // Tải ID tài khoản vào ô nhập
      document.getElementById('addRowButton').textContent = 'Sửa' // Thay đổi văn bản nút thành "Sửa"
    }
  })
}
// Hàm cập nhật số thứ tự
function updateRowIndices() {
  const table = document.getElementById('accountTable').getElementsByTagName('tbody')[0]
  for (let i = 0; i < table.rows.length; i++) {
    table.rows[i].cells[0].textContent = i + 1 // Cập nhật STT
  }
}

document.addEventListener('DOMContentLoaded', async function () {
  const formCreate = document.querySelector('#form-1')
  if (formCreate) {
    Validator({
      form: '#form-1',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#ten', 'Vui lòng nhập tên phân lương của bạn'),
        Validator.maxLength('#ten', 255),
        Validator.isRequired('#loai', 'Vui lòng nhập chọn loại lương của bạn')
      ],
      onSubmit: async function (data) {
        // Lấy dữ liệu từ bảng
        const accounts = getTableData()
        console.log(data)

        // Chuyển đổi dữ liệu
        const transformedData = {
          ten: data.ten, // Có thể chỉnh sửa giá trị này nếu cần
          loai: parseInt(data.loai), // Chuyển đổi loai sang số
          mo_ta: data.mo_ta, // Mô tả cố định
          is_active: !data.is_active.includes('on'), // Chuyển đổi trạng thái thành boolean
          tai_khoan_ke_toan: accounts.map((account) => ({
            id_congty: account.companyId, // Chuyển đổi companyId thành ObjectId
            id_ke_toan: account.accountId // Chuyển đổi accountId thành ObjectId
          }))
        }
        try {
          const loader = document.getElementById('loader')
          loader.classList.remove('hidden')
          const response = await fetch('/api/salary', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(transformedData)
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
  const formEdit = document.querySelector('#form-2')
  if (formEdit) {
    Validator({
      form: '#form-2',
      formGroupSelector: '.form-group',
      errorSelector: '.form-message',
      rules: [
        Validator.isRequired('#ten', 'Vui lòng nhập tên phân lương của bạn'),
        Validator.maxLength('#ten', 255),
        Validator.isRequired('#loai', 'Vui lòng nhập chọn loại lương của bạn')
      ],
      onSubmit: async function (data) {
        // Lấy dữ liệu từ bảng
        const accounts = getTableData()
        console.log(data)

        // Chuyển đổi dữ liệu
        const transformedData = {
          ten: data.ten, // Có thể chỉnh sửa giá trị này nếu cần
          loai: parseInt(data.loai), // Chuyển đổi loai sang số
          mo_ta: data.mo_ta, // Mô tả cố định
          is_active: !data.is_active.includes('on'), // Chuyển đổi trạng thái thành boolean
          tai_khoan_ke_toan: accounts.map((account) => ({
            id_congty: account.companyId, // Chuyển đổi companyId thành ObjectId
            id_ke_toan: account.accountId // Chuyển đổi accountId thành ObjectId
          }))
        }
        try {
          const url = window.location.pathname
          const segments = url.split('/')
          const salaryId = segments[segments.length - 1]
          const loader = document.getElementById('loader')
          loader.classList.remove('hidden')
          const response = await fetch(`/api/salary/edit/${salaryId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(transformedData)
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
const form = document.querySelector('#form-1')
const action = document.querySelector('[action]')

// Hàm handleSubmit để xử lý sự kiện
function handleSubmit(e, form) {
  e.preventDefault() // Ngăn chặn hành vi mặc định
  form.dispatchEvent(new Event('submit')) // Gửi sự kiện submit để thực hiện validation trước
}

console.log(form)
console.log(action)
// Đảm bảo sự kiện chỉ được gán một lần
if (form && action) {
  action.removeEventListener('click', (e) => handleSubmit(e, form)) // Xóa sự kiện cũ (nếu có)
  action.addEventListener('click', (e) => handleSubmit(e, form)) // Gán sự kiện mới
}

const formedit = document.querySelector('#form-2')
console.log(formedit)
if (formedit && action) {
  action.removeEventListener('click', (e) => handleSubmit(e, formedit))
  action.addEventListener('click', (e) => handleSubmit(e, formedit))
}
window.addEventListener('pageshow', async (event) => {
  if (event.persisted) {
    const filterbysalarytype = document.querySelector('#filterbysalarytype')
    if (filterbysalarytype) {
      await handlefilter({
          name: '#filterbyname',
          salaryType: '#filterbysalarytype'
        },
        ApiLocPhanLuong,
        currentPage
      )
    }
  }
})