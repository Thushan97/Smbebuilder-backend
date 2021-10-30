const Project = require("../models/project");
const AuthController = require("../controllers/authController");
const Fs = require("fs");
const Path = require("path");
const Axios = require("axios");
const utils = require("../utils/utils");

require("express-async-errors");

const createProject = async(req, res) =>{
    const { name } = req.body;
    const user = req.user;
    const { id, email, type} = user;

    if(user){
        const projectCount = await Project.getProjectCount(id); 
        const {project_count} = projectCount[0]

        if( (type === 'free' && project_count < 100) || (type === 'pro' && project_count < 10000) || type === 'admin'){

            const isNameExists = await Project.getUserProjectByName({
                userId : id,
                projectName : name
            })

            if(isNameExists.length === 0 ){
                
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
                        status:false,
                        msg: err
                    })
                }
            }

            else{
                return res.json({ status: false, msg:  `There is already a project named ${isNameExists[0].name}` });
            }
        }

        return res.json({ status: false, msg: " Your limit already exceeded" });
    
    }

    return res.json({ status: false, msg: "Not found user" });
}


const getAllProjects = async(req, res) =>{
    const user = req.user;
    const { id, email, type} = user;

    if(user){
        try{
            const result = await Project.allProject(id);
            return res.status(200).json({
                status: true,
                msg: 'All projects get successfully',
                data: result
            })
        }
        catch(err){
            return res.status(404).json({
                status:false,
                msg: err
            })
        }
    }

    return res.json({ status: false, msg: "Not found user" });
}

const singleProject = async(req, res) => {
    const user = req.user;
    const { id, email, type} = user;

    if(user){
        try{
            const result = await Project.getProject({
                projectId : req.params.id,
                userId : id 
            });
            return res.status(200).json({
                status: true,
                msg: 'Project get successfully',
                data: result
            })
        }
        catch(err){
            return res.status(404).json({
                status:false,
                msg: err
            })
        }
}

return res.json({ status: false, msg: "Not found user" });
}

const updateProject = async(req, res) =>{
    const { name } = req.body;
    const user = req.user;

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
                status: false,
                msg: err
            })
        }
    }

    return res.json({ status: false, msg: "Not found user" });
}

const deleteProject = async(req, res) =>{
    const user = req.user;

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
                status:false,
                msg: err
            })
        }
    }

    return res.json({ status: false, msg: "Not found user" });
}


const downloadProject = async(req, res) =>{
    const user = req.user;
    const { id } = user;

    if(user){
        try{
            const result = await Project.getProject({
                projectId : req.params.id,
                userId : id 
            });

            if(result.length > 0){
                const {name} = result[0]

                const url ="https://unsplash.com/photos/J0gnwt2KTRw/download?ixid=MnwxMjA3fDB8MXxhbGx8NHx8fHx8fDJ8fDE2MzU2MDI0MTQ&force=true"

                const path = Path.resolve("C:\\Users\\User", 'Downloads', `${name}.jpg`)

                const response = await Axios ({
                    methos: 'GET',
                    url:url,
                    responseType: 'stream'
                })

                response.data.pipe(Fs.createWriteStream(path))

                return new Promise((resolve, reject) => {
                    response.data.on('end', () => {
                        resolve()
                        return res.status(200).json({
                            status: true,
                            msg: 'Project Downloaded successfully'
                        })
                    })

                    response.data.on('error', err => {
                        reject(err)
                        return res.json({ status: false, msg: "Download Failed" });

                    })
                })
            }

            
        }
        catch(err){
            return res.status(404).json({
                status:false,
                msg: err
            })
        }
    }

    return res.json({ status: false, msg: "Not found user" });
}

const openProject = async (req, res) => {
  res.send("https://app.smbebuilder.com/app/builder.html");
};


module.exports = {
    createProject,
    updateProject,
    deleteProject,
    downloadProject,
    getAllProjects,
    singleProject,
    openProject,
  };

