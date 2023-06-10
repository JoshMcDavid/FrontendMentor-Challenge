
function trackLocationFromInput() 
{
  const ipAddressInput = document.querySelector('.input_ip');
  const ipAddress = ipAddressInput.value.trim();
  if (ipAddress === '') 
  {
    alert('Please enter an IP address.');
  }
    else if (ipAddress !== '') 
    {
      trackLocation(ipAddress)
      .then((location) => {
        getLocationInfo(location);
      })
      .catch((error) => {
        console.error('Error retrieving location:', error);
      });
    }
}

async function trackLocation(ipAddress) 
{
  const apiKey = NoDCjn46pTXAu5BavPpKLo6MS8w91;
  const url = `https://geo.ipify.org/api/v2/country?apiKey=${apiKey}&ipAddress=${ipAddress}`;


  try {
    const response = await fetch(url);
    const data = await response.json();

    const location = {
      ipAddress: data.ip,
      timezone: data.timezone,
      isp: data.isp,
      country: data.country_name,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
    };

    return location;
  } catch (error) {
    throw new Error('Error retrieving location');
  }
}

function getLocationInfo(location) 
{
  const ipAddressElement = document.querySelector('.ip_result');
  const locationElement = document.querySelector('.user-location');
  const timezoneElement = document.querySelector('.user-timezone');
  const ispElement = document.querySelector('.user-service-value');

  ipAddressElement.textContent = location.ipAddress;
  locationElement.textContent = `${location.city}, ${location.country}`;
  timezoneElement.textContent = location.timezone;
  ispElement.textContent = location.isp;
  
}

const submitButton = document.querySelector('.btn');
submitButton.addEventListener('click', trackLocationFromInput);