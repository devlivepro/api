const token = localStorage.getItem('token');
if (!token) {
  window.location.href = '/';
}

document.getElementById('logout-button').addEventListener('click', () => {
  logout();
});

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

document.getElementById('modify-catway-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('modifyCatwayId').value;
  const newCatwayState = document.getElementById('newCatwayState').value;

  const response = await fetch(`/api/catways/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ catwayState: newCatwayState })
  });

  const data = await response.json();
  if (response.ok) {
    alert('Catway modifié avec succès !');
    loadCatways();
  } else {
    alert(data.error);
  }
});

document.getElementById('delete-catway-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = document.getElementById('deleteCatwayId').value;

  const response = await fetch(`/api/catways/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.ok) {
    alert('Catway supprimé avec succès !');
    loadCatways();
  } else {
    const data = await response.json();
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
    item.textContent = `ID: ${catway._id}, Numéro: ${catway.catwayNumber}, Type: ${catway.type}, État: ${catway.catwayState}`;
    list.appendChild(item);
  });
}

async function loadUser() {
  const response = await fetch('/api/users/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (response.ok) {
    const user = await response.json();
    document.getElementById('user-name').textContent = user.name;
  } else {
    console.error('Failed to load user data');
  }
}

function logout() {
  localStorage.removeItem('token');
  window.location.href = '/';
}

// Load catways and user info when the page loads
loadCatways();
loadUser();