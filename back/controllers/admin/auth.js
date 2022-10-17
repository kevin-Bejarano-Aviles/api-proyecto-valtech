const {generateJWT} = require('../../helpers/generate-jwt');
const {adminByEmail} = require('../../helpers/findAdminBy');
const {checkPassword} = require('../../helpers/checkCredentials');
//Method to login our admin
const login = async (req, res) => {
    const { email = '', pass } = req.body;
    try { 
         // We use the email to login, if our model find the email will comparate with the password, else we'll see the message "Credenciales inválidas"
        const admin = await adminByEmail(email);
        if(!admin){
            return res.status(400).json({
                status: '400 Bad request',
                message:'Invalid credentials',
                data:''
            });
        }
        // We compare the password entered with the password we have in the db that's already hashed, with method "compareSync" 
        if(!checkPassword(pass,admin.password)){
            return res.status(400).json({
                status: '400 Bad request',
                message:'Invalid credentials',
                data:''
            });
        }
        const token = generateJWT(admin.id);
        res.status(200).json({
            status:'200 OK',
            message:'',
            data:{
                admin:{
                    id:admin.id,
                    fullName:admin.fullName,
                    avatar:admin.avatar,
                    email:admin.email
                },
                token
            }
        });
    } catch (error) {
        res.status(500).json({
            status: '500 Internar server error',
            message: 'Error MySQL/Express/Node'
        });
        console.log({error:error.message});
    }
};
module.exports = {
    login
}