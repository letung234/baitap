/* eslint-disable no-undef */
var exports = {
  __esModule: true
}
// StringData
export function StringData(link) {
  return `
    <div class="flex justify-center items-center p-8 flex-col gap-4 absolute top-[300px] left-1/2 -translate-x-1/2 z-[15]">
      <div class="">
        <svg
          width="78"
          height="86"
          viewBox="0 0 78 86"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_9_1149)">
            <g clip-path="url(#clip1_9_1149)">
              <path
                d="M70 12.4642H20C16.134 12.4642 13 15.5982 13 19.4642V77.4642C13 81.3302 16.134 84.4642 20 84.4642H70C73.866 84.4642 77 81.3302 77 77.4642V19.4642C77 15.5982 73.866 12.4642 70 12.4642Z"
                stroke="#A6B1B9"
                stroke-width="2"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M8 2.46423H58C61.3137 2.46423 64 5.15052 64 8.46423V9.46423H66V8.46423C66 4.04595 62.4183 0.464233 58 0.464233H8C3.58172 0.464233 0 4.04595 0 8.46423V66.4642C0 70.8825 3.58172 74.4642 8 74.4642H10V72.4642H8C4.68629 72.4642 2 69.7779 2 66.4642V8.46423C2 5.15052 4.68629 2.46423 8 2.46423Z"
                fill="#A6B1B9"
              />
              <path
                d="M42 31.4642H66"
                stroke="#A6B1B9"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M42 51.4642H66"
                stroke="#A6B1B9"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M42 25.4642H55"
                stroke="#A6B1B9"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M42 45.4642H55"
                stroke="#A6B1B9"
                stroke-width="2"
                stroke-linecap="round"
              />
              <path
                d="M32 23.4642H26C24.8954 23.4642 24 24.3597 24 25.4642V31.4642C24 32.5688 24.8954 33.4642 26 33.4642H32C33.1046 33.4642 34 32.5688 34 31.4642V25.4642C34 24.3597 33.1046 23.4642 32 23.4642Z"
                stroke="#2D95F0"
                stroke-width="2"
              />
              <path
                d="M32 43.4642H26C24.8954 43.4642 24 44.3597 24 45.4642V51.4642C24 52.5688 24.8954 53.4642 26 53.4642H32C33.1046 53.4642 34 52.5688 34 51.4642V45.4642C34 44.3597 33.1046 43.4642 32 43.4642Z"
                stroke="#2D95F0"
                stroke-width="2"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_9_1149">
              <rect
                width="78"
                height="85"
                fill="white"
                transform="translate(0 0.464233)"
              />
            </clipPath>
            <clipPath id="clip1_9_1149">
              <rect
                width="78"
                height="85"
                fill="white"
                transform="translate(0 0.464233)"
              />
            </clipPath>
          </defs>
        </svg>
      </div>
      <p class="text-gray-500 text-xs">Không Tìm Thấy Dữ Liệu</p>
      <a href=${link} class="">
        <svg
          width="78"
          height="39"
          viewBox="0 0 78 39"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_ddd_9_1154)">
            <rect
              x="4.49503"
              y="2.46423"
              width="69"
              height="30"
              rx="6"
              fill="#2490EF"
            />
            <path
              d="M15.3558 13.0253V12.0097H22.4467V13.0253H19.4737V21.4642H18.3288V13.0253H15.3558ZM25.1877 21.6304C24.7384 21.6304 24.3306 21.5458 23.9644 21.3765C23.5981 21.2042 23.3073 20.9564 23.0918 20.6333C22.8764 20.307 22.7687 19.9131 22.7687 19.4514C22.7687 19.0452 22.8487 18.7159 23.0087 18.4635C23.1688 18.2081 23.3827 18.008 23.6504 17.8634C23.9182 17.7187 24.2136 17.611 24.5368 17.5402C24.863 17.4664 25.1908 17.4079 25.5201 17.3648C25.951 17.3094 26.3003 17.2679 26.568 17.2402C26.8389 17.2094 27.0358 17.1586 27.159 17.0878C27.2851 17.017 27.3482 16.8939 27.3482 16.7185V16.6816C27.3482 16.2261 27.2236 15.8721 26.9743 15.6198C26.7281 15.3674 26.3541 15.2412 25.8525 15.2412C25.3324 15.2412 24.9246 15.3551 24.6291 15.5828C24.3337 15.8106 24.1259 16.0537 24.0059 16.3122L22.9718 15.9429C23.1565 15.5121 23.4027 15.1766 23.7104 14.9365C24.0213 14.6934 24.3598 14.5241 24.7261 14.4287C25.0954 14.3302 25.4586 14.281 25.8156 14.281C26.0433 14.281 26.3049 14.3087 26.6004 14.3641C26.8989 14.4164 27.1867 14.5257 27.4636 14.6919C27.7437 14.8581 27.9761 15.1089 28.1607 15.4443C28.3454 15.7798 28.4377 16.2291 28.4377 16.7924V21.4642H27.3482V20.504H27.2928C27.219 20.6579 27.0959 20.8225 26.9235 20.998C26.7512 21.1734 26.5219 21.3227 26.2357 21.4458C25.9494 21.5689 25.6001 21.6304 25.1877 21.6304ZM25.3539 20.6517C25.7848 20.6517 26.1479 20.5671 26.4434 20.3978C26.7419 20.2286 26.9666 20.01 27.1174 19.7423C27.2713 19.4745 27.3482 19.1929 27.3482 18.8975V17.9003C27.3021 17.9557 27.2005 18.0065 27.0435 18.0527C26.8897 18.0957 26.7112 18.1342 26.508 18.1681C26.308 18.1988 26.1126 18.2265 25.9217 18.2512C25.734 18.2727 25.5817 18.2912 25.4647 18.3066C25.1816 18.3435 24.9169 18.4035 24.6707 18.4866C24.4275 18.5666 24.2306 18.6882 24.0798 18.8513C23.932 19.0113 23.8582 19.2299 23.8582 19.5068C23.8582 19.8854 23.9982 20.1716 24.2783 20.3655C24.5614 20.5563 24.92 20.6517 25.3539 20.6517ZM25.834 23.8094C25.6217 23.8094 25.4385 23.7371 25.2847 23.5924C25.1339 23.4478 25.0585 23.2739 25.0585 23.0708C25.0585 22.8676 25.1339 22.6938 25.2847 22.5491C25.4385 22.4045 25.6217 22.3321 25.834 22.3321C26.0464 22.3321 26.228 22.4045 26.3788 22.5491C26.5327 22.6938 26.6096 22.8676 26.6096 23.0708C26.6096 23.2739 26.5327 23.4478 26.3788 23.5924C26.228 23.7371 26.0464 23.8094 25.834 23.8094ZM33.3069 21.612C32.6668 21.612 32.1051 21.4596 31.6219 21.1549C31.1418 20.8502 30.7663 20.424 30.4955 19.8762C30.2278 19.3283 30.0939 18.6882 30.0939 17.9557C30.0939 17.2171 30.2278 16.5723 30.4955 16.0214C30.7663 15.4705 31.1418 15.0427 31.6219 14.738C32.1051 14.4333 32.6668 14.281 33.3069 14.281C33.9471 14.281 34.5072 14.4333 34.9873 14.738C35.4705 15.0427 35.846 15.4705 36.1138 16.0214C36.3846 16.5723 36.52 17.2171 36.52 17.9557C36.52 18.6882 36.3846 19.3283 36.1138 19.8762C35.846 20.424 35.4705 20.8502 34.9873 21.1549C34.5072 21.4596 33.9471 21.612 33.3069 21.612ZM33.3069 20.6333C33.7932 20.6333 34.1933 20.5086 34.5072 20.2593C34.8212 20.01 35.0535 19.6823 35.2043 19.276C35.3551 18.8698 35.4305 18.4297 35.4305 17.9557C35.4305 17.4818 35.3551 17.0401 35.2043 16.6308C35.0535 16.2215 34.8212 15.8906 34.5072 15.6382C34.1933 15.3859 33.7932 15.2597 33.3069 15.2597C32.8207 15.2597 32.4206 15.3859 32.1067 15.6382C31.7927 15.8906 31.5604 16.2215 31.4096 16.6308C31.2588 17.0401 31.1834 17.4818 31.1834 17.9557C31.1834 18.4297 31.2588 18.8698 31.4096 19.276C31.5604 19.6823 31.7927 20.01 32.1067 20.2593C32.4206 20.5086 32.8207 20.6333 33.3069 20.6333ZM41.9871 12.0097H43.3536L46.5666 19.8577H46.6774L49.8905 12.0097H51.257V21.4642H50.1859V14.281H50.0936L47.1391 21.4642H46.105L43.1504 14.281H43.0581V21.4642H41.9871V12.0097ZM59.1661 13.8378H60.1818C60.1818 14.5395 60.0279 15.0966 59.7201 15.509C59.4154 15.9214 58.8799 16.1276 58.1136 16.1276V15.352C58.4214 15.352 58.6491 15.2889 58.7968 15.1627C58.9476 15.0366 59.0461 14.8596 59.0923 14.6318C59.1415 14.4041 59.1661 14.1394 59.1661 13.8378ZM56.2855 21.612C55.6453 21.612 55.0836 21.4596 54.6005 21.1549C54.1203 20.8502 53.7449 20.424 53.474 19.8762C53.2063 19.3283 53.0724 18.6882 53.0724 17.9557C53.0724 17.2171 53.2063 16.5723 53.474 16.0214C53.7449 15.4705 54.1203 15.0427 54.6005 14.738C55.0836 14.4333 55.6453 14.281 56.2855 14.281C56.9256 14.281 57.4857 14.4333 57.9659 14.738C58.4491 15.0427 58.8245 15.4705 59.0923 16.0214C59.3631 16.5723 59.4985 17.2171 59.4985 17.9557C59.4985 18.6882 59.3631 19.3283 59.0923 19.8762C58.8245 20.424 58.4491 20.8502 57.9659 21.1549C57.4857 21.4596 56.9256 21.612 56.2855 21.612ZM56.2855 20.6333C56.7717 20.6333 57.1718 20.5086 57.4857 20.2593C57.7997 20.01 58.032 19.6823 58.1828 19.276C58.3336 18.8698 58.409 18.4297 58.409 17.9557C58.409 17.4818 58.3336 17.0401 58.1828 16.6308C58.032 16.2215 57.7997 15.8906 57.4857 15.6382C57.1718 15.3859 56.7717 15.2597 56.2855 15.2597C55.7992 15.2597 55.3991 15.3859 55.0852 15.6382C54.7713 15.8906 54.5389 16.2215 54.3881 16.6308C54.2373 17.0401 54.1619 17.4818 54.1619 17.9557C54.1619 18.4297 54.2373 18.8698 54.3881 19.276C54.5389 19.6823 54.7713 20.01 55.0852 20.2593C55.3991 20.5086 55.7992 20.6333 56.2855 20.6333ZM55.7869 13.4131L56.9133 11.2711H58.1875L56.7471 13.4131H55.7869ZM61.1743 21.4642V14.3733H62.2638V21.4642H61.1743ZM61.7283 13.1915C61.5159 13.1915 61.3328 13.1192 61.1789 12.9745C61.0281 12.8299 60.9527 12.656 60.9527 12.4529C60.9527 12.2497 61.0281 12.0759 61.1789 11.9312C61.3328 11.7866 61.5159 11.7142 61.7283 11.7142C61.9406 11.7142 62.1222 11.7866 62.273 11.9312C62.4269 12.0759 62.5039 12.2497 62.5039 12.4529C62.5039 12.656 62.4269 12.8299 62.273 12.9745C62.1222 13.1192 61.9406 13.1915 61.7283 13.1915Z"
              fill="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_ddd_9_1154"
              x="0.495026"
              y="0.464233"
              width="77"
              height="38"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="2" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_9_1154"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feMorphology
                radius="1"
                operator="dilate"
                in="SourceAlpha"
                result="effect2_dropShadow_9_1154"
              />
              <feOffset />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0"
              />
              <feBlend
                mode="normal"
                in2="effect1_dropShadow_9_1154"
                result="effect2_dropShadow_9_1154"
              />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="0.5" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="effect2_dropShadow_9_1154"
                result="effect3_dropShadow_9_1154"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect3_dropShadow_9_1154"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      </a>
    </div>
  `
}
// End StringData
// Thông Báo
export function toast({ title = '', message = '', type = 'info', duration = 3000 }) {
  const main = document.getElementById('toast')
  if (main) {
    const toast = document.createElement('div')
    // Tự động xóa bỏ thông báo
    const autoRemoveId = setTimeout(() => {
      main.removeChild(toast)
    }, duration + 1000)

    // Xóa Thông Báo Khi Click vào X
    toast.onclick = function (e) {
      if (e.target.closest('.toast__close')) {
        main.removeChild(toast)
        clearTimeout(autoRemoveId)
      }
    }

    const icons = {
      success: 'fas fa-check-circle',
      info: 'fas fa-info-circle',
      warning: 'fas fa-exclamation-circle',
      error: 'fas fa-exclamation-circle'
    }
    const icon = icons[type]
    const delay = (duration / 1000).toFixed(2)
    toast.classList.add('toast', `toast--${type}`, `w-full`)
    toast.style.animation = `slideInLeft linear .3s, fadeOut linear 1s ${delay}s forwards`
    toast.innerHTML = `
      <div class="toast__icon">
        <i class="${icon}"></i>
      </div>
      <div class="toast__body">
       <h3 class="toast__title">${title}</h3>
       <p class="toast__msg">${message}</p>
      </div>
      <div class="toast__close">
        <i class="fas fa-times"></i>
      </div>
    `
    main.appendChild(toast)
  }
}
// Kết Thúc Thông Báo
// Hàm hiển thị các số trang
export function displayPagination(object, api, currentPage, totalPages) {
  const pagination = document.getElementById('pagination')
  const pageNumbersDiv = document.getElementById('pageNumbers')
  pagination.innerHTML = ''
  pageNumbersDiv.innerHTML = ''

  // Kiểm tra trạng thái của nút Previous
  const prevBtn = document.createElement('button')
  prevBtn.innerHTML = '<<'
  prevBtn.classList.add('px-4', 'py-2', 'bg-gray-200', 'text-gray-700', 'rounded-l', 'hover:bg-gray-300')
  prevBtn.setAttribute('value', currentPage - 1)

  if (currentPage === 1) {
    prevBtn.style.display = 'none' // Ẩn nút nếu ở trang đầu
  } else {
    prevBtn.style.display = 'inline-block'
  }

  // Kiểm tra trạng thái của nút Next
  const nextBtn = document.createElement('button')
  nextBtn.innerHTML = '>>'
  nextBtn.classList.add('px-4', 'py-2', 'bg-gray-200', 'text-gray-700', 'rounded-r', 'hover:bg-gray-300')
  nextBtn.setAttribute('value', currentPage + 1)

  if (currentPage === totalPages || totalPages <= 1) {
    nextBtn.style.display = 'none' // Ẩn nút Next nếu ở trang cuối hoặc chỉ có 1 trang
  } else {
    nextBtn.style.display = 'inline-block'
  }

  // Thêm các nút trang
  for (let i = 1; i <= totalPages; i++) {
    const pageButton = document.createElement('button')
    pageButton.className = `px-4 py-2 ${
      i === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
    } hover:bg-gray-300`
    pageButton.textContent = i
    pageButton.value = i

    pageButton.addEventListener('click', async () => {
      if (!isProcessing) {
        currentPage = i
        await handlefilter(object, api, currentPage)
      }
    })

    pageNumbersDiv.appendChild(pageButton)
  }

  // Vô hiệu hóa nút trong khi xử lý để tránh việc gọi lặp lại
  let isProcessing = false

  prevBtn.addEventListener('click', async () => {
    if (!isProcessing && currentPage > 1) {
      isProcessing = true
      currentPage = parseInt(prevBtn.getAttribute('value'))
      prevBtn.disabled = true // Vô hiệu hóa nút khi xử lý
      nextBtn.disabled = true // Vô hiệu hóa nút Next trong quá trình xử lý
      await handlefilter(object, api, currentPage)
      isProcessing = false
    }
  })

  nextBtn.addEventListener('click', async () => {
    if (!isProcessing && currentPage < totalPages) {
      isProcessing = true
      currentPage = parseInt(nextBtn.getAttribute('value'))
      prevBtn.disabled = true
      nextBtn.disabled = true
      await handlefilter(object, api, currentPage)
      isProcessing = false
    }
  })
  pagination.appendChild(prevBtn)
  pagination.appendChild(pageNumbersDiv)
  pagination.appendChild(nextBtn)
}

