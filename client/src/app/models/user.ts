/**
 * redux里面的user
 */
export interface User {
  name: string;
  thirdId: string;
}

/**
 * redux login
 */
export interface Authenticate {
  email: string;
  password: string;
  thirdId: string;
  logintype: string;
}
