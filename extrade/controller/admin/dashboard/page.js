const asyncHandler = require("../../../helpers/asyncHandler");
const { dateToPostFormat } = require("../../../helpers/manipulateDate");
const { createPage, adminGetPagesFunction, getPageById, editPageById, deletePageById } = require("../../../helpers/page");
const { getNextOffset } = require("../../../helpers/pagination");

exports.adminNewPageGet = asyncHandler(async (req, res, next) => {
    
    res.render("admin/pages/page/addNew", {
        title: "New Page"
    })
})

//CREATE PAGE (POST)
exports.adminNewPagePost = asyncHandler(async (req, res, next) => {
    
    //Insert Into DB
    await createPage(req.body)
    
    //Response To Clients
    return res.json({status:true,message:"Page Created Successfully"})
})

//GET ALL PAGES
exports.adminGetAllPages = asyncHandler(async (req, res, next) => {
    
    const limit = parseInt(req.query.limit) || parseInt(process.env.LIMIT);
    const currentPage = parseInt(req.query.page) || 1
    
    const pages = await adminGetPagesFunction(limit, getNextOffset(currentPage));
    
    await pages.map(async pg => {
        pg.page_created = dateToPostFormat(pg.page_created)
    });

    let nextBtn = null;
    let prevBtn = null;
    if (!req.query.page || req.query.page <= 1) {
        nextBtn = 2;
    } else if (req.query.page > 1) {
        prevBtn = parseInt(req.query.page) - 1;
        nextBtn = parseInt(req.query.page) + 1
    };

    res.render("admin/pages/page/allPages", {
        title: "Pages",
        pages,
        nextBtn,
        prevBtn
    })

})


//GET PAGE FOR EDIT
exports.getPageForEditGet = asyncHandler(async (req, res, next) => {
    const pageToEdit = await getPageById(req.params.id);

    if (!pageToEdit) {
        return res.render("pages/error/error", {
        title: "Page Not Found",
        text: "Page You Are Looking For Cannot Be Found, Perhaps It Have Been Moved Or Broken",
        button: {
            link: "/admin/page",
            text:"Back"
        }
    })
    }


    res.render("admin/pages/page/pageForEdit", {
        title: "Edit Page",
        pageToEdit
    })

})

//EDIT PAGE
exports.adminEditPagePut = asyncHandler(async (req, res, next) => {
   
    //Edit In DB
    await editPageById(req.params.id, req.body);

    //Response To Client
    return res.json({status:true,message:"Page Updated Successfully"})

})

//DELETE PAGE
exports.adminDeletePageDelete = asyncHandler(async (req, res, next) => {
   
    //Delete From DB
    await deletePageById(req.body.id);

    //Response To Client
    return res.json({status:true,message:"Page Deleted Successfully"})

})
