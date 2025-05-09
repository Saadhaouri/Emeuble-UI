import { Delete as DeleteIcon, Edit as EditIcon, Visibility as ViewIcon } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useEffect, useState } from "react";

interface DataTableProps {
  data: any[];
  columns: any[];
  onDelete?: (row: any) => void;
  onUpdate?: (row: any) => void;
  onView?: (row: any) => void; // New prop for consultation
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  onDelete,
  onUpdate,
  onView, // Destructure the new prop
}) => {
  const [rowSelection, setRowSelection] = useState({});

  useEffect(() => {
    // Do something when the row selection changes
    setRowSelection;
  }, [rowSelection]);

  const handleDelete = (row: any) => {
    if (onDelete) {
      onDelete(row);
    }
  };

  const handleUpdate = (row: any) => {
    if (onUpdate) {
      onUpdate(row);
    }
  };

  const handleView = (row: any) => {
    if (onView) {
      onView(row);
    }
  };

  const table = useMaterialReactTable({
    columns: columns || [],
    data: data || [],
    enableColumnOrdering: true,
    defaultDisplayColumn: { enableResizing: true },
    enableRowSelection: true,
    enablePagination: true,
    muiTableContainerProps: { sx: { maxHeight: "500px" } },
    rowVirtualizerOptions: { overscan: 5 },
    columnVirtualizerOptions: { overscan: 2 },
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <IconButton 
          color="info" 
          onClick={() => handleView(row)}
          title="Consulter"
          aria-label="Consulter"
        >
          <ViewIcon />
        </IconButton>
        <IconButton 
          color="secondary" 
          onClick={() => handleUpdate(row)}
          title="Modifier"
          aria-label="Modifier"
        >
          <EditIcon />
        </IconButton>
        <IconButton 
          color="error" 
          onClick={() => handleDelete(row)}
          title="Supprimer"
          aria-label="Supprimer"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    ),
    // Optional: Add localization for French
    localization: {
      actions: 'Actions',
    },
  });

  return <MaterialReactTable table={table} />;
};

export default DataTable;