import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
// import Button from "@mui/material/Button";
import List from "@mui/material/List";
// import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
// import InboxIcon from "@mui/icons-material/MoveToInbox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import MailIcon from "@mui/icons-material/Mail";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { axiosGet } from "../services/querycalles";

function TemporaryDrawer() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const { isLoading, data, error, isSuccess }: UseQueryResult<any, any> =
    useQuery({
      queryKey: ["members"],
      queryFn: async (): Promise<any> => {
        const response = await axiosGet<any>(`/user/members`);
        return response.data;
      },
      refetchOnWindowFocus: false,
      // refetchOnMount: false,
      retry: 2,
      staleTime: 1000 * 60 * 50,
    });

  // console.log(data);

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {data &&
          Array.isArray(data.members) &&
          data.members.map((text: any, index: any) => (
            <ListItem key={text.id} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary={text.first_name} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
      {/* <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {data && data.members && data.members.length > 0 && (
        <>
          <span onClick={toggleDrawer(true)}>
            <MenuIcon />{" "}
          </span>
          <Drawer open={open} onClose={toggleDrawer(false)}>
            {DrawerList}
          </Drawer>
        </>
      )}
    </div>
  );
}

export default React.memo(TemporaryDrawer);
