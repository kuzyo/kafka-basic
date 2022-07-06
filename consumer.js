const { kafkaInstance } = require("./getKafka");

async function main() {
  try {
    const consumer = kafkaInstance.consumer({ groupId: "test" });

    console.log("Connecting...");
    await consumer.connect();
    console.log("Connected");

    await consumer.subscribe({ topic: "Messages", fromBeginning: true });

    await consumer.run({
      eachMessage: async (result) => {
        console.log(`Received - message ${result.message.value}`);
      },
    });
  } catch (error) {
    console.error(error);
  }
}

main();
