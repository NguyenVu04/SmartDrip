"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMoistureRecordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_moisture_record_dto_1 = require("./create-moisture-record.dto");
class UpdateMoistureRecordDto extends (0, mapped_types_1.PartialType)(create_moisture_record_dto_1.CreateMoistureRecordDto) {
}
exports.UpdateMoistureRecordDto = UpdateMoistureRecordDto;
//# sourceMappingURL=update-moisture-record.dto.js.map