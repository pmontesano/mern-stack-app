import Veterinary from '../models/veterinary.js';
import jwtGenerator from '../helpers/jwtGenerator.js';
import generateId from '../helpers/generateId.js';

const register = async (req, res) => {
  // Prevent  registred users
  const { email } = req.body;

  const userExist = await Veterinary.findOne({ email });

  if (userExist) {
    const error = new Error('Usuario ya registrado');
    return res.status(400).json({ msj: error.message });
  }
  try {
    // Save new veterinary
    const veterinary = new Veterinary(req.body);
    const veterinarySaved = await veterinary.save();
    res.json(veterinarySaved);
  } catch (err) {
    console.log(err);
  }
};

const profile = (req, res) => {
  const { veterinary } = req;
  res.json({ profile: veterinary });
};

const confirm = async (req, res) => {
  const { token } = req.params;

  const userConfirmed = await Veterinary.findOne({ token });

  if (!userConfirmed) {
    const error = new Error('Token invalid');
    res.json({ msg: error.message });
  }

  try {
    userConfirmed.token = null;
    userConfirmed.confirm = true;
    userConfirmed.save();
    res.json({ msg: 'Usuario confirmado correctamente' });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

const authenticate = async (req, res) => {
  const { email, password } = req.body;

  // Comprobar si el usuario existe
  const user = await Veterinary.findOne({ email });

  if (!user) {
    const error = new Error('El usuario no existe');
    res.status(404).json({ msg: error.message });
  }

  if (!user.confirm) {
    const error = new Error('Tu cuenta no fue confirmada');
    res.status(403).json({ msg: error.message });
  }

  // verify password
  if (await user.verifyPassword(password)) {
    res.json({ token: jwtGenerator(user.id) });
  } else {
    const error = new Error('El password es incorrecto');
    res.status(403).json({ msg: error.message });
  }

  res.json({ msg: 'autenticando...' });
};

const forgottenPassword = async (req, res) => {
  const { email } = req.body;

  const userPass = await Veterinary.findOne({ email });

  if (!userPass) {
    const error = new Error('El usuario no existe');
    res.status(403).json({ msg: error.message });
  }

  try {
    userPass.token = generateId();
    await user.save();
    res.json({ msg: 'Hemos enviado un email con las instrucciones' });
  } catch (err) {
    res.json({ msg: err });
  }
};

const verifyToken = async (req, res) => {
  const { token } = req.params;

  const validToken = await Veterinary.findOne({ token });

  if (validToken) {
    res.json({ msg: 'Token válido y el usuario existe' });
  } else {
    const error = new Error('Token no válido');
    res.status(400).json({ msg: error.message });
  }
};

const newPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  const veterinary = await Veterinary.findOne({ token });

  if (!veterinary) {
    const error = new Error('Hubo un error');
    res.status(400).json({ msg: error.message });
  }

  try {
    veterinary.token = null;
    veterinary.password = password;
    await veterinary.save();
    res.json({ msg: 'Password modificado correctamente' });
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};

export {
  register,
  profile,
  confirm,
  authenticate,
  forgottenPassword,
  verifyToken,
  newPassword,
};
