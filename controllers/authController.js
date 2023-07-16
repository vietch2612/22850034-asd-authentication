function success(req, res) {
    return res.status(200).json({ success: true, user: req.user });
}

module.exports = { success };