const { kafkaInstance } = require("./getKafka");

async function main() {
  try {
    const admin = kafkaInstance.admin();

    console.log("Connecting...");
    await admin.connect();
    console.log("Connected");

    await admin.createTopics({
      topics: [
        {
          topic: "Messages",
          numPartitions: 2,
        },
      ],
    });
    console.log("Created topic");

    await admin.disconnect();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

main();
