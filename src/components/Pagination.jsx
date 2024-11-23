import { Box, Pagination } from "@mui/material";
import React from "react";
const PaginationCustom = ({ count, currentPage, onChange }) => {
    return (
        <Box display="flex" justifyContent="center" p={1}>
            <Pagination
                sx={{ backgroundColor: "white", borderRadius: "5px" }}
                color='primary'
                count={count}
                page={currentPage}
                onChange={onChange}
                variant="text"
                shape="rounded"
            />
        </Box>
    );
}
export default PaginationCustom;
