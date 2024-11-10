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
  insertRow,
  getTableData,
  updateErrorMessages
} from './main.js'
let editRowIndex = -1

insertRow('incomeTable', 'salaryportiontn', 'sumtn', 'addRowButtontn', editRowIndex)
insertRow('deductionTable', 'salaryportionkt', 'sumkt', 'addRowButtonkt', editRowIndex)
const formCreate = document.querySelector('#formCreate')
if (formCreate) {
  Validator({
    form: '#formCreate',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      Validator.isRequired('#ten', 'Vui lòng nhập tên cơ cấu lương của bạn'),
      Validator.maxLength('#ten', 255, 'Tên cơ cấu lương không được vượt quá 255 ký tự'),
      Validator.isRequired('#id_cong_ty', 'Vui lòng chọn công ty của bạn'),
      Validator.isRequired('#status', 'Vui lòng chọn trạng thái'),
      Validator.minLength('#chu_ky_phat_luong', 1, 'Vui lòng nhập chu kỳ phát lương'),
      Validator.maxLength('#chu_ky_phat_luong', 255, 'Chu kỳ phát lương không được vượt quá 255 ký tự'),
      Validator.isRequired('#don_vi_tien_te', 'Vui lòng nhập đơn vị tiền tệ của bạn'),
      Validator.maxLength('#don_vi_tien_te', 10, 'Đơn vị tiền tệ không được vượt quá 10 ký tự'),
      Validator.isRequired('#hinh_thuc_chi_tra_id_hinh_thuc', 'Vui lòng chọn hình thức chi trả'),
      Validator.isRequired('#hinh_thuc_chi_tra_id_tai_khoan', 'Vui lòng chọn tài khoản chi trả')
    ],

    onSubmit: async function (data) {
      // Lấy dữ liệu từ bảng
      const income = getTableData('incomeTable')
      const deduction = getTableData('deductionTable')
      data.thu_nhap = income
      data.khau_tru = deduction
      console.log(data)
      // Gọi API để lấy dữ liệu lọc
      try {
        const loader = document.getElementById('loader')
        loader.classList.remove('hidden')
        const response = await fetch(`/api/salaryStructure/create`, {
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
          const errorMessage = errorResponse.message || 'Lỗi khi gọi API'
          updateErrorMessages(errorResponse.errors || {})
          throw new Error(errorMessage)
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
const formEdit = document.querySelector('#formEdit')
if (formEdit) {
  Validator({
    form: '#formEdit',
    formGroupSelector: '.form-group',
    errorSelector: '.form-message',
    rules: [
      Validator.isRequired('#ten', 'Vui lòng nhập tên cơ cấu lương của bạn'),
      Validator.maxLength('#ten', 255, 'Tên cơ cấu lương không được vượt quá 255 ký tự'),
      Validator.isRequired('#id_cong_ty', 'Vui lòng chọn công ty của bạn'),
      Validator.isRequired('#status', 'Vui lòng chọn trạng thái'),
      Validator.minLength('#chu_ky_phat_luong', 1, 'Vui lòng nhập chu kỳ phát lương'),
      Validator.maxLength('#chu_ky_phat_luong', 255, 'Chu kỳ phát lương không được vượt quá 255 ký tự'),
      Validator.isRequired('#don_vi_tien_te', 'Vui lòng nhập đơn vị tiền tệ của bạn'),
      Validator.maxLength('#don_vi_tien_te', 10, 'Đơn vị tiền tệ không được vượt quá 10 ký tự'),
      Validator.isRequired('#hinh_thuc_chi_tra_id_hinh_thuc', 'Vui lòng chọn hình thức chi trả'),
      Validator.isRequired('#hinh_thuc_chi_tra_id_tai_khoan', 'Vui lòng chọn tài khoản chi trả')
    ],

    onSubmit: async function (data) {
      // Lấy dữ liệu từ bảng
      const income = getTableData('incomeTable')
      const deduction = getTableData('deductionTable')
      data.thu_nhap = income
      data.khau_tru = deduction
      console.log(data)
      // Gọi API để lấy dữ liệu lọc
      try {
        const url = window.location.pathname
        const segments = url.split('/')
        const Id = segments[segments.length - 1]
        const loader = document.getElementById('loader')
        loader.classList.remove('hidden')
        const response = await fetch(`/api/salaryStructure/edit/${Id}`, {
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
          console.log(errorResponse)
          const errorMessage = errorResponse.message || 'Lỗi khi gọi API'
          updateErrorMessages(errorResponse.errors || {})
          throw new Error(errorMessage)
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
tbody('/salaryStructure/edit/')
const totalItemsElement = document.querySelector('#countProducts')
const limitElement = document.querySelector('#limit')
// Các Biến Toàn Cục
const totalItems = totalItemsElement ? parseInt(totalItemsElement.getAttribute('countProducts'), 10) || 0 : 0
const itemsPerPage = limitElement ? parseInt(limitElement.getAttribute('limit'), 10) || 7 : 7
let currentPage = 1
let totalPages = Math.ceil(totalItems / itemsPerPage)
let ispages = -1
Filter(
  {
    name: '#filterbyname',
    salaryType: '#filterbysalarytype'
  },
  ApiFilterSalaryStructure,
  currentPage
)
if (document.getElementById('pagination')) {
  displayPagination(
    {
      name: '#filterbyname',
      salaryType: '#filterbysalarytype'
    },
    ApiFilterSalaryStructure,
    currentPage,
    totalPages
  )
}
filterSelect(
  {
    name: '#filterbyname',
    salaryType: '#filterbysalarytype'
  },
  ApiFilterSalaryStructure,
  currentPage
)
async function ApiFilterSalaryStructure(data) {
  try {
    const loader = document.getElementById('loader')
    loader.classList.remove('hidden')
    const response = await fetch('/api/salaryStructure/filter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      // Cố gắng lấy thông báo lỗi từ phản hồi của server
      const errorResponse = await response.json()
      const errorMessage = errorResponse.message || 'Lỗi khi gọi API'
      console.log('lỗi ', errorResponse)
      throw new Error(errorMessage)
    }

    const result = await response.json()
    console.log(result)
    document.querySelector('#totalitems').innerHTML = `Tổng bản ghi là ${result.totalDocuments}`
    // Rerender lại giao diện với dữ liệu mới
    rerenderUI(result.data)
    // Phân trang lại
    currentPage = result.currentPage
    totalPages = result.totalPages
    displayPagination(
      {
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiFilterSalaryStructure,
      currentPage,
      totalPages
    )
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
            <span class="inline-block w-3 h-3 rounded-full ${item.status ? 'bg-blue-500' : 'bg-gray-400'}"></span>
          </span>
        </div>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
        <p class="text-gray-900">${item.ten}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
        <span class="relative inline-block px-3 py-1 font-semibold text-${
          item.status ? 'blue' : 'gray'
        }-900 leading-tight">
          <span aria-hidden class="absolute inset-0 bg-${
            item.status ? 'blue' : 'gray'
          }-200 opacity-50 rounded-full"></span>
          <span class="relative">${item.status ? 'Có' : 'Không'}</span>
        </span>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
        <p class="text-gray-900">${item.chu_ky_phat_luong}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm hidden md:table-cell">
        <p class="text-gray-900">${item.don_vi_tien_te}</p>
      </td>
      <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm text-right hidden md:table-cell">
        <p class="text-gray-900"> ${new Date(item.updated_at).toLocaleDateString('vi-VN')} </p>
      </td>
    </tr>
  `

      tableBody.insertAdjacentHTML('beforeend', row)
    })
  } else {
    tableBody.innerHTML = StringData('/salaryStructure/create')
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
      updateAction(
        {
          name: '#filterbyname',
          salaryType: '#filterbysalarytype'
        },
        ApiFilterSalaryStructure,
        '/api/salaryStructure/delete-items',
        '/salaryStructure/create',
        handlefilter,
        currentPage
      )
    })
  })
}
checkboxMulti(
  {
    name: '#filterbyname',
    salaryType: '#filterbysalarytype'
  },
  ApiFilterSalaryStructure,
  '/api/salaryStructure/delete-items',
  '/salaryStructure/create',
  handlefilter,
  currentPage
)
// Xử lý khi nhấn nút "Áp dụng bộ lọc"
const applyBtn = document.getElementById('applyBtn')
if (applyBtn) {
  applyBtn.addEventListener('click', async function () {
    await handlefilter(
      {
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiFilterSalaryStructure,
      currentPage
    )
  })
}
const filterDiv = document.getElementById('toggleincrease_or_decrease')
if (filterDiv) {
  filterDiv.querySelector('svg').addEventListener('click', async function () {
    await handlefilter(
      {
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiFilterSalaryStructure,
      currentPage
    )
  })
}
const filterSl = document.getElementById('filterSelect')
if (filterSl) {
  filterSl.addEventListener('change', async function () {
    await handlefilter(
      {
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiFilterSalaryStructure,
      currentPage
    )
  })
}

const filterbysalarytype = document.querySelector('#filterbysalarytype')
if (filterbysalarytype) {
  filterbysalarytype.addEventListener('click', async function () {
    await handlefilter(
      {
        name: '#filterbyname',
        salaryType: '#filterbysalarytype'
      },
      ApiFilterSalaryStructure,
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
      await handlefilter(
        {
          name: '#filterbyname',
          salaryType: '#filterbysalarytype'
        },
        ApiFilterSalaryStructure,
        currentPage
      )
    }, 700)
  })
}

window.addEventListener('pageshow', async (event) => {
  if (event.persisted) {
    const filterbyname = document.querySelector('#filterbyname')
    if (filterbyname) {
      await handlefilter(
        {
          name: '#filterbyname',
          salaryType: '#filterbysalarytype'
        },
        ApiFilterSalaryStructure,
        currentPage
      )
    }
  }
})
