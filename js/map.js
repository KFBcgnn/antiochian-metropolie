// ================================================
// Interactive Map - Leaflet.js
// ================================================

document.addEventListener('DOMContentLoaded', function() {
  
  // Check if map element exists
  const mapElement = document.getElementById('map');
  if (!mapElement) return;
  
  // ===== Initialize Map =====
  // Center on Germany
  const map = L.map('map').setView([51.1657, 10.4515], 6);
  
  // Add OpenStreetMap tiles
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 18,
  }).addTo(map);
  
  // ===== Custom Icon (Burgundy Cross) =====
  const churchIcon = L.divIcon({
    className: 'custom-church-marker',
    html: `
      <div style="
        background-color: #7a0d0d;
        color: white;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        font-weight: bold;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        border: 3px solid white;
      ">☦</div>
    `,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18]
  });
  
  // ===== Church Data =====
  const churches = [
    {
      name: 'St. Georg München',
      city: 'München',
      state: 'Bayern',
      country: 'deutschland',
      lat: 48.1351,
      lng: 11.5820,
      priest: 'Pfarrer Johannes Müller',
      chairman: 'Andreas Schmidt',
      address: 'Musterstraße 10, 80331 München',
      services: 'Sonntag 10:00 Uhr - Göttliche Liturgie',
      phone: '+49 89 123456',
      email: 'muenchen@antiochian-metropolie.de'
    },
    {
      name: 'Hl. Kreuz Berlin',
      city: 'Berlin',
      state: 'Berlin',
      country: 'deutschland',
      lat: 52.5200,
      lng: 13.4050,
      priest: 'Pfarrer Michael Wagner',
      chairman: 'Thomas Becker',
      address: 'Kirchstraße 25, 10115 Berlin',
      services: 'Sonntag 09:00 Uhr - Göttliche Liturgie',
      phone: '+49 30 654321',
      email: 'berlin@antiochian-metropolie.de'
    },
    {
      name: 'St. Johannes Köln',
      city: 'Köln',
      state: 'Nordrhein-Westfalen',
      country: 'deutschland',
      lat: 50.9375,
      lng: 6.9603,
      priest: 'Pfarrer Stefan Hoffmann',
      chairman: 'Martin Koch',
      address: 'Domstraße 42, 50667 Köln',
      services: 'Sonntag 10:30 Uhr - Göttliche Liturgie',
      phone: '+49 221 987654',
      email: 'koeln@antiochian-metropolie.de'
    },
    {
      name: 'Hl. Dimitrios Frankfurt',
      city: 'Frankfurt',
      state: 'Hessen',
      country: 'deutschland',
      lat: 50.1109,
      lng: 8.6821,
      priest: 'Pfarrer Daniel Richter',
      chairman: 'Frank Weber',
      address: 'Mainzer Straße 88, 60329 Frankfurt',
      services: 'Samstag 18:00 Uhr - Vesper<br>Sonntag 10:00 Uhr - Göttliche Liturgie',
      phone: '+49 69 456789',
      email: 'frankfurt@antiochian-metropolie.de'
    },
    {
      name: 'St. Maria Stuttgart',
      city: 'Stuttgart',
      state: 'Baden-Württemberg',
      country: 'deutschland',
      lat: 48.7758,
      lng: 9.1829,
      priest: 'Pfarrer Peter Schneider',
      chairman: 'Klaus Zimmermann',
      address: 'Königstraße 17, 70173 Stuttgart',
      services: 'Sonntag 10:00 Uhr - Göttliche Liturgie',
      phone: '+49 711 234567',
      email: 'stuttgart@antiochian-metropolie.de'
    },
    {
      name: 'St. Nikolaus Wien',
      city: 'Wien',
      state: 'Wien',
      country: 'oesterreich',
      lat: 48.2082,
      lng: 16.3738,
      priest: 'Pfarrer Alexander Fischer',
      chairman: 'Johann Huber',
      address: 'Stephansplatz 3, 1010 Wien',
      services: 'Sonntag 09:30 Uhr - Göttliche Liturgie',
      phone: '+43 1 123456',
      email: 'wien@antiochian-metropolie.at'
    },
    {
      name: 'St. Antonius Amsterdam',
      city: 'Amsterdam',
      state: 'Noord-Holland',
      country: 'niederlande',
      lat: 52.3676,
      lng: 4.9041,
      priest: 'Pfarrer Christoph van Berg',
      chairman: 'Jan de Vries',
      address: 'Damstraat 15, 1012 Amsterdam',
      services: 'Zondag 11:00 uur - Goddelijke Liturgie',
      phone: '+31 20 654321',
      email: 'amsterdam@antiochian-metropolie.nl'
    },
    {
      name: 'St. Georg Hamburg',
      city: 'Hamburg',
      state: 'Hamburg',
      country: 'deutschland',
      lat: 53.5511,
      lng: 9.9937,
      priest: 'Pfarrer Matthias Schröder',
      chairman: 'Hans Meyer',
      address: 'Mönckebergstraße 7, 20095 Hamburg',
      services: 'Sonntag 10:00 Uhr - Göttliche Liturgie',
      phone: '+49 40 789012',
      email: 'hamburg@antiochian-metropolie.de'
    },
    {
      name: 'Hl. Johannes Nürnberg',
      city: 'Nürnberg',
      state: 'Bayern',
      country: 'deutschland',
      lat: 49.4521,
      lng: 11.0767,
      priest: 'Pfarrer Simon Braun',
      chairman: 'Wolfgang Schulz',
      address: 'Königstraße 80, 90402 Nürnberg',
      services: 'Sonntag 09:30 Uhr - Göttliche Liturgie',
      phone: '+49 911 345678',
      email: 'nuernberg@antiochian-metropolie.de'
    }
  ];
  
  // ===== Add Markers to Map =====
  const markers = [];
  
  churches.forEach(church => {
    const marker = L.marker([church.lat, church.lng], { icon: churchIcon })
      .addTo(map)
      .bindPopup(`
        <div style="font-family: 'Inter', sans-serif; min-width: 250px;">
          <h3 style="color: #7a0d0d; font-family: 'Lora', serif; margin-bottom: 10px; font-size: 1.1rem;">
            ${church.name}
          </h3>
          <p style="margin: 5px 0; font-size: 0.9rem;">
            <strong>📍 Adresse:</strong><br>${church.address}
          </p>
          <p style="margin: 5px 0; font-size: 0.9rem;">
            <strong>👨‍🦳 Priester:</strong> ${church.priest}
          </p>
          <p style="margin: 5px 0; font-size: 0.9rem;">
            <strong>👤 Vorsitzender:</strong> ${church.chairman}
          </p>
          <p style="margin: 5px 0; font-size: 0.9rem;">
            <strong>🕐 Gottesdienste:</strong><br>${church.services}
          </p>
          <p style="margin: 5px 0; font-size: 0.9rem;">
            <strong>📞 Telefon:</strong> ${church.phone}
          </p>
          <p style="margin: 5px 0; font-size: 0.9rem;">
            <strong>✉️ E-Mail:</strong> <a href="mailto:${church.email}">${church.email}</a>
          </p>
        </div>
      `);
    
    // Store marker with church data
    marker.churchData = church;
    markers.push(marker);
  });
  
  // ===== Populate Church List =====
  const churchList = document.getElementById('churchList');
  if (churchList) {
    churchList.innerHTML = '';
    
    churches.forEach((church, index) => {
      const li = document.createElement('li');
      li.className = 'church-item';
      li.innerHTML = `
        <h4>${church.name}</h4>
        <p>${church.city}, ${church.state}</p>
      `;
      
      // Click to zoom to marker
      li.addEventListener('click', function() {
        map.setView([church.lat, church.lng], 13);
        markers[index].openPopup();
      });
      
      churchList.appendChild(li);
    });
  }
  
  // ===== Filter Functionality =====
  const filterCountry = document.getElementById('filterCountry');
  const filterState = document.getElementById('filterState');
  
  function filterChurches() {
    const selectedCountry = filterCountry ? filterCountry.value : '';
    const selectedState = filterState ? filterState.value : '';
    
    // Filter markers
    markers.forEach(marker => {
      const church = marker.churchData;
      let show = true;
      
      if (selectedCountry && church.country !== selectedCountry) {
        show = false;
      }
      
      if (selectedState && church.state.toLowerCase() !== selectedState) {
        show = false;
      }
      
      if (show) {
        marker.addTo(map);
      } else {
        map.removeLayer(marker);
      }
    });
    
    // Filter list
    if (churchList) {
      const items = churchList.querySelectorAll('.church-item');
      churches.forEach((church, index) => {
        let show = true;
        
        if (selectedCountry && church.country !== selectedCountry) {
          show = false;
        }
        
        if (selectedState && church.state.toLowerCase() !== selectedState) {
          show = false;
        }
        
        items[index].style.display = show ? 'block' : 'none';
      });
    }
    
    // Adjust map bounds to visible markers
    const visibleMarkers = markers.filter(m => map.hasLayer(m));
    if (visibleMarkers.length > 0) {
      const group = L.featureGroup(visibleMarkers);
      map.fitBounds(group.getBounds(), { padding: [50, 50] });
    }
  }
  
  if (filterCountry) {
    filterCountry.addEventListener('change', filterChurches);
  }
  
  if (filterState) {
    filterState.addEventListener('change', function() {
      filterChurches();
    });
    
    // Update state options based on country
    if (filterCountry) {
      filterCountry.addEventListener('change', function() {
        const country = this.value;
        
        // Clear current state options
        filterState.innerHTML = '<option value="">Alle Regionen</option>';
        
        // Add relevant states
        const states = new Set();
        churches.forEach(church => {
          if (!country || church.country === country) {
            states.add(church.state);
          }
        });
        
        Array.from(states).sort().forEach(state => {
          const option = document.createElement('option');
          option.value = state.toLowerCase();
          option.textContent = state;
          filterState.appendChild(option);
        });
      });
    }
  }
  
  // ===== Responsive: Adjust map on window resize =====
  window.addEventListener('resize', function() {
    setTimeout(function() {
      map.invalidateSize();
    }, 100);
  });
  
  console.log('🗺️ Interactive map initialized with', churches.length, 'locations');
});

