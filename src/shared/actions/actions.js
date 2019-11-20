export function addUserId(userId) {
  console.log('user id stored triggered?', userId);
  return { type: STORE_USER, userId: userId }
}

export const STORE_USER = 'STORE_USER'
