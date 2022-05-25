import * as React from 'react';
import {useEffect,useState,useContext} from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import DOMPurify from 'dompurify';
import {useRouter} from 'next/router';
import AuthContext from "../context/AuthContext";
import {API_URL} from "../utils/Constants"
import {AUTH_KEY} from "../utils/Constants"
export default function AnnouncementCards({title,image,description,announcement,id}) {
  const [userCardOne,setUserCardOne] = useState(null)
  const {AlertUser} = useContext(AuthContext)
 
  const router = useRouter()
 
  useEffect(() => {
   if(router.pathname==="/UserAnnouncements"){
    setUserCardOne(true);
    AlertUser(false)
    //console.log(id)
   }
  });

  return (
    <Card sx={{ width: 300}}>
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt={title}
        style={{objectFit: 'fill'}}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography 
        variant="body2" 
        color="text.secondary" 
        align='left' 
       /* dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(description) }}*/>
        {description}
        </Typography>
      </CardContent>
      <CardActions>
        {<Button size="small"><Link href={`/announcements/${announcement}`} underline="none">See details</Link></Button>}
        {userCardOne && <Button size="small"><Link href={`/announcements/announcement/${id}`} underline="none">Edit</Link></Button>}
        {userCardOne && <Button size="small" onClick={ 
          async () => {
             const announcement_res = await fetch(`${API_URL}/api/announcements/${id}`,{
             method:'DELETE',
             headers: { "Content-Type": "application/json",
             "Authorization" : `Bearer ${AUTH_KEY}`}
      
          })
    //const announcements =  announcement_res.json()
    router.push('/UserAnnouncements',null, { shallow: false })
}}><Link underline="none">Delete</Link></Button>}
      </CardActions>
    </Card>
  );
}
