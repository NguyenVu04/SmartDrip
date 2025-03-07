"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePumpRecordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_pump_record_dto_1 = require("./create-pump-record.dto");
class UpdatePumpRecordDto extends (0, mapped_types_1.PartialType)(create_pump_record_dto_1.CreatePumpRecordDto) {
}
exports.UpdatePumpRecordDto = UpdatePumpRecordDto;
//# sourceMappingURL=update-pump-record.dto.js.map