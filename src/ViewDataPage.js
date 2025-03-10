import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './logo.svg';

function ViewDataPage() {
  // Initialize navigation and state variables
  const navigate = useNavigate(); // For navigating to the main page
  const [selectedCategory, setSelectedCategory] = useState(''); // The selected category (campaign, session, character, location)
  const [data, setData] = useState([]); // Holds the fetched data for the selected category
  const [loading, setLoading] = useState(false); // To indicate whether data is still being loaded

  // Function to navigate back to the main page
  const goBackToMainPage = () => {
    navigate('/');  // Navigate to the main page
  };

  // Fetch data based on the selected category
  const fetchData = async (category) => {
    setLoading(true); // Start loading
    let url = ''; // URL to fetch data from based on selected category

    // Determine the URL based on selected category
    switch (category) {
      case 'campaign':
        url = 'http://localhost:5000/campaigns';
        break;
      case 'session':
        url = 'http://localhost:5000/sessions';
        break;
      case 'character':
        url = 'http://localhost:5000/characters';
        break;
      case 'location':
        url = 'http://localhost:5000/locations';
        break;
      default:
        setLoading(false); // Stop loading if no valid category is selected
        return;
    }

    try {
      const response = await fetch(url); // Fetch data from the API
      const result = await response.json(); // Parse the response

      // If the category is session, character, or location, add the corresponding campaign data to each item
      if (category === 'session' || category === 'character' || category === 'location') {
        const campaigns = await fetch('http://localhost:5000/campaigns');
        const campaignData = await campaigns.json();

        // Enrich session/character/location items with the associated campaign name
        const enrichedData = result.map(item => {
          const campaign = campaignData.find(c => c.id === item.campaign_id);
          return { ...item, campaignName: campaign ? campaign.title : 'No campaign' };
        });

        setData(enrichedData); // Set the enriched data
      } else {
        setData(result); // Set the regular data for campaigns
      }

    } catch (error) {
      console.error('Error fetching data:', error); // Log any errors that occur
    } finally {
      setLoading(false); // Stop loading after data is fetched
    }
  };

  // Handle the category change in the dropdown
  const handleCategoryChange = (event) => {
    console.log('Selected category:', event.target.value); // Log the selected category
    setSelectedCategory(event.target.value); // Update the selected category
    fetchData(event.target.value); // Fetch the data based on the selected category

    // Reset the visibility of descriptions when switching categories
    setVisibleDescriptions({});
  };

  // State to track the visibility of descriptions for each item
  const [visibleDescriptions, setVisibleDescriptions] = useState({});

  // Toggle the visibility of a description for a particular item (expand/collapse)
  const toggleDescription = (id) => {
    setVisibleDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id] // Toggle the visibility for the item with the given ID
    }));
  };

  return (
    <div className="Default">
      <div>
        <h1 className="dnd-header">D&D Tracker</h1> {/* Main header */}
      </div>
      <header className="logo">
        <img src={logo} className="App-logo" alt="logo" /> {/* Logo */}
      </header>
      {/* Button to go back to the main page */}
      <button className="top-right-button" onClick={goBackToMainPage}>Back to Main Page</button>

      {/* Dropdown menu for selecting category */}
      <div className="dropdown-container">
        <label htmlFor="dropdown">View:</label>
        <select 
          id="dropdown"
          name="options"
          value={selectedCategory} // Bind the selected category to the state
          onChange={handleCategoryChange} // Trigger category change handler
        >
          <option value="">Select an Option</option>
          <option value="campaign">Campaign</option>
          <option value="session">Session</option>
          <option value="character">Character</option>
          <option value="location">Location</option>
        </select>
      </div>

      {/* Loading indicator */}
      {loading && <p>Loading...</p>}

      {/* Display Results Based on Selected Category */}
      <div>
        {selectedCategory && !loading && (
          <div>
            <h3>{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Data</h3>
            <ul>
              {/* Iterate over the fetched data and display each item */}
              {data.map((item, index) => (
                <li key={index}>
                  {/* Button to toggle the description visibility */}
                  <button onClick={() => toggleDescription(item.id)}>
                    {selectedCategory === 'campaign' && item.title}
                    {selectedCategory === 'session' && item.title}
                    {selectedCategory === 'character' && item.title}
                    {selectedCategory === 'location' && item.title}
                  </button>

                  {/* Show or hide the description based on the visibility state */}
                  {visibleDescriptions[item.id] && (
                    <div>
                      {/* Display the campaign name above the description */}
                      {selectedCategory !== 'campaign' && (
                        <p><strong>Campaign:</strong> {item.campaignName}</p>
                      )}

                      {/* Display specific description or role */}
                      <p>
                        {selectedCategory === 'campaign' && item.description}
                        {selectedCategory === 'session' && item.description}
                        {selectedCategory === 'character' && item.role}  {/* Assuming 'role' is part of the character */}
                        {selectedCategory === 'location' && item.description}
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewDataPage;


