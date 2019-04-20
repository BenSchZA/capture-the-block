import React, { Fragment } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Phaser from 'phaser';
import Scene from './scene';

const styles = ({ palette, breakpoints, spacing, zIndex, mixins }: Theme) => createStyles({

});

interface Props extends WithStyles<typeof styles> {
  players: Array<Player>,
}

enum Side {
  LEFT,
  RIGHT
}

enum PlayerType {
  ME,
  PARTICIPANT
}

interface Player {
  side: Side,
  type: PlayerType,
  progress: Number,
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
    this.scene = new Scene({});

    const config = {
      type: Phaser.CANVAS,
      mode: Phaser.Scale.FIT,
      // min: {
      //   width: 800,
      //   height: 600
      // },
      // max: {
      //   width: 1600,
      //   height: 1200
      // },
      width: '100%',
      height: '100%',
      backgroundColor: '#00b5bd',
      parent: 'phaser-div',
      pixelArt: true,
      physics: {
        default: 'arcade',
        physics: { gravity: {x: 0, y: 200} }, //{x: 0, y: 50}
        impact: { gravity: 200 },
      },
      scene: [this.scene]
    };
    
    this.game = new Phaser.Game(config);
  }

  componentDidMount() {
    this.populatePhaserMap();

    this.scene.setPlayers([
      {
        side: Side.LEFT,
        type: PlayerType.ME,
        progress: 0,
      },
      {
        side: Side.RIGHT,
        type: PlayerType.PARTICIPANT,
        progress: 0,
      },
    ]);
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