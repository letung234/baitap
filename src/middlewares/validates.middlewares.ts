import { NextFunction, Request, Response } from 'express'
import { validate } from '~/utils/validation'
import { salaryType } from '~/constants/enums'
import databaseService from '~/services/database.service'
import { SALARY_MESSAGES } from '~/constants/messages'
import { ObjectId } from 'mongodb'
import { ParamSchema, checkSchema } from 'express-validator'
import { JsonWebTokenError } from 'jsonwebtoken'
import { capitalize } from 'lodash'
import { MESSAGES, SALARY_STRUCTURE_MESSAGE } from '~/constants/messages'
import { hashPassword } from '~/utils/crypto'
import { RoleRequestBody, EditRolesRequestParams, PermissionsData } from '~/models/requests/role.request'
// Validator cho cập nhật phân lương
export const UpdateSalaryValidator = validate(
  checkSchema(
    {
      ten: {
        isString: true,
        trim: true,
        notEmpty: {
          errorMessage: SALARY_MESSAGES.SALARY_NAME_REQUIRED // 'Tên phân lương là bắt buộc'
        },
        isLength: {
          options: { max: 255 },
          errorMessage: SALARY_MESSAGES.SALARY_NAME_MAX_LENGTH // 'Tên phân lương không được vượt quá 255 ký tự'
        },
        custom: {
          options: async (value, { req }) => {
            // Kiểm tra nếu tên đã tồn tại cho phân lương khác
            const salaryId = req.params?.id as string // Lấy ID từ request params
            const existingSalary = await databaseService.SalaryPortion.findOne({
              ten: value,
              _id: { $ne: new ObjectId(salaryId) }
            })
            if (existingSalary) {
              throw new Error(SALARY_MESSAGES.SALARY_NAME_EXISTS) // 'Tên phân lương đã tồn tại!!!'
            }
            return true
          }
        }
      },
      loai: {
        isInt: {
          errorMessage: SALARY_MESSAGES.SALARY_TYPE_MUST_BE_INTEGER // 'Loại phân lương phải là số nguyên'
        },
        toInt: true,
        custom: {
          options: (value) => {
            return Object.values(salaryType).includes(value)
          },
          errorMessage: SALARY_MESSAGES.SALARY_TYPE_INVALID // 'Loại phân lương chỉ được là khấu trừ hoặc thu nhập'
        }
      },
      mo_ta: {
        isString: true,
        optional: true, // Trường này không bắt buộc
        isLength: {
          options: { max: 5000 },
          errorMessage: SALARY_MESSAGES.SALARY_DESCRIPTION_MAX_LENGTH // 'Mô tả không được vượt quá 500 ký tự'
        }
      },
      is_active: {
        isBoolean: {
          errorMessage: SALARY_MESSAGES.SALARY_STATUS_MUST_BE_BOOLEAN // 'Trạng thái phải là kiểu boolean'
        },
        toBoolean: true
      },
      'tai_khoan_ke_toan.*.id_congty': {
        isMongoId: {
          errorMessage: SALARY_MESSAGES.COMPANY_ID_INVALID // 'ID công ty phải là một ObjectId hợp lệ'
        }
      },
      'tai_khoan_ke_toan.*.id_ke_toan': {
        isMongoId: {
          errorMessage: SALARY_MESSAGES.ACCOUNTANT_ID_INVALID // 'ID kế toán phải là một ObjectId hợp lệ'
        }
      },
      tai_khoan_ke_toan: {
        custom: {
          options: async (value) => {
            const seen = new Set()
            for (const account of value) {
              const key = `${account.id_congty}-${account.id_ke_toan}`
              const cty = await databaseService.Company.findOne({ _id: new ObjectId(account.id_congty) })
              const kt = await databaseService.Account.findOne({ _id: new ObjectId(account.id_ke_toan) })
              if (!cty || !kt) throw new Error(`Could not find company and account`)
              if (seen.has(key)) {
                throw new Error(SALARY_MESSAGES.DUPLICATE_ACCOUNT_COMPANY_PAIR) // 'Có cặp ID công ty và ID kế toán bị trùng'
              }
              seen.add(key)
            }
            return true
          }
        }
      }
    },
    ['body'] // Kiểm tra trong body của request
  )
)
export const createSalaryValidator = validate(
  checkSchema(
    {
      ten: {
        isString: true,
        trim: true,
        notEmpty: {
          errorMessage: SALARY_MESSAGES.SALARY_NAME_REQUIRED // 'Tên phân lương là bắt buộc.'
        },
        isLength: {
          options: { max: 255 },
          errorMessage: SALARY_MESSAGES.SALARY_NAME_MAX_LENGTH // 'Tên phân lương không được vượt quá 255 ký tự.'
        },
        custom: {
          options: async (value) => {
            const result = await databaseService.SalaryPortion.findOne({ ten: value })
            if (result) {
              throw new Error(SALARY_MESSAGES.SALARY_NAME_EXISTS) // 'Tên phân lương đã tồn tại!!!'
            }
            return true
          }
        }
      },
      loai: {
        isInt: {
          errorMessage: SALARY_MESSAGES.SALARY_TYPE_MUST_BE_INTEGER // 'Loại phân lương phải là số nguyên.'
        },
        toInt: true,
        custom: {
          options: (value) => {
            return Object.values(salaryType).includes(value)
          },
          errorMessage: SALARY_MESSAGES.SALARY_TYPE_INVALID // 'Loại phân lương chỉ được là khấu trừ hoặc thu nhập.'
        }
      },
      mo_ta: {
        isString: true,
        optional: true, // Trường này không bắt buộc
        isLength: {
          options: { max: 500 },
          errorMessage: SALARY_MESSAGES.SALARY_DESCRIPTION_MAX_LENGTH // 'Mô tả không được vượt quá 500 ký tự.'
        }
      },
      is_active: {
        isBoolean: {
          errorMessage: SALARY_MESSAGES.SALARY_STATUS_MUST_BE_BOOLEAN // 'Trạng thái phải là kiểu boolean.'
        },
        toBoolean: true
      },
      'tai_khoan_ke_toan.*.id_congty': {
        isMongoId: {
          errorMessage: SALARY_MESSAGES.COMPANY_ID_INVALID // 'ID công ty phải là một ObjectId hợp lệ.'
        }
      },
      'tai_khoan_ke_toan.*.id_ke_toan': {
        isMongoId: {
          errorMessage: SALARY_MESSAGES.ACCOUNTANT_ID_INVALID // 'ID kế toán phải là một ObjectId hợp lệ.'
        }
      },
      tai_khoan_ke_toan: {
        custom: {
          options: async (value) => {
            const seen = new Set()
            for (const account of value) {
              const key = `${account.id_congty}-${account.id_ke_toan}`
              const cty = await databaseService.Company.findOne({ _id: new ObjectId(account.id_congty) })
              const kt = await databaseService.Account.findOne({ _id: new ObjectId(account.id_ke_toan) })
              if (!cty || !kt) throw new Error(`Could not find company and account`)
              if (seen.has(key)) {
                throw new Error(SALARY_MESSAGES.DUPLICATE_ACCOUNT_COMPANY_PAIR) // 'Có cặp ID công ty và ID kế toán bị trùng.'
              }
              seen.add(key)
            }
            return true
          }
        }
      }
    },
    ['body']
  )
)
const passwordSchema: ParamSchema = {
  notEmpty: {
    errorMessage: MESSAGES.PASSWORD_IS_REQUIRED
  },
  isString: {
    errorMessage: MESSAGES.PASSWORD_MUST_BE_A_STRING
  },
  isLength: {
    options: {
      min: 6,
      max: 50
    },
    errorMessage: MESSAGES.PASSWORD_LENGTH_MUST_BE_FROM_6_TO_50
  },
  isStrongPassword: {
    options: {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    },
    errorMessage: MESSAGES.PASSWORD_MUST_BE_STRONG
  }
}

