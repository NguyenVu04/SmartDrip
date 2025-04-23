

declare global {
    type SearchPayload = {
        current: number;
        pageSize: number;
        sort?: string;
    }

    // Auth
    type LoginPayload = {
        username: string;
        password: string;
    }

    type LoginResponseData = {
        user: {
            _id: string;
            email: string;
        },
        access_token: string;
    }

    type SignupPayload = {
        email: string;
        password: string;
    }

    type SignupResponseData = {
        _id: string;
    }

    // Acount
    type CreateUserPayload = {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
    }

    type UpdateUserPayload = {
        firstName?: string;  
        lastName?: string;
        phoneNumber?: string;
        address?: string;
    }

    type GetProfileResponseData = {
        _id: string;
        username: string;
    }

    type UserInfo = {
        _id: string;
        email: string;
        accountType: string;
        isActive: boolean;
        role: string;
        codeId: string;
        codeExpired: string;
        __v: number;
    }

    type GetUserResponseData = {
        results: UserInfo[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }

    // GardenInfo
    type GardenInfo = {
        gardenInfos: TreeInfo[]
        totalItems: number
        totalPages: number
        current: number
        pageSize:number
    }

    type TreeInfo = {
        _id: string;
        treeType: string;
        numOfTree: number;
        longitude?: number;
        latitude?: number;
        userId: string;
        cropStart: string;
    }

    type CreateGardenInfoPayload = {
        userId: string;
        treeType: string;
        numOfTree: number;
        longitude?: number
        latitude?: number
    }

    type UpdateGardenInfoPayload = {
        _id: string;
        longitude?: number;
        treeType: string;
        latitude?: number;
        numOfTree: number;
        cropStart?: string;
    }

    // HumidityRecord
    type HumidityRecordResponse = {
        results: HumidityRecord[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }

    type HumidityRecord = {
        _id: string;
        humidity: number;
    }
    // TemperatureRecord
    type TemperatureRecordResponse = {
        results: TemperatureRecord[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }

    type TemperatureRecord = {
        _id: string;
        temperature: number;
    }

    // MoistureRecord
    type MoistureRecordResponse = {
        results: MoistureRecord[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }

    type MoistureRecord = {
        _id: string;
        moisture: number;
    }

    // PumpRecord
    type PumpRecordResponse = {
        results: PumpRecord[];
        totalItems: number;
        totalPages: number;
        current: number;
        pageSize: number;
    }

    type PumpRecord = {
        _id: string;
        pumpStatus: boolean;
    }

    //MQTT
    type CreateMQTTTPayload = {
        userId: string
        aioKey: string
        aioUsername: string
        pumpFeed: string
        temperatureFeed: string
        moistureFeed: string
        humidityFeed: string
    }

    type UpdateMQTTTPayload = {
        aioKey?: string
        aioUsername?: string
        pumpFeed?: string
        temperatureFeed?: string
        moistureFeed?: string
        humidityFeed?: string
    }

    //Notification

    type UpdateNotificationPayload = {
        _id: string;
        content?: string;
        seen?: boolean;
        timestamp?: string;
    }
}

export {}