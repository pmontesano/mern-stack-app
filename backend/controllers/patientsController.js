import Patients from '../models/patients.js';

const addPatient = async (req, res) => {
  try {
    const patient = new Patients(req.body);
    patient.veterinary = req.veterinary._id;
    const patientSaved = await patient.save();
    res.json(patientSaved);
  } catch (err) {
    console.log(err);
  }
};
const getPatients = async (req, res) => {
  const patients = await Patients.find()
    .where('veterinary')
    .equals(req.veterinary);
  res.json(patients);
};

const getPatient = async (req, res) => {
  const { id } = req.params;
  const patient = await Patients.findById(id);

  console.log(patient);
};
const updatePatient = async (req, res) => {};
const deletePatient = async (req, res) => {};

export { addPatient, getPatients, getPatient, updatePatient, deletePatient };
