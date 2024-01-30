const express = require("express");
const router = express.Router();
const NotesModel = require("../models/notes");
const auth = require("../middlewares/auth.middleware");

/**
 * @swagger
 * components:
 *  schemas:
 *     Notes:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the note
 *         email:
 *           type: string
 *           description: The email of the user
 *         title:
 *           type: string
 *           description: The title of the note
 *         content:
 *            type: string
 *            description: The content of the note 
 * 
 *          
 *    
 */

/**
 * @swagger
 * tags:
 *  name: Notes
 *  description: Notes API (all the apis related to notes)
 */

/**
 * @swagger	 
 * /notes:
 *  get:
 *      description: get all notes
 *      responses:
 *      200:
 *          description: get all notes
 *          content:
 *             application/json:
 *                schema:
 *                   type: array
 *                   items:
 *                       $ref: '#/components/schemas/Notes'
 *      
 */
// /**
//  * @swagger
//  * /notes/delete/{id}:
//  *  delete:
//  *      description: delete a note
//  *      tags: [Notes]
//  *      
//  */

/**
 * @swagger
 * /notes/add:
 *  post:
 *      description: add a note
 *      tags: [Notes]
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Notes'
 *      response:
 *        200:
 *          description: note successfully added
 *          content:
 *          application/json:
 *                 schema:
 *                   $ref: '#/components/schemas/Notes'
 *        400:
 *            description: bad request error
 */

/**
 * @swagger
 * /notes/patch/{:id}:
 *  patch:
 *      description: add a note
 *      tags: [Notes]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: note id
 *      requestBody:
 *         required: true
 *         content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/Notes'
 *      response:
 *      200:
 *            description: note successfully added
 *            content:
 *                 application/json:
 *                     schema:
 *                        $ref: '#/components/schemas/Notes'
 *      400:
 *            description: bad request error
 */

router.get("/", auth, async (req, res) => {
	try {
		const data = await NotesModel.find();
		console.log(data);
		res.status(200).send(data);
	} catch (error) {
		res.send({ err: error });
	}
});
router.delete("/delete/:id", auth, async (req, res) => {
	try {
		const id = req.params.id;
		const reqId = req.payload.id;
		const data = await NotesModel.findById(reqId);
		if(data.id===id){
			const data = await NotesModel.findByIdAndDelete(reqId);
			res.send({ message: "deleted successfully", data: data });
		}
		else{
			res.send({ message: "not authorized" });
		}
		
	} catch (error) {
		res.send({ err: error, message: error.message });
	}
});
router.post("/add", auth, async (req, res) => {
	const id = req.payload.id; 
	const { email, title, content } = req.body;
	console.log(req.body);
	try {
		const data = await NotesModel.create({ email, id: id, title, content });
		await data.save();
		res.send({ message: "added successfully", data: data });
	} catch (error) {
		res.send({ err: error, message: error.message });
	}
});
router.patch("/patch/:id", auth, async (req, res) => {
	
	try {
      const id = req.payload.id;
	const reqId = req.params.id;
   console.log(reqId, id)
    const data=await NotesModel.findById(reqId);                                                                                                                                                                 
		if (data.id === id) { 
			const data = await NotesModel.findByIdAndUpdate(reqId, req.body);
		
			res.send({ message: "updated successfully", data: data });
		}
	} catch (error) {
		res.send({ err: error, message: error.message });
	}
});

module.exports = router;
