const template = require('../models/template');

const getAllTemplates = async (req, res) => {
    const user = req.user;
    const { plan_type } = user;
    const { plan_expire } = user;

    if(plan_type){
        if(plan_expire > new Date()){
            try{
                const result = await template.getTemplates(plan_type);
                return res.status(200).send(result);
            }
            catch(err){
                return res.status(404).json({
                    status: false,
                    msg: error
                });
            } 
        }
        return res.status(403).json({ status: false, msg: 'Your plan has expired. Please purchase a new plan.'})  
    }

    return res.status(404).json({ status: false, msg: 'Please purchase your plan.'})
}

module.exports = { getAllTemplates }