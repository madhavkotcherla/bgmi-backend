const express = require("express");
const db = require("../db");

const router = express.Router();

/**
 * Get players of a team in a tournament
 * /api/players/:teamId/:tournamentId
 */
router.get("/:teamId/:tournamentId", (req, res) => {
    const { teamId, tournamentId } = req.params;

    const query = `
        SELECT 
            p.player_name,
            pts.total_kills
        FROM player_tournament_stats pts
        JOIN player p ON p.player_id = pts.player_id
        WHERE p.team_id = ? AND pts.tournament_id = ?
        ORDER BY pts.total_kills DESC
    `;

    db.query(query, [teamId, tournamentId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

module.exports = router;