export const loginValidator = validate(
  checkSchema({
    email: {
      isEmail: {
        errorMessage: MESSAGES.EMAIL_IS_INVALID
      },
      trim: true,
      custom: {
        options: async (value, { req }) => {
          const user = await databaseService.User.findOne({
            email: req.body.email,
            password: hashPassword(req.body.password),
            is_active: true
          })
          if (user === null) {
            throw new Error(MESSAGES.EMAIL_OR_PASSWORD_IS_INCORRECT)
          }
          req.user = user
          return true
        }
      }
    },
    password: passwordSchema
  })
)
export const createRoleValidator = validate(
  checkSchema({
    title: {
      isString: {
        errorMessage: 'Tên vai trò phải là chuỗi ký tự.'
      },
      trim: true,
      notEmpty: {
        errorMessage: 'Tên vai trò là bắt buộc.'
      },
      isLength: {
        options: { max: 255 },
        errorMessage: 'Tên vai trò không được vượt quá 255 ký tự.'
      },
      custom: {
        options: async (value) => {
          // Kiểm tra nếu tên role đã tồn tại
          const existingRole = await databaseService.Role.findOne({ title: value })
          if (existingRole) {
            throw new Error('Tên vai trò đã tồn tại.')
          }
          return true
        }
      }
    },
    description: {
      isString: {
        errorMessage: 'Mô tả phải là chuỗi ký tự.'
      },
      optional: true,
      isLength: {
        options: { max: 500 },
        errorMessage: 'Mô tả không được vượt quá 500 ký tự.'
      }
    },
    permission: {
      isArray: {
        errorMessage: 'Danh sách quyền phải là một mảng.'
      },
      optional: true,
      custom: {
        options: (value) => Array.isArray(value) && value.every((perm) => typeof perm === 'string'),
        errorMessage: 'Mỗi quyền trong danh sách phải là chuỗi ký tự.'
      }
    },
    deleted: {
      isBoolean: {
        errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
      },
      optional: true
    }
  })
)
export const editRoleValidator = validate(
  checkSchema({
    title: {
      isString: {
        errorMessage: 'Tên vai trò phải là chuỗi ký tự.'
      },
      trim: true,
      notEmpty: {
        errorMessage: 'Tên vai trò là bắt buộc.'
      },
      isLength: {
        options: { max: 255 },
        errorMessage: 'Tên vai trò không được vượt quá 255 ký tự.'
      },
      custom: {
        options: async (value, { req }) => {
          const roleId = req.params?.id as string // Lấy ID của Role từ request params

          // Kiểm tra xem role khác với role hiện tại có cùng title hay không
          const existingRole = await databaseService.Role.findOne({
            title: value,
            _id: { $ne: new ObjectId(roleId) } // Loại trừ chính nó bằng ID
          })

          if (existingRole) {
            throw new Error('Tên vai trò đã tồn tại.')
          }
          return true
        }
      }
    },
    description: {
      isString: {
        errorMessage: 'Mô tả phải là chuỗi ký tự.'
      },
      optional: true,
      isLength: {
        options: { max: 500 },
        errorMessage: 'Mô tả không được vượt quá 500 ký tự.'
      }
    },
    permission: {
      isArray: {
        errorMessage: 'Danh sách quyền phải là một mảng.'
      },
      optional: true,
      custom: {
        options: (value) => Array.isArray(value) && value.every((perm) => typeof perm === 'string'),
        errorMessage: 'Mỗi quyền trong danh sách phải là chuỗi ký tự.'
      }
    },
    deleted: {
      isBoolean: {
        errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
      },
      optional: true
    }
  })
)
export const createUserValidator = validate(
  checkSchema({
    name: {
      notEmpty: {
        errorMessage: MESSAGES.NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: 'Tên người dùng phải là chuỗi ký tự.'
      },
      isLength: {
        options: { max: 255 },
        errorMessage: 'Tên người dùng không được vượt quá 255 ký tự.'
      }
    },
    email: {
      notEmpty: {
        errorMessage: MESSAGES.EMAIL_IS_REQUIRED
      },
      isEmail: {
        errorMessage: MESSAGES.EMAIL_INVALID
      },
      custom: {
        options: async (value) => {
          const user = await databaseService.User.findOne({ email: value })
          if (user) {
            throw new Error(MESSAGES.EMAIL_ALREADY_EXISTS)
          }
          return true
        }
      }
    },
    role_id: {
      notEmpty: {
        errorMessage: MESSAGES.ROLE_ID_IS_REQUIRED
      },
      isString: {
        errorMessage: 'Role ID phải là chuỗi ký tự.'
      },
      custom: {
        options: async (value) => {
          const role = await databaseService.Role.findOne({ _id: new ObjectId(value) })
          if (!role) {
            throw new Error(MESSAGES.ROLE_ID_INVALID)
          }
          return true
        }
      }
    },
    password: passwordSchema, // Sử dụng passwordSchema ở đây
    is_active: {
      isBoolean: {
        errorMessage: 'Trạng thái hoạt động phải là kiểu boolean.'
      },
      optional: true
    },
    deleted: {
      isBoolean: {
        errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
      },
      optional: true
    },
    created_at: {
      isDate: {
        errorMessage: 'Ngày tạo phải là kiểu ngày hợp lệ.'
      },
      optional: true
    },
    updated_at: {
      isDate: {
        errorMessage: 'Ngày cập nhật phải là kiểu ngày hợp lệ.'
      },
      optional: true
    },
    deleted_at: {
      isDate: {
        errorMessage: 'Ngày xóa phải là kiểu ngày hợp lệ.'
      },
      optional: true
    }
  })
)

