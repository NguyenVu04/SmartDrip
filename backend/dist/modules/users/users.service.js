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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = __importStar(require("mongoose"));
const mailer_1 = require("@nestjs-modules/mailer");
const util_1 = require("../../helpers/util/util");
const api_query_params_1 = __importDefault(require("api-query-params"));
const uuid_1 = require("uuid");
const dayjs_1 = __importDefault(require("dayjs"));
let UsersService = class UsersService {
    constructor(userModel, mailerService) {
        this.userModel = userModel;
        this.mailerService = mailerService;
        this.isEmailExist = async (email) => {
            const isExist = await this.userModel.exists({ email });
            if (isExist) {
                return true;
            }
            return false;
        };
    }
    async create(createUserDto) {
        const { firstName, lastName, email, password, phoneNumber, address } = createUserDto;
        const isExist = await this.isEmailExist(email);
        if (isExist) {
            throw new common_1.BadRequestException(`Email ${email} already exists`);
        }
        const hashedPassword = await (0, util_1.hashPasswordHelper)(createUserDto.password);
        const user = await this.userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            phoneNumber,
            address
        });
        return {
            _id: user._id,
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
        const totalItems = (await this.userModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / pageSize);
        const skip = (current - 1) * pageSize;
        const results = await this.userModel
            .find(filter)
            .limit(pageSize)
            .skip(skip)
            .select('-password')
            .sort(sort);
        return {
            results,
            totalItems,
            totalPages,
            current,
            pageSize
        };
    }
    async findOneByEmail(email) {
        return await this.userModel.findOne({ email });
    }
    findOne(id) {
        return `This action returns a #${id} user`;
    }
    update(id, updateUserDto) {
        return `This action updates a #${id} user`;
    }
    async remove(_id) {
        if (mongoose_2.default.isValidObjectId(_id)) {
            return this.userModel.deleteOne({ _id });
        }
        else {
            throw new common_1.BadRequestException(`Invalid id ${_id}`);
        }
    }
    async handleRegister(registerDto) {
        const { firstName, lastName, email, password } = registerDto;
        const isExist = await this.isEmailExist(email);
        if (isExist) {
            throw new common_1.BadRequestException(`Email already exist: ${email}. Please use another email`);
        }
        const hashedPassword = await (0, util_1.hashPasswordHelper)(registerDto.password);
        const codeId = (0, uuid_1.v4)();
        const user = await this.userModel.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            isActive: false,
            codeId: codeId,
            codeExpired: (0, dayjs_1.default)().add(30, 'seconds')
        });
        this.mailerService.sendMail({
            to: email,
            subject: 'Activate your account at @DaiViet',
            template: "register",
            context: {
                name: firstName ?? email,
                activationCode: codeId
            }
        });
        return {
            _id: user._id,
        };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mailer_1.MailerService])
], UsersService);
//# sourceMappingURL=users.service.js.map