export function addUserId(userId) {
  console.log('user id stored triggered?', userId);
  return { type: STORE_USER_ID, userId: userId }
}

// export function addUser(user) {
//   console.log('user saved?', user);
//   return { type: STORE_USER, user: user }
// }

export function addAdminId(adminId) {
  console.log('admin saved?', adminId)
  return { type: STORE_ADMIN, adminId: adminId }
}

export function logout() {
  console.log('logout');
  return { type: LOGOUT }
}

export function loginAdmin(username, password) {
  return { type: REQUEST_ADMIN_LOGIN, data: {username, password} }
}


// export const STORE_USER = 'STORE_USER'

export const STORE_USER_ID = 'STORE_USER_ID'

export const STORE_ADMIN = 'STORE_ADMIN'

export const LOGOUT = 'LOGOUT'


export const REQUEST_ADMIN_LOGIN = 'REQUEST_ADMIN_LOGIN'

export const SUCCESS_ADMIN_LOGIN = 'SUCCESS_ADMIN_LOGIN'

export const FAIL_ADMIN_LOGIN = 'FAIL_ADMIN_LOGIN'