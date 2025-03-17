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
exports.PumpRecordsController = void 0;
const common_1 = require("@nestjs/common");
const pump_records_service_1 = require("./pump-records.service");
const create_pump_record_dto_1 = require("./dto/create-pump-record.dto");
const update_pump_record_dto_1 = require("./dto/update-pump-record.dto");
let PumpRecordsController = class PumpRecordsController {
    constructor(pumpRecordsService) {
        this.pumpRecordsService = pumpRecordsService;
    }
    async create(createPumpRecordDto) {
        return this.pumpRecordsService.create(createPumpRecordDto);
    }
    async findAll(query, current, pageSize) {
        return this.pumpRecordsService.findAll(query, +current, +pageSize);
    }
    async findOne(id) {
        return this.pumpRecordsService.findOne(id);
    }
    async update(id, updatePumpRecordDto) {
        return this.pumpRecordsService.update(id, updatePumpRecordDto);
    }
    async remove(id) {
        return this.pumpRecordsService.remove(id);
    }
};
exports.PumpRecordsController = PumpRecordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pump_record_dto_1.CreatePumpRecordDto]),
    __metadata("design:returntype", Promise)
], PumpRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)("current")),
    __param(2, (0, common_1.Query)("pageSize")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], PumpRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PumpRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pump_record_dto_1.UpdatePumpRecordDto]),
    __metadata("design:returntype", Promise)
], PumpRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PumpRecordsController.prototype, "remove", null);
exports.PumpRecordsController = PumpRecordsController = __decorate([
    (0, common_1.Controller)('pump-records'),
    __metadata("design:paramtypes", [pump_records_service_1.PumpRecordsService])
], PumpRecordsController);
//# sourceMappingURL=pump-records.controller.js.map