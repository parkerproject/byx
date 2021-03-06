require('dotenv').config();

const Hapi = require('hapi');
const html = require('swig');
const Inert = require('inert');
const Vision = require('vision');


const server = new Hapi.Server();
server.connection({ port: 4000, host: '0.0.0.0' });

server.register([Vision, Inert], (err) => {
  if (err) {
    throw err;
  }

  server.views({
    path: './public',
    engines: {
      html,
    },
  });

  server.route({
    method: 'GET',
    path: '/',
    handler(request, reply) {
      reply.file('./index.html');
    },
  });

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      },
    },
  });
});


server.start((err) => {
  if (err) {
    throw err;
  }
  console.log(`Server running at: ${server.info.uri}`);
});