// Xử lý sự kiện khi nhấn nút "Bộ lọc"
const filterSection = document.getElementById('filterSection')
const toggleFilterBtn = document.getElementById('toggleFilterBtn')
if (toggleFilterBtn) {
  toggleFilterBtn.addEventListener('click', function () {
    filterSection.classList.toggle('hidden')
  })
}
const applyBtn = document.getElementById('applyBtn')
if (applyBtn) {
  applyBtn.addEventListener('click', function () {
    filterSection.classList.toggle('hidden')
  })
}
// Hàm để tạo một bộ lọc mới
export async function Filter(object, api, currentPage) {
  function createFilter() {
    // Tạo một div cho bộ lọc
    const filterItem = document.createElement('div')
    filterItem.classList.add(
      'filter-item',
      'flex',
      'flex-col',
      'md:flex-row',
      'gap-4',
      'items-center',
      'justify-between',
      'mb-2'
    )

    // Lấy dữ liệu từ thẻ có id 'filter_by'
    const filter_by = document.getElementById('filter_by').getAttribute('filter_by')
    const fieldOptions = JSON.parse(filter_by)

    // Tạo dropdown cho trường
    const fieldSelect = document.createElement('select')
    const operatorSelect = document.createElement('select')
    const valueInput = document.createElement('input')
    const valueSelect = document.createElement('select')
    operatorSelect.classList.add(
      'bg-gray-200', // Màu nền xám nhạt
      'rounded', // Bo góc
      'px-2', // Padding trái và phải
      'py-1', // Padding trên và dưới
      'w-36', // Chiều rộng cố định
      'focus:outline-none', // Không hiển thị outline mặc định khi input được focus
      'focus:ring', // Thêm hiệu ứng ring khi focus
      'focus:ring-gray-300', // Màu của ring khi focus
      'appearance-none'
    )

    valueInput.classList.add(
      'bg-gray-200', // Màu nền xám nhạt
      'rounded', // Bo góc
      'px-2', // Padding trái và phải
      'py-1', // Padding trên và dưới
      'w-36', // Chiều rộng cố định
      'focus:outline-none', // Không hiển thị outline mặc định khi input được focus
      'focus:ring', // Thêm hiệu ứng ring khi focus
      'focus:ring-gray-300'
    )

    valueSelect.classList.add(
      'hidden',
      'bg-gray-200', // Màu nền xám nhạt
      'rounded', // Bo góc
      'px-2', // Padding trái và phải
      'py-1', // Padding trên và dưới
      'w-36', // Chiều rộng cố định
      'focus:outline-none', // Không hiển thị outline mặc định khi input được focus
      'focus:ring', // Thêm hiệu ứng ring khi focus
      'focus:ring-gray-300',
      'appearance-none'
    ) // Ẩn mặc định, sẽ hiển thị nếu có selections

    fieldSelect.classList.add(
      'bg-gray-200', // Màu nền xám nhạt
      'rounded', // Bo góc
      'px-2', // Padding trái và phải
      'py-1', // Padding trên và dưới
      'w-36', // Chiều rộng cố định
      'focus:outline-none', // Không hiển thị outline mặc định khi input được focus
      'focus:ring', // Thêm hiệu ứng ring khi focus
      'focus:ring-gray-300', // Màu của ring khi focus
      'appearance-none'
    )
    Object.keys(fieldOptions).forEach((field) => {
      const value = fieldOptions[field].name
      const opt = document.createElement('option')
      opt.value = value
      opt.textContent = value
      fieldSelect.appendChild(opt)
      if (field == 0) {
        const { operators, selections } = fieldOptions[field]

        // Xóa options cũ và cập nhật operator
        operatorSelect.innerHTML = ''
        operators.forEach((operator) => {
          const opt = document.createElement('option')
          opt.value = operator
          opt.textContent = operator
          operatorSelect.appendChild(opt)
        })
        // Kiểm tra nếu có selections
        if (selections) {
          valueSelect.innerHTML = ''
          valueSelect.classList.remove('hidden') // Hiển thị select nếu có selections
          valueInput.classList.add('hidden') // Ẩn input
          selections.forEach((option) => {
            const opt = document.createElement('option')
            opt.value = option.value
            opt.textContent = option.ten
            valueSelect.appendChild(opt)
          })
        } else {
          valueInput.classList.remove('hidden') // Hiển thị input nếu không có selections
          valueSelect.classList.add('hidden') // Ẩn select
        }
      }
    })

    const removeFilterBtn = document.createElement('button')
    removeFilterBtn.classList.add('text-gray-300', 'px-2', 'py-1', 'rounded', 'hover:bg-gay-500')
    removeFilterBtn.innerHTML = `
     <svg width='9' height='9' viewBox='0 0 9 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
       <path
         fill-rule='evenodd'
         clip-rule='evenodd'
         d='M0.420954 8.05271C0.374466 8.0992 0.33759 8.15439 0.312431 8.21513C0.287272 8.27587 0.274323 8.34097 0.274323 8.40671C0.274323 8.47246 0.287272 8.53756 0.312431 8.5983C0.33759 8.65904 0.374466 8.71423 0.420954 8.76071C0.467442 8.8072 0.522631 8.84408 0.58337 8.86924C0.64411 8.8944 0.70921 8.90735 0.774954 8.90735C0.840698 8.90735 0.905798 8.8944 0.966538 8.86924C1.02728 8.84408 1.08247 8.8072 1.12895 8.76071L4.31095 5.57871L7.49195 8.76071C7.58584 8.8546 7.71318 8.90735 7.84595 8.90735C7.97873 8.90735 8.10607 8.8546 8.19995 8.76071C8.29384 8.66683 8.34659 8.53949 8.34659 8.40671C8.34659 8.27394 8.29384 8.1466 8.19995 8.05271L5.01795 4.87271L8.19995 1.69071C8.29384 1.59683 8.34659 1.46949 8.34659 1.33671C8.34659 1.20394 8.29384 1.0766 8.19995 0.982714C8.10607 0.888828 7.97873 0.836083 7.84595 0.836083C7.71318 0.836083 7.58584 0.888828 7.49195 0.982714L4.31195 4.16371L1.12895 0.981714C1.03507 0.887828 0.90773 0.835083 0.774954 0.835083C0.642178 0.835083 0.514841 0.887828 0.420954 0.981714C0.327067 1.0756 0.274323 1.20294 0.274323 1.33571C0.274323 1.46849 0.327067 1.59583 0.420954 1.68971L3.60295 4.87171L0.420954 8.05271Z'
         fill='#687178'
       />
     </svg>
   `

    // Xóa filter
    removeFilterBtn.addEventListener('click', async function () {
      filtersContainer.removeChild(filterItem)
      updateFilterCount()
      await handlefilter(object, api, currentPage)
    })

    // Cập nhật options khi người dùng chọn trường
    fieldSelect.addEventListener('change', function () {
      const selected = fieldOptions.find((field) => {
        return field.name === this.value
      })

      const selectedField = fieldSelect.value
      const { operators, selections, name } = selected

      // Xóa options cũ và cập nhật operator
      operatorSelect.innerHTML = ''
      operators.forEach((operator) => {
        const opt = document.createElement('option')
        opt.value = operator
        opt.textContent = operator
        operatorSelect.appendChild(opt)
      })

      // Kiểm tra nếu có selections
      if (selections) {
        valueSelect.innerHTML = ''
        valueSelect.classList.remove('hidden') // Hiển thị select nếu có selections
        valueInput.classList.add('hidden') // Ẩn input
        selections.forEach((option) => {
          const opt = document.createElement('option')
          opt.value = option.value
          opt.textContent = option.ten
          valueSelect.appendChild(opt)
        })
      } else {
        if (name == 'ngay_tao' || name == 'updated_at') {
          valueInput.type = 'text'
          flatpickr(valueInput, {
            dateFormat: 'Y-m-d', // Định dạng ngày
            allowInput: true // Cho phép người dùng nhập thủ công
          })
        } else {
          // Khôi phục lại loại input nếu không phải 'ngay_tao'
          valueInput.type = 'text' // Hoặc 'date', 'number' nếu cần
          if (valueInput._flatpickr) {
            valueInput._flatpickr.destroy() // Loại bỏ flatpickr
          }
        }
        valueInput.classList.remove('hidden') // Hiển thị input nếu không có selections
        valueSelect.classList.add('hidden') // Ẩn select
      }
    })

    // Thêm các phần tử vào div bộ lọc
    filterItem.appendChild(fieldSelect)
    filterItem.appendChild(operatorSelect)
    filterItem.appendChild(valueInput)
    filterItem.appendChild(valueSelect)
    filterItem.appendChild(removeFilterBtn)

    // Thêm bộ lọc vào container
    filtersContainer.appendChild(filterItem)
  }
  // Cập nhật số lượng bộ lọc
  function updateFilterCount() {
    const numberOfChildren = filtersContainer.children.length
    const filternumber = document.querySelector('#filternumber')
    filternumber.innerHTML = numberOfChildren ? `${numberOfChildren} đang được áp dụng` : 'Bộ lọc'
    const parentDiv = filternumber.parentNode
    if (numberOfChildren) parentDiv.classList.add('text-blue-400')
    else parentDiv.classList.remove('text-blue-400')
  }
  // Thêm bộ lọc mới khi nhấn nút "+ Thêm bộ lọc"
  const addFilterBtn = document.getElementById('addFilterBtn')
  if (addFilterBtn) {
    addFilterBtn.addEventListener('click', async function () {
      createFilter()
      updateFilterCount()
      await handlefilter(object, api, currentPage)
    })
  }

  // Xóa tất cả bộ lọc
  const clearAllBtn = document.getElementById('clearAllBtn')
  if (clearAllBtn) {
    clearAllBtn.addEventListener('click', async function () {
      filtersContainer.innerHTML = ''
      updateFilterCount()
      await handlefilter(object, api, currentPage)
    })
  }
  // Đóng section filter nếu click ngoài khu vực
  const filterSection = document.getElementById('filterSection')
  if (filterSection) {
    document.addEventListener('click', async (event) => {
      if (
        !filterSection.contains(event.target) &&
        !toggleFilterBtn.contains(event.target) &&
        !filterSection.classList.contains('hidden')
      ) {
        filterSection.classList.add('hidden')
        await handlefilter(object, api, currentPage)
      }
    })
  }
}

