module.exports = ({ env }) => ({
    // ...
    "io": {
      "enabled": true,
      "config": {
        "IOServerOptions" :{
          "cors": { "origin": "http://localhost:3000", "methods": ["GET","POST","PUT"] },
        },
        "contentTypes": {
          "product":"*"
        },
        "events":[
          {
            "name": "connection",
            "handler": ({ strapi }, socket) => {
              strapi.log.info(`[io] new connection with id ${socket.id}`);
            },
          },
        ]
      },
    },
    // ...
  });