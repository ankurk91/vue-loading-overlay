const createResolve = function() {
    let _resolve;
    return {
        promise: new Promise(resolve => {
            // cache resolve
            _resolve = resolve;
        }),
        resolve: _resolve
    }
}

export {
    createResolve
}