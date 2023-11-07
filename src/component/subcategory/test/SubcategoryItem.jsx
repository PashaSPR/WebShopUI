import React from "react";
import { Grid, Typography } from "@mui/material";

const containerStyle = {
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
  width: "1630px",
  height: "160px",
  backgroundColor: "#e3e3e3",
  borderRadius: "10px",
  marginBottom: "30px"
};

const SubcategoryItem = ({
    subcategory
}) => {

  return (
    <Grid container style={containerStyle} spacing={2}>
      <Grid item xs={3}>
        <Typography>{subcategory.id}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{subcategory.name}</Typography>
      </Grid>
      {/* <Grid item xs={2}>
        <Typography>
          {subcategory.user.birthday ? new Date(subcategory.user.birthday * 1000).toLocaleDateString() : ''}
        </Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{JSON.stringify(client.user.address)}</Typography>
      </Grid>
      <Grid item xs={3}>
        <Typography>{JSON.stringify(client.user.registration)}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography>{client.user.passport}</Typography>
      </Grid> */}
      <Grid item xs={5}>
        <Typography />
      </Grid>
    </Grid>
  );
};

export default SubcategoryItem;
