import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native'
import axios from "axios";

export const axiosInstance = axios.create({
    withCredentials: true,
    validateStatus: (status) => status >= 200 && status <= 500,
    headers: {
        Authorization: `Bearer ${getFromStorage("accessToken")}`,
    }
})

export function processResponse<T>(response: any): CustomResponse<T> {
    return {
        success: response.data.statusCode <= 299,
        message: response.data.message,
        data: response.data.data,
        status: response.statusCode,
    }
}

export function processError(error: any): CustomResponse<any> {
    console.error("Message: ", error.message);
    return {
        success: false,
        message: error?.request ? error : error.message,
        status: error.response ? error.response.statusCode : 500,
        data: null,
    };
}

export function saveToStorage(key: string, value: string) {
    try {
        if (Platform.OS === 'web') {
            localStorage.setItem(key, value);
        }
        else {
            SecureStore.setItem(key, value);
        }
    }
    catch (error) {
        console.error('Failed to save the data', error);
    }
}

export function getFromStorage(key: string) {
    try {
        if (Platform.OS === 'web') {
            const value = localStorage.getItem(key);
            if (!value) return null;
            return value;
        } else {
            const value = SecureStore.getItem(key);
            if (!value) return null;
            return value;
        }
    } catch (error) {
        console.error('Failed to retrieve the data', error);
        return null;
    }
}