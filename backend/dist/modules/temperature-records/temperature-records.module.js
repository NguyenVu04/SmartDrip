"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemperatureRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const temperature_records_service_1 = require("./temperature-records.service");
const temperature_records_controller_1 = require("./temperature-records.controller");
const mongoose_1 = require("@nestjs/mongoose");
const temperature_record_entity_1 = require("./schemas/temperature-record.entity");
const users_module_1 = require("../users/users.module");
let TemperatureRecordsModule = class TemperatureRecordsModule {
};
exports.TemperatureRecordsModule = TemperatureRecordsModule;
exports.TemperatureRecordsModule = TemperatureRecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: temperature_record_entity_1.TemperatureRecord.name,
                    schema: temperature_record_entity_1.TemperatureRecordSchema,
                },
            ]),
        ],
        controllers: [temperature_records_controller_1.TemperatureRecordsController],
        providers: [temperature_records_service_1.TemperatureRecordsService],
        exports: [temperature_records_service_1.TemperatureRecordsService],
    })
], TemperatureRecordsModule);
//# sourceMappingURL=temperature-records.module.js.map