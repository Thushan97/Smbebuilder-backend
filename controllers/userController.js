const User = require("../models/user");

const getDate = () => {
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  
  if (month.length < 2) 
    month = '0' + month;
  if (day.length < 2) 
    day = '0' + day;
  
  return [year, month, day].join('-');
};


const changePlan = async (req, res) => {
    const user = true //req.user;  
    const type = req.params.plan;
    const dateNow =getDate();
    console.log(`result`, req.params.id);
    console.log(`date`, getDate());
    if (user) {
      try {
        const result = await User.changePlan({id:req.params.id, type:type, planStart: dateNow,    planEnd: dateNow, });
        console.log(`result`, result);
        if(result){
            return res.status(200).json({
                status: true,
                msg: "Update user plan",
              });
        }else{
            return res.status(404).json({
                status: false,
                
            });
        }
        
      } catch (err) {
          console.log(`err`, err)
        return res.status(404).json({
            status: false,
            msg: err,
          });
      }
    }  
    return res.json({ status: false, msg: "Not found user" });

};



const uploadImage = async (req, res) => {
    const user = true;//req.user;  
    // const { id, email, type } = user;
    const userId = req.body.userID;
    const imageUrl = req.body.imageURL;
    console.log(`object`, req.body);
    if (user) {
      try {
        const result = await User.addImages({userID:userId, imageURL:imageUrl.toString()});
        console.log(`result`, result);
        if(result){
            return res.status(200).json({
                status: true,
                msg: "Add image",
              });
        }else{
            return res.status(404).json({
                status: false,
            
            });
        }
        
      } catch (err) {
          console.log(`err`, err)
        return res.status(404).json({
            status: false,
            msg: err,
          });
      }
    }  
    return res.json({ status: false, msg: "Not found user" });
  };

  const getImages = async (req, res) => {
    const user = true;//req.user;
  
    if (user) {
      try {
        const result = await User.getImages(req.params.id);//update user plan type
        if(result){
            return res.status(200).json({
                result: result,
                msg: "images",
              });
        }else{
            return res.status(404).json({
                status: false,
               
              });
        }
        
      } catch (err) {
        return res.status(404).json({
            status: false,
            msg: err,
          });
      }
    }
  
    return res.json({ status: false, msg: "Not found user" });
  };
  
  module.exports = {    
    changePlan,
    uploadImage,
    getImages
  };