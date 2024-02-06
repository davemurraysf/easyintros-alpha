import Papa from "papaparse";

// Function to parse CSV headers from a file
export function parseCsvHeaders(file, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      const lines = content.split(/\r\n|\n/);
      if (lines.length > 0) {
        const headers = lines[0].split(",");
        callback(headers);
      }
    };
    reader.readAsText(file);
  }
  

  export function parseCsvData(file, fieldMappings, callback) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      Papa.parse(content, {
        header: true, // Treat the first row as headers
        skipEmptyLines: true,
        complete: (result) => {
          const { data, errors } = result;
          if (errors.length > 0) {
            console.error("CSV parsing errors:", errors);
            return; // Handle parsing errors here
          }
  
          if (data.length === 0) {
            console.error("No data found in the CSV file.");
            return; // Handle empty CSV here
          }
  
          // Log CSV data to check if it's parsed correctly
          console.log("Parsed CSV Data:", data);
  
          const mappedData = data.map((rowData) => {
            const newLead = {};
            for (const header of Object.keys(rowData)) {
              const mappedField = fieldMappings[header];
              if (mappedField) {
                newLead[mappedField] = rowData[header];
              }
            }
            //console.log("Parsed CSV lead:", newLead);
            return newLead;
          });
          console.log("mapped CSV lead:", mappedData);
          callback(mappedData);
        },
      });
    };
    reader.readAsText(file);
  }
