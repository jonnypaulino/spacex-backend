const Launch = require("../model/model")

const SpacexController = () => {

    const PAGE_SIZE = 4; 

    const getLaunches = async (req, res) => {
        try {
            const page = parseInt(req.query.page) || 1; // Página atual a partir dos query parameters
            const offset = (page - 1) * PAGE_SIZE;

            const { count, rows: launches } = await Launch.findAndCountAll({
                offset,
                limit: PAGE_SIZE,
            });

            const totalPages = Math.ceil(count / PAGE_SIZE);
            const hasNext = page < totalPages;
            const hasPrev = page > 1;

            return res.status(200).json({
                totalDocs: count,
                results: launches,
                page,
                totalPages,
                hasNext,
                hasPrev,
            });
        } catch (err) {
            return res.status(400).json({ message: "Error message" });
        }
    };

    return {
        getLaunches
    }
}

module.exports = SpacexController