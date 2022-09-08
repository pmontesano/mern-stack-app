import mongoose from 'mongoose';

const patientsSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    owner: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now(),
    },
    symptoms: {
      type: String,
      required: true,
    },
    veterinary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'veterinary',
    },
  },
  {
    timestamps: true,
  }
);

const Patients = mongoose.model('Patiens', patientsSchema);

export default Patients;
