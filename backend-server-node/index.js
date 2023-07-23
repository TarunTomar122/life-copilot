const osascript = require("node-osascript");
const express = require("express");
const app = express();
const cors = require("cors");
const { exec } = require("child_process");
// import bodyParser from "body-parser";
const bodyParser = require("body-parser")

// Provide the path to your separate AppleScript file here
const scriptPath = "./test.scpt";

// osascript.executeFile(scriptPath, (err, result) => {
//   if (err) {
//     console.error("Error executing AppleScript:", err);
//   } else {
//     console.log("Result:", result);
//   }
// });

app.use(cors());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (request, response) => {
  osascript.executeFile(scriptPath, (err, result) => {
    if (err) {
      console.error("Error executing AppleScript:", err);
      response.send(err);
    } else {
      console.log("Result:", result);
      response.send(result);
    }
  });
});

app.post("/open_a_group", async (request, response) => {
  console.log("rdsafklja", request.body);

  osascript.executeFile(
    `./open_a_group.scpt`,
    { targetWindowTitle: request.body.targetWindowTitle },
    (err, result) => {
      if (err) {
        console.error("Error executing AppleScript:", err);
        response.send({ error: err });
      } else {
        console.log("Result:", result);
        response.send({ response: "done" });
      }
    }
  );

  // The title you want to search for and open in Chrome
  // const targetTitle = "Your Window Title Here";

  // // Execute the AppleScript with the title as a command-line argument
  // exec(
  //   `osascript ./open_a_group.scpt "${targetTitle}"`,
  //   (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`Error executing AppleScript: ${error.message}`);
  //       return;
  //     }
  //     // Print the output (if any)
  //     console.log(stdout);
  //   }
  // );
});

app.listen(3001, () => {
  console.log("Listen on the port 3001...");
});
