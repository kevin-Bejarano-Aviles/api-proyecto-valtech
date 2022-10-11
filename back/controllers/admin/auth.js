const {Admins:AdminModel} = require('../../models');
const bcryptjs = require('bcryptjs');
//Method to login our admin
const login = async (req, res) => {
    const { email, pass } = req.body;
    //const passHash = bcryptjs.hashSync(pass,12);
    try { 
         // We use the email to login, if our model find the email will comparate with the password, else we'll see the message "Credenciales inválidas"
        const admin = await AdminModel.findOne({
            where: {
                email: email
            }
        });
        if (!admin) {
            return res.status(400).json({ message: 'Credenciales invalidas' });
        } // We compare the password entered with the password we have in the db that's already hashed, with method "compareSync" 
        if (!bcryptjs.compareSync(pass, admin.password)) {
            return res.status(400).json({ message: 'Credenciales invalidas' });
        }
        req.session.adminLog = {
            id: admin.id,
            fullName: admin.fullName,
            avatar: admin.avatar,
            email: admin.email
        }
        res.json({adminLog:req.session.adminLog});

    } catch (error) {
        console.log({error:error.message});
        res.status(500).json({error:error.message});
    }
};

//Method to log out
const logOut = (req = request, res) => {
    req.session.destroy((err) => {
    res.clearCookie('userId').send('cleared cookie');//If we add "send" it works, we don't know why
});
};

module.exports = {
    login,
    logOut
}