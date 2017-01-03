'use babel'
const path = require('path');

module.exports = {

    /**
     * Get all parent directories of the supplied path
     * @param  {String} currentRoot  Current Root
     * @param  {String} filePath    Absolute file path
     * @return {Array}             All parent directories
     */
    getAllParentDirectories : (currentRoot, filePath) => {
        const completeFilePath = path.relative(currentRoot, filePath);
        let normalizedPath = path.normalize(completeFilePath);
        const rootFolder = '.'; //assumption that after complete traversal last dir will be .

        const allParentPaths = [];

        //break out-of-loop when parentPath === root
        while(normalizedPath !== rootFolder)
        {
            //get parent dir
            normalizedPath = path.dirname(normalizedPath);
            allParentPaths.push(normalizedPath);
        }

        //If '.' present than remove it from array
        const indexOfRoot = allParentPaths.indexOf( '.' );
        if( indexOfRoot > -1 )
        {
            allParentPaths.splice(indexOfRoot, 1);
        }

        return allParentPaths;
    },

    /**
     * Check if DIR exists on server. If doesn't exist
     * than create new DIR on server
     * @param  {Array} paths  All directories to be checked
     * @param  {Object} webdav webdav instance
     * @return {Object} Promise
     */
    checkAndCreateDirectories : (paths , webdav) => {

        return paths.reduce((promise, path) => {
            return promise.then(() => {
                return webdav.head(path, '.').then((resp) => {
                    console.log("Directory found on server");
                }, (err) => {
                    console.info('Directory not found ' + path);

                    webdav.mkcol(path, '.').then(( resp ) => {
                        console.log( 'Successfully created directory ' + path );
                    }, (err) => {
                        console.log(err.toString());
                    })
                });
            });
        }, Promise.resolve());
    }
}
