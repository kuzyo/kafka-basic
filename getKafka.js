const { Kafka } = require("kafkajs");

const kafkaInstance = new Kafka({
  clientId: "app",
  brokers: ["localhost:19092"],
});

module.exports = { kafkaInstance };
