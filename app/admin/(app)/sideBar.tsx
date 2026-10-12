import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
import SpaceDashboardOutlinedIcon from "@mui/icons-material/SpaceDashboardOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";

import {
  Box,
  Collapse,
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
type Props = {
  handleToggle: () => void;
  open: boolean;
  drawerWidth: string;
  isSmallScreen: boolean;
};

type MenuItemType = {
  heading?: string;
  type?: "list" | "menu";
  label: string;
  link?: string;
  icon: React.ReactNode;
  menuItems?: Record<string, string>[];
  isShow?: boolean;
};

const SideBar = ({ open, handleToggle, drawerWidth, isSmallScreen }: Props) => {
  const path = usePathname();
  const [openMenus, setOpenMenus] = React.useState<Record<string, boolean>>({});
  // const headings = []!;
  const headings = ["Core", "Administrative", "Others"];

  const items: MenuItemType[] = [
    {
      heading: "Core",
      label: "Dashboard",
      link: "/admin/dashboard",
      icon: <SpaceDashboardOutlinedIcon />,
    },

    {
      label: "Customers",
      link: "/admin/customers",
      icon: <SupervisorAccountOutlinedIcon />,
    },
    {
      heading: "Core",
      type: "menu",
      label: "Products",
      icon: <Inventory2OutlinedIcon />,

      menuItems: [
        {
          label: "Category",
          link: "/admin/categories",
        },
        {
          label: "Color",
          link: "/admin/categories",
        },
        {
          label: "Size",
          link: "/admin/categories",
        },
      ],
    },
    {
      heading: "Administrative",
      type: "menu",
      label: "Setting",
      icon: <SettingsSuggestOutlinedIcon />,

      menuItems: [
        {
          label: "Category",
          link: "/admin/categories",
        },
        {
          label: "Color",
          link: "/admin/categories",
        },
        {
          label: "Size",
          link: "/admin/categories",
        },
      ],
    },
  ];

  const menuContents = (item: MenuItemType) => {
    if (Object.hasOwn(item, "isShow") && !item.isShow) return null;

    if (item.type === "menu")
      return (
        <>
          <MenuItem
            selected={item.menuItems!.some((menuItem) =>
              path.includes(menuItem.link),
            )}
            onClick={() =>
              setOpenMenus((previous) => ({
                ...previous,
                [item.label]: !previous[item.label],
              }))
            }
            sx={styles.menuItem}
          >
            <ListItemIcon sx={styles.icon}>{item.icon}</ListItemIcon>
            <ListItemText sx={styles.itemText}>{item.label}</ListItemText>
            {openMenus[item.label] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </MenuItem>
          <Collapse in={openMenus[item.label]} timeout="auto" unmountOnExit>
            <MenuList>
              {item.menuItems!.map((menuItem) => (
                <Link
                  key={menuItem.label}
                  href={menuItem.link}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <MenuItem
                    selected={path.includes(menuItem.link)}
                    sx={{ ...styles.menuItem, pl: 4 }}
                  >
                    <ListItemText sx={styles.itemText}>
                      {menuItem.label}
                    </ListItemText>
                  </MenuItem>
                </Link>
              ))}
            </MenuList>
          </Collapse>
        </>
      );

    return (
      <Link
        href={item.link!}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <MenuItem
          selected={path.includes(item.link!)}
          sx={styles.menuItem}
          className="hlo<"
        >
          <ListItemIcon sx={styles.icon}>{item.icon}</ListItemIcon>
          <ListItemText sx={styles.itemText}>{item.label}</ListItemText>
        </MenuItem>
      </Link>
    );
  };

  const renderItems = (heading?: string) =>
    items
      .filter((item) =>
        heading === undefined
          ? true
          : item.heading
            ? item.heading === heading
            : heading === "" || (heading === "Others" && !item.heading),
      )
      .map((item) => (
        <React.Fragment key={item.label}>{menuContents(item)}</React.Fragment>
      ));

  return (
    <>
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        open={open}
        onClose={handleToggle}
      >
        <Box
          sx={{
            width: drawerWidth + "px",
            p: 1,
            boxSizing: "border-box",
          }}
        >
          <Toolbar />

          {headings.length > 0 ? (
            headings.map((heading) => (
              <React.Fragment key={heading}>
                <Stack direction="row" className="align-center" spacing={1}>
                  <Typography sx={styles.sectionHeading}>{heading}</Typography>
                  <Box sx={styles.divider} />
                </Stack>
                <MenuList>{renderItems(heading)}</MenuList>
              </React.Fragment>
            ))
          ) : (
            <MenuList>{renderItems()}</MenuList>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default SideBar;

const styles = {
  sectionHeading: {
    fontWeight: 800,
    fontSize: "12px",
    color: "secondary.dark",
    textTransform: "uppercase",
  },
  divider: {
    flexGrow: 1,
    borderTop: (theme) => `1px solid ${theme.palette.divider}`,
  },
  menuItem: {
    mb: 1,
    "&.Mui-selected": {
      borderLeft: "10px solid",
      borderColor: (theme) => theme.palette.primary.main,
      borderRadius: 2,
    },
  },
  icon: {
    "& .MuiSvgIcon-root": {
      color: "black",
    },
  },
  itemText: {
    "& .MuiTypography-root": {
      fontSize: "12px",
    },
  },
} satisfies Record<string, SxProps<Theme>>;
