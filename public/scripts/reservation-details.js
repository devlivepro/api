document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const reservationId = urlParams.get('id');
  
    fetch(`/api/reservations/${reservationId}`)
      .then(response => response.json())
      .then(data => {
        const reservationDetails = document.getElementById('reservation-details');
        reservationDetails.innerHTML = `
          <p>ID: ${data.id}</p>
          <p>Détails: ${data.details}</p>
          <p>Date: ${data.date}</p>
        `;
      })
      .catch(error => console.error('Error fetching reservation details:', error));
  });  