'use strict';

/**
 * @param  {Object}  gulp    The gulp object
 * @param  {Object}  config  The configuration for gulp tasks. To get a property using `config.a.b.c` or `config.get('a.b.c')`
 * @param  {Object}  LL      Lazy required libraries and other data
 * @param  {Object}  args    The parsed arguments from comment line
 */
module.exports = function(gulp, config, LL, args) {  // eslint-disable-line no-unused-vars
    gulp.task('release:license', ['clean:release'], function() {
        var conf = config.tasks.release.license;
        var license = LL.license;
        var filter = LL.filter;

        var matches = conf.matches;
        var author = conf.author;
        var defaultLicense = conf.license;

        var stream = gulp.src(conf.src, conf.srcOpts);

        matches.forEach(function(matchObj) {
            var f = filter(matchObj.glob, {restore: true});
            stream = stream.pipe(f)
                .pipe(license(matchObj.license || defaultLicense, {
                    organization: matchObj.author || author,
                }))
                .pipe(f.restore);
        });

        return stream.pipe(gulp.dest(conf.dest));
    });

    gulp.task('release:npm-pack', ['clean:npm-package'], function(done) {
        var conf = config.tasks.release.npm;
        var Path = LL.Path;
        var CP = LL.CP;
        var util = LL.nodeUtil;
        var packageJSON = LL.packageJSON;

        var src = Path.resolve(conf.src);
        var dest = Path.resolve(conf.dest);
        var destFile = util.format('%s/%s.tgz', dest, packageJSON.name);
        var packageName = src.split('/').pop();

        var command = util.format('tar -czf %s -C %s %s', destFile, Path.resolve(src, '..'), packageName);

        CP.exec(command, done);
    });

    gulp.task('release:npm-publish', function(done) {
        var conf = config.tasks.release.npm;
        var Path = LL.Path;
        var CP = LL.CP;
        var util = LL.nodeUtil;
        var packageJSON = LL.packageJSON;

        var tag = packageJSON.version;
        var dest = Path.resolve(conf.dest);
        var destFile = util.format('%s/%s.tgz', dest, packageJSON.name);

        var command = util.format('npm publish --tag %s --access public %s', tag, destFile);

        CP.exec(command, done);
    });

    gulp.task('release', function(done) {
        LL.runSequence(
            'lint',
            'test',
            'release:license',
            'release:npm-pack',
            // 'release:npm-publish',
            done
        );
    });
};
