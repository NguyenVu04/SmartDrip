"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumpRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const pump_records_service_1 = require("./pump-records.service");
const pump_records_controller_1 = require("./pump-records.controller");
const mongoose_1 = require("@nestjs/mongoose");
const pump_record_schema_1 = require("./schemas/pump-record.schema");
const users_module_1 = require("../users/users.module");
let PumpRecordsModule = class PumpRecordsModule {
};
exports.PumpRecordsModule = PumpRecordsModule;
exports.PumpRecordsModule = PumpRecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: pump_record_schema_1.PumpRecord.name, schema: pump_record_schema_1.PumpRecordSchema
                }
            ])
        ],
        controllers: [pump_records_controller_1.PumpRecordsController],
        providers: [pump_records_service_1.PumpRecordsService],
        exports: [pump_records_service_1.PumpRecordsService]
    })
], PumpRecordsModule);
//# sourceMappingURL=pump-records.module.js.map