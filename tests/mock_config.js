/**
 * Created by intsco on 2/8/17.
 */

let config = {};

config.port = 3010;
config.ws_port = 5666;
config.img_storage_port = 4201;

config.log = {};
config.log.level = 'info';

config.defaults = {
  adducts: {"+": ["+H", "+Na", "+K"], "-": ["-H", "+Cl"]},
  moldb_name: 'HMDB-v2.5'
}


/* Settings for image storage.
   It's currently co-hosted with the GraphQL server. */
config.img_upload = {
  iso_img_fs_path: "/opt/data/sm_data/public/",
  backend: "fs", // "fs or "db"
  categories: {
    iso_image: {
      type: 'image/png',
      path: '/iso_images/'
    },
    optical_image: {
      type: 'image/jpeg',
      path: '/optical_images/'
    },
    raw_optical_image: {
      type: 'image/jpeg',
      path: '/raw_optical_images/'
    }
  }
};

config.services = {};
/* Molecular database service, used only for internal purposes (peakChartData query) */
config.services.moldb_service_host = "127.0.0.1/mol_db";
/* Public IP of the server that hosts molecule images */
config.services.mol_image_server_host = "localhost:80";
/* Internal ad-hoc service with the only endpoint /reindex/:dataset_id */
config.services.sm_engine_api_host = "localhost:5123";

config.db = {};
config.db.host = "localhost";
config.db.database = "sm";
config.db.user = "sm";
config.db.password = "password";

config.elasticsearch = {};
config.elasticsearch.index = "sm";
config.elasticsearch.host = "localhost";
config.elasticsearch.port = 9200;

config.rabbitmq = {};
config.rabbitmq.host = "127.0.0.1";
config.rabbitmq.user = "sm";
config.rabbitmq.password = "password";

config.websocket_public_url = "ws://localhost:80/ws";

config.slack = {};
config.slack.webhook_url = "";
config.slack.channel = "";

config.jwt = {};
config.jwt.secret = "secret";

module.exports = config;
