const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/';
}

document.getElementById('catway-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const catwayNumber = document.getElementById('catwayNumber').value;
  const type = document.getElementById('type').value;
  const catwayState = document.getElementById('catwayState').value;

  const response = await fetch('/api/catways', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ catwayNumber, type, catwayState })
  });

  const data = await response.json();
  if (response.ok) {
    alert('Catway ajouté avec succès !');
    loadCatways();
  } else {
    alert(data.error);
  }
});

async function loadCatways() {
  const response = await fetch('/api/catways', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  const data = await response.json();
  const list = document.getElementById('catways-list');
  list.innerHTML = '';
  data.forEach(catway => {
    const item = document.createElement('li');
    item.textContent = `Numéro: ${catway.catwayNumber}, Type: ${catway.type}, État: ${catway.catwayState}`;
    list.appendChild(item);
  });
}

loadCatways();