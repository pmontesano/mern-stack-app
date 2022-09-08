import jwt from 'jsonwebtoken';
import Veterinary from '../models/veterinary.js';

const checkAuth = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.veterinary = await Veterinary.findById(decode.id).select(
        '-password -token -confirm'
      );

      return next();
    } catch (err) {
      res.status(403).json({ msg: err.message });
    }
  }

  if (!token) {
    const err = new Error('Token inválido o inexistente');
    res.status(403).json({ msg: err.message });
  }

  next();
};

export default checkAuth;
