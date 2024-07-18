# Change your connection string to

const sequelize = new Sequelize(${databaseName}, ${username}, ${password}, {
  host: ${serviceNameOfDatabaseInComposeFile},
  dialect: 'postgres',
});

# To build container
1. change directory to server.
2. Run command : docker-compose up --build

# Make sure the databaseName,username and password you pass is same as of passed in environment of server in compose file
