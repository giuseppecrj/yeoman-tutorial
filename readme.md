1. require yeoman-generator
2. create your generator object
3. export your object from the extended yeoman base or nameBased generator.
4. write prority method names.
  - intializing: checks current state, configs, etc.
  - prompting: where you prompt user for options
  - configuring: saving configurations
  - default
  - writing: write the specific files and folders
  - conflict: where conflicts are handled
  - install: running npm install and bower install
  - end: cleanup, say goodbye, etc.

5. initializing
  - create the .yo-config.json file by calling this.config.save()

6. prompting

7. writing
  self.destinationRoot() // tells where your root is
  self.destinationPath() // sets a path starting from root
  self.sourceRoot() // where you template root is coming from
  self.templatePath() // sets a path for templates

  self.copy('_server.js', 'server.js', {name: 'My name to pass'})