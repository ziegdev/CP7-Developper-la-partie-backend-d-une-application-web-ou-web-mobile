const User = require('../models/user');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const userController = {

  signupPage: (req, res) => {
    res.render('signup');
  },

  signupAction: (req, res) => {
    // les vérifs à faire : 

    // - 1: l'utilisateur existe déjà
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then( (user) => {
      console.log(user);
      if (user) {
        return res.render('signup', {
          error: "Cet email est déjà utilisé par un utilisateur."
        });
      }

      // - 2: format d'email valide
      if (!emailValidator.validate(req.body.email)) {
        return res.render('signup', {
          error: "Cet email n'est pas valide."
        });
      }

      // - 3: le mdp et la confirmation ne correspondent pas
      if (req.body.password !== req.body.passwordConfirm) {
        return res.render('signup', {
          error: "La confirmation du mot de passe ne correspond pas."
        });
      }
      // - 4: Si on avait le courage, vérifier que le mdp répond aux recommendations CNIL...

      // Si on est tout bon, on crée le User !
      let newUser = new User();
      newUser.setFirstName(req.body.firstname);
      newUser.setLastName(req.body.lastname);
      newUser.setEmail(req.body.email);
      newUser.setStatus(1);
      const encryptedPwd = bcrypt.hashSync(req.body.password, 10);
      newUser.setPassword(encryptedPwd);
      newUser.save().then( () => {
        res.redirect('/login');
      });
    });
  },

  loginPage: (req, res) => {
    res.render('login');
  }

};

module.exports = userController;