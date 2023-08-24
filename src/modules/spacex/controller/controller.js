const Launch = require("../model/model")

const SpacexController = () => {

    

    const getLaunches = async (req, res) => {
        try {
            const PAGE_SIZE = parseInt(req.query.limit) || 4; 
            const page = parseInt(req.query.page) || 1;
            const offset = (page - 1) * PAGE_SIZE;

            const allLaunches = await Launch.findAll();

            console.log(req.query.search)


            const filterName = req.query.search ? allLaunches.filter(filt => filt?.name?.toLowerCase()?.includes(req.query.search)) : allLaunches


            const count = filterName.length;

            const launches = filterName.splice(offset, PAGE_SIZE);

            const totalPages = Math.ceil(count / PAGE_SIZE);
            const hasNext = page < totalPages;
            const hasPrev = page > 1;

           
            return res.status(200).json({
                totalDocs: totalPages,
                results: launches,
                page,
                totalPages,
                hasNext,
                hasPrev,
            });

        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: "Error message" });
        }
    };

    return {
        getLaunches
    }
}

module.exports = SpacexController