const Project = require("../models/project");
const AuthController = require("../controllers/authController");

require("express-async-errors");

const createProject = async(req, res) =>{
    const { name } = req.body;
    const user = await AuthController.getUser();
    const { id, email, type} = user;

    if(user){
        const projectCount = await Project.getProjectCount(id); 

        if( (type === 'free' && projectCount < 100) || (type === 'pro' && projectCount < 10000) || type === 'admin'){

            try{
                const result = await Project.createNewProject({
                    userId : id,
                    name: name,
                    created: new Date(),
                    lastModified: new Date()
                });
                return res.status(200).json({
                    status: true,
                    msg: 'Project created successfully'
                })
            }
            catch(err){
                return res.status(404).json({
                    status:'fail',
                    msg: err
                })
            }
        }

        return res.json({ status: false, msg: " Your limit already exceeded" });
    
    }

    return res.json({ status: false, msg: "Not found user" });
}


const getAllProjects = async(req, res) =>{
    const user = await AuthController.getUser();
    const { id, email, type} = user;

    if(user){
        try{
            const result = await Project.allProject(id);
            return res.status(200).json({
                status: true,
                msg: 'All projects get successfully'
            })
        }
        catch(err){
            return res.status(404).json({
                status:'fail',
                msg: err
            })
        }
    }

    return res.json({ status: false, msg: "Not found user" });
}

const singleProject = async(req, res) => {
    const user = await AuthController.getUser();
    const { id, email, type} = user;

    if(user){
        try{
            const result = await Project.getProject({
                projectId : req.params.id,
                userId : id 
            });
            return res.status(200).json({
                status: true,
                msg: 'Project get successfully'
            })
        }
        catch(err){
            return res.status(404).json({
                status:'fail',
                msg: err
            })
        }
}

return res.json({ status: false, msg: "Not found user" });
}

const updateProject = async(req, res) =>{
    const { name } = req.body;
    const user = await AuthController.getUser();

    if(user){
        try{
            const result = await Project.updateCurrentProject({
                id: req.params.id,
                name: name,
                lastModified: new Date()
            });
            return res.status(200).json({
                status: true,
                msg: 'Project updated successfully'
            })
        }
        catch(err){
            return res.status(404).json({
                status:'fail',
                msg: err
            })
        }
    }

    return res.json({ status: false, msg: "Not found user" });
}

const deleteProject = async(req, res) =>{
    const user = await AuthController.getUser();

    if(user){
        try{
            const result = await Project.deleteCurrentProject(req.params.id);
            return res.status(200).json({
                status: true,
                msg: 'Project Deleted successfully'
            })
        }
        catch(err){
            return res.status(404).json({
                status:'fail',
                msg: err
            })
        }
    }

    return res.json({ status: false, msg: "Not found user" });
}


const downloadProject = async(req, res) =>{

}


module.exports = {
    createProject,
    updateProject,
    deleteProject,
    downloadProject,
    getAllProjects,
    singleProject,
  };