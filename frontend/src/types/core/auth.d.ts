
declare global {
    type SigninPayload = {
        email: string;
        password: string;
    }

    type SignupPayload = {
        email: string;
        password: string;
        confirmPassword: string;
    }

    // Use either email or phoneNumber
    type ForgotPasswordPayload = {
        email?: string;
        phoneNum?: string;
    }
}

export {}