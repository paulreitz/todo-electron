import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { addList, deleteList, getItems } from '../renderer';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Delete from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';

const useStyles = makeStyles(theme => ({
    container: {
        [theme.breakpoints.up('md')]: {
            width: 980,
            marginTop: 24
        },
        width: 'auto',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    title: {
        textAlign: 'center',
        marginBottom: 24
    },
    listCard: {
        marginBottom: 15
    },
    listContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: theme.palette.secondary
    },
    listName: {
        textDecoration: 'none',
        cursor: 'pointer'
    },
    listDelete: {
        cursor: 'pointer'
    },
    newListName: {
        flexGrow: 1
    },
    addList: {
        margin: 15,
        cursor: 'pointer'
    }
}))

export function Landing(props) {
    const classes = useStyles();

    const [newListName, setNewListName] = useState('');

    const addNewList = () => {
        if (newListName.trim()) {
            addList(newListName);
            setNewListName('');
        }
    }

    const addKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewList();
        }
    }

    const deleteListById = (id) => {
        deleteList(id);
    }

    const getSelectedItems = (id) => {
        getItems(id);
    }

    return (
        <React.Fragment>
            <Box className={classes.container}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h4" color="primary">Todo Lists</Typography>
                    </Grid>
                    {
                        props.lists.map(list => (
                            <Grid item xs={12} key={list.id}>
                                <Card className={classes.listCard}>
                                    <CardContent className={classes.listContainer}>
                                        <Typography 
                                            className={classes.listName} 
                                            variant="body1" 
                                            color="primary" 
                                            component={Link} 
                                            to={`/items/${list.id}`} 
                                            onClick={() => {getSelectedItems(list.id);}}
                                        >{list.name}</Typography>
                                        <Delete className={classes.listDelete} color="error" onClick={() => {deleteListById(list.id)}} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                    <Grid item xs={12} className={classes.listContainer}>
                        <TextField className={classes.newListName} name='newList' label="New List Name" onChange={(e) => {setNewListName(e.target.value)}} onKeyDown={addKeyDown} />
                        <AddBox className={classes.addList} color="primary" onClick={addNewList} />
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    lists: state.lists
});

export default connect(mapStateToProps)(Landing);