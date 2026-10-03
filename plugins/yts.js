const { cmd } = require("../command");
const yts = require("yt-search");

cmd(
  {
    pattern: "video",
    alias: ["yt", "youtube"],
    react: "▶",
    desc: "Search YouTube videos",
    category: "download",
    filename: __filename,
  },
  async (
    shan,
    mek,
    m,
    {
      from,
      quoted,
      q,
      reply,
    }
  ) => {
    try {
      if (!q) return reply("*Please provide a search quary* 🤦‍♀️");

      reply("*Searching on YouTube for you...* ⌛");

      const search = await yts(q);

      if (!search || !search.all || search.all.length === 0) {
        return reply("*No results found on YouTube.* ☹️");
      }

      const results = search.videos.slice(0, 10); 
      let formattedResults = results.map((v, i) => (
        `🎬 *${i + 1}. ${v.title}*\n📅 ${v.ago} | ⌛ ${v.timestamp} | 👁️ ${v.views.toLocaleString()} views\n🔗 ${v.url}`
      )).join("\n\n");

      const caption = `    
𝒀𝒐𝒖𝒓 𝘠𝘖𝘜𝘛𝘜𝘉𝘌 𝒔𝒆𝒂𝒓𝒄𝒉 𝒓𝒆𝒔𝒖𝒍𝒕𝒔 𝒉𝒆𝒓𝒆...
─────────────────────────
🎀 *Query*: ${q}
${formattedResults}
   `;

      await shan.sendMessage(
        from,
        {
          image: {
            url: "https://raw.githubusercontent.com/shan148/SHAN_MD/refs/heads/main/images/file_0000000049508207bc85468e5c94a551.png",
          },
          caption,
        },
        { quoted: mek }
      );
    } catch (err) {
      console.error(err);
      reply("*An error occurred while searching YouTube.* ❌");
    }
  }
);
