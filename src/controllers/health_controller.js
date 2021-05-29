const controller = {
    getHealth: (req, res) => {
        return res.status(200).json({
            message: 'Test'
        })
    }
}

module.exports = controller;