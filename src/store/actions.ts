import { UserData } from "../interfaces/userData";

export const setUser = (user: UserData ) => ({
    type: 'SET_USER',
    payload: user
});
  
export const clearUser = () => ({
    type: 'CLEAR_USER'
});