// Import necessary modules
import express from 'express';
import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import User from "../model/user"


const router = express.Router();




// Define routes
// POST - Use Register
router.post('/register', async (req:Request, res:Response) => {
    const { name, email, password, phonenumber } = req.body;
  
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
        return res.status(400).json({ message: 'User Email already exists' });
        }
        
        
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        
        
        // Create a new user
        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phonenumber
        });
        
        
        // Save the user to the database
        await newUser.save();
        
        
        res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
        }
        });

// PATCH - Update the User by Id
router.patch('/:id', async (req:Request, res:Response) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body);
    if (!user) {
      return res.status(404).send({ status: "false", message: "User not found" });
    }
    res.status(200).send({ status: "true", message: 'User Updated Success', data: user });
  } catch (err) {
    res.status(500).send({ status: "false", message: "Error", errors: err });
  }
});

// DELETE - Delete User by Id
router.delete('/:id', async (req:Request, res:Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ status: "false", message: "User not found" });
    }
    res.status(200).send({ status: "true", message: 'User Deleted Success', data: user });
  } catch (err) {
    res.status(500).send({ status: "false", message: "Error", errors: err });
  }
});

// GET - Get all Users
router.get('/user', async (req:Request, res:Response) => {
    const { page, limit } = req.query;
    const pageNumber = parseInt(page as string, 10) || 1;
    const pageSize = parseInt(limit as string, 10) || 10;
  
    try {
      const totalItems = await User.countDocuments({});
      const totalPages = Math.ceil(totalItems / pageSize);
  
      const users = await User.find({})
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize);
  
      res.json({
        users,
        totalPages,
        currentPage: pageNumber,
        pageSize,
        totalItems,
      });
    } catch (error) {
      console.error('Error retrieving users:', error);
      res.status(500).json({ message: 'Server Error' });
    }
  });
  

// GET - Get User by Id
router.get("/:id", async (req:Request, res:Response) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send({ status: "false", message: "User not found" });
    }
    res.status(200).send({ status: "true", message: 'User Found', data: user });
  } catch (err) {
    res.status(500).send({ status: "false", message: 'Error in Solving', data: err });
  }
});

// Export the router
export default router;