export const updateUserValidator = validate(
  checkSchema({
    name: {
      isString: {
        errorMessage: 'Tên người dùng phải là chuỗi ký tự.'
      },
      optional: true,
      isLength: {
        options: { max: 255 },
        errorMessage: 'Tên người dùng không được vượt quá 255 ký tự.'
      }
    },
    email: {
      isEmail: {
        errorMessage: 'Email không hợp lệ.'
      },
      optional: true,
      custom: {
        options: async (value, { req }) => {
          const userId = req.params?.id
          const user = await databaseService.User.findOne({ email: value, _id: { $ne: new ObjectId(userId) } })
          if (user) {
            throw new Error('Email đã tồn tại.')
          }
          return true
        }
      }
    },
    role_id: {
      isString: {
        errorMessage: 'Role ID phải là chuỗi ký tự.'
      },
      optional: true,
      custom: {
        options: async (value) => {
          const role = await databaseService.Role.findOne({ _id: new ObjectId(value) })
          if (!role) {
            throw new Error('Role ID không hợp lệ.')
          }
          return true
        }
      }
    },
    password: {
      ...passwordSchema,
      optional: true // Để cho phép cập nhật mà không cần thay đổi mật khẩu
    },
    is_active: {
      isBoolean: {
        errorMessage: 'Trạng thái hoạt động phải là kiểu boolean.'
      },
      optional: true
    },
    deleted: {
      isBoolean: {
        errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
      },
      optional: true
    },
    created_at: {
      isDate: {
        errorMessage: 'Ngày tạo phải là kiểu ngày hợp lệ.'
      },
      optional: true
    },
    updated_at: {
      isDate: {
        errorMessage: 'Ngày cập nhật phải là kiểu ngày hợp lệ.'
      },
      optional: true
    },
    deleted_at: {
      isDate: {
        errorMessage: 'Ngày xóa phải là kiểu ngày hợp lệ.'
      },
      optional: true
    }
  })
)
export const createSalaryStructureValidator = validate(
  checkSchema({
    ten: {
      notEmpty: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.NAME_IS_REQUIRED
      },
      isString: {
        errorMessage: 'Tên cấu trúc lương phải là chuỗi.'
      },
      isLength: {
        options: { max: 255 },
        errorMessage: 'Tên cấu trúc lương không được vượt quá 255 ký tự.'
      },
      custom: {
        options: async (value) => {
          const existingSalaryStructure = await databaseService.SalaryStructure.findOne({ ten: value })
          if (existingSalaryStructure) {
            throw new Error('Tên cấu trúc lương đã tồn tại.')
          }
          return true
        }
      }
    },
    id_cong_ty: {
      notEmpty: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.COMPANY_ID_IS_REQUIRED
      },
      isMongoId: {
        errorMessage: 'ID công ty không hợp lệ.'
      }
    },
    status: {
      isBoolean: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.STATUS_IS_REQUIRED
      }
    },
    chu_ky_phat_luong: {
      notEmpty: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.PAY_PERIOD_IS_REQUIRED
      },
      isString: {
        errorMessage: 'Chu kỳ phát lương phải là chuỗi.'
      }
    },
    don_vi_tien_te: {
      notEmpty: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.CURRENCY_UNIT_IS_REQUIRED
      },
      isString: {
        errorMessage: 'Đơn vị tiền tệ phải là chuỗi.'
      }
    },
    thu_nhap: {
      isArray: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.INCOME_IS_ARRAY
      },
      custom: {
        options: async (value) => {
          for (const item of value) {
            const id = await databaseService.SalaryPortion.findOne({ _id: new ObjectId(item.id_phan_luong) })
            if (!id) throw new Error(`Salary not found!!!`)
            if (item.so_tien < 0) {
              throw new Error(SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT)
            }
          }
          return true
        }
      }
    },
    khau_tru: {
      isArray: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.DEDUCTION_IS_ARRAY
      },
      custom: {
        options: async (value) => {
          for (const item of value) {
            const id = await databaseService.SalaryPortion.findOne({ _id: new ObjectId(item.id_phan_luong) })
            if (!id) throw new Error(`Salary not found!!!`)
            if (item.so_tien < 0) {
              throw new Error(SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT)
            }
          }
          return true
        }
      }
    },
    hinh_thuc_chi_tra: {
      notEmpty: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.PAYMENT_METHOD_IS_REQUIRED
      },
      isObject: {
        errorMessage: 'Hình thức chi trả phải là một đối tượng.'
      },
      custom: {
        options: async (value) => {
          const ht = await databaseService.FormOfPayment.findOne({ _id: new ObjectId(value.id_hinh_thuc) })
          const tk = await databaseService.PayMentAccount.findOne({ _id: new ObjectId(value.id_tai_khoan_chi_tra) })
          if (!ht || !tk) throw new Error('Không thể tìm thấy id hình thưc hoặc id tài khoản chi trả!!!')
          if (!value.id_hinh_thuc || !value.id_tai_khoan_chi_tra) {
            throw new Error(SALARY_STRUCTURE_MESSAGE.PAYMENT_METHOD_IS_REQUIRED)
          }
          return true
        }
      }
    },
    deleted: {
      isBoolean: {
        errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
      },
      optional: true
    },
    created_at: {
      isDate: {
        errorMessage: 'Ngày tạo phải là kiểu ngày hợp lệ.'
      },
      optional: true
    },
    updated_at: {
      isDate: {
        errorMessage: 'Ngày cập nhật phải là kiểu ngày hợp lệ.'
      },
      optional: true
    }
  })
)

