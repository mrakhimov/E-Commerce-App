const dashBoardLoader = (req,res)=>{

    if(req.session.user.role=="Clerk")
    {
        res.render("clerkDashboard");
    }
    
    else
    {
        res.render("dashboard");
    }

}

module.exports = dashBoardLoader;