export function filterSelect(object, api, currentPage) {
  const filterDiv = document.getElementById('toggleincrease_or_decrease')
  const filterSelect = document.getElementById('filterSelect')
  if (filterDiv && filterSelect) {
    const filter_by = JSON.parse(document.getElementById('filter_by').getAttribute('filter_by'))
    const fieldOptions = filter_by.map((field) => {
      return field.name
    })
    fieldOptions.forEach((option) => {
      const opt = document.createElement('option')
      opt.value = option
      opt.textContent = option
      if (option == '_id') opt.selected = true
      filterSelect.appendChild(opt)
    })

    filterDiv.addEventListener('click', () => {
      if (filterDiv.querySelector('svg').getAttribute('value') == 'arrow_increase') {
        filterDiv.innerHTML = `<svg value="arrow_decrease" width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.75 0.600098H9.75M0.75 4.6001H6.75M0.75 8.6001H4.75M9.25 8.1001L11.25 10.1001L13.25 8.1001M11.25 9.1001V3.1001" stroke="#1F272E" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      `
      } else {
        filterDiv.innerHTML = `<svg
          value="arrow_increase"
          width="17"
          height="17"
          viewBox="0 0 17 17"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          class="border-r"
        >
          <path
            d="M2.34003 4.10001H11.34M2.34003 8.10001H8.34003M2.34003 12.1H6.34003M14.84 8.60001L12.84 6.60001M12.84 6.60001L10.84 8.60001M12.84 6.60001V12.6"
            stroke="#1F272E"
            stroke-miterlimit="10"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>`
      }
      filterDiv.querySelector('svg').addEventListener('click', async function () {
        await handlefilter(object, api, currentPage)()
      })
    })
  }
}
// Filter dữ liệu

