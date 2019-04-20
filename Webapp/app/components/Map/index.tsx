import React, { Fragment } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Phaser from 'phaser';
import Scene from './scene';

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

  game;
  scene;

  populatePhaserMap() {
    const config = {
      type: Phaser.CANVAS,
      width: 800,
      height: 600,
      backgroundColor: '#2d2d2d',
      parent: 'phaser-div',
      pixelArt: true,
      physics: {
        default: 'impact',
        impact: { gravity: 200 }
      },
      scene: [Scene]
    };

    this.game = new Phaser.Game(config);
    console.log(this.game);
  }

  componentDidMount() {
    this.populatePhaserMap();
  }

  shouldComponentUpdate() {
    return false;
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