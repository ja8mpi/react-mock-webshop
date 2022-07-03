import { Button, Card, CardActions, CardContent, CardMedia, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import { ProductType, StoreContext } from "../../../contexts/StoreContext";
import PaidIcon from '@mui/icons-material/Paid';
import { useContext, useEffect, useState } from "react";

export default function StoreItem({ id, name, description, src, price }: ProductType) {

    const [quantity, setQuantity] = useState<number>(1);

    const { dispatchCart } = useContext(StoreContext);

    const handleClick = () => {
        dispatchCart({ type: 'add', quantity, id })
    }

    return (
        <Card sx={{ maxWidth: 345 }}>
            <CardMedia
                component='img'
                height="140"
                image={src}
                alt={name}
            />
            <CardContent
            >
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    textAlign='center'
                >
                    {name}
                </Typography>
                <Typography variant="h6" color="text.secondary">
                    {description}
                </Typography>
                <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="center"
                    gap={1}>
                    <Typography variant="h5">{price}</Typography>
                    <PaidIcon />
                </Stack>
            </CardContent>
            <CardActions
                sx={{
                    'display': 'flex',
                    'alignItems': 'center',
                    'justifyContent': 'center'
                }}
            >
                <TextField
                    defaultValue={1}
                    type='number'
                    size="small"
                    sx={{
                        width: '20%',
                    }}
                    InputProps={{
                        inputProps: {
                            min: 1
                        }
                    }}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                >
                </TextField>
                <Button
                    variant='outlined'
                    color='secondary'
                    onClick={handleClick}
                >
                    Add to cart
                </Button>
            </CardActions>
        </Card>
    );
}