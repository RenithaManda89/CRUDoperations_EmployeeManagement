import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', salary: '', date: '', status: true });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        if (!response.ok) throw new Error('Failed to fetch employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployees();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editing ? 'PUT' : 'POST';
      const url = editing ? '/api/employees' : '/api/employees';
      const body = JSON.stringify({ ...form, _id: editing?._id });
      const response = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body });

      if (!response.ok) throw new Error('Failed to save employee');
      
      const result = await response.json();
      if (editing) {
        setEmployees(employees.map(emp => emp._id === result._id ? result : emp));
        setEditing(null);
      } else {
        setEmployees([...employees, result]);
      }
      setForm({ name: '', email: '', salary: '', date: '', status: true });
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (employee) => {
    setForm(employee);
    setEditing(employee);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/employees', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ _id: id })
      });

      if (!response.ok) throw new Error('Failed to delete employee');
      
      setEmployees(employees.filter(emp => emp._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <h1 >Employee Management System</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>{editing ? 'Edit Employee' : 'Add Employee'}</h2>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className={styles.input}
        />
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className={styles.input}
        />
        <input
          type="number"
          name="salary"
          value={form.salary}
          onChange={handleChange}
          placeholder="Salary"
          required
          className={styles.input}
        />
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          placeholder="Date"
          required
          className={styles.input}
        />
        <label>
          <input
            type="checkbox"
            name="status"
            checked={form.status}
            onChange={handleChange}
            className={styles.checkbox}
          />
          Active
        </label>
        <button type="submit" className={styles.button}>
          {editing ? 'Update Employee' : 'Add Employee'}
        </button>
      </form>
      <div className={styles.list}>
        <h2>Employee List</h2>
        {employees.length > 0 ? (
          <ul>
            {employees.map((employee) => (
              <li key={employee._id} className={styles.listItem}>
                <div>
                  <strong>Name:</strong> {employee.name} <br />
                  <strong>Email:</strong> {employee.email} <br />
                  <strong>Salary:</strong> {employee.salary} <br />
                  <strong>Date:</strong> {new Date(employee.date).toLocaleDateString()} <br />
                  <strong>Status:</strong> {employee.status ? 'Active' : 'Inactive'}
                </div>
                <div>
                  <button onClick={() => handleEdit(employee)} className={styles.editButton}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(employee._id)} className={styles.deleteButton}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