// handlefilter

export async function handlefilter(object, Api, currentPage) {
  // Kiểm tra filtersContainer có tồn tại không
  const filtersContainer = document.getElementById('filtersContainer')
  if (!filtersContainer) {
    console.error('filtersContainer không tồn tại')
    return
  }

  const data = {}
  const filters = []
  const filterItems = filtersContainer.children
  // Lặp qua các filterItem để lấy field, operator, value
  for (let filterItem of filterItems) {
    const field = filterItem.children[0]?.value || ''
    const operator = filterItem.children[1]?.value || ''
    let value = ''
    if (filterItem.children[2]?.classList.contains('hidden')) {
      value = filterItem.children[3]?.value || ''
    } else {
      value = filterItem.children[2]?.value || ''
    }
    filters.push({
      field,
      operator,
      value
    })
  }

  // Gán bộ lọc vào đối tượng data
  data.filters = filters

  // Lặp qua các key trong object và lấy giá trị từ DOM
  Object.keys(object).forEach((key) => {
    const element = document.querySelector(object[key])
    if (element) {
      data[key] = element.value
    }
  })

  // Kiểm tra filterDiv và filterSelect có tồn tại không trước khi truy xuất
  const filterDiv = document.getElementById('toggleincrease_or_decrease')
  if (filterDiv) {
    const svgElement = filterDiv.querySelector('svg')
    if (svgElement) {
      data.salaryincreaseordecrease = svgElement.getAttribute('value')
    }
  }

  const filterSelect = document.getElementById('filterSelect')
  if (filterSelect) {
    data.filterSelect = filterSelect.value
  }

  data.pages = currentPage

  // Gọi API
  await Api(data)
}

