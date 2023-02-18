const router = require('express').Router();

const authService = require('../services/authServices.js');
const { isAuth } = require('../middlewares/authMddleware.js')
const { getErrorMessage } = require('../utils/errorUtils.js');


router.get('/login', (req, res) => {
    res.render('auth/login')
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    
    try {
        const token = await authService.login(email, password);
        console.log(token)

        res.cookie('auth', token);
        res.redirect('/')
    } catch (error) {
        return res.status(404).render('auth/login', { error: getErrorMessage(error) });
    }
 
});


router.get('/register', (req, res) => {
    res.render('auth/register');

});
router.post('/register', async (req, res) => {
    const { email, password ,rePassword, gender } = req.body;

    try {
        const token = await authService.register(email, password ,rePassword, gender);

        //LOGIN automatically
        res.cookie('auth', token);
        res.redirect('/')
    } catch (error) {
        res.status(400).render('auth/register', { error: getErrorMessage(error) });
    }

});

router.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');

});

module.exports = router;
