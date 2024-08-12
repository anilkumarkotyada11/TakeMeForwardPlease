const express = require('express');
const { getBanner, updateBanner, toggleVisibility, getAllBanners, createBanner, deleteBanner,  } = require('../controllers/bannerController');

const router = express.Router();

router.get('/get/:id', getBanner);
router.put('/update/:id',(req,res,next)=>{console.log("middleware"); next()}, updateBanner);
router.post('/create', createBanner);
router.post('/toggle/:id', toggleVisibility);
router.get('/all', getAllBanners);
router.delete('/delete/:id', deleteBanner);


module.exports = router;
