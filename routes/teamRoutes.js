const express = require("express");
const db = require("../db");

const router = express.Router();

/**
 * Get team stats for a tournament
 * /api/team/:teamId/:tournamentId
 */
router.get("/:teamId/:tournamentId", (req, res) => {
    const { teamId, tournamentId } = req.params;

    const query = `
        SELECT 
            t.team_name,
            s.position,
            s.matches_played,
            s.wins,
            s.placement_points,
            s.elimination_points,
            s.total_points
        FROM team_tournament_stats s
        JOIN team t ON t.team_id = s.team_id
        WHERE s.team_id = ? AND s.tournament_id = ?
    `;

    db.query(query, [teamId, tournamentId], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result[0]); // single team
    });
});

module.exports = router;
