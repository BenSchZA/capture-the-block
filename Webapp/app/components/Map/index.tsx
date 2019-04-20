import React, { Fragment } from 'react';
import { createStyles, withStyles, WithStyles, Theme } from '@material-ui/core/styles';
import Phaser from 'phaser';
import Scene from './scene';
import { Button } from '@material-ui/core';
import { Match } from 'domain/captureTheBlock/types';

const styles = ({ palette, breakpoints, spacing, zIndex, mixins }: Theme) => createStyles({

});

interface Props extends WithStyles<typeof styles> {
  players: Array<Player>,
  match: Match,
}

enum Side {
  LEFT,
  RIGHT
}

interface Player {
  side: Side,
  progress: Number,
}

class Map extends React.Component<Props> {
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
      mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
      // min: {
      //   width: 800,
      //   height: 600
      // },
      // max: {
      //   width: 1600,
      //   height: 1200
      // },
      width: '100%',
      // height: '',
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
    this.updateMapData();

    // let progress = 0;
    // let direction = true;
    
    // setInterval(() => {
    //   this.scene.setProgress(Side.LEFT, progress);
    //   this.scene.setProgress(Side.RIGHT, progress);
    //   if(direction) {
    //     progress = progress + 0.1;
    //   } else {
    //     progress = progress - 0.1;
    //   }
    //   if(progress >= 0.9) direction = false;
    //   if(progress <= 0.1) direction = true;
    //   console.log(progress);
    // }, 5000);
    // this.scene.setProgress(Side.LEFT, 0.5);
    // this.scene.setProgress(Side.RIGHT, 1);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.match !== this.props.match) {
      this.updateMapData();
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  updateMapData() {
    if(this.scene) {
      this.props.players.forEach((player) => {
        this.scene.setProgress(player.side, player.progress);
      });
      this.scene.setMatch(this.props.match);
    }
  }

  public render() {
    this.updateMapData();

    return (
      <Fragment>
        <div id="phaser-div"></div>
      </Fragment>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Map);