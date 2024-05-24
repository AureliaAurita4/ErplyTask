import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Article } from '../interfaces/article';

const NewsPage: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const token = useSelector((state: RootState) => state.user.token);

    useEffect(() => {
        axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${token}`)
          .then(response => {
                setArticles(response.data.articles);
                setLoading(false);
          })
          .catch(error => {
                setError(error);
                setLoading(false);
          });
    }, [token]);

    if (loading) return <Typography>Loading...</Typography>;
    if (error) return <Typography>{error}</Typography>;

    return (
        <div>
            <Container>
                <Typography variant="h4" sx={{ mt: 2 }}>Fresh News</Typography>
                <List>
                    {articles.map((article, index) => (
                        <ListItem key={index} list-item-button component="a" href={article.url} target="_blank">
                            <ListItemText primary={article.title} secondary={article.description} />
                        </ListItem>
                    ))}
                </List>
            </Container>
        </div>
    );
};

export default NewsPage;