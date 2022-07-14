import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import Checkbox from "@mui/material/Checkbox";
import SearchIcon from "@mui/icons-material/Search";
import { TextField } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import { makeStyles } from "@mui/styles";

interface HeaderProps {
  background_color: string;
  header_type: "company" | "search";
  search?: string;
  onSearch?: (charactors: string) => void;
  checked?: boolean;
  onChecked?: (check: boolean) => void;
}
const Header: React.FC<HeaderProps> = ({
  background_color,
  header_type,
  onSearch,
  search,
  checked,
  onChecked,
}: HeaderProps) => {
  const classes = useStyles();
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    onSearch!(event.target.value);
  };
  const handleCheckedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChecked!(event.target.checked);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ bgcolor: background_color, width: "100%", height: 60 }}
      >
        <Toolbar style={{ height: "100%" }}>
          {header_type === "search" ? (
            <div className={classes.toolbarItems}>
              <TextField
                style={{ marginTop: 10 }}
                className={classes.text}
                variant="outlined"
                value={search}
                size="small"
                placeholder="Search"
                onChange={handleSearchChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />

              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  marginTop: 8,
                }}
              >
                <FormControl>
                  <Typography className={classes.showArchivedText}>
                    Show archived
                  </Typography>
                </FormControl>
                <Checkbox
                  checked={checked}
                  onChange={handleCheckedChange}
                  inputProps={{ "aria-label": "controlled" }}
                  icon={
                    <img
                      alt="imag"
                      src="/assets/tick_background.png"
                      className={classes.unCheckedIcon}
                    />
                  }
                  checkedIcon={
                    <img
                      alt="imag"
                      src="/assets/Icon.png"
                      className={classes.checkedIcon}
                    />
                  }
                />
              </div>
            </div>
          ) : (
            <img
              alt="imag"
              src="/assets/company_logo.png"
              style={{ marginLeft: "14%", width: 117 }}
            />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

const useStyles = makeStyles({
  showArchivedText: {
    fontFamily: "Proxima Nova Font",
    fontWeight: "400",
    fontSize: 14,
    color: "#7C7C80",
    marginRight: 3,
  },
  checkedIcon: {
    width: 20,
    height: 20,
    border: "1px solid #5EA5EE",
    backgroundColor: "#E4F0FC",
  },
  unCheckedIcon: {
    width: 20,
    height: 20,
    border: "1px solid #5EA5EE",
  },
  text: {
    width: 210,
    borderColor: "#E4EBEF",
    height: 40,
  },
  toolbarItems: {
    marginLeft: "14%",
    width: "72%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    verticalAlign: "center",
    height: "100%",
  },
});

export default Header;
