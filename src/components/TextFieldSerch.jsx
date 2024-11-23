import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from "react";
import SearchIcon from '@mui/icons-material/Search';

const TextFieldSearch = ({ searchTerm, onChange }) => {

    return (
        <TextField
            placeholder="Buscar Pokemón"
            size="small"
            value={searchTerm}
            onChange={onChange}
            style={{ backgroundColor: "white" }}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );

}
export default TextFieldSearch;