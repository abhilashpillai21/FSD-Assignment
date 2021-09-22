export const errorFlagReducer =
    (state = {
        emailflag: false,
        passwordflag: false,
        email: "",
        password: "",
        errorFlag: false,
    }, action) => {
        switch (action.type) {
            case "PasswordFlagReset":
                return { ...state, passwordflag: action.payload }
            case "EmailFlagReset":
                return { ...state, emailflag: action.payload }
            case "Password":
                return { ...state, password: action.payload }
            case "Email":
                return { ...state, email: action.payload }
            case "ErrorTogglerReset":
                return { ...state, errorFlag: action.payload }
            case "Reset":
                return {
                    emailflag: false,
                    passwordflag: false,
                    email: "",
                    password: "",
                    errorFlag: false,
                };
            default:
                return state;
        }
    }