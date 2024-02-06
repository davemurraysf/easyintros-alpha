import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Box,
  Typography,
  Grid,
} from "@mui/material";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import { saveUserLeads } from "../data/userleads";
import { parseCsvHeaders, parseCsvData } from "../data/upload"; 
import { getUserData } from "../data/auth";

const UploadLeadsPopup = ({ isOpen, onClose, onUpload }) => {
  const [csvFile, setCsvFile] = useState(null);
  const [csvHeaders, setCsvHeaders] = useState([]);
  const [fieldMappings, setFieldMappings] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [selectedHeaders, setSelectedHeaders] = useState([]);

  const userData = getUserData();
  const UserToken = userData.userToken;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCsvFile(file);
      // Reset field mappings when a new file is selected
      setFieldMappings({});
      setSelectedHeaders([]); // Reset selectedHeaders
      // Parse CSV headers using the utility function
      parseCsvHeaders(file, (headers) => {
        setCsvHeaders(headers);
      });
    }
  };

  const handleFieldMappingChange = (fieldName, selectedColumn) => {
    // Check if the selectedColumn has already been mapped to another header
    if (selectedHeaders.includes(selectedColumn)) {
      // You can display an error message or handle it in your UI logic
      // For now, we'll just ignore it
      return;
    }

    setSelectedHeaders((prevSelectedHeaders) => [
      ...prevSelectedHeaders,
      selectedColumn,
    ]);

    setFieldMappings((prevMappings) => {
      const updatedMappings = {
        ...prevMappings,
        [String(fieldName)]: selectedColumn,
      };
      //console.log("Field Mappings:", updatedMappings); // Add this line
      return updatedMappings;
    });
  };

  const handleUpload = () => {
    console.log("Field Mappings:", fieldMappings);
    setIsLoading(true);

    parseCsvData(csvFile, fieldMappings, (data) => {
      console.log("New Leads:", data); // Log new leads to the console for confirmation

      // Transform the data to match the desired format
      const transformedData = {
        leads: data,
      };

      // Perform CSV upload and data handling logic here
      if (csvFile) {
        // Save new leads to the userLeads.js file
        saveUserLeads(data); // Use `data` here instead of `newLeads`

        // Send the new leads to the API
        fetch("https://easyintros.bubbleapps.io/api/1.1/wf/postuserleads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + UserToken
          },
          body: JSON.stringify(transformedData), // Use the transformed data here
        })
          .then((response) => {
            if (response.ok) {
              // Handle API response here if needed
              console.log("Leads successfully sent to API.");
            } else {
              // Handle API error here if needed
              console.error("Error sending leads to API:", response.statusText);
            }
          })
          .catch((error) => {
            // Handle fetch error here if needed
            console.error("Fetch error:", error);
          });

        onUpload(csvFile, data); // Use `data` here instead of `newLeads`
      }
      setIsLoading(false);
    });
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Upload Leads</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: "none" }}
            id="csv-upload-input"
          />
          <label htmlFor="csv-upload-input">
            <Button
              variant="contained"
              color="primary"
              component="span"
              startIcon={<FileUploadOutlinedIcon />}
            >
              Upload CSV File
            </Button>
          </label>
        </Box>
        <br />
        {csvFile && (
          <>
            <Typography variant="subtitle1">
              Map CSV headers to database columns:
            </Typography>
            <Grid container spacing={2}>
              {csvHeaders.map((header, index) => (
                <Grid item xs={6} key={index}>
                  <FormControl fullWidth>
                    <InputLabel>{header}</InputLabel>
                    <Select
                      fullWidth
                      value={fieldMappings[header] || ""}
                      onChange={(e) =>
                        handleFieldMappingChange(header, e.target.value)
                      }
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      {/* Replace 'Database Field 1', 'Database Field 2', etc. with your actual field names */}
                      <MenuItem value="FirstName">
                        First Name
                      </MenuItem>
                      <MenuItem value="LastName">
                        Last Name
                      </MenuItem>
                      <MenuItem value="Instagram">
                        Instagram
                      </MenuItem>
                      <MenuItem value="Facebook">
                        Facebook
                      </MenuItem>
                      {/* Add more database field options as needed */}
                    </Select>
                  </FormControl>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary" disabled={isLoading}>
          Cancel
        </Button>
        <Button
          onClick={handleUpload}
          color="primary"
          disabled={isLoading || csvHeaders.length === 0}
        >
          Upload
          {isLoading && <CircularProgress size={24} />}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UploadLeadsPopup;
