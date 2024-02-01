import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Additional imports for date and time picker, if you choose to use a library

const Booking = () => {
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [appointmentDetails, setAppointmentDetails] = useState({
    service: '',
    date: '',
    time: '',
    clientName: '',
    clientEmail: ''
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    axios.get('/api/services')
      .then(response => {
        setServices(response.data);
        setLoadingServices(false);
      })
      .catch(error => {
        console.error('Error fetching services:', error);
        setLoadingServices(false);
      });
  }, []);

  const validateForm = () => {
    if (!appointmentDetails.service || !appointmentDetails.date || 
        !appointmentDetails.time || !appointmentDetails.clientName || 
        !appointmentDetails.clientEmail) {
      setError('Please fill out all fields.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    axios.post('/api/appointments', appointmentDetails)
      .then(response => {
        setSuccessMessage('Appointment booked successfully!');
        setAppointmentDetails({
          service: '',
          date: '',
          time: '',
          clientName: '',
          clientEmail: ''
        });
      })
      .catch(error => {
        console.error('Error booking appointment:', error);
        setError('Error booking the appointment.');
      });
  };

  return (
    <div className="booking-form">
      <h1>Book an Appointment</h1>
      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}
      {loadingServices ? (
        <p>Loading services...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>
            Service:
            <select name='service' value={appointmentDetails.service} onChange={e => setAppointmentDetails({ ...appointmentDetails, service: e.target.value })}>
              <option value=''>Select a Service</option>
              {services.map(service => (
                <option key={service.id} value={service.id}>{service.name}</option>
              ))}
            </select>
          </label>
          <br />
          {/* Additional form fields for date, time, name, and email, potentially using a date and time picker library */}
          <button type='submit'>Book Appointment</button>
        </form>
      )}
    </div>
  );
};

export default Booking;
