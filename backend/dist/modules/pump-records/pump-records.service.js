"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PumpRecordsService = void 0;
const common_1 = require("@nestjs/common");
let PumpRecordsService = class PumpRecordsService {
    create(createPumpRecordDto) {
        return 'This action adds a new pumpRecord';
    }
    findAll() {
        return `This action returns all pumpRecords`;
    }
    findOne(id) {
        return `This action returns a #${id} pumpRecord`;
    }
    update(id, updatePumpRecordDto) {
        return `This action updates a #${id} pumpRecord`;
    }
    remove(id) {
        return `This action removes a #${id} pumpRecord`;
    }
};
exports.PumpRecordsService = PumpRecordsService;
exports.PumpRecordsService = PumpRecordsService = __decorate([
    (0, common_1.Injectable)()
], PumpRecordsService);
//# sourceMappingURL=pump-records.service.js.map