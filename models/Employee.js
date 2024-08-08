import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  salary: { type: Number, required: true },
  date: { type: Date, required: true },
  status: { type: Boolean, default: true },
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
