import express from 'express';
import { Request, Response } from 'express';
import Blog from '../model/blog';
const router = express.Router();
/// POST -Create New Blog///////
router.post('/', async (req:Request,res:Response) => {
    
    const { title,description,image} = req.body;

    try {
        const checkBlog = await Blog.findOne({title,description,image});
        if (checkBlog) { return res.status(200).json({ status: false,message: 'Blog Already Exists' }) }
const blogdata= new Blog({
  title,description,image
        })      
        await  blogdata.save()
        res.status(200).send({ status: "true",message: 'Blog Saved',data:blogdata})
    } catch (err) {
        // console.log(err.message)
        res.status(200).send({ status: "false",message: 'Error in Solving'})
    }
});
///PATCH-Update the Blog by Id
router.patch('/:id', async (req:Request,res:Response) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body);
      if (!blog) {
        return res.status(404).send({ status: "false", message: "Blog not found" });
      }
      res.status(200).send({ status: "true", message: 'Blog Updated Success', data: Blog });
    } catch (err) {
      res.status(500).send({ status: "false", message: "Error", errors: err });
    }
  });
  
/*///////////// /////////////////////////////  DELETE DATA  ////////////////////////////////////////*/
router.delete('/:id', async (req:Request,res:Response) => {
    try {
      const blog = await Blog.findByIdAndDelete(req.params.id, { status: 0 });
      if (!blog) {
        return res.status(404).send({ status: "false", message: "Blog not found" });
      }
      res.status(200).send({ status: "true", message: 'Blog Deleted Success', data: blog });
    } catch (err) {
      res.status(500).send({ status: "false", message: "Error", errors: err });
    }
  });
  
/////////////////////// GET Blog DATA //////////////////////

router.get("/", async (req:Request,res:Response) => {
    try {
    const getblog = await Blog.find();
res.status(200).send(getblog);
    } catch (error) {
        res.status(500).json(error);
    }
})
    
/* ////////////////////////////////////////  GET BY ID  ////////////////////////////////// ///*/

router.get("/:id", async (req:Request,res:Response) => {
    try {
      const docs = await Blog.find({ _id: req.params.id });
      res.status(200).send({ status: "true", message: 'Blog List Loading Success', data: docs });
    } catch (err) {
      res.status(200).send({ status: "false", message: 'Error in Solving', data: err });
    }
  });
  


  export default router;