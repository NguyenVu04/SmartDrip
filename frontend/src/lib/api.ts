import { AxiosInstance } from "axios";
import { axiosInstance, getFromStorage, processError, processResponse, saveToStorage } from "./utils";

export const API_URL = "https://smartdrip-979829148615.asia-southeast2.run.app/api/v1"

export class UserService {
    private baseURL: string;
    private axios: AxiosInstance;

    constructor() {
        this.baseURL = API_URL + "/users";
        this.axios = axiosInstance;
    }

    public async getAllUsers(payload: SearchPayload): Promise<CustomResponse<GetUserResponseData>> {
        try {
            const response = await this.axios.get(`${this.baseURL}`, {
                params: {
                    current: payload.current,
                    pageSize: payload.pageSize,
                }
            });
            return processResponse<GetUserResponseData>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async getUserById(id: string): Promise<CustomResponse<GetUserResponseData>> {
        try {
            const response = await this.axios.get(`${this.baseURL}`, {
                params: { _id: id }
            });
            return processResponse<GetUserResponseData>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async createUser(payload: CreateUserPayload) : Promise<CustomResponse<null>> {
        try {
            const response = await this.axios.post(`${this.baseURL}`, payload);
            return processResponse<null>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async updateUser(id: string, payload: UpdateUserPayload): Promise<CustomResponse<null>> {
        try {
            const response = await this.axios.patch(`${this.baseURL}`, payload, {
                params: { _id: id }
            });
            return processResponse<null>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async deleteUser(id: string): Promise<CustomResponse<null>> {
        try {
            const response = await this.axios.delete(`${this.baseURL}/${id}`);
            return processResponse<null>(response);
        } catch (error) {
            return processError(error);
        }
    }


}

export class AuthService {
    private baseURL: string;
    private axios: AxiosInstance;

    constructor() {
        this.baseURL = API_URL + "/auth";
        this.axios = axiosInstance;
    }

    public async login(payload: LoginPayload): Promise<CustomResponse<LoginResponseData>> {
        try {
            const response = await this.axios.post(`${this.baseURL}/login`, payload);
            const processRes = processResponse<LoginResponseData>(response);
            if (processRes.success) {
                const token = processRes.data.access_token;
                saveToStorage("accessToken",token);
                const id = processRes.data.user._id;
                saveToStorage("userId",id);
            }
            return processRes;
        } catch (error) {
            return processError(error);
        }
    }

    public async signup(payload: SignupPayload): Promise<CustomResponse<SignupResponseData>> {
        try {
            const response = await this.axios.post(`${this.baseURL}/register`, payload);
            const res = processResponse<SignupResponseData>(response);
            if (res.success) {
                const id = res.data._id;
                saveToStorage("userId", id);
                const email = payload.email;
                saveToStorage("email", email);
            }
            return res;
        } catch (error) {
            return processError(error);
        }
    }

    public async getProfile(): Promise<CustomResponse<GetProfileResponseData>> {
        try {
            const response = await this.axios.get(`${this.baseURL}/profile`);
            return processResponse<GetProfileResponseData>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async verifyOTP(otp: string): Promise<CustomResponse<UserInfo>> {
        try {
            const email = getFromStorage("email");
            const response = await this.axios.post(`${this.baseURL}/verify`, {
                email: email,
                codeId: otp
            });
            return processResponse<UserInfo>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async verifyOTPEmail(email: string, otp: string): Promise<CustomResponse<UserInfo>> {
        try {
            const response = await this.axios.post(`${this.baseURL}/verify`, {
                email: email,
                codeId: otp
            });
            return processResponse<UserInfo>(response);
        } catch (error) {
            return processError(error);
        }
    }
}

export class GardenInfoServfice {
    private baseURL: string;
    private axios: AxiosInstance;

    constructor() {
        this.baseURL = API_URL + "/garden-info";
        this.axios = axiosInstance;
    }

    public async getAllGardenInfo(payload: SearchPayload): Promise<CustomResponse<GardenInfo>> {
        try {
            const response = await this.axios.get(`${this.baseURL}`, {
                params: {
                    current: payload.current,
                    pageSize: payload.pageSize,
                }
            });
            return processResponse<GardenInfo>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async getGardenInfoById(id: string): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}`, {
                params: { _id: id }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async createGardenInfo(payload: CreateGardenInfoPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.post(`${this.baseURL}`, payload);
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async updateGardenInfo(id: string, payload: any): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.patch(`${this.baseURL}/${id}`, payload);
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async deleteGardenInfo(id: string): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.delete(`${this.baseURL}/${id}`);
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }
}

export class WeatherRecordService {
    private baseURL: string;
    private axios: AxiosInstance;

    constructor() {
        this.baseURL = API_URL;
        this.axios = axiosInstance;
    }

    public async getAllHumidityRecords(payload: SearchPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}/humidity-records`, {
                params: {
                    current: payload.current,
                    pageSize: payload.pageSize,
                }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async getAllMoistureRecords(payload: SearchPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}/moisture-records`, {
                params: {
                    current: payload.current,
                    pageSize: payload.pageSize,
                }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async getAllTemperatureRecords(payload: SearchPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}/temperature-records`, {
                params: {
                    current: payload.current,
                    pageSize: payload.pageSize,
                }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async getAllPumpRecords(payload: SearchPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}/pump-records`, {
                params: {
                    current: payload.current,
                    pageSize: payload.pageSize,
                }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async getWeatherRecord(): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}/weather-records`);
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }
}

export class MQTTService {
    private baseURL: string;
    private axios: AxiosInstance;

    constructor() {
        this.baseURL = API_URL + "/mqtt";
        this.axios = axiosInstance;
    }

    public async getAllMQTT(payload: SearchPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}`, {
                params: {
                    current: payload.current,
                    pageSize: payload.pageSize,
                }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async getMQTTById(id: string): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}`, {
                params: { _id: id }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async createMQTT(payload: CreateMQTTTPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.post(`${this.baseURL}`, payload);
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async updateMQTT(id: string, payload: UpdateMQTTTPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.patch(`${this.baseURL}`, payload, {
                params: { _id: id }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async updateMQTTByUserId(id: string, payload: UpdateMQTTTPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.patch(`${this.baseURL}/user`, payload, {
                params: { _id: id }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async deleteMQTT(id: string): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.delete(`${this.baseURL}`, {
                params: { _id: id }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }
}

export class NotificationService {
    private baseURL: string;
    private axios: AxiosInstance;

    constructor() {
        this.baseURL = API_URL;
        this.axios = axiosInstance;
    }

    public async getAllNotification(payload: SearchPayload): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}/notifications`, {
                params: {
                    current: payload.current,
                    pageSize: payload.pageSize,
                }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async getNotificationById(id: string): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.get(`${this.baseURL}/notifications`, {
                params: { _id: id }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async createNotification(payload: any): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.post(`${this.baseURL}/notifications`, payload);
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async updateNotification(id: string, payload: any): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.patch(`${this.baseURL}/notifications`, payload, {
                params: { _id: id }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }

    public async deleteNotification(id: string): Promise<CustomResponse<any>> {
        try {
            const response = await this.axios.delete(`${this.baseURL}/notifications`, {
                params: { _id: id }
            });
            return processResponse<any>(response);
        } catch (error) {
            return processError(error);
        }
    }
}