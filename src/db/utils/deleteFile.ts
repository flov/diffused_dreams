const fs = require('fs');

function deleteFile(filePath : string) {
    fs.unlink(filePath, (err: NodeJS.ErrnoException) => {
        if (err) {
            console.error(`Error deleting file: ${err}`);
        } else {
            console.log(`File deleted: ${filePath}`);
        }
    });
}

export default deleteFile;