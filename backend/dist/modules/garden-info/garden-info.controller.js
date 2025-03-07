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
exports.GardenInfoController = void 0;
const common_1 = require("@nestjs/common");
const garden_info_service_1 = require("./garden-info.service");
const create_garden_info_dto_1 = require("./dto/create-garden-info.dto");
const update_garden_info_dto_1 = require("./dto/update-garden-info.dto");
let GardenInfoController = class GardenInfoController {
    constructor(gardenInfoService) {
        this.gardenInfoService = gardenInfoService;
    }
    async create(createGardenInfoDto) {
        return this.gardenInfoService.create(createGardenInfoDto);
    }
    async findAll(query, current, pageSize) {
        return this.gardenInfoService.findAll(query, +current, +pageSize);
    }
    async findOne(id) {
        return this.gardenInfoService.findOne(+id);
    }
    async update(id, updateGardenInfoDto) {
        return this.gardenInfoService.update(+id, updateGardenInfoDto);
    }
    async remove(id) {
        return this.gardenInfoService.remove(id);
    }
};
exports.GardenInfoController = GardenInfoController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_garden_info_dto_1.CreateGardenInfoDto]),
    __metadata("design:returntype", Promise)
], GardenInfoController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Query)("current")),
    __param(2, (0, common_1.Query)("pageSize")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], GardenInfoController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GardenInfoController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_garden_info_dto_1.UpdateGardenInfoDto]),
    __metadata("design:returntype", Promise)
], GardenInfoController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GardenInfoController.prototype, "remove", null);
exports.GardenInfoController = GardenInfoController = __decorate([
    (0, common_1.Controller)('garden-info'),
    __metadata("design:paramtypes", [garden_info_service_1.GardenInfoService])
], GardenInfoController);
//# sourceMappingURL=garden-info.controller.js.map