// Xác nhận xóa
export const confirmButton = (message = 'Bạn có chắc chắn muốn thực hiện hành động này không?', title = 'Xác Nhận') => {
  const confirmationModal = document.querySelector('#confirmation-modal')

  if (confirmationModal) {
    let i = 0
    const confirmButton = confirmationModal.querySelector('#confirm-button')
    const cancelButton = confirmationModal.querySelector('#cancel-button')
    const titleElement = confirmationModal.querySelector('#title')
    const messageElement = confirmationModal.querySelector('#message')

    if (titleElement && messageElement) {
      titleElement.innerHTML = title
      messageElement.innerHTML = message
    } else {
      console.error('Không thể tìm thấy phần tử title hoặc message.')
      return
    }
    confirmationModal.classList.remove('hidden', '-translate-y-full')
    confirmationModal.classList.add('translate-y-0')
    confirmButton.addEventListener('click', () => {
      confirmationModal.classList.remove('translate-y-0')
      confirmationModal.classList.add('-translate-y-full')
      setTimeout(() => {
        confirmationModal.classList.add('hidden')
      }, 300)
      i = 1
    })

    cancelButton.addEventListener('click', () => {
      confirmationModal.classList.remove('translate-y-0')
      confirmationModal.classList.add('-translate-y-full')
      setTimeout(() => {
        confirmationModal.classList.add('hidden')
      }, 300)
      i = 0
    })

    return new Promise((resolve) => {
      confirmButton.addEventListener('click', () => resolve(i))
      cancelButton.addEventListener('click', () => resolve(i))
    })
  }
}
// Checkbox multi
export function checkboxMulti(object, api, deleteLink, createLink, currentPage) {
  const checkboxMulti = document.querySelector('[checkbox-multi]')
  if (checkboxMulti) {
    const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']")
    const inputsID = checkboxMulti.querySelectorAll("input[name='id']")
    if (inputCheckAll) {
      // Kiểm tra tất cả các checkbox khi 'Check All' được click
      inputCheckAll.addEventListener('click', () => {
        const inputsID = checkboxMulti.querySelectorAll("input[name='id']")
        const isChecked = inputCheckAll.checked
        inputsID.forEach((input) => {
          input.checked = isChecked
        })
        // Cập nhật hành động sau khi thay đổi check all
        updateAction(object, api, deleteLink, createLink, handlefilter, currentPage)
      })
    }

    if (inputsID) {
      // Khi một trong các checkbox thay đổi, cập nhật lại trạng thái của check all
      inputsID.forEach((input) => {
        input.addEventListener('click', () => {
          const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length
          inputCheckAll.checked = countChecked === inputsID.length
          // Cập nhật hành động khi có sự thay đổi
          updateAction(object, api, deleteLink, createLink, handlefilter, currentPage)
        })
      })
    }

    // Cập nhật hành động lần đầu tiên khi trang load
    if (checkboxMulti) {
      updateAction(object, api, deleteLink, createLink, handlefilter, currentPage)
    }
  }
}

