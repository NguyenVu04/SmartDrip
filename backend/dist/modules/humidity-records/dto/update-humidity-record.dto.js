"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateHumidityRecordDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_humidity_record_dto_1 = require("./create-humidity-record.dto");
class UpdateHumidityRecordDto extends (0, mapped_types_1.PartialType)(create_humidity_record_dto_1.CreateHumidityRecordDto) {
}
exports.UpdateHumidityRecordDto = UpdateHumidityRecordDto;
//# sourceMappingURL=update-humidity-record.dto.js.map