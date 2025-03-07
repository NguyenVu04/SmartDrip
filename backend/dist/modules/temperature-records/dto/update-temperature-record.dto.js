"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTemperatureRecordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_temperature_record_dto_1 = require("./create-temperature-record.dto");
class UpdateTemperatureRecordDto extends (0, mapped_types_1.PartialType)(create_temperature_record_dto_1.CreateTemperatureRecordDto) {
}
exports.UpdateTemperatureRecordDto = UpdateTemperatureRecordDto;
//# sourceMappingURL=update-temperature-record.dto.js.map