export function updateAction(object, api, deleteLink, createLink, handlefilter, currentPage) {
  const checkboxMulti = document.querySelector('[checkbox-multi]')
  const action = document.querySelector('[action]')

  if (!checkboxMulti || !action) {
    console.error('Không tìm thấy phần tử checkboxMulti hoặc action')
    return
  }
  action.innerHTML = ''

  const checkedCount = checkboxMulti.querySelectorAll("input[name='id']:checked").length

  if (checkedCount > 0) {
    const deleteBtn = document.createElement('div')
    deleteBtn.classList.add(
      'text-white',
      'bg-red-500',
      'hover:bg-red-600',
      'rounded-sm',
      'w-36',
      'text-xs',
      'h-6',
      'flex',
      'justify-center',
      'items-center',
      'cursor-pointer'
    )
    deleteBtn.innerHTML = 'Xóa'

    // Thêm sự kiện click cho hành động xóa
    deleteBtn.addEventListener('click', async function () {
      // Hiển thị xác nhận xóa
      const isConfirm = await confirmButton('Bạn có chắc có muốn xóa không ?').then((result) => result)
      if (isConfirm !== 1) return

      // Lấy các ID được chọn
      const inputsID = checkboxMulti.querySelectorAll('input[name="id"]:checked')
      if (inputsID.length > 0) {
        let ids = []
        inputsID.forEach((input) => {
          ids.push(input.value)
        })

        try {
          // Gửi yêu cầu xóa bằng API
          const loader = document.getElementById('loader')
          loader.classList.remove('hidden')
          const response = await fetch(deleteLink, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              ids
            }) // Gửi danh sách IDs cần xóa
          })
          if (response.status === 401) {
            window.location.href = '/users/login'
          }
          const result = await response.json()

          // Xử lý kết quả trả về
          if (response.ok) {
            toast({
              type: 'success',
              title: 'Xóa Thành Công!!',
              message: result.message
            })

            if (typeof handlefilter == 'function') {
              await handlefilter(object, api, currentPage)
              const inputCheckAll = (checkboxMulti.querySelector("input[name='checkall']").checked = false)
            } else {
              console.error('handlefilter không phải là một hàm')
            }
            deleteBtn.remove()
            const createBtn = document.createElement('div')
            createBtn.classList.add(
              'text-white',
              'bg-blue-500',
              'hover:bg-blue-600',
              'rounded-sm',
              'w-36',
              'text-xs',
              'h-6',
              'flex',
              'justify-center',
              'items-center',
              'cursor-pointer'
            )
            const title = document.querySelector('#messages').getAttribute('data-title')
            createBtn.innerHTML = 'Thêm ' + title

            // Thêm sự kiện click để chuyển đến trang thêm mới
            createBtn.addEventListener('click', function () {
              // Chuyển hướng đến trang thêm mới
              window.location.href = createLink
            })
            action.appendChild(createBtn)
          } else {
            toast({
              type: 'error',
              title: 'Xóa Thất Bại!!',
              message: result.message
            })
          }
        } catch (error) {
          console.error('Lỗi khi xóa:', error)
          toast({
            type: 'error',
            title: 'Xóa Thất Bại!!',
            message: 'Đã xảy ra lỗi khi xóa dữ liệu'
          })
        } finally {
          // Ẩn loader khi API hoàn tất
          loader.classList.add('hidden')
        }
      }
    })
    action.appendChild(deleteBtn)
  } else {
    const createBtn = document.createElement('div')
    createBtn.classList.add(
      'text-white',
      'bg-blue-500',
      'hover:bg-blue-600',
      'rounded-sm',
      'w-36',
      'text-xs',
      'h-6',
      'flex',
      'justify-center',
      'items-center',
      'cursor-pointer'
    )
    const title = document.querySelector('#messages').getAttribute('data-title')
    createBtn.innerHTML = 'Thêm ' + title

    // Thêm sự kiện click để chuyển đến trang thêm mới
    createBtn.addEventListener('click', function () {
      // Chuyển hướng đến trang thêm mới
      window.location.href = createLink
    })
    action.appendChild(createBtn)
  }
}

