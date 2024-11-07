const getMonthNumber = (req, res, next) => {
    const { month } = req.query;

    if (!month) {
        return res.status(400).json({ error: 'Month parameter is required' });
    }

    const date = new Date(`${month} 1, 2000`);
    const monthNumber = isNaN(date.getMonth()) ? null : date.getMonth() + 1;

    if (!monthNumber) {
        return res.status(400).json({ error: 'Invalid month name' });
    }

    req.monthNumber = monthNumber;
    next();
};

module.exports = getMonthNumber;
