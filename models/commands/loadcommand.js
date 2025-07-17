const fs = require("fs");
const path = require("path");

module.exports = async function loadCommand() {
  const commandsPath = path.join(__dirname, "..", "commands");
  const categories = fs.readdirSync(commandsPath).filter(folder => !folder.endsWith(".js"));

  global.client.commands = new Map();
  global.client.events = new Map();

  let total = 0;

  for (const category of categories) {
    const folderPath = path.join(commandsPath, category);
    const commandFiles = fs.readdirSync(folderPath).filter(file => file.endsWith(".js"));

    // Sort alphabetically
    commandFiles.sort();

    for (const file of commandFiles) {
      try {
        const command = require(path.join(folderPath, file));
        if (!command.config || !command.config.name) {
          console.log(`❌ [ERROR] ${file} missing config.name`);
          continue;
        }

        global.client.commands.set(command.config.name, command);
        total++;
        console.log(`✅ Successfully installed module ${command.config.name}`);
      } catch (error) {
        console.log(`❌ Failed to install ${file} → ${error.message}`);
      }
    }
  }

  console.log(`\n🔁 Total ${total} modules loaded.`);
};
