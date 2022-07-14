import React, { useState, useEffect } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { makeStyles } from "@mui/styles";
import { Typography } from "@mui/material";

import moment from "moment";

import data from "../interviewRequests.json";

interface DetailsTableProps {
  search: string;
  checked: boolean;
}
interface DataProps {
  image: string;
  candidate: string;
  role: string;
  salary: number;
  last_comms: {
    unread: boolean;
    description: string;
    date_time: string;
  };
  sent_by: string;
  status: string;
  archived: boolean;
}
const DetailsTable: React.FC<DetailsTableProps> = ({
  search,
  checked,
}: DetailsTableProps) => {
  const classes = useStyles();
  const [mainData, setMainData] = useState<DataProps[]>(data);
  const [filteredData, setFilteredData] = useState<DataProps[]>(data);

  function formatTime(old_date: any) {
    let now_date = new Date();

    let days_difference_result = moment(now_date).diff(
      moment(old_date),
      "days"
    );
    if (days_difference_result >= 1) {
      return moment(old_date).format("DD/MM//YYYY");
    } else if (moment(now_date).isSame(old_date, "day")) {
      return moment(old_date).format("hh:mm a");
    } else {
      return "Yesterday";
    }
  }
  const handleArchiveChange = (test_candidate: string) => {
    // change main data
    let filteredResults: DataProps[] = [];
    mainData.forEach((item) => {
      if (item.candidate === test_candidate) {
        let newItem = {
          ...item,
          archived: !item.archived,
        };
        filteredResults.push(newItem);
      } else {
        filteredResults.push(item);
      }
    });
    setMainData(filteredResults);
  };
  //
  useEffect(() => {
    if (search !== "" && checked) {
      setFilteredData(
        mainData.filter((item) =>
          item.candidate.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else if (search !== "" && !checked) {
      setFilteredData(
        mainData.filter(
          (item) =>
            item.candidate.toLowerCase().includes(search.toLowerCase()) &&
            !item.archived
        )
      );
    } else if (!search && !checked) {
      setFilteredData(mainData.filter((item) => !item.archived));
    } else {
      setFilteredData(mainData);
    }
  }, [search, checked, mainData]);
  return (
    <>
      <div className={classes.request}>
        <Typography className={classes.requestText}>
          {filteredData.length} interview requests
        </Typography>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ width: "100%" }} aria-label="customized table">
          <TableHead>
            <TableRow style={{ backgroundColor: "#F9FAFB" }}>
              <TableCell>
                <span className={classes.headerText}>Candidate</span>
              </TableCell>
              <TableCell>
                <span className={classes.headerText}>Role</span>
              </TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    verticalAlign: "center",
                  }}
                >
                  <span className={classes.headerText}>
                    Last&nbsp;Communication
                  </span>
                  <img
                    alt="comms"
                    src="/assets/filter_icon.png"
                    style={{
                      width: 5,
                      height: 10,
                      marginLeft: 6,
                      marginTop: 7,
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>
                <span className={classes.headerText}>Salary</span>
              </TableCell>
              <TableCell>
                <span className={classes.headerText}>Sent&nbsp;by</span>
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData &&
              filteredData.map((row) => (
                <TableRow
                  key={row.candidate}
                  style={
                    row.archived === true
                      ? { backgroundColor: "#FFFFFF" }
                      : { backgroundColor: "#F9FAFB" }
                  }
                >
                  <TableCell>
                    <Typography
                      align="left"
                      className={classes.candidateContainer}
                    >
                      {" "}
                      <img
                        alt="human"
                        src={row.image}
                        className={classes.statusImage}
                      />
                      <span
                        style={{ marginTop: 7 }}
                        className={classes.tableText}
                      >
                        {row.candidate}
                      </span>
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <span className={classes.tableText}>{row.role}</span>
                  </TableCell>
                  <TableCell>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <div
                        className={
                          row.last_comms.unread
                            ? classes.markerPresentImage
                            : classes.markerAbsentImage
                        }
                      ></div>
                      <span
                        style={{ marginTop: 3 }}
                        className={
                          row.last_comms.unread
                            ? classes.repliedTextUnread
                            : classes.repliedTextRead
                        }
                      >
                        {row.last_comms.description}
                      </span>
                      <span
                        className={classes.timeText}
                        style={{ marginLeft: 6, marginTop: 4 }}
                      >
                        {formatTime(row.last_comms.date_time)}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={classes.tableText}>{row.salary}</span>
                  </TableCell>
                  <TableCell>
                    <span className={classes.tableText}>{row.sent_by}</span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={classes.archiveText}
                      onClick={(e) => handleArchiveChange(row.candidate)}
                    >
                      {row.archived ? "archive" : "unarchive"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const useStyles = makeStyles({
  tableText: {
    color: "#7C7C80",
    fontFamily: "Proxima Nova Font",
    fontSize: 12,
  },
  archiveText: {
    cursor: "pointer",
    color: "#5EA5EE",
    fontFamily: "Proxima Nova Font",
    fontSize: 12,
  },
  unArchive: {
    backgroundColor: "#F9FAFB",
  },
  repliedTextUnread: {
    fontFamily: "Proxima Nova Font",
    fontWeight: "400",
    fontSize: 12,
    color: "#212121",
  },
  repliedTextRead: {
    fontFamily: "Proxima Nova Font",
    fontWeight: "400",
    fontSize: 12,
    color: "#7C7C80",
  },
  timeText: {
    fontFamily: "Proxima Nova Font",
    // fontWeight:"400",
    fontSize: 10,
    color: "#A6ACAF",
  },
  statusImage: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  candidateContainer: {
    display: "flex",
    flexDirection: "row",
    verticalAlign: "center",
  },
  markerPresentImage: {
    width: 8,
    height: 8,
    backgroundColor: "#34B96F",
    borderRadius: 4,
    marginRight: 6,
    marginTop: 6,
  },
  markerAbsentImage: {
    width: 8,
    height: 8,
    backgroundColor: "#FFFF",
    borderRadius: 4,
    marginRight: 6,
    marginTop: 6,
  },
  request: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 18,
    marginBottom: 8,
  },
  requestText: {
    fontFamily: "Proxima Nova Font",
    fontSize: 12,
    color: "#7C7C80",
  },
  headerText: {
    fontFamily: "Proxima Nova Font",
    fontSize: 12,
    color: "#343951",
  },
});

export default DetailsTable;
