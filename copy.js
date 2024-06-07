const fse = require('fs-extra');

async function copyFiles () {
    try {
        await fse.copy('./dist', '../public');
        await fse.rename('./dist/index.html', '../resources/views/app.blade.php');
        console.log('success copy!')
    } catch (err) {
        console.error(err)
    }
}

copyFiles();
