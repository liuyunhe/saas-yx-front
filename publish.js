// 一键打包部署

module.exports = function () {
    let O           = 'saas-yx-front',
        Q           = require('q'),
        del         = require('del'),
        gulp        = require('gulp'),
        zip         = require('gulp-zip'),
        node_ssh    = require('node-ssh'),
        colors      = require('colors/safe'),
        dateFormat  = require('dateformat'),
        fs          = require('fs'),
        argv        = process.argv,
        exec        = require('child_process').exec,
        IPs			= [{
            // host: '123.56.29.106', // 老的中控机
            host: '47.93.237.83', // 新的中控机
            post: 22,
            user: 'root',
            dist: '/root',
            privateKey: 'C:/Users/44539/.ssh/id_rsa'
        }],
        SERVER 		= {
			'test': {// 新的中控机跳转：测试环境
				type: 'test',
                host: '172.17.15.214',
                port: 22,
                user: '',
                dist: '/opt/webapps/',
                privateKey: ''
            },
            'dev212': {// 新的中控机跳转：生产环境
				type: 'dev',
                host: '172.17.15.212',
                port: 22,
                user: '',
                dist: '/opt/webapps/',
                privateKey: ''
            }
        },
        center 		= new node_ssh(),
        zipfile 	= O + '-' + dateFormat(new Date(), 'yyyy-mm-dd-HH-MM-ss') + '.zip';

        if ('publish' !== argv[2]) {
			process.stdout.write(colors.green('Do you mean "publish"?\n'));
            return
		}

		if (!SERVER[argv[3]]) {
			process.stdout.write(colors.green('\x20SERVER REQUIRED!\n'));
            process.stdout.write(colors.blue('\x20-node dist.publish.js test\n'));
            process.stdout.write(colors.blue('\x20-node dist.publish.js prod\n'));
            return
		}

        IPs.push(SERVER[argv[3]]);
        // console.log(IPs)
        // 第一步，build
        var BUILD = function () {
        	var defered = Q.defer();
	        process.stdout.write(colors.green('1、: build -> \n'));
	        process.stdout.write(colors.blue('\x20\x20\x20 build project...\n'));
	        exec('npm run build', function(error, stdout, stderr) {
	            process.stdout.write(colors.green('\x20\x20\x20 success\n'));
	            defered.resolve(true);
	        });
	        return defered.promise;
        }

        // // 将index页面拷贝到dist目录下
        // var COPY = function() {
        //     var defered = Q.defer();
        //     process.stdout.write(colors.green('1.5、: index -> \n'));
        //     process.stdout.write(colors.blue('\x20\x20\x20 copy index...\n'));
        //     gulp.src(['index.html'])
        //         .pipe(gulp.dest('dist'))
        //         .on('finish', function() {
        //             process.stdout.write(colors.blue('\x20\x20\x20 success\n'));
        //             defered.resolve(true);
        //         })
        //         .on('error', function(error) {
        //             process.stdout.write(colors.red('\x20\x20\x20 field !\n'));
        //             defered.reject(new Error(error));
        //         });
        //     return defered.promise;
        // };

        // 第二步，将build后dist目录下的文件copy到zip，并命名saas-yx-front
        var COPYTOZIP = function () {
        	var deferred = Q.defer();
            process.stdout.write(colors.green('2. copy -> \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 copy...\n'));
            gulp.src(['./dist/**'])
                .pipe(gulp.dest('zip/saas-yx-front'))
                .on('finish', function () {
                    process.stdout.write(colors.green('\x20\x20\x20 copy successfully!\n'));
                    deferred.resolve(true);
                })
                .on('error', function (error) {
                    deferred.reject(new Error(error));
                })
            return deferred.promise
        }

        // 第三步，打包压缩zip文件夹里的saas-yx-front
        var ZIPFILE = function () {
            var deferred = Q.defer();
            process.stdout.write(colors.green('3. zipfile -> \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 zip packing...\n'));
            gulp.src([
                'zip/**'
            ])
            .pipe(zip(zipfile))
            .pipe(gulp.dest('zip'))
            .on('finish', function () {
                process.stdout.write(colors.green('\x20\x20\x20 zip packed successfully!\n'));
                deferred.resolve(zipfile);
            })
            .on('error', function () {
                process.stdout.write(colors.red('\x20\x20\x20 zip packed field!\n'));
                deferred.reject(new Error(error));
            });
            return deferred.promise;
        }

        // 第四步，上传至中控
        var UPLOAD = function (file) {
            var deferred = Q.defer();
            process.stdout.write(colors.green('4. upload: \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 upload ' + file + ' to ' + IPs[0].host + '...\n'));
            exec('scp ./zip/' + file + ' ' + IPs[0].user + '@' + IPs[0].host + ':' + IPs[0].dist, function (error, stdout, stderr) {
                process.stdout.write(colors.blue('\x20\x20\x20 upload to ' + IPs[0].host + 'successfully! \n'));
                deferred.resolve(file)
            })
            return deferred.promise;
        }

        // 第五步，连接中控机
        var CONNECT = function (file) {
            var deferred = Q.defer();
            process.stdout.write(colors.green('5. login: \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 login ' + IPs[0].host + '...\n'));
            center.connect({
                host: IPs[0].host,
                port: IPs[0].port,
                username: IPs[0].user,
                privateKey: IPs[0].privateKey
            }).then( () => {
                process.stdout.write(colors.blue('\x20\x20\x20 welcome to ' + IPs[0].host + '!\n'));
                deferred.resolve(file);
            })
            return deferred.promise
        }

        // 第六步，解压文件
        var UNZIPFILE = function (file) {
            var deferred = Q.defer();
            process.stdout.write(colors.green('6. unzip: \n'));
            center.exec('unzip -o ' + IPs[0].dist + '/' + file)
            .then(function (result) {
                process.stdout.write(colors.blue('\x20\x20\x20 unzip successfully! \n'));
                deferred.resolve(file);
            });
            return deferred.promise;
        }

        // 第起步，将文件拷贝到服务器
        var COPYTOSERVER = function (file) {
            var deferred = Q.defer();
            process.stdout.write(colors.green('7. copy to server: \n'));
            process.stdout.write(colors.blue('\x20\x20\x20 copy '+ O +' to ' + IPs[1].host + '!\n'));
            center.exec('scp -r ' + IPs[0].dist + '/' + O + ' ' + IPs[1].host + ':' + IPs[1].dist)
            .then(function (result) {
                process.stdout.write(colors.blue('\x20\x20\x20 copy successfully!\n'));
                deferred.resolve(file);
            });
            return deferred.promise;
        }

        // 第八步，删除打包文件
        var DELZIPSERVERFILE = function (file) {
            var deferred = Q.defer();
            process.stdout.write(colors.green('8. del zip.file: \n'));
            center.exec('rm -rf ' + file + ' ' + O + '/').then(function (result) {
                process.stdout.write(colors.blue('\x20\x20\x20 del successfully!\n'));
                deferred.resolve(true);
                delDir('zip')
            });
            return deferred.promise;
        }

        // 第九步，成功提示
        var SUCCESS = function () {
            var deferred = Q.defer();
            process.stdout.write(colors.green('\x20PUBLISH SUCCESSFULLY!\n'));
            deferred.resolve(true);
            return deferred.promise
        }

        // 第十步，错误统一处理
        var ERROR_CATCH = function (error) {
            process.stdout.write(colors.red('Wrong Message: \n'))
            process.stdout.write(colors.red(error.message + '\n'))
        }
        // 删除本地zip文件
        function delDir(path){
            let files = []
            if(fs.existsSync(path)){
                files = fs.readdirSync(path)
                files.forEach((file, index) => {
                    let curPath = path + "/" + file
                    if(fs.statSync(curPath).isDirectory()){
                        delDir(curPath)
                    } else {
                        fs.unlinkSync(curPath)
                    }
                });
                fs.rmdirSync(path);
            }
        }

        Q.fcall(BUILD)
            // .then(COPY)
        	.then(COPYTOZIP)
        	.then(ZIPFILE)
        	.then(UPLOAD)
            .then(CONNECT)
            .then(UNZIPFILE)
            .then(COPYTOSERVER)
            .then(DELZIPSERVERFILE)
            .then(SUCCESS)
            .catch(ERROR_CATCH)
            .done()

}()
