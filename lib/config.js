module.exports = {
    'autoBuildEnabled' : {
        title : 'Enable Auto Build.',
        description : 'On switching git branches, Bart Auto Uploads code to the active server. This preference controls that behavior',
        type : 'boolean',
        default : true
    },
    'checkDirectoryExistence' : {
        title : 'Check directory exists on server or not ',
        description : 'Check directory exists on server or not before uploading the code. This preference controls that behavior',
        type : 'boolean',
        default : false
    }
}
