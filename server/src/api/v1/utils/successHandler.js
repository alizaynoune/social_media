
export const Handler = function (res, data, message, options) {
    // if (Array.isArray(data)) {
    //     var filterData = data.map((elem) => {res.locals.userPermission.filter(elem)});
    // }
    // else
    var filterData = res.locals.userPermission.filter(data);
    // console.log(data)
    // console.log(res.locals.userPermission);
    return res.status(200).json({
        success: true,
        message: message?.message || 'Success',
        code: message?.code || 200,
        options,
        data: filterData || {},
        // data2: data
    });
}

