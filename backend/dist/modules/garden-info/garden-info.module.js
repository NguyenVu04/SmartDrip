"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardenInfoModule = void 0;
const common_1 = require("@nestjs/common");
const garden_info_service_1 = require("./garden-info.service");
const garden_info_controller_1 = require("./garden-info.controller");
const mongoose_1 = require("@nestjs/mongoose");
const garden_info_schema_1 = require("./schemas/garden-info.schema");
const users_module_1 = require("../users/users.module");
let GardenInfoModule = class GardenInfoModule {
};
exports.GardenInfoModule = GardenInfoModule;
exports.GardenInfoModule = GardenInfoModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forFeature([
                {
                    name: garden_info_schema_1.GardenInfo.name, schema: garden_info_schema_1.GardenInfoSchema
                }
            ])
        ],
        controllers: [garden_info_controller_1.GardenInfoController],
        providers: [garden_info_service_1.GardenInfoService],
        exports: [garden_info_service_1.GardenInfoService]
    })
], GardenInfoModule);
//# sourceMappingURL=garden-info.module.js.map