export const getCurrentUser = async (req,res) => {
    try {
        if(!req.user){
            return res.json({ user: null })
        }
        return res.json(req.user)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Error fetching user data", error: error.message })
    }
}