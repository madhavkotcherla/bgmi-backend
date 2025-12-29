const express = require("express");
const db = require("../db");

const router = express.Router();

/**
 * GET leaderboard by tournament
 * /api/leaderboard/:tournamentId
 */
router.get("/:tournamentId", (req, res) => {
    const tournamentId = req.params.tournamentId;

    const query = `
    SELECT 
        t.team_id,              -- ✅ ADD THIS
        t.team_name,
        s.position,
        s.matches_played,
        s.wins,
        s.placement_points,
        s.elimination_points,
        s.total_points
    FROM team_tournament_stats s
    JOIN team t ON t.team_id = s.team_id
    WHERE s.tournament_id = ?
    ORDER BY s.position
`;


    db.query(query, [tournamentId], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json(err);
        }
        res.json(result);
    });
});

module.exports = router;
