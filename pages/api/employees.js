import dbConnect from '../../lib/dbConnect';
import Employee from '../../models/Employee';

export default async function handler(req, res) {
  await dbConnect();

  switch (req.method) {
    case 'GET':
      try {
        const employees = await Employee.find({});
        res.status(200).json(employees);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch employees' });
      }
      break;

    case 'POST':
      try {
        const { name, email, salary, date, status } = req.body;
        if (!name || !email || !salary || !date) {
          return res.status(400).json({ error: 'Missing required fields' });
        }
        const newEmployee = new Employee({ name, email, salary, date, status });
        await newEmployee.save();
        res.status(201).json(newEmployee);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create employee' });
      }
      break;

    case 'PUT':
      try {
        const { _id, name, email, salary, date, status } = req.body;
        if (!_id) {
          return res.status(400).json({ error: 'Missing employee ID' });
        }
        const updatedEmployee = await Employee.findByIdAndUpdate(
          _id,
          { name, email, salary, date, status },
          { new: true }
        );
        res.status(200).json(updatedEmployee);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update employee' });
      }
      break;

    case 'DELETE':
      try {
        const { _id } = req.body;
        if (!_id) {
          return res.status(400).json({ error: 'Missing employee ID' });
        }
        await Employee.findByIdAndDelete(_id);
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete employee' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
