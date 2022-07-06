const { kafkaInstance } = require("./getKafka");

const data = process.argv[2];
const partition = process.argv[3];

async function main() {
  try {
    const producer = kafkaInstance.producer();

    console.log("Connecting...");
    await producer.connect();
    console.log("Connected");

    const result = await producer.send({
      topic: "Messages",
      messages: [
        {
          value: data,
          // Not completely sure with partition part, currently I'm just manually setting partition through arg
          // Is it possible that one data source going always go to specific partition. For example:
          // twitter: partition 0,
          // 247: partition 1,
          // athletic: partition 2,
          // this way next consumer going to get messages only from specific partition
          partition,
        },
      ],
    });

    console.log(`Send message - ${JSON.stringify(result)}`);

    await producer.disconnect();
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
}

main();
