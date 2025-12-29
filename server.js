const express = require("express");
const cors = require("cors");

const tournamentRoutes = require("./routes/tournamentRoutes");
const leaderboardRoutes = require("./routes/leaderboardRoutes");
const teamRoutes = require("./routes/teamRoutes");
const playerRoutes = require("./routes/playerRoutes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tournaments", tournamentRoutes);
app.use("/api/leaderboard", leaderboardRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/players", playerRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

