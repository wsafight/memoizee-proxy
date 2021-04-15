//
// /**
//  * 存储单位, GB 已经足够大
//  */
// const units = ['s', 'm', 'H', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB']
//
//
// /**
//  *
//  * @param fileSize 文件数据
//  * @param options
//  */
// function formatFileSize(fileSize: number, options?: FormatFileSizeOptions) {
//     options = {...DEFAULT_OPTIONS, ...options}
//
//     const transferBase = options.base
//
//     // 如果文件大小比当前单位小,直接返回 B
//     if (fileSize < transferBase) {
//         return `${fileSize} B`
//     }
//
//     let unitIndex = Math.floor(Math.log(fileSize) / Math.log(transferBase))
//
//     // 如果当前计算出的单位位数非常大，直接取当前设置的最大单位
//     if (unitIndex >= units.length) {
//         unitIndex = units.length - 1
//     }
//
//     fileSize = fileSize / (transferBase ** unitIndex)
//
//     return fileSize.toFixed(options.round) + ' ' + units[unitIndex]
// }