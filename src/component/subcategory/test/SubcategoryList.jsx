import React from "react";
import SubcategoryItem from "./SubcategoryItem";
import { Grid, Typography } from "@mui/material";

const containerStyle = {
  alignItems: "center",
  justifyContent: "center",
  padding: "8px",
  width: "1630px",
  height: "80px"
};

const columnHeaderStyle = {
  fontWeight: "bold"
};

const SubcategoryList = ({
    subcategories
}) => {

  return (
    <>
      <Grid container style={containerStyle} spacing={2}>
        <Grid item xs={3}>
          <Typography variant="body1" style={columnHeaderStyle}>
            ID
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" style={columnHeaderStyle}>
            Назва
          </Typography>
        </Grid>
        {/* <Grid item xs={2}>
          <Typography variant="body1" style={columnHeaderStyle}>
            Дата народження
          </Typography>
        </Grid>
      </Grid>
      <Grid container style={containerStyle} spacing={2}>
        <Grid item xs={3}>
          <Typography variant="body1" style={columnHeaderStyle}>
            Адрес проживання
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" style={columnHeaderStyle}>
            Адрес реєстрації
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography variant="body1" style={columnHeaderStyle}>
            Паспорт
          </Typography>
        </Grid> */}
        <Grid item xs={5}>
        </Grid>
      </Grid>
      <div className="page-style">
        {subcategories && subcategories.map((item, key) => (
          <div key={key}>
            <SubcategoryItem
              key={item.id}
              subcategory={item}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SubcategoryList;
