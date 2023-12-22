class UploadAdapter {
    constructor(loader) {
        this.loader = loader;
    }

    upload() {
        return this.returnBase64();
    }

    returnBase64() {
        return new Promise((resolve, reject) => {
            this.loader.file.then(file => {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (event) {
                    // base64
                    resolve({ default: event.target.result });
                }
            }).catch(err => {
                reject(err);
            });
        });
    }

    returnServerUrl() {
        return new Promise((resolve, reject) => {
            this.loader.file.then(file => { // 参数file是js里的File类型
                // 这里就可以执行上传服务器的方法
                // 要注意的一点是，最后一定要reslove({dafault:'接口返回的img地址'})，返回的对象一定要有一个default的key
            }).catch(err => {
                // do something
            });
        });
    }

    // 中止上传过程。在中止后，它应该拒绝从upload()返回的承诺。（嗯...这是有道翻译的...）
    abort() {
    }
}

export default UploadAdapter;