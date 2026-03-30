import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MDialogBox from './MDialogBox.jsx';
import DialogBoxview from './DialogBoxview.jsx';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ProductForm from '../products/ProductForm.jsx';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function MaterialBasicCard({ productData, onUpdateProduct }) {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        
          {productData.title}
             
          
         
        </Typography>
        <Typography variant="h5" component="div">
         <span>{productData.brand}
            <MDialogBox
              dialogName={productData.title}
              dialogButton={<EditTwoToneIcon />}
              data={productData}
              formComponent={ProductForm}
              onSubmit={onUpdateProduct}
              formProps={{ mode: 'edit' }}
              dialogContentText="Edit product details and submit."
              itemType="product"
            />
            <DialogBoxview
            dialogName={productData.title}
              dialogButton={<VisibilityIcon />}
              data={productData}
              formComponent={ProductForm}
              dialogviewContentText="Product Details"
              formProps={{ mode: 'view' }}
              itemType="product"
              />
          </span>
          
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{productData.category}</Typography>
        <Typography variant="body2">
          {productData.description}
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        
      </CardActions>
    </Card>
  );
}