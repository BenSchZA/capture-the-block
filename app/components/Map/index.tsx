import React, { Fragment } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';

const styles = ({ palette, breakpoints, spacing, zIndex, mixins }: Theme) => createStyles({

});

interface Props extends WithStyles<typeof styles> {

}

class Map extends React.Component<Props> {
  public state = {};

  constructor(props) {
    super(props);
    this.populatePhaserMap.bind(this);
  }

  populatePhaserMap() {

  }

  componentDidMount() {
    this.populatePhaserMap();
  }

  public render() {
    const {} = this.props;
    return (
      <Fragment>
        <div id="phaser-div"></div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Map);