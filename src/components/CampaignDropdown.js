import { useEffect, useState } from 'react';
import { getCampaigns } from '../api';

function CampaignDropdown({ onSelect }) {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState('');

  useEffect(() => {
    getCampaigns().then((data) => {
      console.log('API response:', data); // Check the structure of the data here
      if (data) {
        setCampaigns(data);
        console.log('Campaigns successfully loaded:', data); // Print to stdout on success
      }
      setLoading(false);
    }).catch(error => {
      console.error('Error loading campaigns:', error); // Handle error and print to stdout
      setLoading(false);
    });
  }, []);

  const handleChange = (event) => {
    const selectedId = event.target.value;
    setSelectedCampaign(selectedId);
    onSelect(selectedId); 
  };

  return (
    <div>
      <label>Select a Campaign:</label>
      {loading ? (
        <p>Loading campaigns...</p>
      ) : (
        <select value={selectedCampaign} onChange={handleChange}>
          <option value="">-- Choose a campaign --</option>
          {campaigns.map((c) => (
            <option key={c.id} value={c.id}>
              {c.title}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default CampaignDropdown;

