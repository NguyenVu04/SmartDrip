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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const create_auth_dto_1 = require("./dto/create-auth.dto");
const mailer_1 = require("@nestjs-modules/mailer");
const customize_1 = require("../decorator/customize");
const local_auth_guard_1 = require("./passport/local-auth.guard");
const jwt_auth_guard_1 = require("./passport/jwt-auth.guard");
let AuthController = class AuthController {
    constructor(authService, mailerService) {
        this.authService = authService;
        this.mailerService = mailerService;
    }
    async handleLogin(req) {
        return this.authService.login(req.user);
    }
    async register(registerDto) {
        return await this.authService.register(registerDto);
    }
    testMail() {
        this.mailerService.sendMail({
            to: 'hoi.phan1712@hcmut.edu.vn',
            subject: 'Testing Nest MailerModule ✔',
            text: 'welcome',
            template: "register",
            context: {
                name: "Yilongma",
                activationCode: 123123123
            }
        })
            .then(() => {
            console.log('mail sent');
        });
        return "ok";
    }
    getProfile(req) {
        return req.user;
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.Post)("login"),
    (0, customize_1.Public)(),
    (0, customize_1.ResponseMessage)("Login successfully"),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "handleLogin", null);
__decorate([
    (0, common_1.Post)("register"),
    (0, customize_1.Public)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_auth_dto_1.CreateAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, common_1.Get)('mail'),
    (0, customize_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "testMail", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('profile'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService,
        mailer_1.MailerService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map