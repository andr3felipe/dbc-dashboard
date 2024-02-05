import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import * as S from "./styles";

interface BasicMenuProps {
  children: React.ReactNode;
  id: string;
}

export default function BasicMenu({ children, id }: BasicMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id={id}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        aria-label="Menu de opções"
      >
        <S.Icon />
      </Button>
      <Menu
        sx={{
          "& .css-6hp17o-MuiList-root-MuiMenu-list": {
            borderRadius: "12px",
            padding: "0.25rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: "0.5rem",
            boxShadow: " 0px 10px 60px 0px rgba(226, 236, 249, 0.5);",
          },
          "&": {
            flexGrow: 1,
          },
        }}
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": id,
        }}
      >
        {children}
      </Menu>
    </div>
  );
}
