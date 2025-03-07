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
exports.MoistureRecordsController = void 0;
const common_1 = require("@nestjs/common");
const moisture_records_service_1 = require("./moisture-records.service");
const create_moisture_record_dto_1 = require("./dto/create-moisture-record.dto");
const update_moisture_record_dto_1 = require("./dto/update-moisture-record.dto");
let MoistureRecordsController = class MoistureRecordsController {
    constructor(moistureRecordsService) {
        this.moistureRecordsService = moistureRecordsService;
    }
    async create(createMoistureRecordDto) {
        return this.moistureRecordsService.create(createMoistureRecordDto);
    }
    async findAll(query, current, pageSize) {
        return this.moistureRecordsService.findAll(query, +current, +pageSize);
    }
    async findOne(id) {
        return this.moistureRecordsService.findOne(id);
    }
    async update(id, updateMoistureRecordDto) {
        return this.moistureRecordsService.update(id, updateMoistureRecordDto);
    }
    async remove(id) {
        return this.moistureRecordsService.remove(+id);
    }
};
exports.MoistureRecordsController = MoistureRecordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_moisture_record_dto_1.CreateMoistureRecordDto]),
    __metadata("design:returntype", Promise)
], MoistureRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)("current")),
    __param(2, (0, common_1.Query)("pageSize")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], MoistureRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoistureRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_moisture_record_dto_1.UpdateMoistureRecordDto]),
    __metadata("design:returntype", Promise)
], MoistureRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], MoistureRecordsController.prototype, "remove", null);
exports.MoistureRecordsController = MoistureRecordsController = __decorate([
    (0, common_1.Controller)('moisture-records'),
    __metadata("design:paramtypes", [moisture_records_service_1.MoistureRecordsService])
], MoistureRecordsController);
//# sourceMappingURL=moisture-records.controller.js.map