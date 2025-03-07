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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureRecordsController = void 0;
const common_1 = require("@nestjs/common");
const temperature_records_service_1 = require("./temperature-records.service");
const create_temperature_record_dto_1 = require("./dto/create-temperature-record.dto");
const update_temperature_record_dto_1 = require("./dto/update-temperature-record.dto");
let TemperatureRecordsController = class TemperatureRecordsController {
    constructor(temperatureRecordsService) {
        this.temperatureRecordsService = temperatureRecordsService;
    }
    async create(createTemperatureRecordDto) {
        return this.temperatureRecordsService.create(createTemperatureRecordDto);
    }
    async findAll(query, current, pageSize) {
        return this.temperatureRecordsService.findAll(query, +current, +pageSize);
    }
    async findOne(id) {
        return this.temperatureRecordsService.findOne(id);
    }
    async update(id, updateTemperatureRecordDto) {
        return this.temperatureRecordsService.update(+id, updateTemperatureRecordDto);
    }
    async remove(id) {
        return this.temperatureRecordsService.remove(id);
    }
};
exports.TemperatureRecordsController = TemperatureRecordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_temperature_record_dto_1.CreateTemperatureRecordDto]),
    __metadata("design:returntype", Promise)
], TemperatureRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)("current")),
    __param(2, (0, common_1.Query)("pageSize")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], TemperatureRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemperatureRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_temperature_record_dto_1.UpdateTemperatureRecordDto]),
    __metadata("design:returntype", Promise)
], TemperatureRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TemperatureRecordsController.prototype, "remove", null);
exports.TemperatureRecordsController = TemperatureRecordsController = __decorate([
    (0, common_1.Controller)('temperature-records'),
    __metadata("design:paramtypes", [temperature_records_service_1.TemperatureRecordsService])
], TemperatureRecordsController);
//# sourceMappingURL=temperature-records.controller.js.map