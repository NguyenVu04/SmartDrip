"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardenInfoService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const garden_info_schema_1 = require("./schemas/garden-info.schema");
const mongoose_2 = __importStar(require("mongoose"));
const api_query_params_1 = __importDefault(require("api-query-params"));
const users_service_1 = require("../users/users.service");
let GardenInfoService = class GardenInfoService {
    constructor(gardenInfoModel, usersService) {
        this.gardenInfoModel = gardenInfoModel;
        this.usersService = usersService;
    }
    async IsExistThisUserId(userId) {
        const isExist = await this.gardenInfoModel.exists({ userId });
        return isExist;
    }
    async IsExistThisUser(userId) {
        const user = await this.usersService.findOneById(userId);
        if (!user) {
            throw new common_1.BadRequestException('User not found');
        }
        return user;
    }
    async create(createGardenInfoDto) {
        const { userId, treeType, numOfTree, longitude, latitude } = createGardenInfoDto;
        const isExistUser = await this.IsExistThisUser(userId);
        if (!isExistUser) {
            throw new common_1.BadRequestException('User not found');
        }
        const isExist = await this.IsExistThisUserId(userId);
        if (isExist) {
            throw new common_1.BadRequestException('This user already has a garden');
        }
        const gardenInfo = await this.gardenInfoModel.create({
            userId, treeType, numOfTree, longitude, latitude
        });
        return {
            _id: gardenInfo._id,
            userId: gardenInfo.userId,
        };
    }
    async findAll(query, current, pageSize) {
        const { filter, sort } = (0, api_query_params_1.default)(query);
        if (filter.current)
            delete filter.current;
        if (filter.pageSize)
            delete filter.pageSize;
        if (!current)
            current = 1;
        if (!pageSize)
            pageSize = 10;
        const totalItems = (await this.gardenInfoModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const skip = (current - 1) * pageSize;
        const gardenInfos = await this.gardenInfoModel
            .find(filter)
            .limit(pageSize)
            .skip(skip)
            .sort(sort);
        return {
            gardenInfos,
            totalItems,
            totalPages,
            current,
            pageSize
        };
    }
    async findOne(id) {
        return await this.gardenInfoModel.findById(id);
    }
    async update(id, updateGardenInfoDto) {
        return await this.gardenInfoModel.updateOne({
            _id: updateGardenInfoDto._id
        }, updateGardenInfoDto);
    }
    async remove(_id) {
        if (mongoose_2.default.isValidObjectId(_id)) {
            return this.gardenInfoModel.deleteOne({ _id: _id });
        }
        else {
            throw new common_1.BadRequestException('Invalid id');
        }
    }
};
exports.GardenInfoService = GardenInfoService;
exports.GardenInfoService = GardenInfoService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(garden_info_schema_1.GardenInfo.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], GardenInfoService);
//# sourceMappingURL=garden-info.service.js.map