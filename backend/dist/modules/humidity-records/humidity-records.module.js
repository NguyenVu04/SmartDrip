"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HumidityRecordsModule = void 0;
const common_1 = require("@nestjs/common");
const humidity_records_service_1 = require("./humidity-records.service");
const humidity_records_controller_1 = require("./humidity-records.controller");
const mongoose_1 = require("@nestjs/mongoose");
const humidity_record_schema_1 = require("./schemas/humidity-record.schema");
const users_module_1 = require("../users/users.module");
let HumidityRecordsModule = class HumidityRecordsModule {
};
exports.HumidityRecordsModule = HumidityRecordsModule;
exports.HumidityRecordsModule = HumidityRecordsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: humidity_record_schema_1.HumidityRecord.name, schema: humidity_record_schema_1.HumidityRecordSchema
                }
            ]),
            users_module_1.UsersModule
        ],
        controllers: [humidity_records_controller_1.HumidityRecordsController],
        providers: [humidity_records_service_1.HumidityRecordsService],
    })
], HumidityRecordsModule);
//# sourceMappingURL=humidity-records.module.js.map