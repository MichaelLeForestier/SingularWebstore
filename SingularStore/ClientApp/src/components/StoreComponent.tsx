import React, { useEffect, useState } from 'react';
import {
  Grid,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  Container,
  TextField,
} from '@mui/material';
import axiosInstance from '../Auth/AxiosInterceptor';
import { toast } from 'react-toastify';
import ResponsiveAppBar from './ResponsiveAppBar';
import InfoIcon from '@mui/icons-material/Info';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import axios from 'axios';
interface StoreItem {
  storeItemId: number;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const Store: React.FC = () => {
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<StoreItem | null>(null);
  const [searchString, setSearchString] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [itemQuantities, setItemQuantities] = useState<Record<number, number>>(
    {}
  );

  useEffect(() => {
    const queryParams: Record<string, string | number | null> = {};

    if (searchString) {
      queryParams.searchString = searchString;
    }

    if (minPrice !== null && minPrice !== undefined) {
      queryParams.minPrice = minPrice;
    }

    if (maxPrice !== null && maxPrice !== undefined) {
      queryParams.maxPrice = maxPrice;
    }

    const queryString = new URLSearchParams(
      queryParams as Record<string, string>
    ).toString();

    axiosInstance
      .get(
        `https://localhost:7198/api/StoreItems/GetStoreItems${
          queryString ? `?${queryString}` : ''
        }`
      )
      .then((response) => {
        setStoreItems(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchString, minPrice, maxPrice]);

  const handleAddToCart = async (item: StoreItem) => {
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        console.error('Email not found in localStorage');
        return;
      }
      
      const quantity = itemQuantities[item.storeItemId] || 1;
      const apiUrl = `https://localhost:7198/api/cart/add?userEmail=${encodeURIComponent(email)}&storeItemId=${item.storeItemId}&quantity=${quantity}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers as needed
        },
      });
  
      if (response.ok) {
        toast.success(`${quantity} ${item.title} added to cart!`, {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
  
        // Update the local state (itemQuantities) using setItemQuantities
        setItemQuantities((prevQuantities) => ({
          ...prevQuantities,
          [item.storeItemId]: (prevQuantities[item.storeItemId] || 0) + 1,
        }));
  
        // You can update the local state or perform any other actions as needed
      } else {
        console.error(`Failed to add ${item.title} to the cart`);
      }
    } catch (error) {
      console.error(`Error adding ${item.title} to the cart:`, error);
    }
  };
  const openDescriptionDialog = (item: StoreItem) => {
    setSelectedItem(item);
  };

  const closeDescriptionDialog = () => {
    setSelectedItem(null);
  };

  const handleSearchChange = (query: string) => {
    setSearchString(query);
  };

  const handleMinPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseInt(event.target.value, 10) : null;
    setMinPrice(value);
  };

  const handleMaxPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value ? parseInt(event.target.value, 10) : null;
    setMaxPrice(value);
  };
  const handleResetFilter = () => {
    setMinPrice(null);
    setMaxPrice(null);
  };
  return (
    <div>
      <ResponsiveAppBar
        onSearchChange={handleSearchChange}
        onMinPriceChange={setMinPrice}
        onMaxPriceChange={setMaxPrice}
        onResetFilter={handleResetFilter}
      />
      <Container
        maxWidth="xl"
        style={{ paddingTop: '20px', marginBottom: '40px' }}
      >
        <Grid container spacing={3}>
          {storeItems.map((item) => (
            <Grid
              item
              key={item.storeItemId}
              xs={12}
              sm={6}
              md={4}
              lg={3}
              style={{ marginBottom: '3%' }}
            >
              <Paper
                elevation={3}
                style={{
                  padding: '16px',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: '100%', marginBottom: '8px' }}
                />
                <div style={{ flex: 1 }}>
                  <Typography variant="h6">{item.title}</Typography>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: '8px',
                  }}
                >
                  <Typography variant="h6">R{item.price.toFixed(2)}</Typography>
                  <IconButton
                    onClick={() => openDescriptionDialog(item)}
                    size="small"
                  >
                    <InfoIcon />
                  </IconButton>
                </div>
                <div style={{ display: 'flex', marginTop: '8px' }}>
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={() => handleAddToCart(item)}
                    startIcon={<ShoppingCartIcon />}
                    style={{
                      background: '#F9F6F0',
                      color: 'black',
                      width: '75%',
                    }}
                  >
                    Add to Cart
                  </Button>
                  <TextField
                    label="Quantity"
                    type="number"
                    value={itemQuantities[item.storeItemId] || 1}
                    onChange={(e) => {
                      const value = parseInt(e.target.value, 10) || 1;
                      setItemQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [item.storeItemId]: value,
                      }));
                    }}
                    InputProps={{ inputProps: { min: 1, max: 10 } }}
                    size="small"
                    style={{
                      marginLeft: '8px',
                      width: '25%',
                    }}
                  />
                </div>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
      <Dialog open={!!selectedItem} onClose={closeDescriptionDialog}>
        <DialogContent>
          {selectedItem && (
            <>
              <Typography variant="h6">{selectedItem.title}</Typography>
              <Typography>{selectedItem.description}</Typography>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Store;
