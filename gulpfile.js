const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// compile sass and inject into browser
gulp.task('sass', function(){
	return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'])
	.pipe(sass())
	.pipe(gulp.dest("src/css"))
	.pipe(browserSync.stream());
});

// tirar arquivos JAVASCRIPT do node_modules e mover para a pasta js do projeto
gulp.task('js', function(){
	return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js','node_modules/jquery/dist/jquery.min.js','node_modules/popper.js/dist/umd/popper.min.js'])
	.pipe(gulp.dest("src/js"))
	.pipe(browserSync.stream());
});
// WATCH SASS
gulp.task('serve',['sass'], function(){
	browserSync.init({
		server: "./src"
	});

	gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss','src/scss/*.scss'],['sass']);
	gulp.watch("src/*.html").on('change', browserSync.reload);
});
// MOVER OS ARQUIVOS ONDE ESTÃO AS FONTES 
/// FONTS E FONT-AWESOME PARA O FOLDER SRC
gulp.task('fonts', function(){
	return gulp.src('node_modules/font-awesome/fonts/*')
	.pipe(gulp.dest("src/fonts"));
});
gulp.task('fa', function(){
	return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
	.pipe(gulp.dest("src/css"));
}); 
//DIZER AO GULP QUE POR DEFAULT ELE DEVE EXECUTAR O SEGUINTE ARRAY DE TAREFAS
// COM AS 4 TAREFAS CRIADAS ACIMA
gulp.task('default',['js','serve','fa','fonts']);