export enum UserVerifyStatus {
  Unverified, // chưa xác thực email, mặc định = 0
  Verified, // đã xác thực email
  Banned // bị khóa
}

export enum TokenType {
  AccessToken,
  RefreshToken
}

export enum MediaType {
  Image,
  Video,
  HLS
}

export enum ProductStatus {
  Active,
  Inactive
}

export enum salaryType {
  ThuNhap,
  KhauTru
}
