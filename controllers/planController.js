const Plan = require('../models/plan');

const setPlans = async (req, res) => {
    const user = req.user;
    const { email } = user;
    if(user){
        try{
            const result = await Plan.addPlan(email, req.body.plan);
            return res.status(200).json({
                status: true,
                msg: "Plan added suceessfully.",
            });
        }
        catch(err){
            return res.status(404).json({
                status: false,
                msg: error
            });
        }    
    }

    return res.status(404).json({ status: false, msg: 'Not found user.'})
}

module.exports = { setPlans }