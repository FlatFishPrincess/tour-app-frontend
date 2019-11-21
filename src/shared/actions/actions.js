export function addUserId(userId) {
  console.log('user id stored triggered?', userId);
  return { type: STORE_USER_ID, userId: userId }
}

export function addUser(user) {
  console.log('user saved?', user);
  return { type: STORE_USER, user: user }
}

export const STORE_USER = 'STORE_USER'

export const STORE_USER_ID = 'STORE_USER_ID'
