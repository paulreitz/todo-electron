import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { getItems, addItem, deleteItem, setItemComplete } from '../renderer';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Delete from '@material-ui/icons/Delete';
import AddBox from '@material-ui/icons/AddBox';

const useStyles = makeStyles(theme => ({
    crumbs: {
        backgroundColor: theme.palette.primary.main,
        padding: 10
    },
    crumbText: {
        textDecoration: 'none',
        color: theme.palette.common.lightBlue
    },
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
    itemCard: {
        marginBottom: 5
    },
    itemContainer: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    },
    itemName: {
        flexGrow: 1,
        marginTop: 8
    },
    itemDelete: {
        marginTop: 8
    },
    newItemName: {
        flexGrow: 1
    },
    addItem: {
        marginTop: 8
    }
}))

export function Items(props) {
    const {id} = useParams();
    const list = props.lists.find(l => l.id === parseInt(id)) || {name: ''};
    const classes = useStyles();

    const [newItemName, setNewItemName] = useState('');

    const addNewItem = () => {
        if (newItemName.trim()) {
            const newItemObject = {
                listId: parseInt(id),
                name: newItemName
            }
            addItem(newItemObject);
        }
    };

    const itemKeyDown = (e) => {
        if (e.key === 'Enter') {
            addNewItem();
        }
    };

    const deleteSelectedItem = (itemId) => {
        const itemObject = {
            id: itemId,
            listId: parseInt(id)
        }
        deleteItem(itemObject);
    }

    const updateItemComplete = (itemId, complete) => {
        const itemObject = {
            id: itemId,
            listId: parseInt(id),
            complete: complete ? 1 : 0
        }
        setItemComplete(itemObject);
    }

    return (
        <React.Fragment>
            <Breadcrumbs className={classes.crumbs}>
                <Typography className={classes.crumbText} variant="body1" component={Link} to="/">&lt;&lt; Back To Lists</Typography>
            </Breadcrumbs>
            <Box className={classes.container}>
                <Grid container>
                    <Grid item xs={12}>
                        <Typography className={classes.title} variant="h5" color="primary">{list.name}</Typography>
                    </Grid>
                    {
                        props.items.map(item => (
                            <Grid item xs={12} key={item.id}>
                                <Card className={classes.itemCard}>
                                    <CardContent className={classes.itemContainer}>
                                        <Typography 
                                            className={classes.itemName} 
                                            variant="body1" 
                                            color="primary" 
                                            style={{textDecoration: item.complete === 1? 'line-through' : 'none'}}
                                        >{item.name}</Typography>
                                        <Checkbox className={classes.itemComplete} checked={item.complete === 1} color="primary" onChange={(e) => {updateItemComplete(item.id, e.target.checked)}} />
                                        <Delete className={classes.itemDelete} color="error" onClick={() => {deleteSelectedItem(item.id)}} />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    }
                    <Grid className={classes.itemContainer} item xs={12}>
                        <TextField 
                            className={classes.newItemName} 
                            name="newItem" 
                            label="New Item" 
                            onChange={(e) => {setNewItemName(e.target.value)}} 
                            onKeyDown={itemKeyDown}
                        />
                        <AddBox className={classes.addItem} color="primary" />
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    )
}

const mapStateToProps = (state) => ({
    lists: state.lists,
    items: state.items
});

export default connect(mapStateToProps)(Items);