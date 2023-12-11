import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Paper, Button, IconButton, Typography,TextField} from '@mui/material';
import axiosInstance from '../Auth/AxiosInterceptor';
import {
    Unstable_NumberInput as BaseNumberInput,
    NumberInputProps,
  } from '@mui/base/Unstable_NumberInput';
  import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface CartComponentProps {
  // You can pass any additional props needed
}

const CartComponent: React.FC<CartComponentProps> = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    // Fetch cart items here
    const fetchCart = async () => {
      try {
        const email = localStorage.getItem('email');
        if (!email) {
          console.error('Email not found in localStorage');
          return;
        }

        const queryString = `userEmail=${encodeURIComponent(email)}`;
        const response = await fetch(
          `https://localhost:7198/api/cart/get-cart${queryString ? `?${queryString}` : ''}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              // Include any additional headers as needed
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setCartItems(data.cartItems);
        } else {
          console.error('Failed to fetch cart items');
        }
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    };

    fetchCart();
  }, []); // Run the effect only once on component mount

  const handleRemoveItem = async (storeItemId: number) => {
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        console.error('Email not found in localStorage');
        return;
      }
  
      const apiUrl = `https://localhost:7198/api/cart/remove?userEmail=${encodeURIComponent(email)}&storeItemId=${storeItemId}`;
  
      const response = await fetch(apiUrl, {
        method: 'DELETE', // Use DELETE for removal
        headers: {
          'Content-Type': 'application/json',
          // Include any additional headers as needed
        },
      });
  
      if (response.ok) {
        console.log(`Item with ID ${storeItemId} removed successfully`);
        // Assuming data.cartItems is a state variable
      // Update the local state (cartItems) using setCartItems
        setCartItems(prevCartItems => prevCartItems.filter(item => item.cartItem.storeItemId !== storeItemId));
      
        // You can update the local state or perform any other actions as needed
      } else {
        console.error(`Failed to remove item with ID ${storeItemId}`);
      }
    } catch (error) {
      console.error(`Error removing item with ID ${storeItemId}:`, error);
    }
  };
  

  const handleUpdateQuantity = async(storeItemId: number, quantity: number) => {
    try {
        const email = localStorage.getItem('email');
        if (!email) {
          console.error('Email not found in localStorage');
          return;
        }
        console.log(email);
        const apiUrl = `https://localhost:7198/api/cart/add?userEmail=${encodeURIComponent(email)}&storeItemId=${storeItemId}&quantity=${quantity}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any additional headers as needed
      },
    });
    
        if (response.ok) {
          console.log('Cart item added successfully');
          // You can update the local state or perform any other actions as needed
        } else {
          console.error('Failed to add item to the cart');
        }
      } catch (error) {
        console.error('Error adding item to the cart:', error);
      }
  };

  return (
    <div>
      
      {cartItems.map((item) => (
        <Paper key={item.cartItem.cartId} elevation={3} style={{ marginBottom: '16px', padding: '16px', display: 'flex', alignItems: 'center' }}>
          <img src={item.storeItem.imageUrl} alt={item.storeItem.title} style={{ width: '50px', marginRight: '16px' }} />
          <div>
            <Typography variant="h6">{item.storeItem.title}</Typography>
           
            <TextField
              type="number"
              defaultValue={item.cartItem.quantity || 1}
              style={{ marginLeft: '8px', width: '60px', textAlign: 'center' }}
              size="small"
              InputProps={{ inputProps: { min: 1, max: 10 } }}
              onChange={(e) => handleUpdateQuantity(item.cartItem.storeItemId, parseInt(e.target.value,)||1)}
            />
            <Typography>Price: R{item.storeItem.price}</Typography>
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Button variant="outlined" onClick={() => handleRemoveItem(item.cartItem.storeItemId)}>Remove</Button>
          </div>
        </Paper>
      ))}
    </div>
  );
};

export default CartComponent;
