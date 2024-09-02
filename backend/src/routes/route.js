import express from 'express';
import { editSingleAddress, editUserAddress, forgotPassword, updatePassword, getUserdata, getUserAddress, loginUser, logoutUser, removeUserAddress, signInRouter, userAddress } from '../controllers/user.controller.js';
import { verifyUser } from '../middleware/index.js';
import { getProductImg } from '../middleware/multer.js';
import { addProduct } from '../controllers/addProduct.js';
import { createOrder, orderHistory } from '../controllers/createProductOrder.js';
import { getProductByName, getProducts } from '../controllers/getProduct.js';
<<<<<<< HEAD
import sendEmail from '../utils/nodemailer.js';
=======
import sendEmail from '../utils/nodeMailer.js';

import { getAllGoalies } from '../controllers/Goalie.js';
>>>>>>> be79a9ffd1186b334765e630085192ce33851ecf


const router = express.Router()
router.post('/signIn', signInRouter)
router.post('/login', loginUser)
router.put('/forgotPassword', forgotPassword)
router.post('/resetPassword', updatePassword)
router.get('/user-profile', verifyUser, getUserdata)
router.post('/logout', verifyUser, logoutUser)
router.post('/addProduct', verifyUser, getProductImg, addProduct)
router.post('/add-address', verifyUser, userAddress)
router.post('/create-order', verifyUser, createOrder)
router.get('/order-history', verifyUser, orderHistory)
router.get('/get-all-products', getProducts)
router.get('/get-product', getProductByName)
router.get('/get-address', verifyUser, getUserAddress)
router.post('/edit-address', verifyUser, editUserAddress)
router.post('/edit-personal-address', verifyUser, editSingleAddress)
router.get('/remove-address', verifyUser, removeUserAddress)
<<<<<<< HEAD
router.get('/send-email', sendEmail)
=======
router.post('/add_goalie', verifyUser, uploadProductImage.single('goalie_photo') ,addGoalie)
router.post('/send-email', sendEmail)
router.get('/goalies', getAllGoalies);

>>>>>>> be79a9ffd1186b334765e630085192ce33851ecf

export default router