// Validator cho việc cập nhật cấu trúc lương
export const updateSalaryStructureValidator = validate(
  checkSchema({
    ten: {
      isString: {
        errorMessage: 'Tên cấu trúc lương phải là chuỗi.'
      },
      optional: true,
      isLength: {
        options: { max: 255 },
        errorMessage: 'Tên cấu trúc lương không được vượt quá 255 ký tự.'
      },
      custom: {
        options: async (value, { req }) => {
          const id = req.params?.id as string
          const existingSalaryStructure = await databaseService.SalaryStructure.findOne({
            ten: value,
            _id: { $ne: new ObjectId(id) } // Loại trừ bản ghi có id hiện tại
          })
          if (existingSalaryStructure) {
            throw new Error('Tên cấu trúc lương đã tồn tại.')
          }
          return true
        }
      }
    },
    id_cong_ty: {
      isMongoId: {
        errorMessage: 'ID công ty không hợp lệ.'
      },
      optional: true
    },
    status: {
      isBoolean: {
        errorMessage: 'Trạng thái phải là kiểu boolean.'
      },
      optional: true
    },
    chu_ky_phat_luong: {
      isString: {
        errorMessage: 'Chu kỳ phát lương phải là chuỗi.'
      },
      optional: true
    },
    don_vi_tien_te: {
      isString: {
        errorMessage: 'Đơn vị tiền tệ phải là chuỗi.'
      },
      optional: true
    },
    thu_nhap: {
      isArray: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.INCOME_IS_ARRAY
      },
      optional: true,
      custom: {
        options: async (value) => {
          for (const item of value) {
            const id = await databaseService.SalaryPortion.findOne({ _id: new ObjectId(item.id_phan_luong) })
            if (!id) throw new Error(`Salary not found!!!`)
            if (item.so_tien < 0) {
              throw new Error(SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT)
            }
          }
          return true
        }
      }
    },
    khau_tru: {
      isArray: {
        errorMessage: SALARY_STRUCTURE_MESSAGE.DEDUCTION_IS_ARRAY
      },
      optional: true,
      custom: {
        options: async (value) => {
          for (const item of value) {
            const id = await databaseService.SalaryPortion.findOne({ _id: new ObjectId(item.id_phan_luong) })
            if (!id) throw new Error(`Salary not found!!!`)
            if (item.so_tien < 0) {
              throw new Error(SALARY_STRUCTURE_MESSAGE.INVALID_AMOUNT)
            }
          }
          return true
        }
      }
    },
    hinh_thuc_chi_tra: {
      isObject: {
        errorMessage: 'Hình thức chi trả phải là một đối tượng.'
      },
      optional: true,
      custom: {
        options: async (value) => {
          const ht = await databaseService.FormOfPayment.findOne({ _id: new ObjectId(value.id_hinh_thuc) })
          const tk = await databaseService.PayMentAccount.findOne({ _id: new ObjectId(value.id_tai_khoan_chi_tra) })
          if (!ht || !tk) throw new Error('Không thể tìm thấy id hình thưc hoặc id tài khoản chi trả!!!')
          if (!value.id_hinh_thuc || !value.id_tai_khoan_chi_tra) {
            throw new Error(SALARY_STRUCTURE_MESSAGE.PAYMENT_METHOD_IS_REQUIRED)
          }
          return true
        }
      }
    },
    deleted: {
      isBoolean: {
        errorMessage: 'Trạng thái xóa phải là kiểu boolean.'
      },
      optional: true
    },
    created_at: {
      isDate: {
        errorMessage: 'Ngày tạo phải là kiểu ngày hợp lệ.'
      },
      optional: true
    },
    updated_at: {
      isDate: {
        errorMessage: 'Ngày cập nhật phải là kiểu ngày hợp lệ.'
      },
      optional: true
    }
  })
)
