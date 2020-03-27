const User = require('../models/user');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const userController = {

  signupPage: (req, res) => {
    res.render('signup');
  },

  signupAction: async (req, res) => {
    try {
      // les vérifs à faire : 

      // - 1: l'utilisateur existe déjà
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
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
      const encryptedPwd = await bcrypt.hash(req.body.password, 10);
      newUser.setPassword(encryptedPwd);
      // on attend que l'utilisateur soit enregistré
      await newUser.save()
      res.redirect('/login');
    } catch (err) {
      res.status(500).send(err);
    }  
  },

  loginPage: (req, res) => {
    res.render('login');
  },

  loginAction: async (req, res) => {
    try {
      //    console.log(req.body);
      // on tente de récupérer l'utilisateur qui possède l'email donné
      const user = await User.findOne({
        where: {
          email: req.body.email
        }
      });
      if (!user) {
        return res.render('login',{
          error: "Cet email n'existe pas."
        });
      }

      // Si on a un utilisateur, on teste si le mot de passe est valide
      const validPwd = bcrypt.compareSync(req.body.password, user.getPassword() );
      if (!validPwd) {
        return res.render('login',{
          error: "Ce n'est pas le bon mot de passe."
        });
      }

      // si tout va bien, on met l'utilisateur en session...
      req.session.user = user;
      //... mais on supprime son mdp !
      delete req.session.user.password;
      // et on repart sur la page d'accueil
      return res.redirect('/');

    } catch (err) {
      res.status(500).send(err);
    }
  },

  disconnect: (req, res) => {
    req.session.user = false;
    return res.redirect('/');
  },

  profilePage: (req, res) => {
    if(!req.session.user) {
      return res.redirect('/login');
    }
    
    res.render('profile', {
      user: req.session.user
    });
  }

};

module.exports = userController;