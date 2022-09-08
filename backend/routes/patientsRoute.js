import express from 'express';
import {
  addPatient,
  getPatients,
  getPatient,
  updatePatient,
  deletePatient,
} from '../controllers/patientsController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(checkAuth, addPatient).get(getPatients);

router
  .route('/:id')
  .get(checkAuth, getPatient)
  .put(checkAuth, updatePatient)
  .delete(checkAuth, deletePatient);

export default router;
