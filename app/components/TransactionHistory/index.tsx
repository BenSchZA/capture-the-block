/**
 *
 * TransactionHistory
 *
 */

import React, { Fragment } from 'react';
import { Theme, createStyles, withStyles, WithStyles, Paper, Typography, Table, TableHead, TableRow, TableCell, CircularProgress, TableBody } from '@material-ui/core';
import { blueGrey } from '@material-ui/core/colors';

const styles = ({ spacing, palette }: Theme) =>
  createStyles({
    layout: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: spacing.unit * 3,
      marginRight: spacing.unit * 3,
    },
    container: {
      marginTop: spacing.unit * 2,
      display: 'flex',
      flexDirection: 'column',
      overflowX: 'auto',
      width: '100%',
    },
    tableTitle: {
      padding: spacing.unit * 2,
    },
    tableRow: {
      cursor: 'pointer',
      '&:nth-of-type(even)': {
        backgroundColor: palette.background.default,
      },
    },
    tableHeadCell: {
      fontSize: '1rem',
    },
    header: {
      backgroundColor: blueGrey[100],
    },
    buy: {
      color: "green",
    },
    sell: {
      color: "red",
    },
    placeHolder: {
      margin: spacing.unit
    }
  });

interface OwnProps extends WithStyles<typeof styles> {
  transactions: Array<{
    address: string,
    transactionType: string
    side: number,
    amount: number,
    time: Date,
    txHash: string,
  }>
}

const TransactionHistory: React.SFC<OwnProps> = (props: OwnProps) => {
  const { transactions, classes } = props;
  return <Fragment>
    <section className={classes.layout}>
      <Paper className={classes.container}>
        <Typography className={classes.tableTitle} variant="h5">
          Transaction History
      </Typography>
        <Table>
          <TableHead className={classes.header}>
            <TableRow>
              <TableCell className={classes.tableHeadCell}>Address</TableCell>
              <TableCell className={classes.tableHeadCell}></TableCell>
              <TableCell className={classes.tableHeadCell}>Side</TableCell>
              <TableCell className={classes.tableHeadCell}>Amount</TableCell>
              <TableCell className={classes.tableHeadCell}>Time</TableCell>
            </TableRow>
          </TableHead>
        </Table>
        {transactions.length === 0 ? <Typography variant="h6" className={classes.placeHolder}>No transactions</Typography> :
        <TableBody>
          {transactions.map(t => (
            <TableRow key={t.txHash} className={classes.tableRow}
              hover
              onClick={() => window.open("https://rinkeby.etherscan.io/tx/" + t.txHash, "_blank")}>
              <TableCell>{t.address}</TableCell>
              <TableCell>{t.transactionType}</TableCell>
              <TableCell>{t.side}</TableCell>
              <TableCell>{t.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        }
      </Paper>
    </section>
  </Fragment>
};

export default withStyles(styles, { withTheme: true })(TransactionHistory);
