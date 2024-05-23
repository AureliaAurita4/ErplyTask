import { UserData } from "../interfaces/userData";
  
const initialState: UserData = {
    email: '',
    token: ''
};
  
const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                ...action.payload
            };
        case 'CLEAR_USER':
            return {
                ...state,
                email: '',
                token: ''
            };
        default:
            return state;
    }
};
  
export default userReducer;
  