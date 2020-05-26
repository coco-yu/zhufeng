// 如果promise的返回值不是报错也不是promise，则会触发下一个then的成功回调。
// 如果promise抛错会走到下一个then的失败回调。
// 如果promise返回的还是一个promise则根据这个返回的promise的值来判断执行下一个then的成功回调还是失败回调。
// 每次执行完promise.then都会返回一个新的promise