// Đối tượng `Validator`
export function Validator(options) {
  function getParent(element, selector) {
    while (element.parentElement) {
      if (element.parentElement.matches(selector)) {
        return element.parentElement
      }
      element = element.parentElement
    }
  }

  var selectorRules = {}

  // Hàm thực hiện validate
  function validate(inputElement, rule) {
    console.log(rule)
    var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)

    var errorMessage

    // Lấy ra các rules của selector
    var rules = selectorRules[rule.selector]

    // Lặp qua từng rule & kiểm tra
    for (var i = 0; i < rules.length; ++i) {
      switch (inputElement.type) {
        case 'radio':
        case 'checkbox':
          errorMessage = rules[i](formElement.querySelector(rule.selector + ':checked'))
          break
        default:
          errorMessage = rules[i](inputElement.value)
      }
      if (errorMessage) break
    }

    if (errorMessage) {
      errorElement.innerText = errorMessage
      getParent(inputElement, options.formGroupSelector).classList.add('invalid')
    } else {
      errorElement.innerText = ''
      getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
    }

    return !errorMessage
  }

  // Lấy element của form cần validate
  var formElement = document.querySelector(options.form)
  if (formElement) {
    formElement.addEventListener('submit', async function (e) {
      e.preventDefault()

      var isFormValid = true

      for (var i = 0; i < options.rules.length; i++) {
        var rule = options.rules[i]
        var inputElement = formElement.querySelector(rule.selector)
        var isValid = validate(inputElement, rule)
        if (!isValid) {
          isFormValid = false
        }
      }
      if (isFormValid) {
        // Trường hợp submit với javascript
        if (typeof options.onSubmit === 'function') {
          var enableInputs = formElement.querySelectorAll('[name]')
          var formValues = Array.from(enableInputs).reduce(function (values, input) {
            switch (input.type) {
              case 'radio':
                values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value
                break
              case 'checkbox':
                if (!input.matches(':checked')) {
                  values[input.name] = ''
                  return values
                }
                if (!Array.isArray(values[input.name])) {
                  values[input.name] = []
                }
                values[input.name].push(input.value)
                break
              case 'file':
                values[input.name] = input.files
                break
              case 'textarea':
                values[input.name] = tinymce.get(input.id).getContent()
                break
              default:
                values[input.name] = input.value
            }

            return values
          }, {})

          options.onSubmit(formValues)
        } else {
          formElement.submit()
        }
      }
    })

    // Lặp qua mỗi rule và xử lý (lắng nghe sự kiện blur, input, ...)
    options.rules.forEach(function (rule) {
      if (Array.isArray(selectorRules[rule.selector])) {
        selectorRules[rule.selector].push(rule.test)
      } else {
        selectorRules[rule.selector] = [rule.test]
      }

      var inputElements = formElement.querySelectorAll(rule.selector)

      Array.from(inputElements).forEach(function (inputElement) {
        inputElement.onblur = function () {
          validate(inputElement, rule)
        }

        inputElement.oninput = function () {
          var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector)
          errorElement.innerText = ''
          getParent(inputElement, options.formGroupSelector).classList.remove('invalid')
        }
      })
    })
  }
}

// Định nghĩa rules
Validator.isRequired = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      return value ? undefined : message || 'Vui lòng nhập trường này'
    }
  }
}
Validator.isPassword = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (!value) {
        return 'Vui lòng nhập mật khẩu'
      }

      if (typeof value !== 'string') {
        return 'Mật khẩu phải là một chuỗi'
      }

      if (value.length < 6 || value.length > 50) {
        return 'Mật khẩu phải từ 6 đến 50 ký tự'
      }

      const hasLowercase = /[a-z]/.test(value)
      const hasUppercase = /[A-Z]/.test(value)
      const hasNumber = /[0-9]/.test(value)
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value)

      if (!hasLowercase || !hasUppercase || !hasNumber || !hasSymbol) {
        return 'Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ hoa, một số, và một ký tự đặc biệt'
      }

      return undefined
    }
  }
}
Validator.isPasswordUpdate = function (selector) {
  return {
    selector: selector,
    test: function (value) {
      if (!value) {
        return undefined
      }

      if (typeof value !== 'string') {
        return 'Mật khẩu phải là một chuỗi'
      }

      if (value.length < 6 || value.length > 50) {
        return 'Mật khẩu phải từ 6 đến 50 ký tự'
      }

      const hasLowercase = /[a-z]/.test(value)
      const hasUppercase = /[A-Z]/.test(value)
      const hasNumber = /[0-9]/.test(value)
      const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value)

      if (!hasLowercase || !hasUppercase || !hasNumber || !hasSymbol) {
        return 'Mật khẩu phải chứa ít nhất một chữ cái thường, một chữ hoa, một số, và một ký tự đặc biệt'
      }

      return undefined
    }
  }
}

Validator.isNumber = function (selector, message = 'Giá trị phải là một số hợp lệ') {
  return {
    selector: selector,
    test: function (value) {
      return !isNaN(value) ? undefined : message
    }
  }
}
Validator.isEmail = function (selector, message) {
  return {
    selector: selector,
    test: function (value) {
      // eslint-disable-next-line no-useless-escape
      var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      return regex.test(value) ? undefined : message || 'Trường này phải là email'
    }
  }
}
Validator.maxLength = function (selector, max, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length <= max ? undefined : message || `Vui lòng nhập tối đa ${max} kí tự`
    }
  }
}

Validator.minLength = function (selector, min, message) {
  return {
    selector: selector,
    test: function (value) {
      return value.length >= min ? undefined : message || `Vui lòng nhập tối thiểu ${min} kí tự`
    }
  }
}

Validator.isConfirmed = function (selector, getConfirmValue, message) {
  return {
    selector: selector,
    test: function (value) {
      return value === getConfirmValue() ? undefined : message || 'Giá trị nhập vào không chính xác'
    }
  }
}

