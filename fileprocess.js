var fs = require('fs');
var CustomFile = /** @class */ (function () {
    function CustomFile(path) {
        this.path = path;
    }
    CustomFile.prototype.readFileSync = function () {
        try {
            var data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        }
        catch (error) {
            throw error;
        }
    };
    return CustomFile;
}());
module.exports = { CustomFile: CustomFile };
