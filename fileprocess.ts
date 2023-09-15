const fs = require('fs');

class CustomFile {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    readFileSync(): string {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = { CustomFile };
