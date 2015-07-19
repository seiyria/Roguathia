System.config({
  transpiler: 'babel',
  babelOptions: {
    optional: [
      "runtime"
    ]
  },
  
  paths: {
    "*": "*.js",
    "github:*": "https://github.jspm.io/*.js",
    "npm:*": "https://npm.jspm.io/*.js"
  },
  
  map: {
    "babel": "npm:babel-core@5.6.7",
    "babel-runtime": "npm:babel-runtime@5.6.7",
    "core-js": "npm:core-js@0.9.17",
    
    "amdefine": "npm:amdefine@0.1.1",
    "process": "npm:process@0.10.1"
  }
});