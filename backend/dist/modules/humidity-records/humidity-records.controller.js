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
exports.HumidityRecordsController = void 0;
const common_1 = require("@nestjs/common");
const humidity_records_service_1 = require("./humidity-records.service");
const create_humidity_record_dto_1 = require("./dto/create-humidity-record.dto");
const update_humidity_record_dto_1 = require("./dto/update-humidity-record.dto");
let HumidityRecordsController = class HumidityRecordsController {
    constructor(humidityRecordsService) {
        this.humidityRecordsService = humidityRecordsService;
    }
    create(createHumidityRecordDto) {
        return this.humidityRecordsService.create(createHumidityRecordDto);
    }
    findAll() {
        return this.humidityRecordsService.findAll();
    }
    findOne(id) {
        return this.humidityRecordsService.findOne(+id);
    }
    update(id, updateHumidityRecordDto) {
        return this.humidityRecordsService.update(+id, updateHumidityRecordDto);
    }
    remove(id) {
        return this.humidityRecordsService.remove(+id);
    }
};
exports.HumidityRecordsController = HumidityRecordsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_humidity_record_dto_1.CreateHumidityRecordDto]),
    __metadata("design:returntype", void 0)
], HumidityRecordsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], HumidityRecordsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HumidityRecordsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_humidity_record_dto_1.UpdateHumidityRecordDto]),
    __metadata("design:returntype", void 0)
], HumidityRecordsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], HumidityRecordsController.prototype, "remove", null);
exports.HumidityRecordsController = HumidityRecordsController = __decorate([
    (0, common_1.Controller)('humidity-records'),
    __metadata("design:paramtypes", [humidity_records_service_1.HumidityRecordsService])
], HumidityRecordsController);
//# sourceMappingURL=humidity-records.controller.js.map