"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureRecordsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const temperature_record_entity_1 = require("./schemas/temperature-record.entity");
const users_service_1 = require("../users/users.service");
const mongoose_2 = require("mongoose");
const api_query_params_1 = __importDefault(require("api-query-params"));
let TemperatureRecordsService = class TemperatureRecordsService {
    constructor(temperatureRecordModel, usersService) {
        this.temperatureRecordModel = temperatureRecordModel;
        this.usersService = usersService;
    }
    async create(createTemperatureRecordDto) {
        const { temperature, userId, timestamp } = createTemperatureRecordDto;
        const user = await this.usersService.findOneById(userId);
        if (!user) {
            throw new common_1.BadRequestException(`User with id ${userId} does not exist`);
        }
        const pumpRecord = await this.temperatureRecordModel.create({
            temperature,
            userId,
            timestamp
        });
        return {
            _id: pumpRecord._id,
            userId: pumpRecord.userId
        };
    }
    async findAll(query, current, pageSize) {
        const { filter, sort } = (0, api_query_params_1.default)(query);
        if (filter.current)
            delete filter.current;
        if (filter.pageSize)
            delete filter.pageSize;
        if (!current)
            current = 1;
        if (!pageSize)
            pageSize = 10;
        const totalItems = (await this.temperatureRecordModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const skip = (current - 1) * pageSize;
        const results = await this.temperatureRecordModel
            .find(filter)
            .limit(pageSize)
            .skip(skip)
            .sort(sort);
        return {
            results,
            totalItems,
            totalPages,
            current,
            pageSize
        };
    }
    async findOne(id) {
        return await this.temperatureRecordModel.findById(id);
    }
    async update(id, updateTemperatureRecordDto) {
        const { userId, temperature, timestamp } = updateTemperatureRecordDto;
        const temperatureRecord = await this.temperatureRecordModel
            .findByIdAndUpdate(id, {
            userId,
            temperature,
            timestamp
        }, { new: true
        });
        if (!temperatureRecord) {
            throw new common_1.BadRequestException(`Temperature record with id ${id} does not exist`);
        }
        return {
            _id: temperatureRecord._id,
            userId: temperatureRecord.userId
        };
    }
    async remove(id) {
        const temperatureRecord = await this.temperatureRecordModel.findByIdAndDelete(id);
        if (!temperatureRecord) {
            throw new common_1.BadRequestException(`Temperature record with id ${id} does not exist`);
        }
        return {
            _id: temperatureRecord._id,
            userId: temperatureRecord.userId
        };
    }
};
exports.TemperatureRecordsService = TemperatureRecordsService;
exports.TemperatureRecordsService = TemperatureRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(temperature_record_entity_1.TemperatureRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], TemperatureRecordsService);
//# sourceMappingURL=temperature-records.service.js.map