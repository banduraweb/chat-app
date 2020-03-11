const router = require("express").Router();

router.get('/', async (req, res)=>{

    await res.send('server in url \'/\'')

});


module.exports = router;