var yeoman = require('yeoman-generator')

// var generatorObject = {
//   _method1: function() {
//     console.log('THIS IS PRIVATE METHOD')
//   },
//   initializing: {
//     method: function() {
//       console.log('method 2 method 1')
//     },
//     method2: function() {
//       console.log('method 2 method 2')
//     }
//   }
// }



var generatorObject = {
  constructor: function() {
    // specify arguments and options
    var self = this
    yeoman.Base.apply(self, arguments)

    self.option('coffee', {
      desc: 'Do you want some coffee?'
    })
  },

  initializing: function() {
    this.config.set()
  },

  prompting: function() {
    var self = this,
      done = self.async()

    var projectName = {
      type: 'input',
      name: 'projectName',
      message: 'What is your project name?',
      default: self.appname
    }

    var npmProjectDependencies = {
      type: 'checkbox',
      name: 'npmProjectDependencies',
      message: 'What NPM dependencies do you want?',
      choices: ['lodash', 'morgan']
    }

    var bowerProjectDependencies = {
      type: 'checkbox',
      name: 'bowerProjectDependencies',
      message: 'What BOWER dependencies do you want?',
      choices: ['jquery']
    }

    var githubUserName = {
      type: 'input',
      name: 'githubUserName',
      message: 'Github user name',
      store: true
    }

    self.prompt(
      [projectName, githubUserName, npmProjectDependencies, bowerProjectDependencies],
      function(answers) {
        self.log(answers)
        self.config.set(answers)
        self.answers = answers // save answers to
        done()
      })
  },

  writing: function() {
    var self = this

    self.template('_server.js', 'server.js', self.answers)
    self.template('_package.json', 'package.json', self.answers)
    self.template('_bower.json', 'bower.json', self.answers)

    // self.log(self.destinationRoot()) // tells where your root is
    // self.log(self.destinationPath('app/index.js')) // sets a path
    // self.log('//')
    // self.log(self.sourceRoot()) // where you template root is coming from
    // self.log(self.templatePath('_server.js')) // sets a path for templates

    // self.fs.copyTpl(self.templatePath('_server.js'), self.destinationPath('server.js'), {
    //   appname: self.answers.projectName
    // })

    // self.template('_server.js', 'server.js', self.answers)

    // Bulk copy folders
    // var folders = ['models', 'views', 'controllers', 'routes']
    // for (var folder of folders) {
    //   self.mkdir('app/' + folder)
    // }

    // Gruntfile
    // self.gruntfile.insertConfig('compass', '{watch:{watch: true}}')
    // self.gruntfile.registerTask('build', ['compass'])
  },
  install: function() {
    var self = this
    self.installDependencies({
      skipInstall: self.options['skip-install'],
      bower: false,
      npm: true
    })

    if (self.answers.npmProjectDependencies) {
      self.npmInstall(self.answers.npmProjectDependencies, {
        'save': true
      })
    }

    if (self.answers.bowerProjectDependencies) {
      self.bowerInstall(self.answers.bowerProjectDependencies, {
        'save': true
      })
    }

    // if (!self.options['skip-install']) {
    //   self.spawnCommand('nodemon')
    // }

  }
}


module.exports = yeoman.Base.extend(generatorObject)