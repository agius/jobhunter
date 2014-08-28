var settings = {
  development : {
    mongo : 'mongodb://localhost/job-hunter',
    port  : 8080,
    sessionSecret : 'wpCNJ8oUfdQmVySvzsW',
    logFormat : 'dev'
  },
  production : {
    mongo : process.env.MONGO_URL,
    port  : process.env.PORT,
    sessionSecret : process.env.SESSION_TOKEN,
    logFormat : 'tiny'
  }
}

var env = process.env.NODE_ENV || 'development';

module.exports = settings[env];