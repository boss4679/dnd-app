import React, { useState } from 'react';
import logo from './logo.svg';
import CampaignDropdown from './components/CampaignDropdown';
import { ApiCaller } from './components/ApiCaller'; // Import the API function to handle data submission
import { useNavigate } from 'react-router-dom';

function MainPage() {
  // State variables to track form inputs and submission status
  const [selectedOption, setSelectedOption] = useState('campaign'); // Tracks which input category (campaign, session, etc.) is selected
  const [title, setTitle] = useState(''); // The title input field value (e.g., campaign name)
  const [description, setDescription] = useState(''); // The description input field value (e.g., campaign description)
  const [responseMessage, setResponseMessage] = useState(''); // Response message after form submission (success or error)
  const [campaign_id, setCampaignID] = useState(''); // The selected campaign ID
  const navigate = useNavigate(); // For navigating to other pages (e.g., the saved data page)

  // Handles form submission when the user clicks the submit button
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevents default form submission behavior (page reload)
  
    const data = {
      title,
      description,
      campaign_id,
    };
  
    try {
      // Call the API to create a new item (session, character, etc.) based on the selected category
      const result = await ApiCaller(selectedOption, data);
      setResponseMessage(`Success! ${selectedOption} created with ID: ${result.id}`); // Success message
  
      // Clear the input fields after successful submission
      setTitle(''); 
      setDescription('');
      setCampaignID('');
  
    } catch (error) {
      setResponseMessage(`Error: ${error.message}`); // Display error message if the API call fails
    }
  };

  // Navigate to the 'Hi' page when the button is clicked
  const goToHiPage = () => {
    navigate('/hi'); // Navigate to the "/hi" route (e.g., page showing saved data)
  };

  return (
    <div className="Default">
      <div>
        <h1 className="dnd-header">D&D Tracker</h1> {/* Main header for the page */}
      </div>
      <header className="logo">
        <img src={logo} className="App-logo" alt="logo" /> {/* Logo section */}
      </header>

      {/* Dropdown for selecting the input category (Campaign, Session, Character, Location) */}
      <div className="dropdown-container">
        <label htmlFor="dropdown">Select input type:</label>
        <select
          id="dropdown"
          name="options"
          value={selectedOption} // Bind the selected category to state
          onChange={(category) => {
            setSelectedOption(category.target.value); // Update the selected option (category)
            // If 'campaign' is selected, reset campaign ID to 'None'
            if (category.target.value === "campaign") {
              setCampaignID("None");
            }
          }} 
        >
          <option value="campaign">Campaign</option>
          <option value="session">Session</option>
          <option value="character">Character</option>
          <option value="location">Location</option>
        </select>
      </div>

      {/* Show campaign dropdown if selected category is not 'campaign' */}
      <div className="flex-container">
        {selectedOption !== 'campaign' && (
          <div className="campaign-dropdown">
            <h1>My Campaigns</h1>
            {/* CampaignDropdown component to select an existing campaign */}
            <CampaignDropdown 
              onSelect={(campaign_id) => {
                setCampaignID(campaign_id); // Set the selected campaign ID
                console.log('Selected Campaign ID:', campaign_id); // Log the selected campaign ID for debugging
              }} 
            />
          </div>
        )}

        {/* Input section for the title of the selected category */}
        <div className={`input-section ${selectedOption !== 'campaign' ? 'custom-style' : ''}`}> 
          <label htmlFor="description" className="input-label">
            {/* Dynamically display label based on selected category */}
            {selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1)} Name:
          </label>
          <input
            type="text"
            placeholder={`Enter ${selectedOption} name`} // Placeholder dynamically set based on selected category
            className="campaign-input"
            value={title} // Bind the title input field to state
            onChange={(title) => setTitle(title.target.value)} // Update the title state on input change
          />
        </div>
      </div>

      {/* Input section for the description */}
      <div className="input-container">
        <textarea
          id="description"
          placeholder="Enter campaign description" // Placeholder for the description
          required
          value={description} // Bind the description input field to state
          onChange={(description) => setDescription(description.target.value)} // Update the description state on input change
        ></textarea>

        {/* Submit button to trigger the form submission */}
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>

      {/* Button to navigate to the "Hi" page for viewing saved data */}
      <button className="top-right-button" onClick={goToHiPage}>View Saved Data</button> 

      {/* Display the response message (success or error) after submission */}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

export default MainPage;
