// Handle login
const login = params => {
  return Promise.resolve({
    data: {
      code: 'SUCCESS',
      message: 'Đăng nhập thành công!',
      result: { id: 1 },
    },
  });
};

// Handle register
const register = params => {
  return Promise.resolve({
    data: {
      code: 'SUCCESS',
      message: 'Đăng ký tài khoản mới thành công!',
      result: { id: 1 },
    },
  });
};

// Handle forgot password
const forgotPassword = params => {
  return Promise.resolve({
    data: {
      code: 'SUCCESS',
      message: 'Mật khẩu mới đã được gửi vào email của bạn!',
    },
  });
};

// Handle change password
const changePassword = params => {
  return Promise.resolve({
    data: {
      code: 'SUCCESS',
      message: 'Đổi mật khẩu thành công, vui lòng đăng nhập lại!',
    },
  });
};

// Handle log out
const logout = params => {
  return Promise.resolve({
    data: {
      code: 'SUCCESS',
      message: 'Đăng xuất thành công!',
    },
  });
};

export default {
  login,
  register,
  forgotPassword,
  changePassword,
  logout,
};
