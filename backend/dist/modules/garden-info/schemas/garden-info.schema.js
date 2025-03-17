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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GardenInfoSchema = exports.GardenInfo = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const dayjs_1 = __importDefault(require("dayjs"));
let GardenInfo = class GardenInfo {
    constructor() {
        this.treeType = 'Wheat';
        this.cropStart = (0, dayjs_1.default)().toDate();
    }
};
exports.GardenInfo = GardenInfo;
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], GardenInfo.prototype, "treeType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], GardenInfo.prototype, "numOfTree", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], GardenInfo.prototype, "longitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], GardenInfo.prototype, "latitude", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], GardenInfo.prototype, "cropStart", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], GardenInfo.prototype, "userId", void 0);
exports.GardenInfo = GardenInfo = __decorate([
    (0, mongoose_1.Schema)()
], GardenInfo);
exports.GardenInfoSchema = mongoose_1.SchemaFactory.createForClass(GardenInfo);
//# sourceMappingURL=garden-info.schema.js.map