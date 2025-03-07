"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoistureRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const moisture_records_service_1 = require("./moisture-records.service");
const moisture_records_controller_1 = require("./moisture-records.controller");
let MoistureRecordsModule = class MoistureRecordsModule {
};
exports.MoistureRecordsModule = MoistureRecordsModule;
exports.MoistureRecordsModule = MoistureRecordsModule = __decorate([
    (0, common_1.Module)({
        controllers: [moisture_records_controller_1.MoistureRecordsController],
        providers: [moisture_records_service_1.MoistureRecordsService],
    })
], MoistureRecordsModule);
//# sourceMappingURL=moisture-records.module.js.map