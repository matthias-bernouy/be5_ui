import fs from 'fs';

export function mkdir(path: string) {
    fs.mkdirSync(path, { recursive: true });
}

export function writeFileSync(path: string, data: string) {
    fs.writeFileSync(path, data);
}

export function copyFile(src: string, dest: string) {
    fs.writeFileSync(dest, fs.readFileSync(src));
}

export function getFilesPath(path: string) {
    const files: string[] = [];
    fs.readdirSync(path).forEach(file => {
        if (fs.lstatSync(path + "/" + file).isDirectory()) {
            files.push(...getFilesPath(path + "/" + file));
        } else {
            files.push(path + "/" + file);
        }
    });
    return files;
}