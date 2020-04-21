import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
    Pagination
} from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

const PaginationComponent = ({ count, changePage }) => {
    const classes = useStyles();

    const handleChange = (event, value) =>{
      changePage(value);
    }

    return (
    <div className={classes.root}>
      <Pagination 
        count={count} 
        color="primary" 
        onChange={handleChange}
    />
    </div>
    )
};

export default PaginationComponent;