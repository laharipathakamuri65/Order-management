import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);


export default function MaterialBasicCard({title, description, category, brand }) {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
        
          {title}
         
        </Typography>
        <Typography variant="h5" component="div">
         {brand}
          
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{category}</Typography>
        <Typography variant="body2">
          {description}
          
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
        
      </CardActions>
    </Card>
  );
}