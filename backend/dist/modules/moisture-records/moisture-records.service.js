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
exports.MoistureRecordsService = void 0;
const common_1 = require("@nestjs/common");
const api_query_params_1 = __importDefault(require("api-query-params"));
const mongoose_1 = require("@nestjs/mongoose");
const moisture_record_schema_1 = require("./schemas/moisture-record.schema");
const mongoose_2 = require("mongoose");
const users_service_1 = require("../users/users.service");
let MoistureRecordsService = class MoistureRecordsService {
    constructor(moistureRecordModel, usersService) {
        this.moistureRecordModel = moistureRecordModel;
        this.usersService = usersService;
    }
    async create(createMoistureRecordDto) {
        const { moisture, userId, timestamp } = createMoistureRecordDto;
        const user = await this.usersService.findOneById(userId);
        if (!user) {
            throw new common_1.BadRequestException(`User with id ${userId} does not exist`);
        }
        const moistureRecord = await this.moistureRecordModel.create({
            moisture,
            userId,
            timestamp
        });
        return {
            _id: moistureRecord._id,
            userId: moistureRecord.userId
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
        const totalItems = (await this.moistureRecordModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const skip = (current - 1) * pageSize;
        const results = await this.moistureRecordModel
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
        return await this.moistureRecordModel.findById(id);
    }
    async update(id, updateMoistureRecordDto) {
        const { userId, moisture, timestamp } = updateMoistureRecordDto;
        const moistureRecord = await this.moistureRecordModel
            .findByIdAndUpdate(id, {
            userId,
            moisture,
            timestamp
        }, { new: true
        });
        if (!moistureRecord) {
            throw new common_1.BadRequestException(`Moisture record with id ${id} does not exist`);
        }
        return {
            _id: moistureRecord._id,
            userId: moistureRecord.userId
        };
    }
    async remove(id) {
        return await this.moistureRecordModel.deleteOne({ _id: id });
    }
};
exports.MoistureRecordsService = MoistureRecordsService;
exports.MoistureRecordsService = MoistureRecordsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(moisture_record_schema_1.MoistureRecord.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], MoistureRecordsService);
//# sourceMappingURL=moisture-records.service.js.map