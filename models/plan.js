const db = require('../utils/db');

const addPlan = async (email, plan) => { 

    const expireDate = () => {
        const month = new Date().getMonth() + 1;
        console.log(month);
        const expireDate = new Date(new Date().setMonth(month));
        return expireDate;
    }
    
    return db.queryExecutor("UPDATE user SET plan_type = ?, plan_started = ?, plan_expire = ? WHERE email = ?", [plan, new Date(), expireDate(), email]);
}

module.exports = { addPlan };