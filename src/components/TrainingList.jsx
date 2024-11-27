
import React, { useState } from "react";
import moment from "moment";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddTraining from "./AddTraining";

export default function TrainingList() {
  const [trainings, setTrainings] = useState([]);
  const gridRef = React.useRef();
  const [msg, setMsg] = useState("");
  const [open, setOpen] = useState(false);

  const addTraining = (training) => {
    console.log("TrainingList", training);
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(training),
    }).then((response) => {
      if (response.ok) {
        fetchTrainings();
      } else if (!training.customer) {
        alert("Failed to add training. Please try again later.");
        console.log(training);
      }
    });
  };

  

  const deleteTraining = (link) => {

    

    console.log("link", link);
    
    if (window.confirm("Are you sure?")) {
      fetch(link, { method: "DELETE" })
        .then((response) => {
          if (response.ok) {
            setMsg("Training deleted");
            setOpen(true);
            fetchTrainings();
          } else {
            alert("Something went wrong");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const fetchTrainings = () => {
    fetch("https://customer-rest-service-frontend-personaltrainer.2.rahtiapp.fi/api/trainings")
      .then((response) => response.json())
      .then((responseData) => {
        const trainingsCustomer = responseData._embedded.trainings.map((training) => {
            const customerUrl = training._links.customer.href;

            return fetch(customerUrl)
                .then((customerResponse) => customerResponse.json())
                .then((customerData) => ({
                    ...training,
                    customer: customerData
                }));
        });

        Promise.all(trainingsCustomer)
            .then((trainingsCustomerData) => {
                setTrainings(trainingsCustomerData);
            })
      .catch((err) => console.error('Error fetching customer data:', err));
    })
    .catch((err) => console.error('Error fetching trainings:', err));
  };
  

  React.useEffect(() => {
    fetchTrainings();
  }, []);

  const columns = [
    {
      field: "date",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
      cellRenderer: (params) => {
        const formattedDate = moment
          .utc(params.value)
          .format("DD.MM.YYYY HH:mm");
        return formattedDate;
      },
    },

    {
      field: "duration",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      field: "activity",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
    },
    {
      headerName: "Customer",
      sortable: true,
      filter: true,
      floatingFilter: true,
      suppressMenu: true,
      valueGetter: (params) => {
        const customer = params.data.customer;
        return `${customer.firstname} ${customer.lastname}`;
    }
    },
    {
      headerName: "",
      width: 400,
      field: "id",
      cellRenderer: (params) => {
        return (
          <Button onClick={() => deleteTraining(params.data._links.self.href)} color="error">
            <DeleteIcon />
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <Stack spacing={2} direction="row">
        <AddTraining addTraining={addTraining} trainings={trainings} />
      </Stack>

      <div
        className="ag-theme-material"
        style={{ height: "700px", width: "2000px", margin: "auto" }}
      >
        <AgGridReact
          rowData={trainings}
          ref={gridRef}
          rowSelection="single"
          onGridReady={(params) => (gridRef.current = params.api)}
          columnDefs={columns}
          pagination={true}
        ></AgGridReact>
      </div>
    </div>
  );
}