export function tbody(link) {
  const tbody = document.querySelector('tbody')
  if (tbody) {
    tbody.addEventListener('click', (event) => {
      // Kiểm tra xem có nhấp vào nút input không
      const target = event.target

      // Kiểm tra nếu nút nhấp vào không phải là input
      if (target.tagName !== 'INPUT') {
        // Tìm thẻ <tr> cha của mục được nhấp
        const tr = target.closest('tr')

        // Nếu có thẻ <tr> và nó có thuộc tính id
        if (tr && tr.id) {
          const id = tr.id // Lấy id từ thẻ <tr>
          // Chuyển hướng đến trang sửa với ID
          window.location.href = `${link}${id}`
        }
      }
    })
  }
}
export function insertRow(tableId, selectId1, selectId2, addRowButton, editRowIndex) {
  const addRowBtn = document.getElementById(addRowButton)
  if (addRowBtn) {
    addRowBtn.addEventListener('click', function () {
      // Lấy giá trị từ các trường input
      const selectElement1 = document.getElementById(selectId1)
      const selectElement2 = document.getElementById(selectId2)

      // Lấy ID và tên mục từ select hoặc input
      const itemId1 = selectElement1.value // Lấy giá trị từ select hoặc input
      const itemId2 = selectElement2.value // Lấy giá trị từ select hoặc input

      // Kiểm tra xem selectElement có phải là select hay không để lấy tên mục
      let itemName1, itemName2
      if (selectElement1.tagName === 'SELECT') {
        itemName1 = selectElement1.options[selectElement1.selectedIndex].text // Lấy tên mục nếu là select
      } else {
        itemName1 = selectElement1.value // Lấy giá trị nếu là input
      }

      if (selectElement2.tagName === 'SELECT') {
        itemName2 = selectElement2.options[selectElement2.selectedIndex].text // Lấy tên mục nếu là select
      } else {
        itemName2 = selectElement2.value // Lấy giá trị nếu là input
      }

      // Kiểm tra nếu các trường không rỗng
      if (itemId1 && itemId2) {
        const table = document.getElementById(tableId).getElementsByTagName('tbody')[0]

        // Nếu đang sửa, cập nhật hàng
        if (editRowIndex >= 0) {
          const row = table.rows[editRowIndex]
          row.cells[1].textContent = itemName1 // Cập nhật mục 1
          row.cells[2].textContent = itemName2 // Cập nhật mục 2
          row.cells[1].setAttribute('data-id', itemId1) // Cập nhật ID mục 1
          row.cells[2].setAttribute('data-id', itemId2) // Cập nhật ID mục 2
          document.getElementById(addRowButton).textContent = 'Thêm Hàng' // Đặt lại văn bản nút
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
          cell2.textContent = itemName1 // Hiển thị tên mục 1
          cell3.textContent = itemName2 // Hiển thị tên mục 2
          cell2.setAttribute('data-id', itemId1) // Lưu ID mục 1
          cell3.setAttribute('data-id', itemId2) // Lưu ID mục 2

          // Tạo nút xóa
          const deleteButton = document.createElement('button')
          deleteButton.textContent = 'Xóa'
          deleteButton.className = 'text-red-500 hover:text-red-700'
          cell4.appendChild(deleteButton)
        }

        // Xóa giá trị trong các trường input sau khi thêm
        selectElement1.value = ''
        selectElement2.value = ''
      } else {
        toast({
          type: 'error',
          message: 'Vui lòng điền đầy đủ thông tin!',
          title: 'Cảnh Báo!!!'
        })
      }
    })
  }

  let accountTable = document.getElementById(tableId)
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
  accountTable = document.getElementById(tableId)
  if (accountTable) {
    document.getElementById(tableId).addEventListener('click', function (event) {
      const target = event.target
      if (target.tagName === 'TD' && target.cellIndex < 3) {
        const row = target.closest('tr')

        editRowIndex = row.rowIndex - 1 // Lưu chỉ số hàng đang sửa
        document.getElementById(selectId1).value = row.cells[1].getAttribute('data-id') // Tải ID mục 1 vào ô nhập
        document.getElementById(selectId2).value = row.cells[2].getAttribute('data-id') // Tải ID mục 2 vào ô nhập
        document.getElementById(addRowButton).textContent = 'Sửa' // Thay đổi văn bản nút thành "Sửa"
      }
    })
  }

  // Hàm cập nhật số thứ tự
  function updateRowIndices() {
    const table = document.getElementById(tableId).getElementsByTagName('tbody')[0]
    for (let i = 0; i < table.rows.length; i++) {
      table.rows[i].cells[0].textContent = i + 1 // Cập nhật STT
    }
  }
}

export function getTableData(tableId) {
  const table = document.getElementById(tableId).getElementsByTagName('tbody')[0]
  const data = []

  // Lặp qua tất cả các hàng trong bảng
  for (let i = 0; i < table.rows.length; i++) {
    const row = table.rows[i]
    const rowData = {
      itemId1: row.cells[1].getAttribute('data-id'), // Lấy ID mục 1
      itemId2: row.cells[2].getAttribute('data-id') // Lấy ID mục 2
    }

    data.push(rowData) // Thêm dữ liệu của hàng vào mảng data
  }

  return data
}

export function updateErrorMessages(errors) {
  console.log(errors)
  // Lấy tất cả các key từ đối tượng lỗi
  const keys = Object.keys(errors)

  keys.forEach((key) => {
    // Lấy thông điệp tương ứng
    const message = errors[key].msg

    // Tìm thẻ tr có thuộc tính name tương ứng
    const input = document.querySelector(`[name="${key}"]`)
    const row = input.closest('div')

    if (row) {
      // Tìm thẻ span có lớp form-message trong thẻ tr đó
      const messageSpan = row.querySelector('span.form-message')
      console.log(messageSpan)
      if (messageSpan) {
        // Cập nhật giá trị của span với thông điệp
        messageSpan.textContent = message

        // Thêm lớp 'invalid' nếu chưa có
        if (!messageSpan.closest('div').classList.contains('invalid')) {
          messageSpan.closest('div').classList.add('invalid')
        }
      }
    }
  })
}

// logout
const logoutButton = document.getElementById('logout')
console.log(logoutButton)
if (logoutButton) {
  const loader = document.getElementById('loader')
  logoutButton.addEventListener('click', async function () {
    try {
      loader.classList.remove('hidden')
      const response = await fetch(`/api/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ logout: true })
      })

      if (!response.ok) {
        const errorResponse = await response.json()
        throw new Error(errorResponse.message)
      }
      const result = await response.json()
      sessionStorage.setItem(
        'toastMessage',
        JSON.stringify({
          title: 'Đăng xuất thành công!!!',
          message: result.message,
          type: 'success'
        })
      )
      window.location.href = '/users/login'
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
  })
}

window.addEventListener('DOMContentLoaded', (event) => {
  const toastMessage = sessionStorage.getItem('toastMessage')
  if (toastMessage) {
    const message = JSON.parse(toastMessage)
    toast(message)
    sessionStorage.removeItem('toastMessage')
  }
})
