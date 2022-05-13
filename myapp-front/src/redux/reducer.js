export default function Login(state = false, action) {
    switch (action.type) {
        case 'SETLOGIN':
            return action.Login;
        default:
            return state;
    }
}