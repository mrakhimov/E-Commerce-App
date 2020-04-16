const dashBoardLoader = (req,res)=>{

    if(req.session.user.role=="Clerk")
    {
        req.session.user.isClerk = true;
        res.render("clerkDashboard");
    }

    else
    {
        req.session.user.isRegular = true;
        res.render("dashboard");
    }

}

module.exports = dashBoardLoader;