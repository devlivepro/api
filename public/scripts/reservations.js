document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/reservations')
      .then(response => response.json())
      .then(data => {
        const reservationsList = document.getElementById('reservations-list');
        data.forEach(reservation => {
          const listItem = document.createElement('li');
          listItem.textContent = `Reservation ${reservation.id}: ${reservation.details}`;
          reservationsList.appendChild(listItem);
        });
      })
      .catch(error => console.error('Error fetching reservations:', error));
  });  